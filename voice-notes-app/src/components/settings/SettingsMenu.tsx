import styles from './settings.module.css';

interface SettingsMenuProps {
  onNavigate: (view: 'profile' | 'appearance') => void;
}

const MENU_ITEMS = [
  { key: 'profile' as const, label: 'Profile', desc: 'Avatar, Username, Email ID' },
  { key: 'appearance' as const, label: 'Appearance', desc: 'Theme, Font' },
];

export default function SettingsMenu({ onNavigate }: SettingsMenuProps) {
  return (
    <ul className={styles.settingsMenu} role="list">
      {MENU_ITEMS.map((item) => (
        <li
          key={item.key}
          className={styles.settingsMenu__item}
          role="button"
          tabIndex={0}
          onClick={() => onNavigate(item.key)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onNavigate(item.key);
            }
          }}
        >
          <div>
            <span className={styles.settingsMenu__label}>{item.label}</span>
            <span className={styles.settingsMenu__desc}>{item.desc}</span>
          </div>
          <svg
            className={styles.settingsMenu__arrow}
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
        </li>
      ))}
    </ul>
  );
}
