## ADDED Requirements

### Requirement: React Router setup
The application SHALL use React Router v6 with the following routes: `/onboarding`, `/auth/signup`, `/auth/signin`, `/home`, `/note/new`, `/note/record`, `/note/:id`, `/settings`, `/settings/profile`, `/settings/appearance`. The root path (`/`) SHALL redirect to `/onboarding` on first visit or `/home` for authenticated users.

#### Scenario: First visit redirect
- **WHEN** user visits `/` for the first time (no user in database)
- **THEN** the app redirects to `/onboarding`

#### Scenario: Authenticated visit redirect
- **WHEN** an authenticated user visits `/`
- **THEN** the app redirects to `/home`

#### Scenario: Protected routes
- **WHEN** an unauthenticated user tries to access `/home`, `/note/*`, or `/settings/*`
- **THEN** the app redirects to `/auth/signin`

### Requirement: Syncfusion theme integration
The application SHALL register the Syncfusion license key and apply a custom theme that matches the design's primary color (`#2D5BFF`) and design tokens (CSS custom properties from the front-end-design files).

#### Scenario: Syncfusion components render with custom theme
- **WHEN** any Syncfusion component renders
- **THEN** it uses the customized theme matching the design's color palette and typography

### Requirement: Responsive layout
The application SHALL be mobile-first with responsive breakpoints at 768px (tablet) and 1024px (desktop), matching the CSS media queries in the front-end designs.

#### Scenario: Mobile layout (< 1024px)
- **WHEN** the viewport width is below 1024px
- **THEN** the sidebar is hidden, bottom navigation is shown, and the layout is single-column

#### Scenario: Desktop layout (>= 1024px)
- **WHEN** the viewport width is 1024px or above
- **THEN** the sidebar is shown, bottom navigation is hidden, and the main content area adjusts margins

### Requirement: Database context provider
The application SHALL wrap all routes in a `DatabaseProvider` that initializes sql.js and provides the database instance to child components. A loading state MUST be shown until the database is ready.

#### Scenario: Database provider initialization
- **WHEN** the app mounts
- **THEN** the DatabaseProvider initializes sql.js, loads or creates the database, and makes it available via React context

### Requirement: Global CSS variables
The application SHALL define CSS custom properties matching the design tokens from `front-end-design/` (colors, typography, spacing, border-radius, shadows, transitions) in a global stylesheet.

#### Scenario: Design tokens available
- **WHEN** any component renders
- **THEN** all CSS custom properties from the design (e.g., `--color-primary: #2D5BFF`, `--font-family`, `--spacing-*`, `--radius-*`) are available globally
