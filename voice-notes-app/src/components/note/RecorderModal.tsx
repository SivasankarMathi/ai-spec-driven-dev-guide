import { useState, useEffect, useRef, useCallback } from 'react';
import { useSpeechRecognition } from '../../hooks/useSpeechRecognition';
import { formatTimer } from '../../utils/dateFormatter';
import Waveform from './Waveform';
import styles from './recorder.module.css';

interface RecorderModalProps {
  onClose: () => void;
  onCreateNote: (transcript: string) => void;
}

export default function RecorderModal({ onClose, onCreateNote }: RecorderModalProps) {
  const { isSupported, isListening, transcript, error, start, stop, reset } = useSpeechRecognition();
  const [seconds, setSeconds] = useState(0);
  const [isRecording, setIsRecording] = useState(true);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Start recording on mount (with delay to handle React StrictMode double-mount)
  useEffect(() => {
    const timer = setTimeout(() => {
      start();
    }, 100);
    return () => {
      clearTimeout(timer);
      stop();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Timer
  useEffect(() => {
    if (isRecording) {
      intervalRef.current = setInterval(() => {
        setSeconds((s) => s + 1);
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRecording]);

  const handleStop = useCallback(() => {
    stop();
    setIsRecording(false);
  }, [stop]);

  const handleRetake = useCallback(() => {
    reset();
    setSeconds(0);
    setIsRecording(true);
    start();
  }, [reset, start]);

  const handleCreateNote = useCallback(() => {
    console.log('[RecorderModal] Creating note with transcript:', JSON.stringify(transcript));
    stop();
    onCreateNote(transcript);
  }, [stop, transcript, onCreateNote]);

  return (
    <>
      <div className={styles.recorderOverlay} onClick={onClose} />
      <div className={styles.recorderModal}>
        <div className={styles.recorderModal__header}>
          <div className={styles.recorderModal__tabs}>
            <button className={`${styles.recorderModal__tab} ${styles.recorderModal__tabActive}`}>
              Recorder
            </button>
          </div>
          <button className={styles.recorderModal__close} onClick={onClose} aria-label="Close">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className={styles.recorderModal__waveform}>
          <Waveform isRecording={isRecording} />
        </div>

        <div className={styles.recorderModal__status}>
          <div className={styles.recorderModal__statusText}>
            {!isSupported
              ? 'Speech recognition not supported in this browser'
              : error
                ? error
                : isRecording
                  ? (isListening ? 'Listening...' : 'Starting...')
                  : 'Stopped'}
          </div>
          <div className={styles.recorderModal__timer}>{formatTimer(seconds)}</div>
        </div>

        {transcript && (
          <div className={styles.recorderModal__transcript}>
            {transcript}
          </div>
        )}

        <div className={styles.recorderModal__controls}>
          <button
            className={`${styles.stopBtn} ${isRecording ? styles.stopBtnRecording : ''}`}
            onClick={handleStop}
            aria-label="Stop recording"
          >
            <div className={styles.stopBtn__inner} />
          </button>
        </div>

        <div className={styles.recorderModal__actions}>
          <button className={styles.btnRetake} onClick={handleRetake}>
            Retake
          </button>
          <button className={styles.btnCreateNote} onClick={handleCreateNote}>
            Create Note
          </button>
        </div>
      </div>
    </>
  );
}
