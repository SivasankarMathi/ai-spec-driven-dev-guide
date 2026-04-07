import { useState, useEffect, useRef, useCallback } from 'react';
import styles from './home.module.css';

interface SearchBarProps {
  onSearch: (query: string) => void;
  username?: string;
}

export default function SearchBar({ onSearch, username }: SearchBarProps) {
  const [value, setValue] = useState('');
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const onSearchRef = useRef(onSearch);
  onSearchRef.current = onSearch;

  const debouncedSearch = useCallback((query: string) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      onSearchRef.current(query);
    }, 300);
  }, []);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setValue(query);
    debouncedSearch(query);
  };

  return (
    <div className={styles.topBar}>
      <div className={styles.searchBar}>
        <input
          type="text"
          className={styles.searchBar__input}
          placeholder="Search notes..."
          value={value}
          onChange={handleChange}
        />
        <svg
          className={styles.searchBar__icon}
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      </div>
      {/* Welcome note removed as requested */}
    </div>
  );
}
