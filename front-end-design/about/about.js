/* ===================================
   About Page Interactions
   =================================== */

// Scroll-triggered animations
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Optional: stop observing once visible
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all scroll-triggered elements
document.addEventListener('DOMContentLoaded', () => {
    const scrollElements = document.querySelectorAll('[data-scroll]');
    scrollElements.forEach(el => observer.observe(el));
});

// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Parallax effect on hero number elements (subtle)
let ticking = false;

function updateParallax() {
    const scrolled = window.pageYOffset;
    const storyNumbers = document.querySelectorAll('.story-number');
    
    storyNumbers.forEach((number, index) => {
        const speed = 0.3;
        const yPos = -(scrolled * speed);
        number.style.transform = `translateY(${yPos}px)`;
    });
    
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
    }
});

// Add micro-interaction: scale on hover for team member avatars
const teamMembers = document.querySelectorAll('.team-member-visual');
teamMembers.forEach(member => {
    member.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05) rotate(5deg)';
        this.style.transition = 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)';
    });
    
    member.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1) rotate(0deg)';
    });
});

// Number counter animation for stats
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16); // 60fps
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = formatStatNumber(target);
            clearInterval(timer);
        } else {
            element.textContent = formatStatNumber(Math.floor(current));
        }
    }, 16);
}

function formatStatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M+';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(0) + 'K+';
    }
    return num.toString();
}

// Trigger counter animations when stats section becomes visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statItems = document.querySelectorAll('.stat-item');
            
            statItems.forEach((item, index) => {
                const numberElement = item.querySelector('.stat-number');
                const text = numberElement.textContent;
                
                // Extract number from text (e.g., "2.4M+" -> 2400000)
                let targetNumber;
                if (text.includes('M+')) {
                    targetNumber = parseFloat(text) * 1000000;
                } else if (text.includes('K+')) {
                    targetNumber = parseFloat(text) * 1000;
                } else if (text.includes('%')) {
                    targetNumber = parseFloat(text);
                    numberElement.dataset.suffix = '%';
                } else if (text.includes('/')) {
                    // For "24/7" type stats, skip animation
                    return;
                }
                
                if (targetNumber) {
                    numberElement.textContent = '0';
                    setTimeout(() => {
                        animateCounter(numberElement, targetNumber, 2000);
                    }, index * 100);
                }
            });
            
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// Easter egg: Konami code
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode.splice(-konamiSequence.length - 1, konamiCode.length - konamiSequence.length);
    
    if (konamiCode.join('') === konamiSequence.join('')) {
        // Add a fun animation or message
        document.body.style.animation = 'rainbow 2s linear infinite';
        
        // Create temporary style for rainbow effect
        const style = document.createElement('style');
        style.textContent = `
            @keyframes rainbow {
                0% { filter: hue-rotate(0deg); }
                100% { filter: hue-rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
        
        setTimeout(() => {
            document.body.style.animation = '';
            style.remove();
        }, 2000);
    }
});
