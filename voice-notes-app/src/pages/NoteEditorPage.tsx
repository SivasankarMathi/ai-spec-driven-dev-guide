import { useState, useEffect, useCallback, useRef } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import EditorTopBar from '../components/note/EditorTopBar';
import EditorMeta from '../components/note/EditorMeta';
import TagList from '../components/note/TagList';
import NoteEditor from '../components/note/NoteEditor';
import { useNotes } from '../contexts/NotesContext';
import { useToast } from '../components/ui/Toast';
import { useSmartWrite } from '../hooks/useSmartWrite';
import { formatDateLong } from '../utils/dateFormatter';
import type { Tag } from '../types';
import styles from '../components/note/editor.module.css';

export default function NoteEditorPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { getNoteById, createNote, updateNote, togglePin, deleteNote } = useNotes();
  const { showToast } = useToast();
  const { isEnhancing, enhance, revert } = useSmartWrite();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isPinned, setIsPinned] = useState(false);
  const [smartWriteEnabled, setSmartWriteEnabled] = useState(false);
  const [tags, setTags] = useState<Tag[]>([]);
  const [noteDate, setNoteDate] = useState(new Date().toISOString());

  const noteIdRef = useRef<number | null>(id ? parseInt(id, 10) : null);
  const hasCreatedRef = useRef(false);

  // Load existing note or transcript from recorder
  useEffect(() => {
    if (id) {
      const note = getNoteById(parseInt(id, 10));
      if (note) {
        setTitle(note.title);
        setContent(note.content);
        setIsPinned(note.is_pinned === 1);
        setNoteDate(note.updated_at);
        noteIdRef.current = note.id;
      } else {
        showToast('Note not found', 'error');
        navigate('/home');
      }
    } else {
      // New note — check for transcript from recorder
      const state = location.state as { transcript?: string } | null;
      if (state?.transcript) {
        setContent(state.transcript);
      }
    }
  }, [id, getNoteById, location.state, navigate, showToast]);

  const handleSave = useCallback(() => {
    if (!title.trim() && !content.trim()) return;

    if (noteIdRef.current) {
      updateNote(noteIdRef.current, title, content);
    } else if (!hasCreatedRef.current) {
      hasCreatedRef.current = true;
      const newNote = createNote(title || 'Untitled', content);
      if (newNote) {
        noteIdRef.current = newNote.id;
        // Replace URL so back button works correctly
        navigate(`/note/${newNote.id}`, { replace: true });
      }
    } else if (noteIdRef.current) {
      updateNote(noteIdRef.current, title, content);
    }
  }, [title, content, createNote, updateNote, navigate]);

  const handleBack = useCallback(() => {
    // Save before navigating away
    if (title.trim() || content.trim()) {
      if (noteIdRef.current) {
        updateNote(noteIdRef.current, title, content);
      } else if (!hasCreatedRef.current) {
        hasCreatedRef.current = true;
        createNote(title || 'Untitled', content);
      }
    }
    navigate('/home');
  }, [title, content, createNote, updateNote, navigate]);

  const handleTogglePin = useCallback(() => {
    if (noteIdRef.current) {
      togglePin(noteIdRef.current);
      setIsPinned((prev) => !prev);
      showToast(isPinned ? 'Note unpinned' : 'Note pinned');
    }
  }, [isPinned, togglePin, showToast]);

  // Smart Write toggle: ON → enhance, OFF → revert to original
  const handleSmartWriteToggle = useCallback(async (enabled: boolean) => {
    setSmartWriteEnabled(enabled);

    if (enabled) {
      if (!content.trim()) {
        showToast('Write some content first', 'error');
        setSmartWriteEnabled(false);
        return;
      }
      try {
        const enhanced = await enhance(content);
        if (enhanced) {
          setContent(enhanced);
          showToast('Smart Write enabled — content enhanced');
        }
      } catch (err) {
        showToast(err instanceof Error ? err.message : 'AI enhancement failed', 'error');
        setSmartWriteEnabled(false);
      }
    } else {
      const original = revert();
      if (original) {
        setContent(original);
        showToast('Smart Write disabled — original content restored');
      }
    }
  }, [content, enhance, revert, showToast]);

  const handleShare = useCallback(async () => {
    const text = `${title}\n\n${content}`;
    try {
      await navigator.clipboard.writeText(text);
      showToast('Copied to clipboard');
    } catch {
      showToast('Failed to copy', 'error');
    }
  }, [title, content, showToast]);

  const handleMore = useCallback(() => {
    if (noteIdRef.current && window.confirm('Delete this note?')) {
      deleteNote(noteIdRef.current);
      showToast('Note deleted');
      navigate('/home');
    }
  }, [deleteNote, navigate, showToast]);

  const handleAddTag = useCallback(() => {
    // Placeholder — could open a tag picker modal
    const name = prompt('Tag name:');
    if (name?.trim()) {
      const newTag: Tag = {
        id: Date.now(),
        name: name.trim(),
        color: tags.length % 2 === 0 ? 'yellow' : 'blue',
      };
      setTags((prev) => [...prev, newTag]);
    }
  }, [tags.length]);

  const handleRemoveTag = useCallback((tagId: number) => {
    setTags((prev) => prev.filter((t) => t.id !== tagId));
  }, []);

  return (
    <div className={styles.editorLayout}>
      <EditorTopBar
        isPinned={isPinned}
        onBack={handleBack}
        onTogglePin={handleTogglePin}
        onShare={handleShare}
        onMore={handleMore}
      />

      <div className={styles.editorBody}>
        <EditorMeta
          smartWriteEnabled={smartWriteEnabled}
          onSmartWriteToggle={handleSmartWriteToggle}
          date={formatDateLong(noteDate)}
          isEnhancing={isEnhancing}
        />

        <TagList
          tags={tags}
          onAddTag={handleAddTag}
          onRemoveTag={handleRemoveTag}
        />

        <NoteEditor
          title={title}
          content={content}
          onTitleChange={setTitle}
          onContentChange={setContent}
          onSave={handleSave}
        />
      </div>
    </div>
  );
}
