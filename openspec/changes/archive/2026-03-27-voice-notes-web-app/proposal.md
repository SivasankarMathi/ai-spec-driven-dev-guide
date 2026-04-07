## Why

There is no existing web application for voice-based note taking. Users need a local-first app that lets them record voice, transcribe it to text via the Web Speech API, optionally enhance notes with AI (OpenRouter GPT-4.1), and manage notes — all from a browser. The full UI design already exists in `front-end-design/` and must be replicated exactly using Syncfusion React components with TypeScript. The workflow is: Record → Review Text → (optional) Enhance with AI → Review Enhanced → Save.

## What Changes

- **New React + TypeScript web application** scaffolded with Vite, using Syncfusion UI components to replicate the existing HTML/CSS designs pixel-for-pixel.
- **SQLite database** (via `sql.js` or `better-sqlite3` with a local backend) for persistent local storage of users, notes, tags, and settings.
- **Authentication flow**: Sign-up, sign-in, and OAuth placeholder screens matching `front-end-design/auth/`.
- **Onboarding carousel**: Splash + 3 feature slides matching `front-end-design/onboarding/`.
- **Home dashboard**: Sidebar/bottom-nav layout, search, pinned/other note sections, FAB with voice/text/checklist actions matching `front-end-design/home/`.
- **Voice recorder modal**: Waveform visualization, timer, stop/retake/create-note controls matching `front-end-design/note/recorder.*`. Uses Web Speech API (`SpeechRecognition`) for live transcription — no audio files are stored.
- **Note editor**: Title, content (Syncfusion Rich Text Editor), tags, Smart Write toggle, pin, share, and auto-save matching `front-end-design/note/editor.*`.
- **Smart Write (AI enhance)**: When the Smart Write toggle is enabled and the user clicks Enhance, the current note text is sent to OpenRouter (GPT-4.1) and the enhanced version is shown for review before saving. Model and API key are configurable via `.env`.
- **Settings pages**: Profile, appearance (theme/font), change-password modal matching `front-end-design/settings/`.
- **No voice storage**: Voice recordings are ephemeral — used only for real-time transcription, never persisted.

## Capabilities

### New Capabilities
- `auth-flow`: Sign-up, sign-in forms with validation, OAuth button placeholders, and navigation between auth screens.
- `onboarding`: Multi-slide onboarding carousel with splash screen, feature slides, pagination, and "Get Started" navigation.
- `home-dashboard`: Home page with sidebar, bottom nav, search, note tabs (Notes/Checklist), pinned/other note grids, and FAB menu.
- `voice-recorder`: Recorder modal with Web Speech API transcription, waveform visualization, timer, stop/retake/create-note flow.
- `note-editor`: Rich text note editor with title, tags, Smart Write toggle, pin, share, auto-save, and Syncfusion RTE integration.
- `smart-write-ai`: AI enhancement feature using OpenRouter GPT-4.1 to rewrite/enhance note content, triggered via Smart Write toggle + Enhance button.
- `data-persistence`: SQLite-based local storage for users, notes, tags, and settings with CRUD operations.
- `settings-management`: Settings page with profile editing, appearance (theme/font), change-password modal, and logout.
- `app-shell`: Top-level app layout with React Router, sidebar, bottom nav, responsive design, and Syncfusion theme integration.

### Modified Capabilities
<!-- None — this is a greenfield project. -->

## Impact

- **New project**: Entire React + TypeScript codebase will be created from scratch.
- **Dependencies**: Vite, React 18+, TypeScript, Syncfusion React components (`@syncfusion/ej2-react-*`), `sql.js` (SQLite in browser), React Router, OpenRouter API client.
- **Environment config**: `.env` file for `VITE_OPENROUTER_API_KEY` and `VITE_OPENROUTER_MODEL` (default `openai/gpt-4.1`).
- **Browser APIs**: Web Speech API (`SpeechRecognition`), Clipboard API, Web Share API.
- **No backend server**: Fully client-side with SQLite running in the browser via WASM (`sql.js`). Data persists in IndexedDB.
