import styles from './editor.module.css';

interface EditorMetaProps {
  smartWriteEnabled: boolean;
  onSmartWriteToggle: (enabled: boolean) => void;
  date: string;
  isEnhancing?: boolean;
}

export default function EditorMeta({ smartWriteEnabled, onSmartWriteToggle, date, isEnhancing = false }: EditorMetaProps) {
  return (
    <div className={styles.editorMeta}>
      <div className={styles.editorMeta__left}>
        <span className={styles.editorMeta__label}>Smart Write</span>
        <label className={styles.toggle}>
          <input
            type="checkbox"
            className={`${styles.toggle__input} ${smartWriteEnabled ? styles.toggle__inputChecked : ''}`}
            checked={smartWriteEnabled}
            onChange={(e) => onSmartWriteToggle(e.target.checked)}
            disabled={isEnhancing}
          />
          <span className={styles.toggle__slider} />
        </label>
        {isEnhancing && <span className={styles.editorMeta__enhancing}>Enhancing…</span>}
      </div>
      <span className={styles.editorMeta__date}>{date}</span>
    </div>
  );
}
