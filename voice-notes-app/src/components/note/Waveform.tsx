import { useMemo } from 'react';
import styles from './recorder.module.css';

interface WaveformProps {
  isRecording: boolean;
}

export default function Waveform({ isRecording }: WaveformProps) {
  const bars = useMemo(() => {
    return Array.from({ length: 30 }, (_, i) => {
      const height = 20 + Math.random() * 60;
      return { id: i, height };
    });
  }, []);

  return (
    <div className={`${styles.waveform} ${!isRecording ? styles.waveformPaused : ''}`}>
      {bars.map((bar) => (
        <div
          key={bar.id}
          className={styles.waveform__bar}
          style={{ '--h': `${bar.height}%` } as React.CSSProperties}
        />
      ))}
    </div>
  );
}
