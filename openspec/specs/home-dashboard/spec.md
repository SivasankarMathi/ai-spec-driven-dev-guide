## ADDED Requirements

### Requirement: Desktop sidebar navigation
On screens 1024px and wider, the system SHALL display a sidebar with the "SyncNotes" brand logo, Home and Settings navigation links, and a collapse toggle button, matching `front-end-design/home/home.html`.

#### Scenario: Sidebar collapse/expand
- **WHEN** user clicks the sidebar toggle button
- **THEN** the sidebar collapses to icon-only mode or expands back, and the preference is persisted in localStorage

#### Scenario: Active sidebar link
- **WHEN** user is on the Home page
- **THEN** the Home link is visually highlighted as active

### Requirement: Mobile bottom navigation
On screens below 1024px, the system SHALL display a fixed bottom navigation bar with Home and Settings icons/labels, hiding the sidebar.

#### Scenario: Bottom nav active state
- **WHEN** user is on the Home page
- **THEN** the Home item in the bottom nav is highlighted as active

### Requirement: Search bar
The home page SHALL display a search bar at the top that filters notes by title and body content in real-time with 300ms debounce.

#### Scenario: Search filters notes
- **WHEN** user types a query in the search bar
- **THEN** only notes whose title or body contains the query string are displayed (case-insensitive)

#### Scenario: Empty search shows all notes
- **WHEN** user clears the search input
- **THEN** all notes are displayed

### Requirement: Content tabs (Notes / My Checklist)
The home page SHALL display tab buttons for "Notes" and "My Checklist" below the search bar, with a view toggle icon. The Notes tab MUST be active by default.

#### Scenario: Switch to Checklist tab
- **WHEN** user clicks the "My Checklist" tab
- **THEN** the checklist panel is shown (with empty state "No checklists yet") and the notes panel is hidden

### Requirement: Note grid with Pinned and Others sections
The Notes panel SHALL display notes in two sections: "Pinned" (notes where `is_pinned = 1`) and "Others" (remaining notes), each in a responsive grid (2 cols mobile, 3 cols tablet, 4 cols large desktop).

#### Scenario: Display note cards
- **WHEN** notes exist in the database
- **THEN** each note is rendered as a card showing title, truncated body (3 lines), date, and a play button icon

#### Scenario: Click note card
- **WHEN** user clicks a note card
- **THEN** the app navigates to the note editor page for that note (`/note/:id`)

### Requirement: Floating Action Button (FAB) menu
The home page SHALL display a FAB in the bottom-right corner. Clicking it MUST expand a menu with three options: voice recording, new text note, and new checklist.

#### Scenario: Open FAB menu
- **WHEN** user clicks the FAB button
- **THEN** the FAB icon changes to a close (X) icon, the menu items animate in, and a backdrop overlay appears

#### Scenario: Voice recording action
- **WHEN** user clicks the voice recording menu item
- **THEN** the app navigates to the recorder page (`/note/record`)

#### Scenario: New text note action
- **WHEN** user clicks the text note menu item
- **THEN** the app navigates to a new note editor page (`/note/new`)

#### Scenario: Close FAB via overlay or Escape
- **WHEN** user clicks the backdrop overlay or presses Escape while FAB is open
- **THEN** the FAB menu closes and the overlay disappears
