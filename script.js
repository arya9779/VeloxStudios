/**
 * Velox Labs - Website Interactions
 * Premium, smooth animations and interactions
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all modules
    initNavbar();
    initMobileNav();
    initScrollAnimations();
    initSmoothScroll();
});

/**
 * Navbar scroll effect
 */
function initNavbar() {
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        // Add scrolled class when scrolled past threshold
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    }, { passive: true });
}

/**
 * Mobile navigation toggle
 */
function initMobileNav() {
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    const navLinkItems = navLinks.querySelectorAll('a');

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });

    // Close mobile nav when clicking a link
    navLinkItems.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Close on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navLinks.classList.contains('active')) {
            navToggle.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

/**
 * Scroll-triggered animations using Intersection Observer
 */
function initScrollAnimations() {
    // Add data-animate attribute to elements that should animate
    const animatableElements = document.querySelectorAll(
        '.feature-card, .process-card, .service-card-new, .section-header, .contact-wrapper, .pricing-content'
    );

    animatableElements.forEach(el => {
        el.setAttribute('data-animate', '');
    });

    // Create observer
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -100px 0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optionally unobserve after animation
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all animatable elements
    document.querySelectorAll('[data-animate]').forEach(el => {
        observer.observe(el);
    });

    // Stagger animations for grid items
    staggerAnimations('.features-grid', '.feature-card', 100);
    staggerAnimations('.process-grid', '.process-card', 100);
    staggerAnimations('.services-grid-new', '.service-card-new', 100);
}

/**
 * Add staggered delay to grid items
 */
function staggerAnimations(containerSelector, itemSelector, delayMs) {
    const containers = document.querySelectorAll(containerSelector);

    containers.forEach(container => {
        const items = container.querySelectorAll(itemSelector);
        items.forEach((item, index) => {
            item.style.transitionDelay = `${index * delayMs}ms`;
        });
    });
}

/**
 * Smooth scroll for anchor links
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');

            if (targetId === '#') return;

            const target = document.querySelector(targetId);
            if (target) {
                const navbarHeight = document.getElementById('navbar').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Add hover effect to cards (optional enhancement)
 */
function initCardHoverEffects() {
    const cards = document.querySelectorAll('.value-card, .service-card, .work-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });
}

/**
 * Parallax effect for hero section (subtle)
 */
function initParallax() {
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-container');

    if (!hero || !heroContent) return;

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.3;

        if (scrolled < window.innerHeight) {
            heroContent.style.transform = `translateY(${rate}px)`;
            heroContent.style.opacity = 1 - (scrolled / window.innerHeight) * 0.5;
        }
    }, { passive: true });
}

/**
 * Contact form AJAX submission (no redirect!)
 */
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitBtn = form.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerHTML;

        // Show loading state
        submitBtn.disabled = true;
        submitBtn.innerHTML = 'Sending...';

        try {
            const formData = new FormData(form);

            const response = await fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                // Success! Show message and reset form
                showSuccessMessage(form);
                form.reset();

                // Reset all floating labels
                form.querySelectorAll('input, textarea').forEach(input => {
                    input.blur();
                });
            } else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            showErrorMessage(form);
        } finally {
            // Reset button
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnText;
        }
    });
}

/**
 * Show success message
 */
function showSuccessMessage(form) {
    const message = document.createElement('div');
    message.className = 'form-message success';
    message.innerHTML = `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M20 6L9 17L4 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <span>Thank you! Your message has been sent. We'll get back to you soon.</span>
    `;

    // Remove any existing messages
    const existingMessage = form.querySelector('.form-message');
    if (existingMessage) existingMessage.remove();

    // Insert message
    form.insertBefore(message, form.firstChild);

    // Scroll to message
    message.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

    // Auto-remove after 8 seconds
    setTimeout(() => {
        message.style.opacity = '0';
        setTimeout(() => message.remove(), 300);
    }, 8000);
}

/**
 * Show error message
 */
function showErrorMessage(form) {
    const message = document.createElement('div');
    message.className = 'form-message error';
    message.innerHTML = `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
            <path d="M12 8v4M12 16h.01" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
        <span>Oops! Something went wrong. Please try again or email us directly at veloxstudios@outlook.com</span>
    `;

    // Remove any existing messages
    const existingMessage = form.querySelector('.form-message');
    if (existingMessage) existingMessage.remove();

    // Insert message
    form.insertBefore(message, form.firstChild);

    // Scroll to message
    message.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Initialize form
initContactForm();

// Initialize parallax effect
initParallax();
