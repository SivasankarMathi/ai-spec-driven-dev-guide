import { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import OnboardingSlide, { SLIDES } from '../components/onboarding/OnboardingSlide';
import Pagination from '../components/onboarding/Pagination';
import styles from '../components/onboarding/onboarding.module.css';

export default function OnboardingPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState<'left' | 'right' | undefined>();
  const touchStartX = useRef(0);
  const totalSlides = SLIDES.length;

  const goToSlide = useCallback((index: number) => {
    if (index < 0 || index >= totalSlides || index === currentSlide) return;
    setDirection(index > currentSlide ? 'left' : 'right');
    setCurrentSlide(index);
  }, [currentSlide, totalSlides]);

  // Auto-advance from splash after 2.5s
  useEffect(() => {
    if (currentSlide === 0) {
      const timer = setTimeout(() => goToSlide(1), 2500);
      return () => clearTimeout(timer);
    }
  }, [currentSlide, goToSlide]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') goToSlide(currentSlide + 1);
      if (e.key === 'ArrowLeft') goToSlide(currentSlide - 1);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide, goToSlide]);

  // Touch / swipe support
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) goToSlide(currentSlide + 1);
      else goToSlide(currentSlide - 1);
    }
  };

  const handleGetStarted = () => {
    localStorage.setItem('SyncNotess_has_visited', 'true');
    navigate(isAuthenticated ? '/home' : '/auth/signup');
  };

  const isLastSlide = currentSlide === totalSlides - 1;

  return (
    <div
      className={styles.onboardingContainer}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {SLIDES.map((_, i) => (
        <OnboardingSlide
          key={i}
          slideIndex={i}
          isActive={i === currentSlide}
          direction={i === currentSlide ? direction : undefined}
        />
      ))}

      <div className={styles.navControls}>
        {currentSlide > 0 && (
          <button
            type="button"
            className={`${styles.navControls__btn} ${styles['navControls__btn--prev']}`}
            onClick={() => goToSlide(currentSlide - 1)}
            aria-label="Previous slide"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
        )}

        <Pagination total={totalSlides} current={currentSlide} onDotClick={goToSlide} />

        {!isLastSlide && currentSlide > 0 && (
          <button
            type="button"
            className={`${styles.navControls__btn} ${styles['navControls__btn--next']}`}
            onClick={() => goToSlide(currentSlide + 1)}
            aria-label="Next slide"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        )}
      </div>

      {isLastSlide && (
        <button
          type="button"
          className={styles.btnGetStarted}
          onClick={handleGetStarted}
        >
          Get Started
        </button>
      )}

      {/* Click splash to advance */}
      {currentSlide === 0 && (
        <div
          style={{ position: 'absolute', inset: 0, cursor: 'pointer', zIndex: 5 }}
          onClick={() => goToSlide(1)}
        />
      )}
    </div>
  );
}
