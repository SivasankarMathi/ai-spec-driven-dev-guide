import { useNavigate } from 'react-router-dom';
import styles from './settings.module.css';

interface SettingsMenuProps {
  onNavigate: (view: 'profile' | 'appearance') => void;
}

const MENU_ITEMS = [
  { key: 'profile' as const, label: 'Profile', desc: 'Avatar, Username, Email ID' },
  { key: 'appearance' as const, label: 'Appearance', desc: 'Theme, Font' },
  { key: 'about' as const, label: 'About', desc: 'App information and version' },
];

export default function SettingsMenu({ onNavigate }: SettingsMenuProps) {
  const navigate = useNavigate();

  const handleItemClick = (key: typeof MENU_ITEMS[number]['key']) => {
    if (key === 'about') {
      navigate('/about');
    } else {
      onNavigate(key);
    }
  };

  return (
    <ul className={styles.settingsMenu} role="list">
      {MENU_ITEMS.map((item) => (
        <li
          key={item.key}
          className={styles.settingsMenu__item}
          role="button"
          tabIndex={0}
          onClick={() => handleItemClick(item.key)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleItemClick(item.key);
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
