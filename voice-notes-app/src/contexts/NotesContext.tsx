import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { useDatabase } from './DatabaseContext';
import { useAuth } from './AuthContext';
import * as noteRepo from '../db/repositories/noteRepository';
import type { Note } from '../types';

interface NotesContextType {
  notes: Note[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filteredNotes: Note[];
  pinnedNotes: Note[];
  otherNotes: Note[];
  createNote: (title: string, content: string) => Note | null;
  updateNote: (noteId: number, title: string, content: string) => void;
  deleteNote: (noteId: number) => void;
  togglePin: (noteId: number) => void;
  getNoteById: (noteId: number) => Note | null;
  refreshNotes: () => void;
}

const NotesContext = createContext<NotesContextType>({
  notes: [],
  searchQuery: '',
  setSearchQuery: () => {},
  filteredNotes: [],
  pinnedNotes: [],
  otherNotes: [],
  createNote: () => null,
  updateNote: () => {},
  deleteNote: () => {},
  togglePin: () => {},
  getNoteById: () => null,
  refreshNotes: () => {},
});

export function useNotes() {
  return useContext(NotesContext);
}

export function NotesProvider({ children }: { children: React.ReactNode }) {
  const { db } = useDatabase();
  const { user } = useAuth();
  const [notes, setNotes] = useState<Note[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const refreshNotes = useCallback(() => {
    if (!db || !user) {
      setNotes([]);
      return;
    }
    const allNotes = noteRepo.getAll(db, user.id);
    setNotes(allNotes);
  }, [db, user]);

  useEffect(() => {
    refreshNotes();
  }, [refreshNotes]);

  const filteredNotes = searchQuery.trim()
    ? notes.filter((note) => {
        const query = searchQuery.toLowerCase();
        return (
          note.title.toLowerCase().includes(query) ||
          note.content.toLowerCase().includes(query)
        );
      })
    : notes;

  const pinnedNotes = filteredNotes.filter((n) => n.is_pinned === 1);
  const otherNotes = filteredNotes.filter((n) => n.is_pinned === 0);

  const createNote = useCallback((title: string, content: string): Note | null => {
    if (!db || !user) return null;
    const note = noteRepo.createNote(db, user.id, title, content);
    refreshNotes();
    return note;
  }, [db, user, refreshNotes]);

  const updateNote = useCallback((noteId: number, title: string, content: string) => {
    if (!db) return;
    noteRepo.updateNote(db, noteId, title, content);
    refreshNotes();
  }, [db, refreshNotes]);

  const deleteNote = useCallback((noteId: number) => {
    if (!db) return;
    noteRepo.deleteNote(db, noteId);
    refreshNotes();
  }, [db, refreshNotes]);

  const togglePin = useCallback((noteId: number) => {
    if (!db) return;
    noteRepo.togglePin(db, noteId);
    refreshNotes();
  }, [db, refreshNotes]);

  const getNoteById = useCallback((noteId: number): Note | null => {
    if (!db) return null;
    return noteRepo.getById(db, noteId);
  }, [db]);

  return (
    <NotesContext.Provider value={{
      notes,
      searchQuery,
      setSearchQuery,
      filteredNotes,
      pinnedNotes,
      otherNotes,
      createNote,
      updateNote,
      deleteNote,
      togglePin,
      getNoteById,
      refreshNotes,
    }}>
      {children}
    </NotesContext.Provider>
  );
}
