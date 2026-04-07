## ADDED Requirements

### Requirement: Editor top bar with actions
The note editor SHALL display a top bar with a back button (left) and action buttons for Pin, AI Assist, Share/Copy, and More (right), matching `front-end-design/note/editor.html`.

#### Scenario: Back navigation
- **WHEN** user clicks the back button
- **THEN** the app navigates to the previous page (or home if no history)

#### Scenario: Pin toggle
- **WHEN** user clicks the pin button
- **THEN** the note's `is_pinned` status toggles and the button visual state updates (active = blue)

#### Scenario: Share/Copy
- **WHEN** user clicks the share button on a device with Web Share API
- **THEN** the native share dialog opens with the note title and content
- **WHEN** user clicks the share button on a device without Web Share API
- **THEN** the note content is copied to clipboard and a toast "Copied to clipboard" appears

### Requirement: Smart Write toggle and date display
The editor body SHALL display a "Smart Write" toggle switch and the note's date, matching the `editor-meta` section in the design.

#### Scenario: Smart Write toggle display
- **WHEN** the editor loads
- **THEN** the Smart Write toggle is displayed in the off state by default, with the note date shown on the right

### Requirement: Tag list with add functionality
The editor SHALL display existing tags as colored pills and an add-tag button (dashed circle with plus icon), matching the `tag-list` section.

#### Scenario: Display existing tags
- **WHEN** a note has associated tags
- **THEN** each tag is displayed as a colored pill (yellow or blue)

#### Scenario: Add a new tag
- **WHEN** user clicks the add-tag button
- **THEN** a prompt or input allows the user to enter a tag name, and the new tag appears in the list

### Requirement: Note title input
The editor SHALL display a borderless title input field with "Title" placeholder, matching the `editor-title` style.

#### Scenario: Edit title
- **WHEN** user types in the title field
- **THEN** the title updates and auto-save is scheduled

### Requirement: Rich text content editor
The editor SHALL use the Syncfusion `RichTextEditorComponent` for the note content area with a "Start writing..." placeholder, matching the `editor-content` style.

#### Scenario: Edit content
- **WHEN** user types or formats text in the content editor
- **THEN** the content updates and auto-save is scheduled

#### Scenario: Pre-filled content from recorder
- **WHEN** the editor is opened via "Create Note" from the recorder
- **THEN** the transcribed text is pre-filled in the content editor

### Requirement: Auto-save functionality
The editor SHALL auto-save the note (title, content, tags, pin status) to SQLite after 2 seconds of inactivity. Manual save via Ctrl+S MUST also be supported.

#### Scenario: Auto-save after inactivity
- **WHEN** user stops typing for 2 seconds
- **THEN** the note is saved to SQLite

#### Scenario: Manual save via keyboard shortcut
- **WHEN** user presses Ctrl+S (or Cmd+S on Mac)
- **THEN** the note is immediately saved and a "Note saved" toast appears
