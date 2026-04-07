import PhoneMockup, { RecordingScreen, TranscriptionScreen, TemplateScreen } from './PhoneMockup';
import styles from './onboarding.module.css';

interface OnboardingSlideProps {
  slideIndex: number;
  isActive: boolean;
  direction?: 'left' | 'right';
}

const SLIDES = [
  {
    type: 'splash' as const,
    title: 'Sync Notes',
  },
  {
    type: 'feature' as const,
    title: 'Voice Capture',
    description: 'Record your thoughts naturally and let our app convert them to text instantly.',
    screen: <RecordingScreen />,
  },
  {
    type: 'feature' as const,
    title: 'AI Transcription',
    description: 'Advanced AI enhances your notes with perfect grammar and smart formatting.',
    screen: <TranscriptionScreen />,
  },
  {
    type: 'feature' as const,
    title: 'Note Template',
    description: 'Choose from beautiful templates to organize your notes your way.',
    screen: <TemplateScreen />,
  },
];

export { SLIDES };

export default function OnboardingSlide({ slideIndex, isActive, direction }: OnboardingSlideProps) {
  const slide = SLIDES[slideIndex];
  const dirClass = direction === 'left' ? styles.slideLeft : direction === 'right' ? styles.slideRight : '';

  if (slide.type === 'splash') {
    return (
      <div
        className={`${styles.onboardingSlide} ${isActive ? styles['onboardingSlide--active'] : ''} ${dirClass}`}
        data-slide={slideIndex + 1}
      >
        <div className={styles.splashScreen}>
          <h1 className={styles.splashScreen__title}>{slide.title}</h1>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`${styles.onboardingSlide} ${isActive ? styles['onboardingSlide--active'] : ''} ${dirClass}`}
      data-slide={slideIndex + 1}
    >
      <div className={styles.featureContent}>
        <PhoneMockup>{slide.screen}</PhoneMockup>
        <div className={styles.featureInfo}>
          <h2 className={styles.featureInfo__title}>{slide.title}</h2>
          <p className={styles.featureInfo__description}>{slide.description}</p>
        </div>
      </div>
    </div>
  );
}
