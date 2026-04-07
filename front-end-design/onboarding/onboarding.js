// Onboarding Carousel Controller
document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.onboarding-slide');
    const dots = document.querySelectorAll('.pagination__dot');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const getStartedBtn = document.getElementById('get-started-btn');
    let currentSlide = 1;
    const totalSlides = slides.length;

    // Auto-advance from splash screen after 2.5s
    const splashTimer = setTimeout(() => {
        if (currentSlide === 1) {
            goToSlide(2);
        }
    }, 2500);

    // Navigate to a specific slide
    function goToSlide(slideNum) {
        if (slideNum < 1 || slideNum > totalSlides) return;

        const direction = slideNum > currentSlide ? 'right' : 'left';

        // Hide current slide
        slides.forEach(slide => {
            slide.classList.remove('onboarding-slide--active', 'slide-left', 'slide-right');
        });

        // Update dots
        dots.forEach(dot => dot.classList.remove('pagination__dot--active'));
        dots[slideNum - 1].classList.add('pagination__dot--active');

        // Show new slide with animation
        const newSlide = document.querySelector(`[data-slide="${slideNum}"]`);
        newSlide.classList.add('onboarding-slide--active');
        newSlide.classList.add(direction === 'right' ? 'slide-right' : 'slide-left');

        // Update nav buttons visibility
        updateNavButtons(slideNum);

        currentSlide = slideNum;
    }

    // Show/hide prev, next, and Get Started based on current slide
    function updateNavButtons(slideNum) {
        // Previous button: hidden on slide 1
        prevBtn.style.display = slideNum <= 1 ? 'none' : 'flex';

        // Last slide: hide next, show Get Started
        if (slideNum === totalSlides) {
            nextBtn.style.display = 'none';
            getStartedBtn.style.display = 'block';
            getStartedBtn.style.animation = 'fadeIn 0.5s ease-out';
        } else {
            nextBtn.style.display = 'flex';
            getStartedBtn.style.display = 'none';
        }
    }

    // Previous button
    prevBtn.addEventListener('click', () => {
        clearTimeout(splashTimer);
        if (currentSlide > 1) goToSlide(currentSlide - 1);
    });

    // Next button
    nextBtn.addEventListener('click', () => {
        clearTimeout(splashTimer);
        if (currentSlide < totalSlides) goToSlide(currentSlide + 1);
    });

    // Dot click navigation
    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            clearTimeout(splashTimer);
            const target = parseInt(dot.dataset.slide);
            if (target !== currentSlide) {
                goToSlide(target);
            }
        });
    });

    // Get Started button handler
    getStartedBtn.addEventListener('click', () => {
        console.log('Get Started clicked — navigate to auth or main app');
        window.location.href = '../auth/auth.html';
    });

    // Initial state
    updateNavButtons(1);

    // Swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    const swipeThreshold = 50;

    document.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    document.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });

    function handleSwipe() {
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) < swipeThreshold) return;

        clearTimeout(splashTimer);

        if (diff > 0 && currentSlide < totalSlides) {
            // Swipe left — next slide
            goToSlide(currentSlide + 1);
        } else if (diff < 0 && currentSlide > 1) {
            // Swipe right — previous slide
            goToSlide(currentSlide - 1);
        }
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        clearTimeout(splashTimer);

        if (e.key === 'ArrowRight' && currentSlide < totalSlides) {
            goToSlide(currentSlide + 1);
        } else if (e.key === 'ArrowLeft' && currentSlide > 1) {
            goToSlide(currentSlide - 1);
        }
    });

    // Click anywhere on splash screen to advance
    const splashScreen = document.querySelector('.splash-screen');
    if (splashScreen) {
        splashScreen.addEventListener('click', () => {
            clearTimeout(splashTimer);
            goToSlide(2);
        });
    }
});
