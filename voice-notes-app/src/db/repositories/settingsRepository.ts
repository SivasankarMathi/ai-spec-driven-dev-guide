import type { Database } from 'sql.js';
import { saveToIndexedDB } from '../database';
import type { Settings } from '../../types';

export function getSettings(db: Database, userId: number): Settings {
  const result = db.exec(
    'SELECT user_id, theme, font_size FROM settings WHERE user_id = ?',
    [userId],
  );
  if (result.length === 0 || result[0].values.length === 0) {
    // Create default settings if they don't exist
    db.run('INSERT OR IGNORE INTO settings (user_id) VALUES (?)', [userId]);
    saveToIndexedDB(db);
    return {
      user_id: userId,
      theme: 'light',
      font_size: 'small',
    };
  }

  const row = result[0].values[0];
  return {
    user_id: row[0] as number,
    theme: (row[1] as string) as Settings['theme'],
    font_size: (row[2] as string) as Settings['font_size'],
  };
}

export function updateTheme(
  db: Database,
  userId: number,
  theme: Settings['theme'],
): void {
  db.run('UPDATE settings SET theme = ? WHERE user_id = ?', [theme, userId]);
  saveToIndexedDB(db);
}

export function updateFontSize(
  db: Database,
  userId: number,
  fontSize: Settings['font_size'],
): void {
  db.run('UPDATE settings SET font_size = ? WHERE user_id = ?', [fontSize, userId]);
  saveToIndexedDB(db);
}
