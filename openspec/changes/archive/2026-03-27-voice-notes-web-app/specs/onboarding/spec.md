## ADDED Requirements

### Requirement: Splash screen slide
The onboarding carousel MUST begin with a splash screen slide displaying the "SyncNotes" title centered on a blue gradient background, matching `front-end-design/onboarding/onboarding.html` slide 1.

#### Scenario: Auto-advance from splash
- **WHEN** the splash screen is displayed for 2.5 seconds without user interaction
- **THEN** the carousel automatically advances to slide 2

#### Scenario: Click to advance from splash
- **WHEN** user clicks anywhere on the splash screen
- **THEN** the carousel immediately advances to slide 2

### Requirement: Feature slides with phone mockup
The onboarding carousel SHALL display 3 feature slides (Voice Capture, AI Transcription, Note Template) each showing a phone mockup with UI preview and a title/description below, matching slides 2-4 in the design.

#### Scenario: Display feature slides
- **WHEN** user navigates to slides 2, 3, or 4
- **THEN** each slide displays the corresponding phone mockup, feature title, and feature description with proper animations

### Requirement: Carousel navigation controls
The onboarding MUST provide previous/next arrow buttons, pagination dots, swipe gestures on mobile, and keyboard arrow navigation.

#### Scenario: Navigate forward with next button
- **WHEN** user clicks the next arrow button
- **THEN** the carousel advances to the next slide with a slide animation

#### Scenario: Navigate backward with previous button
- **WHEN** user clicks the previous arrow button
- **THEN** the carousel goes to the previous slide

#### Scenario: Navigate via pagination dots
- **WHEN** user clicks a pagination dot
- **THEN** the carousel jumps to the corresponding slide and the active dot updates

#### Scenario: Navigate via keyboard
- **WHEN** user presses ArrowRight or ArrowLeft keys
- **THEN** the carousel navigates forward or backward respectively

### Requirement: Get Started button on last slide
The carousel MUST display a "Get Started" button only on the last slide. Clicking it MUST navigate to the auth page.

#### Scenario: Get Started navigation
- **WHEN** user clicks "Get Started" on the last slide
- **THEN** the app navigates to the authentication page (`/auth/signup`)
