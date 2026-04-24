# AI Spec-Driven Dev Guide

A reference repository demonstrating a **spec-first (OpenSpec) development workflow**, paired with a fully functional **Voice Notes** web app built with React + TypeScript + Vite and Syncfusion UI components.

---

## What This Project Is

This repo serves two purposes:

1. **A methodology guide** — showing how to structure software projects using OpenSpec: writing feature specs before any code, driving implementation from BDD-style scenarios, and keeping design artifacts alongside code.
2. **A working reference app** — `voice-notes-app/`, a browser-based voice note-taking application that demonstrates the spec-driven approach end-to-end.

---

## The Voice Notes App

A local-first, browser-based note-taking app. No backend, no cloud — all data lives in the browser via SQLite (sql.js WASM) persisted to IndexedDB.

**Core workflow:**
```
Record Voice → Transcribe (Web Speech API) → [Optional] AI Enhance → Save Note
```

### Key Features

| Feature | Description |
|---|---|
| **Authentication** | Sign-up / sign-in forms with validation; OAuth buttons (UI placeholder) |
| **Onboarding** | 4-slide carousel introducing the app; auto-advances and supports swipe/keyboard |
| **Home Dashboard** | Note grid with pinned/others sections, real-time search (300ms debounce), FAB menu |
| **Voice Recorder** | Modal with animated waveform, MM:SS timer, real-time transcription — audio is **never stored** |
| **Note Editor** | Syncfusion RichTextEditor, auto-save (2s inactivity), Ctrl+S manual save, tags, pin toggle |
| **Smart Write (AI)** | Sends note to OpenRouter GPT-4.1 for enhancement; accept or revert |
| **Settings** | Theme (Light/Dark/System), font size, profile edit — all persisted to SQLite |

### Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 + TypeScript |
| Build Tool | Vite 8 |
| UI Components | Syncfusion EJ2 React (v33) |
| Routing | React Router DOM v7 |
| Database | sql.js (SQLite WASM) → IndexedDB |
| Voice | Web Speech API (browser-native) |
| AI | OpenRouter API — GPT-4.1 |

> **Browser support note:** Voice transcription works best in Chrome and Edge (Web Speech API coverage).

---

## Repository Structure

```
ai-spec-driven-dev-guide/
├── front-end-design/          # Static HTML/CSS/JS UI prototypes (pixel-perfect design source)
│   ├── auth/                  # Sign-in / sign-up screens
│   ├── onboarding/            # Onboarding carousel
│   ├── home/                  # Home dashboard
│   ├── note/                  # Voice recorder modal + note editor
│   └── settings/              # Settings screens
│
├── openspec/                  # Spec-driven workflow artifacts
│   ├── config.yaml            # OpenSpec configuration
│   ├── specs/                 # Feature specifications (BDD-style)
│   │   ├── app-shell/         # React Router, theme, layout, DB context
│   │   ├── auth-flow/         # Sign-up, sign-in, OAuth, sessions
│   │   ├── home-dashboard/    # Note grid, search, sidebar, FAB
│   │   ├── note-editor/       # Rich text editor, tags, auto-save, Smart Write
│   │   ├── voice-recorder/    # Audio capture, waveform, transcription
│   │   ├── settings-management/ # Appearance, profile, preferences
│   │   ├── onboarding/        # Welcome slides and intro flow
│   │   ├── data-persistence/  # SQLite schema, IndexedDB, migrations
│   │   └── smart-write-ai/    # AI text refinement via external API
│   └── changes/               # Change proposals and archived design decisions
│
├── voice-notes-app/           # React + TypeScript reference implementation
│   ├── src/
│   │   ├── components/        # Reusable UI components
│   │   ├── pages/             # Route-level page components
│   │   ├── contexts/          # React contexts (DB, auth, settings, etc.)
│   │   ├── hooks/             # Custom React hooks
│   │   ├── services/          # AI and external service integrations
│   │   ├── db/                # SQLite schema and query helpers
│   │   ├── types/             # TypeScript type definitions
│   │   ├── styles/            # Global styles and design tokens
│   │   ├── utils/             # Shared utility functions
│   │   ├── App.tsx            # Root component and router setup
│   │   └── main.tsx           # App entry point
│   ├── .env.example           # Environment variable template
│   ├── package.json
│   ├── vite.config.ts
│   └── tsconfig.json
│
├── REQUIREMENTS.md            # Full product requirements document
└── README.md                  # This file
```

---

## Quick Start

### Prerequisites
- Node.js (LTS recommended)
- `npm` or `pnpm`

### Run Locally

```bash
cd voice-notes-app
npm install
npm run dev
```

App runs at `http://localhost:5173` by default.

### Enable AI Features (optional)

Copy the example env file and add your OpenRouter API key:

```bash
cp voice-notes-app/.env.example voice-notes-app/.env
# then edit .env and set VITE_OPENROUTER_API_KEY=your_key_here
```

### Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Type-check + production build |
| `npm run preview` | Preview the production build locally |

---

## How the Spec-Driven Workflow Works

The `openspec/specs/` directory is the source of truth for feature behavior. Each subfolder contains a `spec.md` file written in **BDD format**:

- **Requirements** — What the feature SHALL do (declarative, testable).
- **Scenarios** — Given/When/Then examples showing exact expected behavior.

**The workflow:**
1. Write or update a spec in `openspec/specs/<feature>/spec.md`
2. Review the static design in `front-end-design/<screen>/`
3. Implement the feature in `voice-notes-app/src/` guided by the spec
4. Archive change proposals in `openspec/changes/`

This ensures every feature is intentional, documented, and verifiable before a line of code is written.

---

## Database Schema

Five SQLite tables stored in the browser via IndexedDB:

| Table | Key Columns |
|---|---|
| `users` | id, name, email, password_hash, avatar_url, created_at |
| `notes` | id, user_id, title, content, is_pinned, created_at, updated_at |
| `tags` | id, name, color |
| `note_tags` | note_id, tag_id (many-to-many join) |
| `settings` | user_id, theme, font_size |

---

## Constraints & Known Limitations

- **Local only** — No cloud sync. Clearing browser data will erase all notes.
- **OAuth** — Google/Microsoft buttons are UI placeholders; no real OAuth is implemented.
- **Voice transcription** — Requires Chrome or Edge (Web Speech API).
- **Checklist notes** — UI placeholder only; not yet implemented.

---

## Further Reading

- [`REQUIREMENTS.md`](REQUIREMENTS.md) — Full product requirements document
- [`openspec/specs/`](openspec/specs/) — All feature specifications
- [`front-end-design/`](front-end-design/) — Static design prototypes for every screen
- [`openspec/changes/`](openspec/changes/) — Archived change proposals and design decisions
