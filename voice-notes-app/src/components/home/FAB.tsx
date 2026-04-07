import { useState, useEffect, useCallback } from 'react';
import styles from './home.module.css';

interface FABProps {
  onVoice: () => void;
  onText: () => void;
}

export default function FAB({ onVoice, onText }: FABProps) {
  const [isOpen, setIsOpen] = useState(false);

  const close = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        close();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, close]);

  const handleAction = (action: () => void) => {
    close();
    action();
  };

  return (
    <>
      <div className={`${styles.fabOverlay} ${isOpen ? styles.fabOverlayVisible : ''}`} onClick={close} />

      <div className={`${styles.fabContainer} ${isOpen ? styles.fabContainerOpen : ''}`}>
        <div className={styles.fabMenu}>
          <div className={styles.fabMenu__itemWrapper}>
            <button
              className={styles.fabMenu__item}
              onClick={() => handleAction(onVoice)}
              aria-label="Voice Recording (Beta)"
              title="Voice Recording (Beta)"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                <line x1="12" y1="19" x2="12" y2="23" />
                <line x1="8" y1="23" x2="16" y2="23" />
              </svg>
            </button>
            <span className={styles.betaBadge}>Beta</span>
          </div>
          <button
            className={styles.fabMenu__item}
            onClick={() => handleAction(onText)}
            aria-label="New Text Note"
            title="New Text Note"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
          </button>
        </div>

        <button
          className={styles.fabBtn}
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label={isOpen ? 'Close menu' : 'Create new'}
        >
          <svg className={styles.fabBtn__iconPlus} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          <svg className={styles.fabBtn__iconClose} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>
    </>
  );
}
