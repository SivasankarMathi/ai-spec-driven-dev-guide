import type { User } from '../../types';
import styles from './settings.module.css';

interface UserCardProps {
  user: User;
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export default function UserCard({ user }: UserCardProps) {
  return (
    <div className={styles.userCard}>
      <div className={styles.userCard__avatar}>
        {user.avatar_url ? (
          <img src={user.avatar_url} alt={user.name} className={styles.userCard__img} />
        ) : (
          getInitials(user.name)
        )}
      </div>
      <div>
        <h3 className={styles.userCard__name}>{user.name}</h3>
        <p className={styles.userCard__email}>{user.email}</p>
      </div>
    </div>
  );
}
