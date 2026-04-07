import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { useDatabase } from './DatabaseContext';
import * as userRepo from '../db/repositories/userRepository';
import type { User, AuthState } from '../types';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateUsername: (newName: string) => void;
  changePassword: (currentPassword: string, newPassword: string) => Promise<{ success: boolean; error?: string }>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => ({ success: false }),
  register: async () => ({ success: false }),
  logout: () => {},
  updateUsername: () => {},
  changePassword: async () => ({ success: false }),
});

export function useAuth() {
  return useContext(AuthContext);
}

// Simple hash function for client-side password hashing (not production-grade)
async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { db } = useDatabase();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Restore session from localStorage
    const savedUserId = localStorage.getItem('SyncNotess_user_id');
    if (savedUserId && db) {
      const foundUser = userRepo.findById(db, parseInt(savedUserId, 10));
      if (foundUser) {
        setUser(foundUser);
      }
    }
    setIsLoading(false);
  }, [db]);

  const login = useCallback(async (email: string, password: string) => {
    if (!db) return { success: false, error: 'Database not ready' };

    const foundUser = userRepo.findByEmail(db, email);
    if (!foundUser) {
      return { success: false, error: 'No account found with that email' };
    }

    const hash = await hashPassword(password);
    if (foundUser.password_hash !== hash) {
      return { success: false, error: 'Incorrect password' };
    }

    setUser(foundUser);
    localStorage.setItem('SyncNotess_user_id', String(foundUser.id));
    return { success: true };
  }, [db]);

  const register = useCallback(async (name: string, email: string, password: string) => {
    if (!db) return { success: false, error: 'Database not ready' };

    const existing = userRepo.findByEmail(db, email);
    if (existing) {
      return { success: false, error: 'An account with this email already exists' };
    }

    const hash = await hashPassword(password);
    const newUser = userRepo.createUser(db, name, email, hash);
    setUser(newUser);
    localStorage.setItem('SyncNotess_user_id', String(newUser.id));
    return { success: true };
  }, [db]);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('SyncNotess_user_id');
  }, []);

  const updateUsername = useCallback((newName: string) => {
    if (!db || !user) return;
    userRepo.updateUsername(db, user.id, newName);
    setUser({ ...user, name: newName });
  }, [db, user]);

  const changePassword = useCallback(async (currentPassword: string, newPassword: string) => {
    if (!db || !user) return { success: false, error: 'Not authenticated' };

    const currentHash = await hashPassword(currentPassword);
    if (user.password_hash !== currentHash) {
      return { success: false, error: 'Current password is incorrect' };
    }

    const newHash = await hashPassword(newPassword);
    userRepo.updatePassword(db, user.id, newHash);
    setUser({ ...user, password_hash: newHash });
    return { success: true };
  }, [db, user]);

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      isLoading,
      login,
      register,
      logout,
      updateUsername,
      changePassword,
    }}>
      {children}
    </AuthContext.Provider>
  );
}
