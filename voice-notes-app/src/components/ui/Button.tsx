import React from 'react';
import styles from '../auth/auth.module.css';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'oauth' | 'outline';
  type?: 'button' | 'submit';
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  icon?: React.ReactNode;
}

export default function Button({
  children,
  variant = 'primary',
  type = 'button',
  onClick,
  disabled = false,
  loading = false,
  className = '',
  icon,
}: ButtonProps) {
  if (variant === 'oauth') {
    return (
      <button
        type={type}
        onClick={onClick}
        disabled={disabled || loading}
        className={`${styles.btn} ${styles.btnOauth} ${className}`}
      >
        {icon && <span className={styles.btnOauth__icon}>{icon}</span>}
        {children}
      </button>
    );
  }

  const variantClass = variant === 'primary' ? styles.btnPrimary : styles.btnOutline;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${styles.btn} ${variantClass} ${loading ? styles.btnLoading : ''} ${className}`}
    >
      {loading ? '' : children}
    </button>
  );
}
