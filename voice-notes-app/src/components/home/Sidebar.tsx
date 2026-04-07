import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './home.module.css';

const STORAGE_KEY = 'SyncNotess_sidebar_collapsed';

interface SidebarProps {
  collapsed?: boolean;
  onToggle?: (collapsed: boolean) => void;
}

export default function Sidebar({ collapsed: controlledCollapsed, onToggle }: SidebarProps) {
  const [internalCollapsed, setInternalCollapsed] = useState(() => {
    return localStorage.getItem(STORAGE_KEY) === 'true';
  });

  const collapsed = controlledCollapsed ?? internalCollapsed;

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, String(collapsed));
  }, [collapsed]);

  const handleToggle = () => {
    const next = !collapsed;
    setInternalCollapsed(next);
    onToggle?.(next);
  };

  return (
    <aside className={`${styles.sidebar} ${collapsed ? styles.sidebarCollapsed : ''}`}>
      <div className={styles.sidebar__header}>
        <div className={styles.sidebar__brand}>
          <span className={styles.sidebar__logo}>SyncNotes</span>
        </div>
        <button className={styles.sidebar__toggle} onClick={handleToggle} aria-label="Toggle sidebar">
          <svg
            className={styles.sidebar__toggleIcon}
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
      </div>

      <nav className={styles.sidebar__nav}>
        <NavLink
          to="/home"
          className={({ isActive }) =>
            `${styles.sidebar__link} ${isActive ? styles.sidebar__linkActive : ''}`
          }
        >
          <svg
            className={styles.sidebar__icon}
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
          <span className={styles.sidebar__label}>Home</span>
        </NavLink>

        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `${styles.sidebar__link} ${isActive ? styles.sidebar__linkActive : ''}`
          }
        >
          <svg
            className={styles.sidebar__icon}
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
          </svg>
          <span className={styles.sidebar__label}>Settings</span>
        </NavLink>
      </nav>
    </aside>
  );
}
