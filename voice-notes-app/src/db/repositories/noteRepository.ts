import type { Database } from 'sql.js';
import { saveToIndexedDB } from '../database';
import type { Note } from '../../types';

function rowToNote(row: (string | number | null | Uint8Array)[]): Note {
  return {
    id: row[0] as number,
    user_id: row[1] as number,
    title: row[2] as string,
    content: row[3] as string,
    is_pinned: row[4] as number,
    created_at: row[5] as string,
    updated_at: row[6] as string,
  };
}

export function createNote(
  db: Database,
  userId: number,
  title: string,
  content: string,
): Note {
  db.run(
    'INSERT INTO notes (user_id, title, content) VALUES (?, ?, ?)',
    [userId, title, content],
  );
  saveToIndexedDB(db);

  const result = db.exec('SELECT last_insert_rowid() as id');
  const noteId = result[0].values[0][0] as number;
  return getById(db, noteId)!;
}

export function getAll(db: Database, userId: number): Note[] {
  const result = db.exec(
    'SELECT id, user_id, title, content, is_pinned, created_at, updated_at FROM notes WHERE user_id = ? ORDER BY updated_at DESC',
    [userId],
  );
  if (result.length === 0) return [];
  return result[0].values.map(rowToNote);
}

export function getById(db: Database, noteId: number): Note | null {
  const result = db.exec(
    'SELECT id, user_id, title, content, is_pinned, created_at, updated_at FROM notes WHERE id = ?',
    [noteId],
  );
  if (result.length === 0 || result[0].values.length === 0) return null;
  return rowToNote(result[0].values[0]);
}

export function updateNote(
  db: Database,
  noteId: number,
  title: string,
  content: string,
): void {
  db.run(
    "UPDATE notes SET title = ?, content = ?, updated_at = datetime('now') WHERE id = ?",
    [title, content, noteId],
  );
  saveToIndexedDB(db);
}

export function deleteNote(db: Database, noteId: number): void {
  db.run('DELETE FROM note_tags WHERE note_id = ?', [noteId]);
  db.run('DELETE FROM notes WHERE id = ?', [noteId]);
  saveToIndexedDB(db);
}

export function togglePin(db: Database, noteId: number): void {
  db.run(
    "UPDATE notes SET is_pinned = CASE WHEN is_pinned = 1 THEN 0 ELSE 1 END, updated_at = datetime('now') WHERE id = ?",
    [noteId],
  );
  saveToIndexedDB(db);
}
