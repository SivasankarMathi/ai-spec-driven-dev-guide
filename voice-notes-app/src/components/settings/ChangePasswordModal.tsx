import { useState, useEffect, useRef } from 'react';
import styles from './settings.module.css';

interface ChangePasswordModalProps {
  isOpen: boolean;
  email: string;
  onClose: () => void;
  onSubmit: (currentPassword: string, newPassword: string) => Promise<{ success: boolean; error?: string }>;
}

export default function ChangePasswordModal({ isOpen, email, onClose, onSubmit }: ChangePasswordModalProps) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) {
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setError('');
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!currentPassword || !newPassword || !confirmPassword) {
      setError('All fields are required');
      return;
    }

    if (newPassword.length < 8) {
      setError('New password must be at least 8 characters');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('New passwords do not match');
      return;
    }

    setIsSubmitting(true);
    const result = await onSubmit(currentPassword, newPassword);
    setIsSubmitting(false);

    if (!result.success) {
      setError(result.error || 'Failed to change password');
    } else {
      onClose();
    }
  };

  return (
    <div
      ref={overlayRef}
      className={`${styles.modalOverlay} ${isOpen ? styles.modalOverlayActive : ''}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onClick={handleOverlayClick}
    >
      <div className={styles.modalSheet}>
        <h3 className={styles.modalSheet__title} id="modal-title">Change password</h3>

        <form onSubmit={handleSubmit} noValidate>
          <div className={styles.passwordForm__row}>
            <label className={styles.passwordForm__label}>Email ID</label>
            <span className={styles.passwordForm__static}>{email}</span>
          </div>

          <div className={styles.passwordForm__row}>
            <label className={styles.passwordForm__label} htmlFor="pw-current">Current password</label>
            <input
              type="password"
              className={styles.passwordForm__input}
              id="pw-current"
              placeholder="Enter password"
              autoComplete="current-password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
          </div>

          <div className={styles.passwordForm__row}>
            <label className={styles.passwordForm__label} htmlFor="pw-new">Create new password</label>
            <input
              type="password"
              className={styles.passwordForm__input}
              id="pw-new"
              placeholder="Enter password"
              autoComplete="new-password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>

          <div className={styles.passwordForm__row}>
            <label className={styles.passwordForm__label} htmlFor="pw-confirm">Confirm password</label>
            <input
              type="password"
              className={styles.passwordForm__input}
              id="pw-confirm"
              placeholder="Enter password"
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          {error && <p className={styles.passwordForm__error}>{error}</p>}

          <div className={styles.passwordForm__actions}>
            <button
              type="button"
              className={`${styles.passwordForm__btn} ${styles.passwordForm__btnCancel}`}
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`${styles.passwordForm__btn} ${styles.passwordForm__btnSubmit}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Saving...' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
