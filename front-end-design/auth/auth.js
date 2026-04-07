// Simple navigation between sign up and sign in forms
document.addEventListener('DOMContentLoaded', () => {
    const signupContainer = document.getElementById('signup-container');
    const signinContainer = document.getElementById('signin-container');
    
    // Handle navigation links
    document.querySelectorAll('[data-navigate]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = e.target.dataset.navigate;
            
            if (target === 'signin') {
                signupContainer.style.display = 'none';
                signinContainer.style.display = 'flex';
            } else if (target === 'signup') {
                signinContainer.style.display = 'none';
                signupContainer.style.display = 'flex';
            }
        });
    });
    
    // Password toggle functionality
    document.querySelectorAll('.password-toggle').forEach(button => {
        button.addEventListener('click', () => {
            const targetId = button.dataset.target;
            const input = document.getElementById(targetId);
            
            if (input.type === 'password') {
                input.type = 'text';
                button.setAttribute('aria-label', 'Hide password');
            } else {
                input.type = 'password';
                button.setAttribute('aria-label', 'Show password');
            }
        });
    });
    
    // Form submission handlers (placeholder - implement actual logic)
    document.getElementById('signup-form').addEventListener('submit', (e) => {
        e.preventDefault();
        console.log('Sign up form submitted');
        window.location.href = '../onboarding/onboarding.html';
    });
    
    document.getElementById('signin-form').addEventListener('submit', (e) => {
        e.preventDefault();
        console.log('Sign in form submitted');
        window.location.href = '../home/home.html';
    });
    
    // OAuth button handlers (placeholder - implement actual logic)
    document.querySelectorAll('[data-provider]').forEach(button => {
        button.addEventListener('click', () => {
            const provider = button.dataset.provider;
            console.log(`${provider} OAuth initiated`);
            // Add your OAuth logic here
        });
    });
});
