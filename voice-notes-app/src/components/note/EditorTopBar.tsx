import styles from './editor.module.css';

interface EditorTopBarProps {
  isPinned: boolean;
  onBack: () => void;
  onTogglePin: () => void;
  onShare: () => void;
  onMore: () => void;
}

export default function EditorTopBar({
  isPinned,
  onBack,
  onTogglePin,
  onShare,
  onMore,
}: EditorTopBarProps) {
  return (
    <div className={styles.editorTopbar}>
      <button className={styles.editorTopbar__back} onClick={onBack} aria-label="Go back">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="19" y1="12" x2="5" y2="12" />
          <polyline points="12 19 5 12 12 5" />
        </svg>
      </button>

      <div className={styles.editorTopbar__actions}>
        <button
          className={`${styles.editorTopbar__btn} ${isPinned ? styles.editorTopbar__btnActive : ''}`}
          onClick={onTogglePin}
          data-tooltip="Pin"
          aria-label="Toggle pin"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill={isPinned ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
        </button>

        <button
          className={styles.editorTopbar__btn}
          onClick={onShare}
          data-tooltip="Share"
          aria-label="Share or copy"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="18" cy="5" r="3" />
            <circle cx="6" cy="12" r="3" />
            <circle cx="18" cy="19" r="3" />
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
          </svg>
        </button>

        <button
          className={styles.editorTopbar__btn}
          onClick={onMore}
          data-tooltip="More"
          aria-label="More options"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="1" />
            <circle cx="12" cy="5" r="1" />
            <circle cx="12" cy="19" r="1" />
          </svg>
        </button>
      </div>
    </div>
  );
}
