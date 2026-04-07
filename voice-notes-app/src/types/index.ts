export interface User {
  id: number;
  name: string;
  email: string;
  password_hash: string;
  avatar_url: string | null;
  created_at: string;
}

export interface Note {
  id: number;
  user_id: number;
  title: string;
  content: string;
  is_pinned: number;
  created_at: string;
  updated_at: string;
}

export interface Tag {
  id: number;
  name: string;
  color: string;
}

export interface NoteTag {
  note_id: number;
  tag_id: number;
}

export interface Settings {
  user_id: number;
  theme: 'light' | 'dark' | 'system';
  font_size: 'small' | 'medium' | 'large';
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
