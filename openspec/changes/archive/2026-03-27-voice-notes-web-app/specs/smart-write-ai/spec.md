## ADDED Requirements

### Requirement: AI enhancement via OpenRouter
When Smart Write is enabled and the user triggers enhancement, the system SHALL send the current note content to OpenRouter's chat completions API using the model specified in `VITE_OPENROUTER_MODEL` (default: `openai/gpt-4.1`) and the API key from `VITE_OPENROUTER_API_KEY`.

#### Scenario: Successful AI enhancement
- **WHEN** Smart Write is toggled on and user clicks the Enhance button
- **THEN** the system sends the note content to OpenRouter with a system prompt to rewrite and enhance the text, and displays the enhanced version in the editor

#### Scenario: API key not configured
- **WHEN** user tries to enhance but `VITE_OPENROUTER_API_KEY` is empty or not set
- **THEN** the system displays an error message: "API key not configured. Please set VITE_OPENROUTER_API_KEY in your .env file."

#### Scenario: API request fails
- **WHEN** the OpenRouter API request fails (network error, rate limit, invalid key)
- **THEN** the system displays an error toast with the failure reason and the original content remains unchanged

### Requirement: Enhance button visibility
When Smart Write toggle is enabled, an "Enhance" button SHALL appear in the editor UI. When Smart Write is disabled, the button MUST be hidden.

#### Scenario: Toggle enables Enhance button
- **WHEN** user turns on the Smart Write toggle
- **THEN** an "Enhance" button becomes visible in the editor

#### Scenario: Toggle disables Enhance button
- **WHEN** user turns off the Smart Write toggle
- **THEN** the Enhance button is hidden

### Requirement: Review enhanced content before saving
After AI enhancement, the user MUST be able to review the enhanced text and choose to accept or revert to the original.

#### Scenario: Accept enhanced content
- **WHEN** the enhanced text is displayed and user continues editing or saves
- **THEN** the enhanced text becomes the current note content

#### Scenario: Revert to original content
- **WHEN** the enhanced text is displayed and user clicks a "Revert" or "Undo" action
- **THEN** the content reverts to the pre-enhancement version

### Requirement: Loading state during enhancement
While the API request is in progress, the system SHALL display a loading indicator and disable the Enhance button to prevent duplicate requests.

#### Scenario: Loading state
- **WHEN** the Enhance button is clicked and the API request is pending
- **THEN** a loading spinner or indicator is shown and the Enhance button is disabled

### Requirement: Configurable model and API key
The OpenRouter model and API key SHALL be configurable via environment variables in a `.env` file at the project root.

#### Scenario: Custom model configuration
- **WHEN** `VITE_OPENROUTER_MODEL` is set to a different model name in `.env`
- **THEN** the system uses that model for AI enhancement requests
