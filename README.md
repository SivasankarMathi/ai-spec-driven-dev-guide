# AI Spec-Driven Development Guide

A comprehensive guide and reference implementation demonstrating **spec-first (OpenSpec) development** — a workflow where feature specifications drive the entire development process. Includes a fully functional **Voice Notes** web app built with React, TypeScript, and Vite, using Syncfusion components and powered by Syncfusion Codestudio.

---

## Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
  - [Clone the Repository](#clone-the-repository)
  - [Install Dependencies](#install-dependencies)
  - [Environment Variables](#environment-variables)
  - [Run the Development Server](#run-the-development-server)
  - [Build for Production](#build-for-production)
- [Project Structure](#project-structure)
- [Understanding the Spec-Driven Workflow](#understanding-the-spec-driven-workflow)
  - [What is OpenSpec?](#what-is-openspec)
  - [Feature Specifications](#feature-specifications)
  - [How Specs Work](#how-specs-work)
- [Front-End Design Prototypes](#front-end-design-prototypes)
- [Reference App: Voice Notes](#reference-app-voice-notes)
- [Browser Compatibility](#browser-compatibility)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

This repository serves two purposes:

1. **A guide to spec-driven development** — Learn how to use formal feature specifications (BDD-style) to plan, implement, and validate software features before writing code.
2. **A reference implementation** — Explore a real-world Voice Notes web app built entirely from specs, demonstrating how specifications translate into production-quality code.

The spec-driven approach ensures every feature is:
- **Well-defined** with clear requirements and acceptance criteria
- **Measurable** through Given/When/Then scenarios
- **Traceable** from spec to implementation

---

## Key Features

- **Voice Recording & Transcription** — Record audio and get instant text transcription via the Web Speech API
- **AI-Powered Enhancement** — Optionally refine notes using OpenRouter GPT-4.1 (Smart Write)
- **Rich Text Editing** — Full-featured note editor with Syncfusion RichTextEditor
- **Local-First Architecture** — All data stored in-browser using SQLite (via sql.js WASM) persisted to IndexedDB
- **Responsive Design** — Mobile-first with breakpoints at 768px (tablet) and 1024px (desktop)
- **Onboarding Flow** — Guided introduction carousel for first-time users
- **Authentication UI** — Sign-up/Sign-in forms with validation (OAuth placeholders for Google/Microsoft)
- **Settings Management** — Theme (Light/Dark/System), font size, and profile customization
- **Auto-Save** — Notes save automatically after 2 seconds of inactivity
- **Search** — Real-time note filtering with 300ms debounce

---

## Tech Stack

| Layer               | Technology                                      |
| ------------------- | ----------------------------------------------- |
| **Framework**       | React 19 + TypeScript                           |
| **Build Tool**      | Vite 8                                          |
| **UI Components**   | Syncfusion React Components (v33)               |
| **Database**        | SQLite via sql.js (WASM) persisted to IndexedDB |
| **Transcription**   | Web Speech API (browser-native)                 |
| **AI Enhancement**  | OpenRouter API with GPT-4.1                     |
| **Routing**         | React Router v7                                 |
| **Tooling**         | Syncfusion Codestudio, OpenSpec                 |

---

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** — v18.0.0 or later (LTS recommended). Download from [nodejs.org](https://nodejs.org/).
- **npm** (v9+) or **pnpm** (v8+) — Comes bundled with Node.js, or install pnpm via `npm install -g pnpm`.
- **Git** — For cloning the repository. Download from [git-scm.com](https://git-scm.com/).
- **Modern browser** — Chrome or Edge recommended for full Web Speech API support.

Verify your setup:

```bash
node --version   # Should print v18.x.x or later
npm --version    # Should print 9.x.x or later
git --version    # Should print 2.x.x or later
```

---

## Getting Started

### Clone the Repository

```bash
git clone https://github.com/SivasankarMathi/ai-spec-driven-dev-guide.git
cd ai-spec-driven-dev-guide
```

### Install Dependencies

Navigate to the Voice Notes app directory and install packages:

```bash
cd voice-notes-app
npm install
```

> **Using pnpm?** Run `pnpm install` instead.

### Environment Variables

The app works fully offline without any configuration. However, to enable the **Smart Write (AI Enhancement)** feature, create a `.env` file in the `voice-notes-app/` directory:

```bash
cp .env.example .env  # if an example file exists, or create manually:
```

```env
# voice-notes-app/.env
VITE_OPENROUTER_API_KEY=your_openrouter_api_key_here
```

You can obtain an API key from [OpenRouter](https://openrouter.ai/). This is **optional** — all other features work without it.

### Run the Development Server

```bash
npm run dev
```

The app will start on [http://localhost:5173](http://localhost:5173) (default Vite port). Open this URL in your browser.

### Build for Production

To create an optimized production build:

```bash
npm run build
```

The output will be in the `voice-notes-app/dist/` directory. To preview the production build locally:

```bash
npm run preview
```

---

## Project Structure

```
ai-spec-driven-dev-guide/
├── README.md                  # This file
├── REQUIREMENTS.md            # Detailed product requirements document
├── .gitignore                 # Git ignore rules
│
├── openspec/                  # Spec-driven workflow artifacts
│   ├── config.yaml            # OpenSpec configuration
│   ├── specs/                 # Active feature specifications
│   │   ├── app-shell/         #   Core app infrastructure
│   │   ├── auth-flow/         #   Authentication flow
│   │   ├── data-persistence/  #   SQLite + IndexedDB storage
│   │   ├── home-dashboard/    #   Home screen & navigation
│   │   ├── note-editor/       #   Rich text note editor
│   │   ├── onboarding/        #   First-time user onboarding
│   │   ├── settings-management/ # User settings & preferences
│   │   ├── smart-write-ai/    #   AI-powered text enhancement
│   │   └── voice-recorder/    #   Voice recording & transcription
│   └── changes/               # Change proposals & archived artifacts
│       └── archive/           #   Historical design documents
│
├── front-end-design/          # Static HTML/CSS/JS design prototypes
│   ├── auth/                  #   Authentication screens
│   ├── home/                  #   Home dashboard
│   ├── note/                  #   Note editor & voice recorder
│   ├── onboarding/            #   Onboarding carousel
│   └── settings/              #   Settings screens
│
├── voice-notes-app/           # Reference implementation (React + TS + Vite)
│   ├── package.json           #   Dependencies & scripts
│   ├── tsconfig.json          #   TypeScript configuration
│   ├── vite.config.ts         #   Vite build configuration
│   └── src/
│       ├── main.tsx           #   App entry point
│       ├── App.tsx            #   Root component with routing
│       ├── components/        #   Reusable UI components
│       │   ├── auth/          #     Auth forms
│       │   ├── home/          #     Home dashboard components
│       │   ├── note/          #     Note editor & recorder
│       │   ├── onboarding/    #     Onboarding slides
│       │   ├── settings/      #     Settings panels
│       │   └── ui/            #     Shared UI primitives
│       ├── pages/             #   Route-level page components
│       ├── contexts/          #   React context providers
│       ├── hooks/             #   Custom React hooks
│       ├── services/          #   Business logic & API integrations
│       ├── db/                #   SQLite database layer
│       │   ├── database.ts    #     DB initialization & connection
│       │   ├── migrations.ts  #     Schema migrations
│       │   └── repositories/  #     Data access layer
│       ├── types/             #   TypeScript type definitions
│       ├── utils/             #   Utility functions
│       └── styles/            #   Global & shared styles
│
└── .codestudio/               # Syncfusion Codestudio configuration
    ├── agents/                #   AI agent configurations
    ├── instructions/          #   Codestudio instructions
    ├── prompts/               #   Prompt templates
    └── skills/                #   Codestudio skill definitions
```

---

## Understanding the Spec-Driven Workflow

### What is OpenSpec?

OpenSpec is a specification-first development methodology where features are fully defined in structured spec files **before** implementation begins. This repository uses OpenSpec to demonstrate how specs can:

- Guide AI-assisted development (via tools like Syncfusion Codestudio)
- Serve as living documentation
- Provide measurable acceptance criteria

### Feature Specifications

Each feature spec lives in `openspec/specs/<feature-name>/spec.md`:

| Spec                      | Description                                                                 |
| ------------------------- | --------------------------------------------------------------------------- |
| **app-shell**             | Core infrastructure: React Router, Syncfusion theme, responsive layout, global CSS variables |
| **auth-flow**             | User authentication: sign-up, sign-in, OAuth placeholders, session management |
| **home-dashboard**        | Home screen: note grid, search bar, sidebar/bottom nav, FAB menu            |
| **note-editor**           | Rich text editor: title, content, tags, pin/unpin, Smart Write, auto-save   |
| **voice-recorder**        | Voice recording: audio capture, waveform visualization, transcription       |
| **settings-management**   | User settings: appearance (theme, font size), profile editing               |
| **onboarding**            | First-time user flow: welcome slides, app introduction carousel             |
| **data-persistence**      | Local storage: SQLite database (sql.js), IndexedDB persistence, migrations  |
| **smart-write-ai**        | AI features: text refinement and content suggestions via OpenRouter API      |

### How Specs Work

Each spec uses a **BDD-style format** with:

- **Requirements** — Formal statements of what the feature SHALL do
- **Scenarios** — Given/When/Then examples describing expected behavior

Example:
```
Scenario: User creates a new voice note
  Given the user is on the home dashboard
  When the user taps the FAB and selects "Voice recording"
  Then the voice recorder modal opens
  And recording starts automatically
```

This ensures every implementation is **measurable and testable** against its specification.

---

## Front-End Design Prototypes

The `front-end-design/` directory contains static HTML/CSS/JS mockups for each screen. These serve as the **pixel-perfect design reference** for the React implementation:

| Prototype                | Path                            | Description               |
| ------------------------ | ------------------------------- | ------------------------- |
| Authentication           | `front-end-design/auth/`        | Sign-in & Sign-up screens |
| Onboarding               | `front-end-design/onboarding/`  | Welcome carousel slides   |
| Home Dashboard           | `front-end-design/home/`        | Main note grid & nav      |
| Note Editor              | `front-end-design/note/editor.*`| Rich text editor view     |
| Voice Recorder           | `front-end-design/note/recorder.*`| Recording modal         |
| Settings                 | `front-end-design/settings/`    | User settings screens     |

Open any `.html` file directly in a browser to preview the design.

---

## Reference App: Voice Notes

The `voice-notes-app/` directory contains the full React implementation. Key architectural decisions:

- **Local-first** — No backend server required. All data persists in the browser via SQLite (sql.js WASM) + IndexedDB.
- **Component-based** — Organized by feature domain (`auth`, `home`, `note`, `settings`, etc.)
- **Context-driven state** — React Context API for global state management (auth, database, theme)
- **Auto-save** — Notes automatically save after 2 seconds of inactivity; manual save via `Ctrl+S` / `Cmd+S`
- **Voice recordings are never stored** — Only the transcribed text is saved

### Available Scripts

| Command            | Description                                    |
| ------------------ | ---------------------------------------------- |
| `npm run dev`      | Start the Vite development server              |
| `npm run build`    | Type-check with `tsc` and build for production |
| `npm run preview`  | Preview the production build locally           |

---

## Browser Compatibility

| Feature              | Chrome | Edge | Firefox | Safari |
| -------------------- | ------ | ---- | ------- | ------ |
| Core App             | Yes    | Yes  | Yes     | Yes    |
| Web Speech API       | Yes    | Yes  | No      | No     |
| SQLite (sql.js WASM) | Yes    | Yes  | Yes     | Yes    |

> **Note:** Voice recording and transcription require the Web Speech API, which is best supported in **Chrome** and **Edge**. All other features work across modern browsers.

---

## Contributing

Contributions are welcome! To get started:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/my-feature`)
3. Read the relevant spec in `openspec/specs/` before implementing
4. Make your changes following the existing code style and conventions
5. Ensure the app builds successfully (`npm run build`)
6. Commit your changes (`git commit -m "feat: add my feature"`)
7. Push to your branch (`git push origin feature/my-feature`)
8. Open a Pull Request

---

## License

This project is provided as-is for educational and demonstration purposes.
