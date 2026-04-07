import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNotes } from '../contexts/NotesContext';
import { useAuth } from '../contexts/AuthContext';
import Sidebar from '../components/home/Sidebar';
import BottomNav from '../components/home/BottomNav';
import SearchBar from '../components/home/SearchBar';
import ContentTabs from '../components/home/ContentTabs';
import NoteGrid from '../components/home/NoteGrid';
import FAB from '../components/home/FAB';
import type { Note } from '../types';
import styles from '../components/home/home.module.css';

export default function HomePage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { pinnedNotes, otherNotes, setSearchQuery, togglePin } = useNotes();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
    return localStorage.getItem('SyncNotess_sidebar_collapsed') === 'true';
  });

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, [setSearchQuery]);

  const handleNoteClick = useCallback((note: Note) => {
    navigate(`/note/${note.id}`);
  }, [navigate]);

  const handleVoice = useCallback(() => {
    navigate('/note/record');
  }, [navigate]);

  const handleText = useCallback(() => {
    navigate('/note/new');
  }, [navigate]);

  return (
    <div className={styles.appLayout}>
      <Sidebar collapsed={sidebarCollapsed} onToggle={setSidebarCollapsed} />

      <main className={`${styles.mainContent} ${sidebarCollapsed ? styles.mainContentCollapsed : ''}`}>
        <SearchBar onSearch={handleSearch} username={user?.name} />
        <ContentTabs />

        <div className={`${styles.contentPanel} ${styles.contentPanelActive}`}>
          <NoteGrid
            pinnedNotes={pinnedNotes}
            otherNotes={otherNotes}
            onNoteClick={handleNoteClick}
            onTogglePin={togglePin}
          />
        </div>

        <FAB
          onVoice={handleVoice}
          onText={handleText}
        />
      </main>

      <BottomNav />
    </div>
  );
}
