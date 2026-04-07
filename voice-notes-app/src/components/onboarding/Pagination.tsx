import styles from './onboarding.module.css';

interface PaginationProps {
  total: number;
  current: number;
  onDotClick: (index: number) => void;
}

export default function Pagination({ total, current, onDotClick }: PaginationProps) {
  return (
    <div className={styles.pagination}>
      {Array.from({ length: total }, (_, i) => (
        <button
          key={i}
          type="button"
          className={`${styles.pagination__dot} ${i === current ? styles['pagination__dot--active'] : ''}`}
          onClick={() => onDotClick(i)}
          aria-label={`Go to slide ${i + 1}`}
        />
      ))}
    </div>
  );
}
