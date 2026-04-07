import React from 'react';
import styles from './auth.module.css';

interface AuthCardProps {
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export default function AuthCard({ title, children, footer }: AuthCardProps) {
  return (
    <div className={styles.authContainer}>
      <div className={styles.authCard}>
        <h1 className={styles.authCard__title}>{title}</h1>
        {children}
        {footer && <div className={styles.authCard__footer}>{footer}</div>}
      </div>
    </div>
  );
}

export { styles as authStyles };
