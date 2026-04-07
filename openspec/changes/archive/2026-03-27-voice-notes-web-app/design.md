## Context

This is a greenfield project. The complete UI design exists as static HTML/CSS/JS prototypes in `front-end-design/` covering: authentication, onboarding, home dashboard, voice recorder, note editor, and settings. The goal is to build a production React + TypeScript web app that replicates these designs exactly using Syncfusion components, with SQLite for local persistence and OpenRouter for AI enhancement.

The app is local-first — no backend server. SQLite runs in the browser via `sql.js` (WASM), persisted to IndexedDB. Voice is ephemeral: the Web Speech API transcribes in real-time but no audio files are stored.

Key stakeholders: end users who want a simple voice-to-note workflow: Record → Review Text → (optionally) Enhance with AI → Review Enhanced → Save.

## Goals / Non-Goals

**Goals:**
- Pixel-perfect replication of all `front-end-design/` screens using Syncfusion React components
- Fully client-side app with SQLite (sql.js) persistence in IndexedDB
- Voice transcription via Web Speech API (no audio storage)
- AI note enhancement via OpenRouter GPT-4.1 with configurable API key/model in `.env`
- Responsive design: mobile-first with sidebar on desktop, bottom nav on mobile
- Settings persistence (theme, font, profile) in SQLite

**Non-Goals:**
- Multi-user collaboration or real-time sync
- Backend server or cloud database
- Storing voice recordings / audio files
- OAuth provider integration (buttons are UI-only placeholders)
- Offline AI enhancement (requires network for OpenRouter)
- Checklist feature implementation (UI placeholder only for v1)
- PWA / service worker

## Decisions

### 1. Build Tool: Vite + React 18 + TypeScript
**Choice**: Vite with React 18 and TypeScript.
**Why**: Fast HMR, first-class TS support, lightweight. Alternatives considered: CRA (deprecated), Next.js (overkill for client-only app with no SSR needs).

### 2. UI Library: Syncfusion React Components
**Choice**: `@syncfusion/ej2-react-*` components.
**Why**: Requirement from stakeholder. Syncfusion provides rich text editor, form inputs, buttons, toggles, dropdowns, dialogs, and tab components that map well to the design. The Syncfusion RTE will be used for the note editor content area.

Key Syncfusion component mappings:
- `TextBoxComponent` → form inputs (auth, settings)
- `ButtonComponent` → primary/secondary buttons
- `SwitchComponent` → Smart Write toggle
- `RichTextEditorComponent` → note content editor
- `TabComponent` → Notes/Checklist tabs
- `DialogComponent` → recorder modal, change-password modal
- `DropDownListComponent` → theme/font selectors
- `AppBarComponent` → top bars
- `SidebarComponent` → desktop sidebar

### 3. Database: sql.js (SQLite in browser via WASM)
**Choice**: `sql.js` with IndexedDB persistence.
**Why**: User requires SQLite for local-first storage. `sql.js` compiles SQLite to WASM and runs entirely in-browser. Data is serialized to IndexedDB for persistence across browser sessions. Alternatives considered: `better-sqlite3` (Node.js only, would need backend), localStorage (size limits, no relational queries), IndexedDB directly (complex query patterns without SQL).

**Data persists across browser restarts** because we explicitly save the SQLite database binary to IndexedDB after each write operation.

Schema:
```sql
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  avatar_url TEXT,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE notes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL REFERENCES users(id),
  title TEXT NOT NULL DEFAULT '',
  content TEXT NOT NULL DEFAULT '',
  is_pinned INTEGER DEFAULT 0,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE tags (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  color TEXT NOT NULL DEFAULT 'yellow'
);

CREATE TABLE note_tags (
  note_id INTEGER NOT NULL REFERENCES notes(id) ON DELETE CASCADE,
  tag_id INTEGER NOT NULL REFERENCES tags(id) ON DELETE CASCADE,
  PRIMARY KEY (note_id, tag_id)
);

CREATE TABLE settings (
  user_id INTEGER PRIMARY KEY REFERENCES users(id),
  theme TEXT DEFAULT 'light',
  font_size TEXT DEFAULT 'small'
);
```

### 4. Voice Transcription: Web Speech API
**Choice**: Browser-native `SpeechRecognition` (or `webkitSpeechRecognition`).
**Why**: No server needed, works locally, free. The recorder modal uses `SpeechRecognition` with `continuous = true` and `interimResults = true` to show live transcription. When the user stops recording and clicks "Create Note", the final transcript is passed to the editor.

No audio is stored — transcription is the only output.

### 5. AI Enhancement: OpenRouter API
**Choice**: Direct fetch to `https://openrouter.ai/api/v1/chat/completions` with model `openai/gpt-4.1`.
**Why**: User specified OpenRouter as the provider and GPT-4.1 as the model. Configuration via `.env`:
```
VITE_OPENROUTER_API_KEY=your-key-here
VITE_OPENROUTER_MODEL=openai/gpt-4.1
```

The Smart Write flow:
1. User enables Smart Write toggle in the editor
2. An "Enhance" button appears
3. User clicks Enhance → current note content is sent to OpenRouter with a system prompt: "Rewrite and enhance the following note. Improve clarity, grammar, and structure while preserving the original meaning."
4. Enhanced text is shown in the editor for review
5. User can accept (save) or revert to original

### 6. Routing: React Router v6
**Choice**: `react-router-dom` v6 with `BrowserRouter`.
**Why**: Standard React routing. Routes:
- `/` → redirect to `/onboarding` (first visit) or `/home`
- `/onboarding` → onboarding carousel
- `/auth/signup` → sign-up form
- `/auth/signin` → sign-in form
- `/home` → home dashboard
- `/note/new` → new text note editor
- `/note/record` → recorder modal (overlay on home)
- `/note/:id` → edit existing note
- `/settings` → settings main
- `/settings/profile` → profile sub-view
- `/settings/appearance` → appearance sub-view

### 7. State Management: React Context + useReducer
**Choice**: React Context API with `useReducer` for global state.
**Why**: App state is simple (current user, notes list, settings). No need for Redux or Zustand. Contexts:
- `AuthContext` — current user, login/logout
- `NotesContext` — notes CRUD, search, filter
- `SettingsContext` — theme, font size
- `DatabaseContext` — sql.js database instance

### 8. Project Structure
```
src/
├── components/          # Reusable UI components
│   ├── auth/            # AuthCard, SignUpForm, SignInForm, OAuthButtons
│   ├── home/            # Sidebar, BottomNav, SearchBar, NoteCard, FAB
│   ├── note/            # EditorTopBar, TagList, RecorderModal, Waveform
│   ├── onboarding/      # OnboardingSlide, PhoneMockup, Pagination
│   ├── settings/        # UserCard, SettingsMenu, ProfileView, AppearanceView
│   └── ui/              # Button, Toggle, Divider, FormGroup (shared)
├── contexts/            # AuthContext, NotesContext, SettingsContext, DatabaseContext
├── hooks/               # useAuth, useNotes, useSpeechRecognition, useSmartWrite
├── db/                  # sql.js setup, migrations, repository functions
├── pages/               # Route-level page components
├── services/            # OpenRouter API client
├── styles/              # Global CSS variables, Syncfusion theme overrides
├── types/               # TypeScript interfaces
├── utils/               # Validation, date formatting, etc.
├── App.tsx
└── main.tsx
```

### 9. Styling Strategy
**Choice**: CSS Modules + Syncfusion theme customization + global CSS variables.
**Why**: The designs use a specific design token system (CSS custom properties). We'll define global variables matching the design tokens in `front-end-design/`, then use CSS Modules per component for scoped styles. Syncfusion theme is customized via their SASS variable overrides to match the blue primary color `#2D5BFF`.

## Risks / Trade-offs

- **[Web Speech API browser support]** → Not available in all browsers (works in Chrome, Edge; limited in Firefox/Safari). Mitigation: show a "browser not supported" message if `SpeechRecognition` is unavailable. Degrade gracefully to text-only note creation.

- **[sql.js WASM bundle size]** → sql.js adds ~1MB to the initial load. Mitigation: lazy-load the WASM binary; show a loading spinner during database initialization.

- **[IndexedDB data loss]** → Users clearing browser data will lose all notes. Mitigation: document this limitation; in v2, add JSON export/import. This is acceptable per requirement (local-only app).

- **[OpenRouter API key in client]** → The API key is exposed in client-side code. Mitigation: acceptable for local/personal use; the `.env` keeps it out of version control. For production, would need a proxy server (out of scope).

- **[Syncfusion license]** → Syncfusion requires a license for production use (free community license available for small companies). Mitigation: use community license; register key in `main.tsx`.

- **[No real OAuth]** → OAuth buttons are UI placeholders only. Mitigation: clearly document; local auth uses simple email/password stored in SQLite with hashed passwords (`bcrypt` or similar client-side hashing).
