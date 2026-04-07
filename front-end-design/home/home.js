// Home Screen Controller
document.addEventListener('DOMContentLoaded', () => {

    // ===== Content Tabs (Notes / My Checklist) =====
    const contentTabs = document.querySelectorAll('.content-tabs__tab');
    const notesPanel = document.getElementById('notes-panel');
    const checklistPanel = document.getElementById('checklist-panel');

    contentTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Update active tab
            contentTabs.forEach(t => t.classList.remove('content-tabs__tab--active'));
            tab.classList.add('content-tabs__tab--active');

            // Switch panels
            const target = tab.dataset.content;
            if (target === 'notes') {
                notesPanel.classList.add('content-panel--active');
                checklistPanel.classList.remove('content-panel--active');
            } else {
                notesPanel.classList.remove('content-panel--active');
                checklistPanel.classList.add('content-panel--active');
            }
        });
    });

    // ===== FAB (Floating Action Button) =====
    const fabContainer = document.getElementById('fab-container');
    const fabBtn = document.getElementById('fab-btn');
    let fabOpen = false;

    // Create overlay element
    const overlay = document.createElement('div');
    overlay.classList.add('fab-overlay');
    document.body.appendChild(overlay);

    function toggleFab() {
        fabOpen = !fabOpen;
        fabContainer.classList.toggle('fab-container--open', fabOpen);
        overlay.classList.toggle('fab-overlay--visible', fabOpen);
    }

    fabBtn.addEventListener('click', toggleFab);
    overlay.addEventListener('click', () => {
        if (fabOpen) toggleFab();
    });

    // FAB menu actions
    document.querySelectorAll('.fab-menu__item').forEach(item => {
        item.addEventListener('click', () => {
            const action = item.dataset.action;
            console.log(`FAB action: ${action}`);
            toggleFab();
            if (action === 'voice') {
                window.location.href = '../note/recorder.html';
            } else if (action === 'text') {
                window.location.href = '../note/editor.html';
            }
        });
    });

    // ===== Sidebar Toggle =====
    const sidebar = document.getElementById('sidebar');
    const sidebarToggle = document.getElementById('sidebar-toggle');

    sidebarToggle.addEventListener('click', () => {
        sidebar.classList.toggle('sidebar--collapsed');
        // Persist preference
        const isCollapsed = sidebar.classList.contains('sidebar--collapsed');
        localStorage.setItem('sidebar-collapsed', isCollapsed);
    });

    // Restore sidebar state from localStorage
    if (localStorage.getItem('sidebar-collapsed') === 'true') {
        sidebar.classList.add('sidebar--collapsed');
    }

    // ===== Navigation (Sidebar + Bottom Nav) =====
    const sidebarLinks = document.querySelectorAll('.sidebar__link');
    const bottomNavItems = document.querySelectorAll('.bottom-nav__item');

    function setActiveNav(tab) {
        // Update sidebar
        sidebarLinks.forEach(link => {
            link.classList.toggle('sidebar__link--active', link.dataset.tab === tab);
        });
        // Update bottom nav
        bottomNavItems.forEach(item => {
            item.classList.toggle('bottom-nav__item--active', item.dataset.tab === tab);
        });
        console.log(`Navigate to: ${tab}`);
    }

    sidebarLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            if (link.dataset.tab === 'settings') {
                // Let the href navigate to settings page
                return;
            }
            e.preventDefault();
            setActiveNav(link.dataset.tab);
        });
    });

    bottomNavItems.forEach(item => {
        item.addEventListener('click', (e) => {
            if (item.dataset.tab === 'settings') {
                // Let the href navigate to settings page
                return;
            }
            e.preventDefault();
            setActiveNav(item.dataset.tab);
        });
    });

    // ===== Search =====
    const searchInput = document.getElementById('search-input');
    let searchTimeout;

    searchInput.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            const query = e.target.value.trim().toLowerCase();
            console.log(`Search: ${query}`);
            filterNotes(query);
        }, 300);
    });

    function filterNotes(query) {
        const cards = document.querySelectorAll('.note-card');
        cards.forEach(card => {
            const title = card.querySelector('.note-card__title').textContent.toLowerCase();
            const body = card.querySelector('.note-card__body').textContent.toLowerCase();
            const matches = !query || title.includes(query) || body.includes(query);
            card.style.display = matches ? '' : 'none';
        });
    }

    // ===== Play Button =====
    document.querySelectorAll('.note-card__play').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent card click
            const noteId = btn.closest('.note-card').dataset.noteId;
            console.log(`Play audio for note: ${noteId}`);
        });
    });

    // ===== Note Card Click =====
    document.querySelectorAll('.note-card').forEach(card => {
        card.addEventListener('click', () => {
            const noteId = card.dataset.noteId;
            window.location.href = `../note/editor.html?id=${noteId}`;
        });
    });

    // ===== Close FAB on Escape =====
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && fabOpen) {
            toggleFab();
        }
    });
});
