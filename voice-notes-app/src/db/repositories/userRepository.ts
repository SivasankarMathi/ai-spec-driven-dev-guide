import type { Database } from 'sql.js';
import { saveToIndexedDB } from '../database';
import type { User } from '../../types';

export function createUser(
  db: Database,
  name: string,
  email: string,
  passwordHash: string,
): User {
  db.run(
    'INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)',
    [name, email, passwordHash],
  );
  // Also create default settings for the new user
  const userId = (db.exec('SELECT last_insert_rowid() as id')[0].values[0][0]) as number;
  db.run('INSERT INTO settings (user_id) VALUES (?)', [userId]);
  saveToIndexedDB(db);

  return findByEmail(db, email)!;
}

export function findByEmail(db: Database, email: string): User | null {
  const result = db.exec(
    'SELECT id, name, email, password_hash, avatar_url, created_at FROM users WHERE email = ?',
    [email],
  );
  if (result.length === 0 || result[0].values.length === 0) return null;

  const row = result[0].values[0];
  return {
    id: row[0] as number,
    name: row[1] as string,
    email: row[2] as string,
    password_hash: row[3] as string,
    avatar_url: row[4] as string | null,
    created_at: row[5] as string,
  };
}

export function findById(db: Database, id: number): User | null {
  const result = db.exec(
    'SELECT id, name, email, password_hash, avatar_url, created_at FROM users WHERE id = ?',
    [id],
  );
  if (result.length === 0 || result[0].values.length === 0) return null;

  const row = result[0].values[0];
  return {
    id: row[0] as number,
    name: row[1] as string,
    email: row[2] as string,
    password_hash: row[3] as string,
    avatar_url: row[4] as string | null,
    created_at: row[5] as string,
  };
}

export function updatePassword(
  db: Database,
  userId: number,
  newPasswordHash: string,
): void {
  db.run('UPDATE users SET password_hash = ? WHERE id = ?', [newPasswordHash, userId]);
  saveToIndexedDB(db);
}

export function updateUsername(
  db: Database,
  userId: number,
  newName: string,
): void {
  db.run('UPDATE users SET name = ? WHERE id = ?', [newName, userId]);
  saveToIndexedDB(db);
}
