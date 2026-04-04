/* =====================================================
   PREMIUM PORTFOLIO - JAVASCRIPT
   ===================================================== */

// ==========================================
// CONFIGURATION
// ==========================================
// Paste your Google Apps Script Web App URL below
const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzfvl818hZNGJOyzXkvNJ6tyjfvPqdr0rF1FpngBbSA1_73oKTgWj-KW1BCiADPDg_F/exec';

// ===== DOCUMENT READY =====
document.addEventListener('DOMContentLoaded', function () {
    initTheme();
    initLoader();
    initNavigation();
    initHeroAnimations();
    initScrollAnimations();
    initContactForm();
    initParticles();
    initAOS();
    initExperienceCalculator();

    // Setup Tracking Modules
    trackPageVisit();
    initClickTracking();
    initColorPicker();
});

// ===== LOADER ANIMATION =====
function initLoader() {
    const loaderWrapper = document.getElementById('loaderWrapper');
    setTimeout(() => {
        loaderWrapper.style.opacity = '0';
        loaderWrapper.style.visibility = 'hidden';
    }, 2200);
}

// ===== NAVIGATION =====
function initNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.getElementById('navbar');

    // Hamburger menu toggle
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close menu when link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // Update active link on scroll
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section');

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });

        // Navbar background on scroll
        const isLightMode = document.documentElement.getAttribute('data-theme') === 'light';
        if (window.scrollY > 100) {
            navbar.style.background = isLightMode ? 'rgba(255, 255, 255, 0.95)' : 'rgba(10, 14, 39, 0.95)';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = isLightMode ? 'rgba(255, 255, 255, 0.85)' : 'rgba(10, 14, 39, 0.7)';
            navbar.style.boxShadow = 'none';
        }
    });
}

// ===== HERO ANIMATIONS =====
function initHeroAnimations() {
    // Typing animation
    const typingText = document.querySelector('.typing-text');
    if (typingText) {
        typingText.style.animation = 'typing 4s steps(50, end), blink 0.7s infinite';
    }

    // Scroll to section on button click
    const scrollButtons = document.querySelectorAll('a[href^="#"]');
    scrollButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && document.querySelector(href)) {
                e.preventDefault();
                const element = document.querySelector(href);
                element.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// ===== SCROLL REVEAL ANIMATIONS =====
function initScrollAnimations() {
    const reveals = document.querySelectorAll('section > .container, .timeline-item, .project-card');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'reveal 0.8s ease-out forwards';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });

    reveals.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        observer.observe(element);
    });

    // Animate progress bars
    const progressBars = document.querySelectorAll('.progress-fill');
    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.style.width;
                entry.target.style.animation = `fillProgress 1.5s ease-out forwards`;
                progressObserver.unobserve(entry.target);
            }
        });
    });

    progressBars.forEach(bar => {
        progressObserver.observe(bar);
    });
}

// ===== PARTICLES ANIMATION =====
function initParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;

    // Create floating particles
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = Math.random() * 4 + 2 + 'px';
        particle.style.height = particle.style.width;
        particle.style.background = `rgba(0, 212, 255, ${Math.random() * 0.5 + 0.25})`;
        particle.style.borderRadius = '50%';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animation = `float ${Math.random() * 3 + 3}s ease-in-out infinite`;
        particle.style.animationDelay = Math.random() * 2 + 's';
        particlesContainer.appendChild(particle);
    }
}

// ===== CONTACT FORM & ANALYTICS =====
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;

    contactForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        const submitBtn = document.getElementById('submitBtn');
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        // Validation
        if (!name || !email || !message) {
            showFormStatus('Please fill in all fields', 'error');
            return;
        }

        if (!isValidEmail(email)) {
            showFormStatus('Please enter a valid email', 'error');
            return;
        }

        // Show loading state
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;

        try {
            if (!APPS_SCRIPT_URL || !APPS_SCRIPT_URL.startsWith('http')) {
                throw new Error("Apps Script URL not configured by user.");
            }

            await fetch(APPS_SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors',
                headers: { 'Content-Type': 'text/plain;charset=utf-8' },
                body: JSON.stringify({
                    action: 'contact',
                    name: name,
                    email: email,
                    message: message,
                    userAgent: navigator.userAgent
                })
            });

            showFormStatus('✓ Message sent successfully! I\'ll get back to you soon.', 'success');
            contactForm.reset();

        } catch (error) {
            console.error("Form error:", error);
            showFormStatus('✓ Message sent locally (Apps Script URL not active yet).', 'success');
            contactForm.reset();
        } finally {
            submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
            submitBtn.disabled = false;
        }
    });
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ===== ANALYTICS LOGGING =====
function trackPageVisit() {
    if (!APPS_SCRIPT_URL || !APPS_SCRIPT_URL.startsWith('http')) return;
    try {
        fetch(APPS_SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'text/plain;charset=utf-8' },
            body: JSON.stringify({
                action: 'visit',
                path: window.location.pathname + window.location.hash,
                host: window.location.hostname,
                userAgent: navigator.userAgent
            })
        });
    } catch (e) { }
}

function initClickTracking() {
    if (!APPS_SCRIPT_URL || !APPS_SCRIPT_URL.startsWith('http')) return;
    document.addEventListener('click', function (e) {
        let target = e.target;
        // Target buttons and links
        while (target && target.tagName !== 'A' && target.tagName !== 'BUTTON') {
            target = target.parentElement;
        }

        if (target && (target.tagName === 'A' || target.tagName === 'BUTTON')) {
            try {
                fetch(APPS_SCRIPT_URL, {
                    method: 'POST',
                    mode: 'no-cors',
                    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
                    body: JSON.stringify({
                        action: 'click',
                        elementTag: target.tagName,
                        elementData: target.innerText.trim() || target.id || target.href || 'Unknown feature',
                        userAgent: navigator.userAgent
                    })
                });
            } catch (error) { }
        }
    });
}

function showFormStatus(message, type) {
    const formStatus = document.getElementById('formStatus');
    formStatus.textContent = message;
    formStatus.className = `form-status ${type}`;

    // Remove status after 5 seconds
    setTimeout(() => {
        formStatus.className = 'form-status';
        formStatus.textContent = '';
    }, 5000);
}

// ===== INTERSECTION OBSERVER FOR AOS-LIKE EFFECTS =====
function initAOS() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe cards
    document.querySelectorAll('.skill-category, .project-card, .stat-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transition = 'opacity 0.6s ease-out';
        observer.observe(el);
    });
}

// ===== SMOOTH SCROLL BEHAVIOR =====
if (!('scrollBehavior' in document.documentElement.style)) {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href && href !== '#') {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
}

// ===== PERFORMANCE OPTIMIZATION =====
// Lazy load images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
}

// ===== UTILITY FUNCTIONS =====

// Copy to clipboard
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showFormStatus('Copied to clipboard!', 'success');
    }).catch(() => {
        showFormStatus('Failed to copy', 'error');
    });
}

// Format date
function formatDate(date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
}

// Debounce function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function
function throttle(func, limit) {
    let inThrottle;
    return function (...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ===== DOWNLOAD RESUME =====
document.querySelectorAll('a[href*="Resume.pdf"]').forEach(link => {
    link.addEventListener('click', function (e) {
        // Track download event (optional)
        console.log('Resume downloaded');
    });
});

// ===== KEYBOARD SHORTCUTS =====
document.addEventListener('keydown', function (event) {
    // Ctrl/Cmd + K to focus search (or jump to contact)
    if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
        event.preventDefault();
        document.getElementById('email').focus();
    }

    // Esc to close mobile menu
    if (event.key === 'Escape') {
        document.getElementById('navMenu').classList.remove('active');
    }
});

// ===== ANALYTICS PLACEHOLDER =====
function trackEvent(eventName, eventData = {}) {
    // You can add Google Analytics, Mixpanel, or similar here
    console.log('Event tracked:', eventName, eventData);
}

// Track page views
document.addEventListener('scroll', throttle(() => {
    const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    if (scrollPercent % 25 === 0) {
        trackEvent('scroll_milestone', { percentage: scrollPercent });
    }
}, 1000));

// ===== PRINT STYLES =====
window.addEventListener('beforeprint', () => {
    console.log('Document is being printed');
});

// ===== ERROR HANDLING =====
window.addEventListener('error', (event) => {
    console.error('JavaScript error:', event.error);
});

window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event.reason);
});

// ===== THEME TOGGLE =====
function initTheme() {
    const themeSwitch = document.getElementById('themeSwitch');
    if (!themeSwitch) return;

    const icon = themeSwitch.querySelector('i');

    // Check local storage or system preference
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
        document.documentElement.setAttribute('data-theme', currentTheme);
        if (currentTheme === 'light') {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
            document.getElementById('navbar').style.background = window.scrollY > 100 ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.85)';
        }
    }

    themeSwitch.addEventListener('click', () => {
        let theme = document.documentElement.getAttribute('data-theme');
        if (theme === 'light') {
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('theme', 'dark');
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
            document.getElementById('navbar').style.background = window.scrollY > 100 ? 'rgba(10, 14, 39, 0.95)' : 'rgba(10, 14, 39, 0.7)';
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
            document.getElementById('navbar').style.background = window.scrollY > 100 ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.85)';
        }
    });
}

// ===== COLOR THEME PICKER =====
function initColorPicker() {
    const colorPickerIcon = document.getElementById('colorPickerIcon');
    const colorPalette = document.getElementById('colorPalette');
    const colorPickerContainer = document.getElementById('colorPickerContainer');
    const swatches = document.querySelectorAll('.color-swatch');

    if (!colorPickerIcon || !colorPalette) return;

    // Toggle palette
    colorPickerIcon.addEventListener('click', (e) => {
        e.stopPropagation();
        colorPalette.classList.toggle('active');
    });

    // Close palette when clicking outside
    document.addEventListener('click', (e) => {
        if (colorPickerContainer && !colorPickerContainer.contains(e.target)) {
            colorPalette.classList.remove('active');
        }
    });

    // Handle color selection
    const savedColor = localStorage.getItem('themeColor') || 'blue';
    applyColor(savedColor);

    swatches.forEach(swatch => {
        swatch.addEventListener('click', function (e) {
            e.stopPropagation();
            const color = this.getAttribute('data-theme-color');
            applyColor(color);
            localStorage.setItem('themeColor', color);
            colorPalette.classList.remove('active');
        });
    });

    function applyColor(color) {
        document.documentElement.setAttribute('data-color', color);
        // Set active class
        swatches.forEach(s => s.classList.remove('active'));
        const activeSwatch = document.querySelector(`.color-swatch[data-theme-color="${color}"]`);
        if (activeSwatch) activeSwatch.classList.add('active');
    }
}

// ===== EXPERIENCE CALCULATOR =====
function initExperienceCalculator() {
    // Started January 2023
    const startDate = new Date('2023-01-01');
    const currentDate = new Date();

    let years = currentDate.getFullYear() - startDate.getFullYear();
    // Subtract 1 month as requested so we can append "+" 
    let months = currentDate.getMonth() - startDate.getMonth() - 1;

    if (months < 0) {
        years--;
        months += 12;
    }

    const summaryEl = document.getElementById('exp-summary');
    const statEl = document.getElementById('exp-stat');
    const heroExpEl = document.getElementById('hero-exp');

    if (summaryEl) {
        let expText = `${years} years`;
        if (months > 0) {
            expText += ` and ${months} months+`;
        } else {
            expText += `+`;
        }
        summaryEl.textContent = expText;
        summaryEl.style.color = "var(--primary-color)";
        summaryEl.style.fontWeight = "bold";
    }
    const totalDecimal = (years + (months / 12)).toFixed(1);

    if (statEl) {
        // Calculate decimal like 3.2+
        statEl.textContent = `${totalDecimal}+`;
    }

    if (heroExpEl) {
        heroExpEl.textContent = `${totalDecimal}+`;
    }
}

// ===== CONSOLE MESSAGE =====
console.log('%c🚀 Welcome to Ashvin Mori\'s Portfolio!', 'font-size: 20px; color: #00d4ff; font-weight: bold;');
console.log('%cLet\'s build something amazing together!', 'font-size: 14px; color: #7c3aed;');
