# Voice Notes Web App - Basic Requirements

**Version:** 1.0  
**Date:** March 27, 2026

---

## 1. What It Is

A browser-based voice note-taking application that lets users:
- Record voice and get instant text transcription
- Optionally enhance notes with AI
- Manage notes locally (no server needed)

**Core Workflow:**
```
Record Voice → Review Text → [Optional] AI Enhance → Review Enhanced → Save
```

**Key Principle:** Local-first. Data stays in the browser using SQLite. Voice recordings are NOT stored — only the text is saved.

---

## 2. Technology Requirements

- **Frontend:** React 18 + TypeScript, built with Vite
- **UI Components:** Syncfusion React Components (for exact design match)
- **Database:** SQLite (via sql.js WASM) persisted to IndexedDB
- **Voice Transcription:** Web Speech API (browser-native)
- **AI Enhancement:** OpenRouter API with GPT-4.1 (configurable via `.env`)

---

## 3. Design Requirements

**Source:** All UI designs exist in `front-end-design/` folder as HTML/CSS/JS prototypes

**Requirement:** Replicate these designs **pixel-perfect** using Syncfusion React components:
- `front-end-design/auth/` → Authentication screens
- `front-end-design/onboarding/` → Onboarding carousel
- `front-end-design/home/` → Home dashboard
- `front-end-design/note/recorder.*` → Voice recorder modal
- `front-end-design/note/editor.*` → Note editor
- `front-end-design/settings/` → Settings screens

**Design Tokens:** Use CSS custom properties from designs (`--color-primary: #2D5BFF`, spacing, typography, etc.)

**Responsive:** Mobile-first with breakpoints at 768px (tablet) and 1024px (desktop)

---

## 4. Core Features

### 4.1 Authentication
- Sign-up form: Name, Email, Password, Confirm Password with validation
- Sign-in form: Email, Password with "Forgot password?" link
- OAuth buttons (Google/Microsoft) as UI placeholders
- Password visibility toggle (eye icon)
- Navigate between sign-up/sign-in via links

### 4.2 Onboarding
- 4-slide carousel: Splash → Voice Capture → AI Transcription → Note Template
- Auto-advance from splash after 2.5s
- Navigation: prev/next buttons, pagination dots, swipe (mobile), keyboard arrows
- "Get Started" button on last slide → go to auth

### 4.3 Home Dashboard
- **Desktop (≥1024px):** Sidebar with logo, nav links (Home/Settings), collapse toggle
- **Mobile (<1024px):** Bottom nav bar (Home/Settings icons)
- Search bar with 300ms debounce (filters by title/body)
- Note grid: Pinned section + Others section
- Note cards show: title, truncated body (3 lines), date, play icon
- FAB (floating action button) with menu: Voice recording, New text note, New checklist

### 4.4 Voice Recorder
- Modal: bottom sheet (mobile) or centered dialog (desktop/tablet)
- Auto-start recording on open
- Animated waveform visualization
- Timer in MM:SS format
- Web Speech API for real-time transcription (continuous mode)
- Controls: Stop button, Retake, Create Note (pre-fills editor with transcript)
- **CRITICAL:** Voice audio is NEVER stored, only text transcript

### 4.5 Note Editor
- Top bar: Back button, Pin toggle, AI Assist, Share/Copy, More menu
- Smart Write toggle + date display
- Tag list (colored pills) with add button
- Title input (borderless)
- Content editor using Syncfusion RichTextEditor
- Auto-save after 2s inactivity
- Manual save: Ctrl+S / Cmd+S with toast confirmation

### 4.6 Smart Write (AI Enhancement)
- When toggle ON → show "Enhance" button
- Click Enhance → send note to OpenRouter GPT-4.1 API
- Display enhanced text, allow accept or revert to original
- Loading state + error handling (missing API key, network errors)

### 4.7 Settings
- Main screen: User card (avatar, name, email), menu (Profile/Appearance), Log Out button
- Profile sub-view: Edit username, change password modal
- Appearance sub-view: Theme dropdown (Light/Dark/System), Font size dropdown (Small/Medium/Large)
- All settings saved to SQLite

---

## 5. Database

**SQLite Schema** (5 tables):
- `users`: id, name, email, password_hash, avatar_url, created_at
- `notes`: id, user_id, title, content, is_pinned, created_at, updated_at
- `tags`: id, name, color
- `note_tags`: note_id, tag_id (many-to-many)
- `settings`: user_id, theme, font_size

**Persistence:** Data saved to IndexedDB after every write, loads on app startup

---

## 6. Key Behaviors

- **Responsive:** Mobile-first, breakpoints at 768px (tablet) and 1024px (desktop)
- **Auto-save:** Notes save automatically after 2s of inactivity
- **Search:** Real-time filtering with 300ms debounce
- **Data durability:** Persists across browser restarts (IndexedDB)
- **No backend:** Fully client-side, no server required

---

## 7. Detailed Specifications

For complete implementation details, see archived openspec artifacts:
- **Proposal:** `openspec/changes/archive/2026-03-27-voice-notes-web-app/proposal.md`
- **Design:** `openspec/changes/archive/2026-03-27-voice-notes-web-app/design.md`
- **Specs:** `openspec/changes/archive/2026-03-27-voice-notes-web-app/specs/*/spec.md`
- **Tasks:** `openspec/changes/archive/2026-03-27-voice-notes-web-app/tasks.md`

---

## 8. Constraints

- Data is local-only (no cloud sync, clearing browser data = data loss)
- OAuth buttons are UI placeholders (no real OAuth)
- Web Speech API not supported in all browsers (Chrome/Edge work best)
- Checklist feature is UI placeholder only

---

**END OF REQUIREMENTS**
