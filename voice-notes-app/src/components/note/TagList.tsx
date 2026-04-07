import type { Tag } from '../../types';
import styles from './editor.module.css';

interface TagListProps {
  tags: Tag[];
  onAddTag: () => void;
  onRemoveTag: (tagId: number) => void;
}

function getTagColorClass(color: string): string {
  switch (color) {
    case 'blue':
      return styles.tagBlue;
    case 'yellow':
    default:
      return styles.tagYellow;
  }
}

export default function TagList({ tags, onAddTag, onRemoveTag }: TagListProps) {
  return (
    <div className={styles.tagList}>
      {tags.map((tag) => (
        <span key={tag.id} className={`${styles.tag} ${getTagColorClass(tag.color)}`}>
          {tag.name}
          <button
            className={styles.tagRemove}
            onClick={() => onRemoveTag(tag.id)}
            aria-label={`Remove tag ${tag.name}`}
          >
            ×
          </button>
        </span>
      ))}
      <button className={styles.tagAdd} onClick={onAddTag} aria-label="Add tag">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      </button>
    </div>
  );
}
