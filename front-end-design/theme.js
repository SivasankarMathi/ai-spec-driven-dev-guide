/* ===================================
   Dark Mode Theme Toggle Logic
   =================================== */

class ThemeManager {
    constructor() {
        this.theme = this.getStoredTheme() || 'light';
        this.init();
    }

    init() {
        // Apply theme on page load
        this.applyTheme(this.theme);

        // Listen for theme toggle events
        document.addEventListener('DOMContentLoaded', () => {
            this.attachToggleListeners();
        });

        // Listen for system theme changes
        this.watchSystemTheme();
    }

    getStoredTheme() {
        return localStorage.getItem('theme');
    }

    setStoredTheme(theme) {
        localStorage.setItem('theme', theme);
    }

    applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        this.theme = theme;
        this.setStoredTheme(theme);
        
        // Update toggle button state if it exists
        this.updateToggleState();
    }

    toggleTheme() {
        const newTheme = this.theme === 'light' ? 'dark' : 'light';
        this.applyTheme(newTheme);
        
        // Dispatch custom event for other components
        window.dispatchEvent(new CustomEvent('themechange', { 
            detail: { theme: newTheme } 
        }));
    }

    attachToggleListeners() {
        // Attach to all theme toggle buttons
        const toggleButtons = document.querySelectorAll('.theme-toggle, .theme-toggle-fab');
        
        toggleButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                this.toggleTheme();
            });
        });
    }

    updateToggleState() {
        // Update any toggle buttons to reflect current theme
        const toggleButtons = document.querySelectorAll('.theme-toggle, .theme-toggle-fab');
        
        toggleButtons.forEach(button => {
            button.setAttribute('aria-label', `Switch to ${this.theme === 'light' ? 'dark' : 'light'} mode`);
        });
    }

    watchSystemTheme() {
        // Watch for system theme preference changes
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        
        mediaQuery.addEventListener('change', (e) => {
            // Only auto-switch if user hasn't manually set a preference
            if (!this.getStoredTheme()) {
                const systemTheme = e.matches ? 'dark' : 'light';
                this.applyTheme(systemTheme);
            }
        });
    }

    getSystemTheme() {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
}

// Initialize theme manager
const themeManager = new ThemeManager();

// Expose globally for debugging
window.themeManager = themeManager;
