// Recorder Modal Controller
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('recorder-modal');
    const overlay = document.getElementById('recorder-overlay');
    const closeBtn = document.getElementById('recorder-close');
    const stopBtn = document.getElementById('stop-btn');
    const retakeBtn = document.getElementById('retake-btn');
    const createNoteBtn = document.getElementById('create-note-btn');
    const statusText = document.getElementById('recorder-status');
    const timerEl = document.getElementById('recorder-timer');
    const waveform = document.getElementById('waveform');

    let isRecording = true;
    let seconds = 0;
    let timerInterval = null;

    // ===== Timer =====
    function startTimer() {
        seconds = 0;
        updateTimerDisplay();
        timerInterval = setInterval(() => {
            seconds++;
            updateTimerDisplay();
        }, 1000);
    }

    function stopTimer() {
        clearInterval(timerInterval);
        timerInterval = null;
    }

    function updateTimerDisplay() {
        const mins = String(Math.floor(seconds / 60)).padStart(2, '0');
        const secs = String(seconds % 60).padStart(2, '0');
        timerEl.textContent = `${mins}:${secs}`;
    }

    // ===== Recording State =====
    function setRecording(recording) {
        isRecording = recording;
        if (recording) {
            statusText.textContent = 'Listening...';
            stopBtn.classList.add('stop-btn--recording');
            waveform.classList.remove('waveform--paused');
            startTimer();
        } else {
            statusText.textContent = 'Stopped';
            stopBtn.classList.remove('stop-btn--recording');
            waveform.classList.add('waveform--paused');
            stopTimer();
        }
    }

    // ===== Stop Button =====
    stopBtn.addEventListener('click', () => {
        if (isRecording) {
            setRecording(false);
        }
    });

    // ===== Retake =====
    retakeBtn.addEventListener('click', () => {
        stopTimer();
        setRecording(true);
        console.log('Retake recording');
    });

    // ===== Create Note =====
    createNoteBtn.addEventListener('click', () => {
        stopTimer();
        console.log(`Create note from recording (${seconds}s)`);
        // Navigate to note editor
        window.location.href = 'editor.html';
    });

    // ===== Close Modal =====
    function closeModal() {
        stopTimer();
        window.location.href = '../home/home.html';
    }

    closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', closeModal);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });

    // ===== Init: Start recording =====
    setRecording(true);
});
