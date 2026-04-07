## ADDED Requirements

### Requirement: Recorder modal display
The system SHALL display a recorder modal as a bottom sheet on mobile and a centered dialog on tablet/desktop, matching `front-end-design/note/recorder.html`. The modal MUST have a header with "Recorder" tab label and a close button.

#### Scenario: Open recorder modal
- **WHEN** user navigates to the recorder page
- **THEN** a modal overlay appears with the recorder UI and recording starts automatically

#### Scenario: Close recorder
- **WHEN** user clicks the close button, clicks the overlay, or presses Escape
- **THEN** recording stops, the modal closes, and the user returns to the home page

### Requirement: Waveform visualization
The recorder modal SHALL display animated waveform bars that respond visually during recording and pause when stopped, matching the design's CSS animation pattern.

#### Scenario: Waveform animates during recording
- **WHEN** recording is active
- **THEN** the waveform bars animate with a pulsing scale effect

#### Scenario: Waveform pauses when stopped
- **WHEN** recording is stopped
- **THEN** the waveform bars freeze with reduced opacity

### Requirement: Recording timer
The recorder modal SHALL display a timer showing elapsed recording time in `MM:SS` format with tabular-nums font variant.

#### Scenario: Timer counts during recording
- **WHEN** recording is active
- **THEN** the timer increments every second starting from `00:00`

#### Scenario: Timer stops when recording stops
- **WHEN** user clicks the stop button
- **THEN** the timer freezes at the current elapsed time

### Requirement: Stop recording button
The recorder modal SHALL display a circular stop button with a red border and inner square. Clicking it MUST stop the active recording and Web Speech API transcription.

#### Scenario: Stop recording
- **WHEN** user clicks the stop button during active recording
- **THEN** recording stops, the status text changes to "Stopped", and the waveform pauses

### Requirement: Web Speech API transcription
The system SHALL use the browser's `SpeechRecognition` API (`webkitSpeechRecognition` fallback) with `continuous = true` and `interimResults = true` to transcribe speech to text in real-time. No audio files SHALL be stored.

#### Scenario: Successful transcription
- **WHEN** user speaks during active recording
- **THEN** the speech is transcribed to text via Web Speech API and the transcript is accumulated

#### Scenario: Browser does not support Speech API
- **WHEN** the browser does not support `SpeechRecognition` or `webkitSpeechRecognition`
- **THEN** the system displays a message indicating speech recognition is not supported and offers to create a text-only note

### Requirement: Retake recording
The recorder modal SHALL display a "Retake" button that resets the recording, timer, and transcript.

#### Scenario: Retake recording
- **WHEN** user clicks the "Retake" button
- **THEN** the timer resets to `00:00`, any accumulated transcript is cleared, and recording restarts

### Requirement: Create Note from recording
The recorder modal SHALL display a "Create Note" button that navigates to the note editor with the transcript pre-filled as content.

#### Scenario: Create note from transcript
- **WHEN** user clicks "Create Note" after recording
- **THEN** recording stops, the app navigates to the note editor (`/note/new`) with the transcribed text pre-filled in the content area
