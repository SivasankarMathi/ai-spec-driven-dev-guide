import React from 'react';
import styles from './onboarding.module.css';

interface PhoneMockupProps {
  children: React.ReactNode;
}

export default function PhoneMockup({ children }: PhoneMockupProps) {
  return (
    <div className={styles.phoneMockup}>
      <div className={styles.phoneMockup__frame}>
        <div className={styles.phoneMockup__notch} />
        <div className={styles.phoneMockup__screen}>
          {children}
        </div>
      </div>
    </div>
  );
}

/* Recording UI screen content */
export function RecordingScreen() {
  return (
    <div className={styles.recordingUi}>
      <div className={styles.recordingUi__status}>
        <span className={styles.recordingDot} />
        Recording
      </div>
      <div className={styles.waveform}>
        {Array.from({ length: 18 }, (_, i) => (
          <span
            key={i}
            className={styles.waveform__bar}
            style={{ '--h': `${20 + Math.random() * 60}%`, animationDelay: `${i * 0.1}s` } as React.CSSProperties}
          />
        ))}
      </div>
      <div className={styles.recordingUi__timer}>02:35</div>
      <div className={styles.recordingControls}>
        <button className={`${styles.recordingControls__btn} ${styles['recordingControls__btn--pause']}`} type="button">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
        </button>
        <button className={`${styles.recordingControls__btn} ${styles['recordingControls__btn--record']} ${styles['recordingControls__btn--active']}`} type="button">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="6" width="12" height="12" rx="2"/></svg>
        </button>
        <button className={`${styles.recordingControls__btn} ${styles['recordingControls__btn--play']}`} type="button">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="5,3 19,12 5,21"/></svg>
        </button>
      </div>
    </div>
  );
}

/* Transcription UI screen content */
export function TranscriptionScreen() {
  return (
    <div className={styles.transcriptionUi}>
      <div className={`${styles.waveform} ${styles['waveform--compact']}`}>
        {Array.from({ length: 12 }, (_, i) => (
          <span
            key={i}
            className={styles.waveform__bar}
            style={{ '--h': `${30 + Math.random() * 40}%`, animationDelay: `${i * 0.1}s` } as React.CSSProperties}
          />
        ))}
      </div>
      <div className={styles.aiCard}>
        <div className={styles.aiCard__badge}>
          <span className={styles.aiCard__icon}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
          </span>
          AI Enhanced
          <span className={styles.aiCard__sparkle}>✨</span>
        </div>
        <p className={styles.aiCard__text}>
          Your sync notes are automatically enhanced with AI for better clarity and structure.
        </p>
      </div>
    </div>
  );
}

/* Template UI screen content */
export function TemplateScreen() {
  return (
    <div className={styles.templateUi}>
      <div className={styles.templateUi__header}>
        <button className={styles.templateUi__back} type="button">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/></svg>
        </button>
        <span className={styles.templateUi__title}>Templates</span>
      </div>
      <div className={styles.templateList}>
        {[
          { icon: '📝', color: 'blue', title: 'Meeting Notes', subtitle: 'Capture key points' },
          { icon: '💡', color: 'purple', title: 'Ideas', subtitle: 'Quick brainstorm' },
          { icon: '📋', color: 'orange', title: 'To-Do List', subtitle: 'Track your tasks' },
        ].map((item) => (
          <div key={item.title} className={styles.templateItem}>
            <div className={`${styles.templateItem__icon} ${styles[`templateItem__icon--${item.color}`]}`}>
              {item.icon}
            </div>
            <div className={styles.templateItem__content}>
              <div className={styles.templateItem__title}>{item.title}</div>
              <div className={styles.templateItem__subtitle}>{item.subtitle}</div>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.templateUi__footer}>
        <div className={styles.templateUi__note}>Tap mic to start</div>
        <div className={styles.templateUi__subnote}>recording your notes</div>
        <div className={styles.micButton}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2" fill="none" stroke="white" strokeWidth="2"/><line x1="12" y1="19" x2="12" y2="23" stroke="white" strokeWidth="2"/></svg>
        </div>
        <div className={styles.handPointer}>👆</div>
      </div>
    </div>
  );
}
