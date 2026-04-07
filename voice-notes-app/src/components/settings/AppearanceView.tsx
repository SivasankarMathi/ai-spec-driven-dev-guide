import type { Settings } from '../../types';
import styles from './settings.module.css';

interface AppearanceViewProps {
  theme: Settings['theme'];
  fontSize: Settings['font_size'];
  onThemeChange: (theme: Settings['theme']) => void;
  onFontSizeChange: (size: Settings['font_size']) => void;
  onBack: () => void;
}

export default function AppearanceView({ theme, fontSize, onThemeChange, onFontSizeChange, onBack }: AppearanceViewProps) {
  return (
    <div>
      <header className={styles.viewHeader}>
        <button className={styles.viewHeader__back} onClick={onBack} aria-label="Back to settings">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
        </button>
        <h2 className={styles.viewHeader__title}>Appearance</h2>
      </header>

      {/* Theme */}
      <div className={styles.appearanceRow}>
        <span className={styles.appearanceRow__label}>Theme</span>
        <select
          className={styles.appearanceSelect}
          value={theme}
          onChange={(e) => onThemeChange(e.target.value as Settings['theme'])}
          aria-label="Select theme"
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
          <option value="system">System</option>
        </select>
      </div>

      <div className={styles.divider} />

      {/* Font Size */}
      <div className={styles.appearanceRow}>
        <span className={styles.appearanceRow__label}>Font</span>
        <select
          className={styles.appearanceSelect}
          value={fontSize}
          onChange={(e) => onFontSizeChange(e.target.value as Settings['font_size'])}
          aria-label="Select font size"
        >
          <option value="small">Small</option>
          <option value="medium">Medium</option>
          <option value="large">Large</option>
        </select>
      </div>
    </div>
  );
}
