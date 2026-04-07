import styles from '../auth/auth.module.css';

interface DividerProps {
  text?: string;
}

export default function Divider({ text }: DividerProps) {
  return (
    <div className={styles.divider}>
      {text && <span className={styles.divider__text}>{text}</span>}
    </div>
  );
}
