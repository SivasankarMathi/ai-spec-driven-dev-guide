import React, { createContext, useContext, useEffect, useState } from 'react';
import type { Database } from 'sql.js';
import { initDatabase } from '../db/database';

interface DatabaseContextType {
  db: Database | null;
  isLoading: boolean;
}

const DatabaseContext = createContext<DatabaseContextType>({
  db: null,
  isLoading: true,
});

export function useDatabase() {
  return useContext(DatabaseContext);
}

export function DatabaseProvider({ children }: { children: React.ReactNode }) {
  const [db, setDb] = useState<Database | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    initDatabase()
      .then((database) => {
        setDb(database);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error('Failed to initialize database:', err);
        setError(err instanceof Error ? err.message : 'Failed to initialize database');
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        fontFamily: 'var(--font-family)',
        color: 'var(--color-text-secondary)',
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: 40,
            height: 40,
            border: '3px solid var(--color-border)',
            borderTopColor: 'var(--color-primary)',
            borderRadius: '50%',
            animation: 'spin 0.8s linear infinite',
            margin: '0 auto 16px',
          }} />
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          <p>Loading database...</p>
        </div>
      </div>
    );
  }

  if (error || !db) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        fontFamily: 'var(--font-family)',
        color: 'var(--color-text-secondary)',
      }}>
        <div style={{ textAlign: 'center', maxWidth: 400, padding: '0 24px' }}>
          <p style={{ fontSize: 18, fontWeight: 600, color: 'var(--color-danger, #e53e3e)', marginBottom: 8 }}>
            Database Error
          </p>
          <p style={{ marginBottom: 16 }}>
            {error || 'Could not initialize the database.'}
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: '10px 24px',
              background: 'var(--color-primary, #3b82f6)',
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              cursor: 'pointer',
              fontSize: 14,
            }}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <DatabaseContext.Provider value={{ db, isLoading }}>
      {children}
    </DatabaseContext.Provider>
  );
}
