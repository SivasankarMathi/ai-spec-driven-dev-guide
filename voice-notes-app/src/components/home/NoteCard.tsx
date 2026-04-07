import type { Note } from '../../types';
import { formatDateShort } from '../../utils/dateFormatter';
import styles from './home.module.css';

interface NoteCardProps {
  note: Note;
  onClick: (note: Note) => void;
  onTogglePin: (noteId: number) => void;
}

export default function NoteCard({ note, onClick, onTogglePin }: NoteCardProps) {
  return (
    <div className={styles.noteCard} onClick={() => onClick(note)} role="button" tabIndex={0}>
      <button
        className={`${styles.noteCard__pin}${note.is_pinned ? ` ${styles.noteCard__pinActive}` : ''}`}
        onClick={(e) => {
          e.stopPropagation();
          onTogglePin(note.id);
        }}
        aria-label={note.is_pinned ? 'Unpin note' : 'Pin note'}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill={note.is_pinned ? 'currentColor' : 'none'}
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 17v5" />
          <path d="M9 2h6l-1 7h4l-5 7H7l3-7H6L9 2z" />
        </svg>
      </button>
      <div className={styles.noteCard__title}>{note.title || 'Untitled'}</div>
      <div className={styles.noteCard__body}>{note.content}</div>
      <div className={styles.noteCard__footer}>
        <span className={styles.noteCard__date}>{formatDateShort(note.created_at)}</span>
        <button
          className={styles.noteCard__play}
          onClick={(e) => {
            e.stopPropagation();
          }}
          aria-label="Play"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="currentColor"
            stroke="none"
          >
            <polygon points="5 3 19 12 5 21 5 3" />
          </svg>
        </button>
      </div>
    </div>
  );
}
