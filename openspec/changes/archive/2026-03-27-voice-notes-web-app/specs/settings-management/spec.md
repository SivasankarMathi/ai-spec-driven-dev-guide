## ADDED Requirements

### Requirement: Settings main page
The settings page SHALL display the user's avatar, name, and email at the top, followed by a menu with "Profile" and "Appearance" items, and a "Log Out" button at the bottom, matching `front-end-design/settings/settings.html`.

#### Scenario: Display user info
- **WHEN** user navigates to the settings page
- **THEN** the user's avatar image (or initials), name, and email are displayed in a card

#### Scenario: Navigate to profile
- **WHEN** user clicks the "Profile" menu item
- **THEN** the profile sub-view is displayed with a back button

#### Scenario: Navigate to appearance
- **WHEN** user clicks the "Appearance" menu item
- **THEN** the appearance sub-view is displayed with a back button

### Requirement: Profile sub-view
The profile view SHALL display the user's profile picture (initials circle with edit button), username input, and a "Change password" row, matching the profile section in the design.

#### Scenario: Edit username
- **WHEN** user modifies the username input field
- **THEN** the new username is saved to the database on change

#### Scenario: Display profile initials
- **WHEN** the user has no profile picture
- **THEN** a circle with the user's initials is displayed with the edit button overlay

### Requirement: Change password modal
Clicking "Change password" in the profile view SHALL open a bottom-sheet modal (mobile) or centered dialog (tablet/desktop) with email (read-only), current password, new password, and confirm password fields, matching the design's modal.

#### Scenario: Open change password modal
- **WHEN** user clicks the "Change password" row
- **THEN** a modal opens with the password change form, focus moves to the first password input

#### Scenario: Successful password change
- **WHEN** user fills all fields correctly (current password matches, new passwords match, minimum 8 chars) and submits
- **THEN** the password is updated in the database, a success toast appears, and the modal closes

#### Scenario: Password validation errors
- **WHEN** user submits with empty fields, mismatched passwords, or password shorter than 8 characters
- **THEN** an error alert is displayed and the form remains open

#### Scenario: Close modal
- **WHEN** user clicks Cancel, clicks the overlay, or presses Escape
- **THEN** the modal closes and the form resets

### Requirement: Appearance sub-view
The appearance view SHALL display Theme and Font selectors as dropdown/select inputs, matching the design.

#### Scenario: Change theme
- **WHEN** user selects a theme (Light, Dark, System) from the dropdown
- **THEN** the selection is saved to the database and localStorage

#### Scenario: Change font size
- **WHEN** user selects a font size (Small, Medium, Large) from the dropdown
- **THEN** the selection is saved to the database and localStorage

### Requirement: Log out
The settings page SHALL display a "Log Out" button that, when clicked, confirms and then logs the user out.

#### Scenario: Log out flow
- **WHEN** user clicks "Log Out" and confirms the action
- **THEN** the user session is cleared and the app navigates to the auth page

#### Scenario: Cancel log out
- **WHEN** user clicks "Log Out" but cancels the confirmation
- **THEN** nothing happens and the user remains on the settings page
