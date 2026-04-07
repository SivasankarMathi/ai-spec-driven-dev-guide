
# spec-driven-dev-guide

A sample repository demonstrating a spec-first (OpenSpec) development workflow with a React + Vite reference app (Voice Notes) using Syncfusion Codestudio.

**Quick Start**

- **Requirements:** Node.js (LTS recommended) and `npm` or `pnpm` installed.
- Run locally:

```bash
cd voice-notes-app
npm install
npm run dev
```

**What this repo contains**

- **front-end-design/**: design examples and static HTML/CSS/JS mockups for screens.
- **openspec/**: change proposals and archived design artifacts used by the spec-driven workflow.
- **specs/**: feature specifications used to drive implementation (e.g., `note-editor`, `home-dashboard`).
- **voice-notes-app/**: reference implementation (React + TypeScript + Vite).
	- App entry: [voice-notes-app/src/main.tsx](voice-notes-app/src/main.tsx)
	- Scripts & deps: [voice-notes-app/package.json](voice-notes-app/package.json)

**Where to look first**

- Read the feature specs in `specs/` to understand intended behavior.
- Open the reference app in `voice-notes-app/` and run it with `npm run dev` to explore the implemented UI and contexts.

**Understanding OpenSpec Specs**

The `openspec/specs/` directory contains feature-level specifications that drive implementation. Each spec file defines the requirements, acceptance criteria, and behaviors for a feature:

- **app-shell/spec.md** — Core app infrastructure: React Router setup, Syncfusion theme integration, responsive layout, database context, and global CSS variables.
- **auth-flow/spec.md** — User authentication: sign-up, sign-in, OAuth, and session management.
- **home-dashboard/spec.md** — Home screen: note grid, search bar, sidebar, bottom navigation, and floating action button.
- **note-editor/spec.md** — Rich text editor: title input, content editing, tags, pin/unpin, Smart Write toggle, and auto-save.
- **voice-recorder/spec.md** — Voice recording: audio capture, waveform display, transcription, and note creation.
- **settings-management/spec.md** — User settings: appearance, profile, and preferences.
- **onboarding/spec.md** — First-time user flow: welcome slides and app introduction.
- **data-persistence/spec.md** — Local storage: SQLite database (via sql.js) and data migration.
- **smart-write-ai/spec.md** — AI-powered features: text refinement and content suggestions via external API.

**How specs work**

Each spec uses a **BDD-style format** with:
- **Requirements** — What the feature SHALL do.
- **Scenarios** — Given/When/Then examples showing expected behavior.

This ensures that implementation is measurable and testable against the spec.

**Useful files**

- [openspec/specs/](openspec/specs/) — all feature specifications organized by feature.
- [front-end-design/](front-end-design/) — static design artifacts and examples.
