import { useRef, useEffect, useCallback } from 'react';
import { useToast } from '../ui/Toast';
import styles from './editor.module.css';

interface NoteEditorProps {
  title: string;
  content: string;
  onTitleChange: (title: string) => void;
  onContentChange: (content: string) => void;
  onSave: () => void;
}

export default function NoteEditor({
  title,
  content,
  onTitleChange,
  onContentChange,
  onSave,
}: NoteEditorProps) {
  const { showToast } = useToast();
  const contentRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const internalContent = useRef(content);

  // Sync contentEditable when content changes externally (e.g. AI enhance/revert)
  useEffect(() => {
    if (contentRef.current && content !== internalContent.current) {
      contentRef.current.textContent = content;
      internalContent.current = content;
    }
  }, [content]);

  // Auto-save with 2s debounce
  const scheduleAutoSave = useCallback(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      onSave();
    }, 2000);
  }, [onSave]);

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  // Ctrl+S / Cmd+S
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        if (debounceRef.current) clearTimeout(debounceRef.current);
        onSave();
        showToast('Note saved');
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onSave, showToast]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onTitleChange(e.target.value);
    scheduleAutoSave();
  };

  const handleContentInput = () => {
    if (contentRef.current) {
      const text = contentRef.current.textContent || '';
      internalContent.current = text;
      onContentChange(text);
      scheduleAutoSave();
    }
  };

  return (
    <>
      <input
        type="text"
        className={styles.editorTitle}
        placeholder="Title"
        value={title}
        onChange={handleTitleChange}
      />
      <div
        ref={contentRef}
        className={styles.editorContent}
        contentEditable
        data-placeholder="Start writing..."
        onInput={handleContentInput}
        suppressContentEditableWarning
      />
    </>
  );
}
