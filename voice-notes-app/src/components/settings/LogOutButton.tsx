import styles from './settings.module.css';

interface LogOutButtonProps {
  onLogout: () => void;
}

export default function LogOutButton({ onLogout }: LogOutButtonProps) {
  const handleClick = () => {
    if (window.confirm('Are you sure you want to log out?')) {
      onLogout();
    }
  };

  return (
    <button className={styles.logoutBtn} onClick={handleClick}>
      <svg
        className={styles.logoutBtn__icon}
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
        <polyline points="16 17 21 12 16 7" />
        <line x1="21" y1="12" x2="9" y2="12" />
      </svg>
      <span>Log Out</span>
    </button>
  );
}
