import type { Note } from '../../types';
import NoteCard from './NoteCard';
import styles from './home.module.css';

interface NoteGridProps {
  pinnedNotes: Note[];
  otherNotes: Note[];
  onNoteClick: (note: Note) => void;
  onTogglePin: (noteId: number) => void;
}

export default function NoteGrid({ pinnedNotes, otherNotes, onNoteClick, onTogglePin }: NoteGridProps) {
  if (pinnedNotes.length === 0 && otherNotes.length === 0) {
    return (
      <div className={styles.emptyState}>
        <span className={styles.emptyState__text}>No notes yet. Create your first note!</span>
      </div>
    );
  }

  return (
    <div>
      {pinnedNotes.length > 0 && (
        <div className={styles.noteSection}>
          <h2 className={styles.noteSection__title}>Pinned</h2>
          <div className={styles.noteGrid}>
            {pinnedNotes.map((note) => (
              <NoteCard key={note.id} note={note} onClick={onNoteClick} onTogglePin={onTogglePin} />
            ))}
          </div>
        </div>
      )}

      {otherNotes.length > 0 && (
        <div className={styles.noteSection}>
          <h2 className={styles.noteSection__title}>Others</h2>
          <div className={styles.noteGrid}>
            {otherNotes.map((note) => (
              <NoteCard key={note.id} note={note} onClick={onNoteClick} onTogglePin={onTogglePin} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
