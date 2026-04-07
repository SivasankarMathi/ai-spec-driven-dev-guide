/**
 * Settings Page — settings.js
 * Handles view navigation (Settings → Profile / Appearance),
 * sidebar toggle, change-password modal, and preference persistence.
 *
 * React component mapping:
 *   .app-layout          → <AppLayout />
 *   .sidebar             → <Sidebar />
 *   .settings-view       → <SettingsMain /> | <ProfileView /> | <AppearanceView />
 *   .user-card           → <UserCard />
 *   .settings-menu       → <SettingsMenu />
 *   .logout-btn          → <LogOutButton />
 *   .profile-row         → <ProfileRow />
 *   .profile-avatar      → <ProfileAvatar />
 *   .appearance-row      → <AppearanceRow />
 *   .appearance-select   → <AppearanceSelect />
 *   .modal-overlay       → <ChangePasswordModal />
 *   .password-form       → <ChangePasswordForm />
 *   .bottom-nav          → <BottomNav />
 */

(function () {
    'use strict';

    /* ============================
       DOM References
       ============================ */
    // Views
    const viewSettings   = document.getElementById('view-settings');
    const viewProfile    = document.getElementById('view-profile');
    const viewAppearance = document.getElementById('view-appearance');
    const allViews       = [viewSettings, viewProfile, viewAppearance];

    // Navigation triggers
    const menuItems = document.querySelectorAll('.settings-menu__item[data-navigate]');
    const backBtns  = document.querySelectorAll('[data-back]');

    // Password modal
    const passwordModal  = document.getElementById('password-modal');
    const openModalBtn   = document.getElementById('open-password-modal');
    const cancelModalBtn = document.getElementById('modal-cancel');
    const passwordForm   = document.getElementById('password-form');

    // Sidebar
    const sidebar       = document.getElementById('sidebar');
    const sidebarToggle = document.getElementById('sidebar-toggle');

    // Log out
    const logoutBtn = document.getElementById('logout-btn');

    // Appearance controls
    const themeSelect = document.getElementById('theme-select');
    const fontSelect  = document.getElementById('font-select');

    // Profile
    const usernameInput = document.getElementById('username-input');

    /* ============================
       View History Stack
       ============================ */
    let viewHistory = ['settings'];

    /* ============================
       View Navigation
       ============================ */
    function showView(viewName) {
        allViews.forEach(v => v.classList.remove('settings-view--active'));

        const target = document.getElementById('view-' + viewName);
        if (target) {
            target.classList.add('settings-view--active');
        }
    }

    function navigateTo(viewName) {
        viewHistory.push(viewName);
        showView(viewName);
    }

    function goBack() {
        if (viewHistory.length > 1) {
            viewHistory.pop();
            const prev = viewHistory[viewHistory.length - 1];
            showView(prev);
        }
    }

    // Menu items → sub-views
    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            const target = item.getAttribute('data-navigate');
            if (target) navigateTo(target);
        });

        // Also handle Enter/Space for keyboard
        item.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                item.click();
            }
        });
    });

    // Back buttons
    backBtns.forEach(btn => {
        btn.addEventListener('click', goBack);
    });

    /* ============================
       Change Password Modal
       ============================ */
    function openModal() {
        passwordModal.classList.add('modal-overlay--active');
        document.body.style.overflow = 'hidden';
        // Focus first input
        const firstInput = passwordModal.querySelector('input[type="password"]');
        if (firstInput) setTimeout(() => firstInput.focus(), 100);
    }

    function closeModal() {
        passwordModal.classList.remove('modal-overlay--active');
        document.body.style.overflow = '';
        passwordForm.reset();
    }

    if (openModalBtn) {
        openModalBtn.addEventListener('click', openModal);
        openModalBtn.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openModal();
            }
        });
    }

    if (cancelModalBtn) {
        cancelModalBtn.addEventListener('click', closeModal);
    }

    // Close on overlay click
    if (passwordModal) {
        passwordModal.addEventListener('click', (e) => {
            if (e.target === passwordModal) closeModal();
        });
    }

    // Close on Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && passwordModal.classList.contains('modal-overlay--active')) {
            closeModal();
        }
    });

    // Form submit
    if (passwordForm) {
        passwordForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const current = document.getElementById('pw-current').value;
            const newPw   = document.getElementById('pw-new').value;
            const confirm = document.getElementById('pw-confirm').value;

            if (!current || !newPw || !confirm) {
                alert('Please fill in all fields.');
                return;
            }

            if (newPw !== confirm) {
                alert('New passwords do not match.');
                return;
            }

            if (newPw.length < 8) {
                alert('Password must be at least 8 characters.');
                return;
            }

            console.log('[Settings] Password change submitted');
            showToast('Password updated successfully');
            closeModal();
        });
    }

    /* ============================
       Sidebar Toggle
       ============================ */
    function initSidebar() {
        const collapsed = localStorage.getItem('sidebar-collapsed') === 'true';
        if (collapsed && sidebar) {
            sidebar.classList.add('sidebar--collapsed');
        }
    }

    if (sidebarToggle && sidebar) {
        sidebarToggle.addEventListener('click', () => {
            sidebar.classList.toggle('sidebar--collapsed');
            const isCollapsed = sidebar.classList.contains('sidebar--collapsed');
            localStorage.setItem('sidebar-collapsed', isCollapsed);
        });
    }

    initSidebar();

    /* ============================
       Log Out
       ============================ */
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            const confirmed = confirm('Are you sure you want to log out?');
            if (confirmed) {
                console.log('[Settings] User logged out');
                window.location.href = '../auth/auth.html';
            }
        });
    }

    /* ============================
       Appearance — Theme
       ============================ */
    function initTheme() {
        const saved = localStorage.getItem('theme');
        if (saved && themeSelect) {
            themeSelect.value = saved;
        }
    }

    if (themeSelect) {
        themeSelect.addEventListener('change', () => {
            const value = themeSelect.value;
            localStorage.setItem('theme', value);
            console.log('[Settings] Theme changed to:', value);
            // Placeholder — apply theme class to body in React
        });
    }

    initTheme();

    /* ============================
       Appearance — Font Size
       ============================ */
    function initFontSize() {
        const saved = localStorage.getItem('fontSize');
        if (saved && fontSelect) {
            fontSelect.value = saved;
        }
    }

    if (fontSelect) {
        fontSelect.addEventListener('change', () => {
            const value = fontSelect.value;
            localStorage.setItem('fontSize', value);
            console.log('[Settings] Font size changed to:', value);
            // Placeholder — update root font-size in React
        });
    }

    initFontSize();

    /* ============================
       Profile — Username Save
       ============================ */
    if (usernameInput) {
        usernameInput.addEventListener('change', () => {
            const value = usernameInput.value.trim();
            if (value) {
                localStorage.setItem('username', value);
                console.log('[Settings] Username updated:', value);
            }
        });
    }

    /* ============================
       Toast Notification
       ============================ */
    function showToast(message) {
        const toast = document.createElement('div');
        toast.textContent = message;
        Object.assign(toast.style, {
            position: 'fixed',
            bottom: '80px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: '#1A1A1A',
            color: '#fff',
            padding: '10px 20px',
            borderRadius: '8px',
            fontSize: '14px',
            zIndex: '9999',
            opacity: '0',
            transition: 'opacity 250ms ease'
        });
        document.body.appendChild(toast);
        requestAnimationFrame(() => { toast.style.opacity = '1'; });
        setTimeout(() => {
            toast.style.opacity = '0';
            setTimeout(() => toast.remove(), 300);
        }, 2000);
    }

})();
