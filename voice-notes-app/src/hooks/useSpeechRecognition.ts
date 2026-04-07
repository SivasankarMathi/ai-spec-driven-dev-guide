import { useState, useRef, useCallback, useEffect } from 'react';

interface SpeechRecognitionHook {
  isSupported: boolean;
  isListening: boolean;
  transcript: string;
  error: string | null;
  start: () => void;
  stop: () => void;
  reset: () => void;
}

interface SpeechRecognitionEvent {
  results: SpeechRecognitionResultList;
  resultIndex: number;
}

interface SpeechRecognitionErrorEvent {
  error: string;
  message: string;
}

type SpeechRecognitionInstance = {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
  abort: () => void;
};

function getSpeechRecognitionConstructor(): (new () => SpeechRecognitionInstance) | null {
  const w = window as unknown as Record<string, unknown>;
  if (w.SpeechRecognition) return w.SpeechRecognition as new () => SpeechRecognitionInstance;
  if (w.webkitSpeechRecognition) return w.webkitSpeechRecognition as new () => SpeechRecognitionInstance;
  return null;
}

export function useSpeechRecognition(): SpeechRecognitionHook {
  const SpeechRecognitionCtor = getSpeechRecognitionConstructor();
  const isSupported = SpeechRecognitionCtor !== null;

  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState<string | null>(null);
  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);
  const accumulatedRef = useRef('');

  const start = useCallback(() => {
    setError(null);

    if (!SpeechRecognitionCtor) {
      setError('Speech recognition is not supported in this browser. Please use Chrome or Edge.');
      return;
    }

    if (recognitionRef.current) {
      try { recognitionRef.current.abort(); } catch { /* ignore */ }
    }

    const recognition = new SpeechRecognitionCtor();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      console.log('[SpeechRecognition] onresult fired, results:', event.results.length);
      let finalTranscript = accumulatedRef.current;
      let interimTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        if (result.isFinal) {
          finalTranscript += result[0].transcript + ' ';
          accumulatedRef.current = finalTranscript;
          console.log('[SpeechRecognition] Final:', result[0].transcript);
        } else {
          interimTranscript += result[0].transcript;
          console.log('[SpeechRecognition] Interim:', result[0].transcript);
        }
      }

      setTranscript(finalTranscript + interimTranscript);
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      console.error('[SpeechRecognition] Error:', event.error, event.message);
      if (event.error === 'not-allowed') {
        setError('Microphone access denied. Please allow microphone permissions and try again.');
        setIsListening(false);
      } else if (event.error === 'no-speech') {
        setError('No speech detected. Please try speaking louder or check your microphone.');
      } else if (event.error === 'network') {
        setError('Network error. Speech recognition requires an internet connection.');
        setIsListening(false);
      } else if (event.error !== 'aborted') {
        setError(`Speech recognition error: ${event.error}`);
        setIsListening(false);
      }
    };

    recognition.onend = () => {
      console.log('[SpeechRecognition] onend fired, ref match:', recognitionRef.current === recognition);
      // Auto-restart if we're still supposed to be listening (browser may stop after silence)
      if (recognitionRef.current === recognition) {
        // Small delay to avoid "already started" errors
        setTimeout(() => {
          if (recognitionRef.current === recognition) {
            try {
              recognition.start();
              console.log('[SpeechRecognition] Auto-restarted');
            } catch {
              setIsListening(false);
            }
          }
        }, 50);
      } else {
        setIsListening(false);
      }
    };

    recognitionRef.current = recognition;
    try {
      recognition.start();
      setIsListening(true);
      console.log('[SpeechRecognition] Started successfully');
    } catch (e) {
      console.error('[SpeechRecognition] Failed to start:', e);
      setError('Failed to start speech recognition. Please check microphone permissions.');
      recognitionRef.current = null;
      setIsListening(false);
    }
  }, [SpeechRecognitionCtor]);

  const stop = useCallback(() => {
    const recognition = recognitionRef.current;
    recognitionRef.current = null; // Clear ref first to prevent auto-restart in onend
    if (recognition) {
      try { recognition.stop(); } catch { /* ignore */ }
    }
    setIsListening(false);
  }, []);

  const reset = useCallback(() => {
    stop();
    accumulatedRef.current = '';
    setTranscript('');
    setError(null);
  }, [stop]);

  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        try { recognitionRef.current.abort(); } catch { /* ignore */ }
      }
    };
  }, []);

  return { isSupported, isListening, transcript, error, start, stop, reset };
}
