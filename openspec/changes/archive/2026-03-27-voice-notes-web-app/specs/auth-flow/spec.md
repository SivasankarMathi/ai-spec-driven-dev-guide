## ADDED Requirements

### Requirement: Sign-up form with validation
The system SHALL display a sign-up form with fields for Name, E-mail, Create Password, and Confirm Password. All fields MUST be validated before submission. The form layout MUST match `front-end-design/auth/auth.html` (signup container).

#### Scenario: Successful sign-up
- **WHEN** user fills in all fields with valid data and clicks "Sign up"
- **THEN** system creates a new user record in SQLite and navigates to the onboarding page

#### Scenario: Validation errors on sign-up
- **WHEN** user submits with empty fields, invalid email, password shorter than 8 characters, or mismatched passwords
- **THEN** system displays inline error messages below the respective fields and does not submit

#### Scenario: Duplicate email on sign-up
- **WHEN** user submits with an email that already exists in the database
- **THEN** system displays an error message indicating the email is already registered

### Requirement: Sign-in form with validation
The system SHALL display a sign-in form with E-mail and Password fields plus a "Forgot password?" link. The form layout MUST match `front-end-design/auth/auth.html` (signin container).

#### Scenario: Successful sign-in
- **WHEN** user enters valid credentials and clicks "Sign in"
- **THEN** system authenticates the user, stores session in context, and navigates to the home page

#### Scenario: Invalid credentials on sign-in
- **WHEN** user enters an email/password combination that does not match any record
- **THEN** system displays an error message indicating invalid credentials

### Requirement: Navigation between auth screens
The system SHALL allow users to switch between sign-up and sign-in forms via "Already have an account? Sign in" and "Don't have an account yet? Sign up" links.

#### Scenario: Navigate to sign-in
- **WHEN** user clicks "Sign in" link on the sign-up page
- **THEN** system navigates to the sign-in form

#### Scenario: Navigate to sign-up
- **WHEN** user clicks "Sign up" link on the sign-in page
- **THEN** system navigates to the sign-up form

### Requirement: OAuth button placeholders
The sign-in form SHALL display "Sign in with Google" and "Sign in with Microsoft" buttons with proper icons. These MUST be UI placeholders only (no actual OAuth integration).

#### Scenario: OAuth button click
- **WHEN** user clicks an OAuth button
- **THEN** system logs the action to console (placeholder behavior)

### Requirement: Password visibility toggle
Each password field SHALL have an eye icon toggle button that switches between password and text input types.

#### Scenario: Toggle password visibility
- **WHEN** user clicks the eye icon next to a password field
- **THEN** the field input type toggles between "password" and "text" and the icon updates accordingly
