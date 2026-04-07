import styles from './home.module.css';

export default function ContentTabs() {
  return (
    <div className={styles.contentTabs}>
      <span className={`${styles.contentTabs__tab} ${styles.contentTabs__tabActive}`}>
        Notes
      </span>
    </div>
  );
}
