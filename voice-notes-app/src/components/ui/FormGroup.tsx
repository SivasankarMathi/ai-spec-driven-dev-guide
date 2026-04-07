import { useState } from 'react';
import styles from '../auth/auth.module.css';

interface FormGroupProps {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string | null;
  placeholder?: string;
  isPassword?: boolean;
  link?: { text: string; onClick: () => void };
}

export default function FormGroup({
  label,
  name,
  type = 'text',
  value,
  onChange,
  error,
  placeholder,
  isPassword = false,
  link,
}: FormGroupProps) {
  const [showPassword, setShowPassword] = useState(false);
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className={`${styles.formGroup} ${error ? styles.formGroupError : ''}`}>
      <label className={styles.formGroup__label} htmlFor={name}>
        {label}
      </label>
      <div className={styles.formGroup__inputWrapper}>
        <input
          id={name}
          name={name}
          type={inputType}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`${styles.formGroup__input} ${isPassword ? styles.formGroup__inputPassword : ''}`}
        />
        {isPassword && (
          <button
            type="button"
            className={styles.passwordToggle}
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            <svg className={styles.passwordToggle__icon} viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
              {showPassword ? (
                <>
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                  <line x1="1" y1="1" x2="23" y2="23" />
                </>
              ) : (
                <>
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </>
              )}
            </svg>
          </button>
        )}
      </div>
      {link && (
        <button
          type="button"
          className={styles.formGroup__link}
          onClick={link.onClick}
        >
          {link.text}
        </button>
      )}
      {error && <span className={styles.formGroup__errorMessage}>{error}</span>}
    </div>
  );
}
