/**
 * Note Editor — editor.js
 * Handles back navigation, Smart Write toggle, tag management,
 * toolbar actions, placeholder behaviour, and auto-save.
 *
 * React component mapping:
 *   .editor-layout      → <EditorPage />
 *   .editor-topbar       → <EditorTopBar />
 *   .editor-topbar__back → <BackButton />
 *   .editor-topbar__btn  → <ToolbarButton />
 *   .editor-meta         → <EditorMeta />
 *   .toggle              → <ToggleSwitch />
 *   .tag-list            → <TagList />
 *   .tag                 → <Tag />
 *   .tag-add             → <AddTagButton />
 *   .editor-title        → <TitleInput />
 *   .editor-content      → <ContentEditor />
 */

(function () {
    'use strict';

    /* ============================
       DOM References
       ============================ */
    const backBtn = document.getElementById('back-btn');
    const pinBtn = document.getElementById('pin-btn');
    const aiBtn = document.getElementById('ai-btn');
    const shareBtn = document.getElementById('share-btn');
    const moreBtn = document.getElementById('more-btn');
    const smartWriteToggle = document.getElementById('smart-write');
    const tagList = document.getElementById('tag-list');
    const addTagBtn = document.getElementById('add-tag-btn');
    const titleInput = document.getElementById('editor-title');
    const contentEditor = document.getElementById('editor-content');

    /* ============================
       State
       ============================ */
    let isPinned = false;
    let autoSaveTimer = null;
    const AUTO_SAVE_DELAY = 2000; // ms

    /* ============================
       Back Navigation
       ============================ */
    function handleBack() {
        if (window.history.length > 1) {
            window.history.back();
        } else {
            window.location.href = '../home/home.html';
        }
    }

    if (backBtn) {
        backBtn.addEventListener('click', handleBack);
    }

    /* ============================
       Pin Toggle
       ============================ */
    function handlePin() {
        isPinned = !isPinned;
        pinBtn.classList.toggle('editor-topbar__btn--active', isPinned);
        pinBtn.setAttribute('aria-pressed', isPinned);
        console.log('[Editor] Pin:', isPinned ? 'on' : 'off');
    }

    if (pinBtn) {
        pinBtn.addEventListener('click', handlePin);
    }

    /* ============================
       AI Assist
       ============================ */
    function handleAI() {
        console.log('[Editor] AI assist triggered');
        // Placeholder — will open AI suggestion panel in React
    }

    if (aiBtn) {
        aiBtn.addEventListener('click', handleAI);
    }

    /* ============================
       Share / Copy
       ============================ */
    async function handleShare() {
        const title = titleInput ? titleInput.value : '';
        const body = contentEditor ? contentEditor.innerText : '';
        const text = `${title}\n\n${body}`.trim();

        if (navigator.share) {
            try {
                await navigator.share({ title, text });
            } catch (err) {
                if (err.name !== 'AbortError') {
                    console.error('[Editor] Share failed:', err);
                }
            }
        } else if (navigator.clipboard) {
            try {
                await navigator.clipboard.writeText(text);
                showToast('Copied to clipboard');
            } catch (err) {
                console.error('[Editor] Copy failed:', err);
            }
        }
    }

    if (shareBtn) {
        shareBtn.addEventListener('click', handleShare);
    }

    /* ============================
       More (Kebab) Menu
       ============================ */
    function handleMore() {
        console.log('[Editor] More menu opened');
        // Placeholder — will render <MoreMenu /> dropdown in React
    }

    if (moreBtn) {
        moreBtn.addEventListener('click', handleMore);
    }

    /* ============================
       Smart Write Toggle
       ============================ */
    function handleSmartWrite() {
        const isOn = smartWriteToggle.checked;
        console.log('[Editor] Smart Write:', isOn ? 'enabled' : 'disabled');
        // Placeholder — enable/disable AI writing assistance
    }

    if (smartWriteToggle) {
        smartWriteToggle.addEventListener('change', handleSmartWrite);
    }

    /* ============================
       Tag Management
       ============================ */
    function createTag(label, color) {
        const span = document.createElement('span');
        span.className = `tag tag--${color}`;
        span.textContent = label;
        return span;
    }

    function handleAddTag() {
        const name = prompt('Enter tag name:');
        if (!name || !name.trim()) return;

        const colors = ['yellow', 'blue'];
        const existing = tagList.querySelectorAll('.tag');
        const color = colors[existing.length % colors.length];
        const tag = createTag(name.trim(), color);

        // Insert before the add button
        tagList.insertBefore(tag, addTagBtn);
        scheduleAutoSave();
        console.log('[Editor] Tag added:', name.trim());
    }

    if (addTagBtn) {
        addTagBtn.addEventListener('click', handleAddTag);
    }

    /* ============================
       Content Placeholder
       ============================ */
    // The placeholder is handled via CSS :empty::before, but we need
    // to handle the edge case of only <br> in contenteditable.
    function cleanContentPlaceholder() {
        if (!contentEditor) return;
        if (contentEditor.innerHTML === '<br>' || contentEditor.innerHTML === '<div><br></div>') {
            contentEditor.innerHTML = '';
        }
    }

    if (contentEditor) {
        contentEditor.addEventListener('blur', cleanContentPlaceholder);
    }

    /* ============================
       Auto-Save
       ============================ */
    function scheduleAutoSave() {
        if (autoSaveTimer) clearTimeout(autoSaveTimer);
        autoSaveTimer = setTimeout(saveNote, AUTO_SAVE_DELAY);
    }

    function saveNote() {
        const title = titleInput ? titleInput.value : '';
        const body = contentEditor ? contentEditor.innerHTML : '';
        console.log('[Editor] Auto-saved:', { title, bodyLength: body.length });
        // Placeholder — send to API or persist to localStorage
    }

    if (titleInput) {
        titleInput.addEventListener('input', scheduleAutoSave);
    }

    if (contentEditor) {
        contentEditor.addEventListener('input', function () {
            cleanContentPlaceholder();
            scheduleAutoSave();
        });
    }

    /* ============================
       Toast Notification
       ============================ */
    function showToast(message) {
        // Create a brief bottom toast
        const toast = document.createElement('div');
        toast.textContent = message;
        Object.assign(toast.style, {
            position: 'fixed',
            bottom: '24px',
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

    /* ============================
       Keyboard Shortcut — Save
       ============================ */
    document.addEventListener('keydown', function (e) {
        if ((e.ctrlKey || e.metaKey) && e.key === 's') {
            e.preventDefault();
            saveNote();
            showToast('Note saved');
        }
    });

    /* ============================
       Init — Set Today's Date
       ============================ */
    const dateEl = document.getElementById('editor-date');
    if (dateEl) {
        const now = new Date();
        const dd = String(now.getDate()).padStart(2, '0');
        const mm = String(now.getMonth() + 1).padStart(2, '0');
        const yy = String(now.getFullYear()).slice(-2);
        dateEl.textContent = `${mm}/${dd}/${yy}`;
    }

})();
