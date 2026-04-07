import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { useDatabase } from './DatabaseContext';
import { useAuth } from './AuthContext';
import * as settingsRepo from '../db/repositories/settingsRepository';
import type { Settings } from '../types';

interface SettingsContextType {
  theme: Settings['theme'];
  fontSize: Settings['font_size'];
  setTheme: (theme: Settings['theme']) => void;
  setFontSize: (size: Settings['font_size']) => void;
}

const SettingsContext = createContext<SettingsContextType>({
  theme: 'light',
  fontSize: 'small',
  setTheme: () => {},
  setFontSize: () => {},
});

export function useSettings() {
  return useContext(SettingsContext);
}

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const { db } = useDatabase();
  const { user } = useAuth();
  const [theme, setThemeState] = useState<Settings['theme']>(
    () => (localStorage.getItem('SyncNotess_theme') as Settings['theme']) || 'light',
  );
  const [fontSize, setFontSizeState] = useState<Settings['font_size']>(
    () => (localStorage.getItem('SyncNotess_font_size') as Settings['font_size']) || 'small',
  );

  // Load settings from DB when user logs in
  useEffect(() => {
    if (!db || !user) return;
    const settings = settingsRepo.getSettings(db, user.id);
    setThemeState(settings.theme);
    setFontSizeState(settings.font_size);
    localStorage.setItem('SyncNotess_theme', settings.theme);
    localStorage.setItem('SyncNotess_font_size', settings.font_size);
  }, [db, user]);

  // Apply theme to document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const setTheme = useCallback((newTheme: Settings['theme']) => {
    setThemeState(newTheme);
    localStorage.setItem('SyncNotess_theme', newTheme);
    if (db && user) {
      settingsRepo.updateTheme(db, user.id, newTheme);
    }
  }, [db, user]);

  const setFontSize = useCallback((newSize: Settings['font_size']) => {
    setFontSizeState(newSize);
    localStorage.setItem('SyncNotess_font_size', newSize);
    if (db && user) {
      settingsRepo.updateFontSize(db, user.id, newSize);
    }
  }, [db, user]);

  return (
    <SettingsContext.Provider value={{ theme, fontSize, setTheme, setFontSize }}>
      {children}
    </SettingsContext.Provider>
  );
}
