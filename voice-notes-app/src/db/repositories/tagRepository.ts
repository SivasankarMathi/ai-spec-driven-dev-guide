import type { Database } from 'sql.js';
import { saveToIndexedDB } from '../database';
import type { Tag } from '../../types';

function rowToTag(row: (string | number | null | Uint8Array)[]): Tag {
  return {
    id: row[0] as number,
    name: row[1] as string,
    color: row[2] as string,
  };
}

export function createTag(
  db: Database,
  name: string,
  color: string = 'yellow',
): Tag {
  db.run('INSERT INTO tags (name, color) VALUES (?, ?)', [name, color]);
  saveToIndexedDB(db);

  const result = db.exec('SELECT last_insert_rowid() as id');
  const tagId = result[0].values[0][0] as number;
  return getTagById(db, tagId)!;
}

export function getTagById(db: Database, tagId: number): Tag | null {
  const result = db.exec(
    'SELECT id, name, color FROM tags WHERE id = ?',
    [tagId],
  );
  if (result.length === 0 || result[0].values.length === 0) return null;
  return rowToTag(result[0].values[0]);
}

export function getAllTags(db: Database): Tag[] {
  const result = db.exec('SELECT id, name, color FROM tags');
  if (result.length === 0) return [];
  return result[0].values.map(rowToTag);
}

export function associateTag(
  db: Database,
  noteId: number,
  tagId: number,
): void {
  db.run(
    'INSERT OR IGNORE INTO note_tags (note_id, tag_id) VALUES (?, ?)',
    [noteId, tagId],
  );
  saveToIndexedDB(db);
}

export function dissociateTag(
  db: Database,
  noteId: number,
  tagId: number,
): void {
  db.run(
    'DELETE FROM note_tags WHERE note_id = ? AND tag_id = ?',
    [noteId, tagId],
  );
  saveToIndexedDB(db);
}

export function getTagsByNoteId(db: Database, noteId: number): Tag[] {
  const result = db.exec(
    'SELECT t.id, t.name, t.color FROM tags t INNER JOIN note_tags nt ON t.id = nt.tag_id WHERE nt.note_id = ?',
    [noteId],
  );
  if (result.length === 0) return [];
  return result[0].values.map(rowToTag);
}
