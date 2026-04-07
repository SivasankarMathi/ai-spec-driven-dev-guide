## 1. Project Setup & Scaffolding

- [x] 1.1 Initialize Vite project with React + TypeScript template (`npm create vite@latest voice-notes-app -- --template react-ts`)
- [x] 1.2 Install core dependencies: `react-router-dom`, `sql.js`, `@syncfusion/ej2-react-inputs`, `@syncfusion/ej2-react-buttons`, `@syncfusion/ej2-react-richtexteditor`, `@syncfusion/ej2-react-navigations`, `@syncfusion/ej2-react-popups`, `@syncfusion/ej2-react-dropdowns`, `@syncfusion/ej2-react-splitbuttons`
- [x] 1.3 Create `.env` file with `VITE_OPENROUTER_API_KEY` and `VITE_OPENROUTER_MODEL=openai/gpt-4.1`
- [x] 1.4 Create project folder structure: `src/components/`, `src/contexts/`, `src/hooks/`, `src/db/`, `src/pages/`, `src/services/`, `src/styles/`, `src/types/`, `src/utils/`
- [x] 1.5 Create global CSS variables file (`src/styles/variables.css`) with all design tokens from front-end-design (colors, typography, spacing, radius, shadows, transitions)
- [x] 1.6 Configure Syncfusion license registration in `src/main.tsx` and import Syncfusion theme CSS with custom overrides for primary color `#2D5BFF`
- [x] 1.7 Set up React Router v6 in `src/App.tsx` with all routes: `/`, `/onboarding`, `/auth/signup`, `/auth/signin`, `/home`, `/note/new`, `/note/record`, `/note/:id`, `/settings`, `/settings/profile`, `/settings/appearance`

## 2. Database Layer (sql.js + IndexedDB)

- [x] 2.1 Create `src/db/database.ts` — initialize sql.js WASM, load/create SQLite database from/to IndexedDB
- [x] 2.2 Create `src/db/migrations.ts` — define SQL schema (users, notes, tags, note_tags, settings tables) and run on first init
- [x] 2.3 Create `src/db/repositories/userRepository.ts` — CRUD functions for users (create, findByEmail, updatePassword, updateUsername)
- [x] 2.4 Create `src/db/repositories/noteRepository.ts` — CRUD functions for notes (create, getAll, getById, update, delete, togglePin)
- [x] 2.5 Create `src/db/repositories/tagRepository.ts` — CRUD functions for tags and note_tags (create, associate, dissociate, getByNoteId)
- [x] 2.6 Create `src/db/repositories/settingsRepository.ts` — get/update settings (theme, font_size)
- [x] 2.7 Create `src/contexts/DatabaseContext.tsx` — React context that initializes the database, provides it to children, and shows a loading spinner during init

## 3. TypeScript Types & Utilities

- [x] 3.1 Create `src/types/index.ts` — define interfaces: `User`, `Note`, `Tag`, `NoteTag`, `Settings`, `AuthState`
- [x] 3.2 Create `src/utils/validation.ts` — email validation, password validation (min 8 chars, 1 uppercase, 1 number), name validation
- [x] 3.3 Create `src/utils/dateFormatter.ts` — format dates as `MM/DD/YY` and `MMM DD, YYYY` for display

## 4. Auth Context & Pages

- [x] 4.1 Create `src/contexts/AuthContext.tsx` — manage current user state, login/logout/register functions using userRepository
- [x] 4.2 Create `src/components/auth/AuthCard.tsx` — white card container component with title, children, footer (Syncfusion styling)
- [x] 4.3 Create `src/components/auth/SignUpForm.tsx` — sign-up form with Name, Email, Password, Confirm Password fields using Syncfusion TextBoxComponent, validation, and password toggle
- [x] 4.4 Create `src/components/auth/SignInForm.tsx` — sign-in form with Email, Password fields, forgot password link, and OAuth button placeholders
- [x] 4.5 Create `src/components/auth/OAuthButtons.tsx` — Google and Microsoft sign-in buttons with SVG icons (UI placeholders only)
- [x] 4.6 Create `src/pages/SignUpPage.tsx` and `src/pages/SignInPage.tsx` — route-level pages composing auth components
- [x] 4.7 Create `src/components/ui/ProtectedRoute.tsx` — route guard that redirects unauthenticated users to `/auth/signin`
- [x] 4.8 Add auth styles (`src/components/auth/auth.module.css`) matching front-end-design/auth/auth.css exactly

## 5. Onboarding

- [x] 5.1 Create `src/components/onboarding/OnboardingSlide.tsx` — individual slide component (splash or feature slide with phone mockup)
- [x] 5.2 Create `src/components/onboarding/PhoneMockup.tsx` — phone frame with screen content (recording UI, transcription UI, template UI)
- [x] 5.3 Create `src/components/onboarding/Pagination.tsx` — pagination dots with active state
- [x] 5.4 Create `src/pages/OnboardingPage.tsx` — carousel controller with 4 slides, auto-advance from splash, prev/next/swipe/keyboard navigation, and "Get Started" button on last slide
- [x] 5.5 Add onboarding styles (`src/components/onboarding/onboarding.module.css`) matching front-end-design/onboarding/onboarding.css exactly

## 6. Home Dashboard

- [x] 6.1 Create `src/components/home/Sidebar.tsx` — desktop sidebar with SyncNotes logo, Home/Settings nav links, collapse toggle, using Syncfusion SidebarComponent
- [x] 6.2 Create `src/components/home/BottomNav.tsx` — mobile bottom navigation bar with Home/Settings items
- [x] 6.3 Create `src/components/home/SearchBar.tsx` — search input with icon using Syncfusion TextBoxComponent, 300ms debounce filtering
- [x] 6.4 Create `src/components/home/ContentTabs.tsx` — Notes/Checklist tab buttons with view toggle, using Syncfusion TabComponent
- [x] 6.5 Create `src/components/home/NoteCard.tsx` — note card component showing title, truncated body, date, and play icon
- [x] 6.6 Create `src/components/home/NoteGrid.tsx` — responsive grid layout for note cards with Pinned/Others sections
- [x] 6.7 Create `src/components/home/FAB.tsx` — floating action button with expandable menu (voice, text, checklist), overlay, and animations
- [x] 6.8 Create `src/contexts/NotesContext.tsx` — manage notes list state, search/filter, and CRUD operations using noteRepository
- [x] 6.9 Create `src/pages/HomePage.tsx` — compose Sidebar, BottomNav, SearchBar, ContentTabs, NoteGrid, and FAB
- [x] 6.10 Add home styles (`src/components/home/home.module.css`) matching front-end-design/home/home.css exactly

## 7. Voice Recorder

- [x] 7.1 Create `src/hooks/useSpeechRecognition.ts` — custom hook wrapping Web Speech API with start/stop/transcript state, continuous mode, and browser support detection
- [x] 7.2 Create `src/components/note/Waveform.tsx` — animated waveform bars component with recording/paused states
- [x] 7.3 Create `src/components/note/RecorderModal.tsx` — recorder modal using Syncfusion DialogComponent with header, waveform, status, timer, stop button, retake/create-note actions
- [x] 7.4 Create `src/pages/RecorderPage.tsx` — page that renders RecorderModal as overlay on home, passes transcript to editor on "Create Note"
- [x] 7.5 Add recorder styles (`src/components/note/recorder.module.css`) matching front-end-design/note/recorder.css exactly

## 8. Note Editor

- [x] 8.1 Create `src/components/note/EditorTopBar.tsx` — top bar with back button, pin, AI, share, and more action buttons
- [x] 8.2 Create `src/components/note/TagList.tsx` — tag pills with add-tag button
- [x] 8.3 Create `src/components/note/EditorMeta.tsx` — Smart Write toggle (Syncfusion SwitchComponent) and date display
- [x] 8.4 Create `src/components/note/NoteEditor.tsx` — title input + Syncfusion RichTextEditorComponent for content, auto-save with 2s debounce, Ctrl+S manual save
- [x] 8.5 Create `src/pages/NoteEditorPage.tsx` — compose EditorTopBar, EditorMeta, TagList, NoteEditor; handle new note creation and existing note editing; accept pre-filled transcript from recorder
- [x] 8.6 Add editor styles (`src/components/note/editor.module.css`) matching front-end-design/note/editor.css exactly

## 9. Smart Write (AI Enhancement)

- [x] 9.1 Create `src/services/openRouterApi.ts` — API client for OpenRouter chat completions endpoint, reads model and key from env vars, sends system prompt for enhancement
- [x] 9.2 Create `src/hooks/useSmartWrite.ts` — custom hook managing enhance state (loading, enhanced text, original text, revert), calls openRouterApi
- [x] 9.3 Integrate Smart Write into NoteEditor: when toggle is enabled show "Enhance" button; on click call useSmartWrite; display enhanced text with accept/revert options
- [x] 9.4 Add loading indicator during API call and error handling (missing API key, network errors) with toast messages

## 10. Settings Pages

- [x] 10.1 Create `src/contexts/SettingsContext.tsx` — manage theme and font size state, sync with database and localStorage
- [x] 10.2 Create `src/components/settings/UserCard.tsx` — user avatar, name, and email card
- [x] 10.3 Create `src/components/settings/SettingsMenu.tsx` — menu list with Profile and Appearance items with chevron arrows
- [x] 10.4 Create `src/components/settings/ProfileView.tsx` — profile picture (initials circle), username input, change password link
- [x] 10.5 Create `src/components/settings/ChangePasswordModal.tsx` — modal with email (read-only), current/new/confirm password fields, cancel/submit using Syncfusion DialogComponent
- [x] 10.6 Create `src/components/settings/AppearanceView.tsx` — theme and font dropdowns using Syncfusion DropDownListComponent
- [x] 10.7 Create `src/components/settings/LogOutButton.tsx` — styled logout button with confirmation dialog
- [x] 10.8 Create `src/pages/SettingsPage.tsx` — compose all settings sub-views with view navigation (settings → profile/appearance → back)
- [x] 10.9 Add settings styles (`src/components/settings/settings.module.css`) matching front-end-design/settings/settings.css exactly

## 11. Shared UI Components

- [x] 11.1 Create `src/components/ui/Button.tsx` — reusable button component with primary/oauth/outline variants using Syncfusion ButtonComponent
- [x] 11.2 Create `src/components/ui/FormGroup.tsx` — label + input + error message component with password toggle support
- [x] 11.3 Create `src/components/ui/Divider.tsx` — horizontal divider with optional centered text
- [x] 11.4 Create `src/components/ui/Toast.tsx` — toast notification component for success/error messages

## 12. Integration & Final Wiring

- [x] 12.1 Wire all contexts (DatabaseProvider → AuthProvider → SettingsProvider → NotesProvider) in `src/App.tsx`
- [x] 12.2 Implement root route redirect logic: first visit → `/onboarding`, authenticated → `/home`
- [x] 12.3 Verify all page navigations work end-to-end: onboarding → auth → home → recorder → editor → settings
- [x] 12.4 Test responsive layout: sidebar visible on desktop (≥1024px), bottom nav on mobile (<1024px), grid column changes at breakpoints
- [x] 12.5 Test voice recording workflow: Record → Review Text → Enhance (Smart Write) → Review Enhanced → Save
- [x] 12.6 Verify SQLite data persists across browser refresh (IndexedDB round-trip)
- [x] 12.7 Add `.env.example` file documenting environment variables
