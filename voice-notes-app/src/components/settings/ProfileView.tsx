import { useState, useEffect } from 'react';
import type { User } from '../../types';
import styles from './settings.module.css';

interface ProfileViewProps {
  user: User;
  onUsernameChange: (newName: string) => void;
  onOpenPasswordModal: () => void;
  onBack: () => void;
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export default function ProfileView({ user, onUsernameChange, onOpenPasswordModal, onBack }: ProfileViewProps) {
  const [username, setUsername] = useState(user.name);

  useEffect(() => {
    setUsername(user.name);
  }, [user.name]);

  const handleBlur = () => {
    const trimmed = username.trim();
    if (trimmed && trimmed !== user.name) {
      onUsernameChange(trimmed);
    } else {
      setUsername(user.name);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      (e.target as HTMLInputElement).blur();
    }
  };

  return (
    <div>
      <header className={styles.viewHeader}>
        <button className={styles.viewHeader__back} onClick={onBack} aria-label="Back to settings">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
        </button>
        <h2 className={styles.viewHeader__title}>Profile</h2>
      </header>

      {/* Profile Picture Row */}
      <div className={styles.profileRow}>
        <span className={styles.profileRow__label}>Profile Picture</span>
        <div className={styles.profileAvatar}>
          <span className={styles.profileAvatar__circle}>{getInitials(user.name)}</span>
          <button className={styles.profileAvatar__edit} aria-label="Change profile picture">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
          </button>
        </div>
      </div>

      <div className={styles.divider} />

      {/* Username Row */}
      <div className={styles.profileRow}>
        <span className={styles.profileRow__label}>Username</span>
        <input
          type="text"
          className={styles.profileInput}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          aria-label="Username"
        />
      </div>

      <div className={styles.divider} />

      {/* Change Password Row */}
      <div
        className={`${styles.profileRow} ${styles.profileRowClickable}`}
        role="button"
        tabIndex={0}
        onClick={onOpenPasswordModal}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onOpenPasswordModal();
          }
        }}
      >
        <span className={styles.profileRow__label}>Change password</span>
        <svg
          className={styles.profileRow__arrow}
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </div>
    </div>
  );
}
