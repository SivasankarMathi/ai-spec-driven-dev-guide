## ADDED Requirements

### Requirement: SQLite database initialization
The system SHALL initialize a SQLite database via `sql.js` (WASM) on app startup. The database binary MUST be persisted to IndexedDB so data survives browser restarts.

#### Scenario: First launch database creation
- **WHEN** the app launches for the first time (no existing database in IndexedDB)
- **THEN** the system creates a new SQLite database, runs schema migrations to create all tables (users, notes, tags, note_tags, settings), and saves the database to IndexedDB

#### Scenario: Subsequent launch database restore
- **WHEN** the app launches and an existing database is found in IndexedDB
- **THEN** the system loads the database from IndexedDB and makes it available to the application

#### Scenario: Database loading indicator
- **WHEN** the database is being initialized or loaded
- **THEN** a loading spinner is displayed until the database is ready

### Requirement: Notes CRUD operations
The system SHALL support creating, reading, updating, and deleting notes in the SQLite database.

#### Scenario: Create a new note
- **WHEN** a new note is saved (from editor or recorder)
- **THEN** a row is inserted into the `notes` table with the user's id, title, content, and current timestamp

#### Scenario: Read all notes for a user
- **WHEN** the home page loads
- **THEN** all notes for the current user are queried from the database, ordered by `updated_at` descending

#### Scenario: Update an existing note
- **WHEN** a note is auto-saved or manually saved in the editor
- **THEN** the note's title, content, is_pinned, and updated_at fields are updated in the database

#### Scenario: Delete a note
- **WHEN** user deletes a note (via More menu in editor)
- **THEN** the note row and associated note_tags entries are removed from the database

### Requirement: Tag CRUD operations
The system SHALL support creating tags, associating tags with notes, and removing tag associations.

#### Scenario: Create and associate a tag
- **WHEN** user adds a tag to a note
- **THEN** if the tag name doesn't exist, a new row is inserted in `tags`; a row is inserted in `note_tags` linking the note and tag

#### Scenario: Remove a tag from a note
- **WHEN** user removes a tag from a note
- **THEN** the corresponding `note_tags` row is deleted

### Requirement: User settings persistence
The system SHALL store user settings (theme, font_size) in the `settings` table and load them on app startup.

#### Scenario: Save settings
- **WHEN** user changes theme or font size in the Appearance settings
- **THEN** the settings table is updated for the current user and the database is persisted to IndexedDB

#### Scenario: Load settings on startup
- **WHEN** the app starts and user is authenticated
- **THEN** the user's settings are loaded from the database and applied to the UI

### Requirement: Database persistence after writes
The system SHALL save the SQLite database binary to IndexedDB after every write operation to ensure data durability.

#### Scenario: Persist after write
- **WHEN** any INSERT, UPDATE, or DELETE operation completes
- **THEN** the database binary is serialized and saved to IndexedDB
