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
    initThemePicker(); // Replaced initTheme with initThemePicker
    initLoader();
    initCustomCursor();
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
    initAIAssistant();
    initAIMatchmaker();
    initPersonaProfiler();
    initAIConsole();
    initTerminal();
});

// ===== AI ASSISTANT WIDGET =====
function initAIAssistant() {
    const toggleBtn = document.getElementById('ai-toggle-btn');
    const closeBtn = document.getElementById('ai-close-btn');
    const chatWindow = document.getElementById('ai-chat-window');
    const form = document.getElementById('ai-form');
    const input = document.getElementById('ai-input');
    const messages = document.getElementById('ai-messages');

    if (!toggleBtn || !chatWindow) return;

    // Toggle logic
    toggleBtn.addEventListener('click', () => {
        chatWindow.classList.toggle('hidden');
        if (!chatWindow.classList.contains('hidden')) {
            chatWindow.classList.add('flex');
            input.focus();
        } else {
            chatWindow.classList.remove('flex');
        }
    });

    closeBtn.addEventListener('click', () => {
        chatWindow.classList.add('hidden');
        chatWindow.classList.remove('flex');
    });

    // Helper to add messages
    function addMessage(text, isUser = false) {
        const msgDiv = document.createElement('div');
        msgDiv.className = isUser
            ? 'bg-primary text-bgDark rounded-xl rounded-tr-sm p-3 self-end max-w-[85%] font-semibold'
            : 'bg-white/5 border border-white/5 rounded-xl rounded-tl-sm p-3 text-white self-start max-w-[85%]';

        // Typing effect for AI
        if (!isUser) {
            msgDiv.innerHTML = '<span class="flex gap-1 items-center h-4"><span class="w-1.5 h-1.5 bg-primary rounded-full animate-bounce"></span><span class="w-1.5 h-1.5 bg-primary rounded-full animate-bounce delay-75"></span><span class="w-1.5 h-1.5 bg-primary rounded-full animate-bounce delay-150"></span></span>';
            messages.appendChild(msgDiv);
            messages.scrollTop = messages.scrollHeight;

            setTimeout(() => {
                msgDiv.innerHTML = text;
                messages.scrollTop = messages.scrollHeight;
            }, 1000 + Math.random() * 1000);
        } else {
            msgDiv.textContent = text;
            messages.appendChild(msgDiv);
            messages.scrollTop = messages.scrollHeight;
        }
    }

    // AI State Machine
    let awaitingEmail = false;
    let pendingQuestion = "";

    function extractEmail(text) {
        const match = text.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/);
        return match ? match[0] : null;
    }

    // AI Knowledge Base Engine
    async function handleAIInteraction(userText) {
        const q = userText.toLowerCase();

        // Handle Email Capture State
        if (awaitingEmail) {
            const email = extractEmail(userText);
            if (email) {
                // Send the captured email and original question to Google Apps Script silently
                if (APPS_SCRIPT_URL && APPS_SCRIPT_URL.startsWith('http')) {
                    fetch(APPS_SCRIPT_URL, {
                        method: 'POST',
                        mode: 'no-cors',
                        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
                        body: JSON.stringify({
                            action: 'contact',
                            name: 'AI Chat Visitor',
                            email: email,
                            message: `[AI Chat Generated] Question: "${pendingQuestion}"`,
                            userAgent: navigator.userAgent
                        })
                    }).catch(err => console.log('AI background sync error', err));
                }

                awaitingEmail = false;
                pendingQuestion = "";
                addMessage("Ashvin will contact you! Is there anything else you'd like to ask about Ashvin?", false);
                return;
            } else {
                addMessage("Please provide a valid email address so Ashvin can get back to you, or feel free to ask another question about his skills!", false);
                return;
            }
        }

        // Standard Knowledge Base
        let response = "";
        if (q.includes('skill') || q.includes('tech') || q.includes('stack')) {
            response = "Ashvin is a Full-Stack expert! He specializes in C#, .NET Core, Angular, React, and Azure. He also uses AI tools like Copilot heavily.";
        } else if (q.includes('experience') || q.includes('work') || q.includes('job')) {
            response = "Ashvin has 3.5+ years of experience! Right now, he's a Senior .NET Developer at Welspun Transformation Services building Biometric/Azure apps.";
        } else if (q.includes('project') || q.includes('portfolio')) {
            response = "He has built over 15+ massive projects, including a Visitor Management System with Azure Face API and a huge CRM system!";
        } else if (q.includes('contact') || q.includes('hire') || q.includes('email')) {
            response = `I'd love to connect! You can reach Ashvin directly via email. <br><br> <a href="mailto:moriashvin892001@gmail.com" class="inline-flex items-center gap-2 mt-1 px-4 py-2 bg-gradient-to-r from-primary to-accent text-[#050810] rounded-lg text-xs font-bold hover:scale-105 hover:shadow-[0_0_15px_var(--primary-color)] transition-all shadow-lg"><i class="fas fa-paper-plane"></i> Send Email Now</a>`;
        } else if (q.includes('resume') || q.includes('cv')) {
            response = `You can safely download his full PDF resume right here! <br><br> <a href="resume/Ashvin_Mori_Resume.pdf" target="_blank" class="inline-flex items-center gap-2 mt-1 px-4 py-2 bg-gradient-to-r from-primary to-accent text-[#050810] rounded-lg text-xs font-bold hover:scale-105 hover:shadow-[0_0_15px_var(--primary-color)] transition-all shadow-lg"><i class="fas fa-file-pdf"></i> Download Resume</a>`;
        } else if (q.includes('hello') || q.includes('hi ') || q === 'hi' || q.includes('hey')) {
            response = "Hello there! I'm Ashvin-GPT. Ask me to summarize his resume, his tech stack, or his projects!";
        } else if (q.includes('who are you') || q.includes('ai') || q.includes('bot')) {
            response = "I am a custom AI Assistant widget built explicitly for this portfolio to help you learn about Ashvin faster!";
        } else {
            // UNKNOWN QUESTION - Request Email
            awaitingEmail = true;
            pendingQuestion = userText;
            response = "I don't have the exact answer for that! If you provide your email address right here, I will send your question directly to Ashvin and he will contact you!";
        }

        addMessage(response, false);
    }

    // Handle send
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const text = input.value.trim();
        if (!text) return;

        // Add user message to UI
        addMessage(text, true);
        input.value = '';

        // Process intelligently
        handleAIInteraction(text);
    });
}

// ===== CUSTOM CURSOR =====
function initCustomCursor() {
    const cursorOutline = document.getElementById('cursorOutline');

    if (!cursorOutline) return;

    // Check if it's a touch device, ignore if so
    if (window.matchMedia("(max-width: 768px)").matches) return;

    window.addEventListener('mousemove', function (e) {
        const posX = e.clientX;
        const posY = e.clientY;

        cursorOutline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 500, fill: "forwards" });
    });

    const clickables = document.querySelectorAll('a, button, input, textarea, .nav-link, .color-swatch, .theme-switch, .social-icon, .btn');
    clickables.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorOutline.classList.add('hover');
        });
        el.addEventListener('mouseleave', () => {
            cursorOutline.classList.remove('hover');
        });
    });
}

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
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.getElementById('navbar');

    if (!hamburger || !mobileMenu) return;

    // Hamburger menu toggle
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        
        if (hamburger.classList.contains('active')) {
            mobileMenu.classList.remove('invisible', 'opacity-0', 'translate-y-4');
            mobileMenu.classList.add('visible', 'opacity-100', 'translate-y-0');
        } else {
            mobileMenu.classList.add('invisible', 'opacity-0', 'translate-y-4');
            mobileMenu.classList.remove('visible', 'opacity-100', 'translate-y-0');
        }
    });

    // Close menu when link is clicked
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            mobileMenu.classList.add('invisible', 'opacity-0', 'translate-y-4');
            mobileMenu.classList.remove('visible', 'opacity-100', 'translate-y-0');
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

        // Update Full Pill Border Progress
        const borderProgress = document.getElementById('nav-border-progress');
        if (borderProgress) {
            const scrollPercent = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
            const pathLength = borderProgress.getTotalLength() || 2000;
            
            borderProgress.style.strokeDasharray = pathLength;
            borderProgress.style.strokeDashoffset = pathLength - (scrollPercent * pathLength);
        }

        // Floating Pill Navbar Transition
        const navContainer = document.getElementById('nav-pill-container');
        if (window.scrollY > 50) {
            navbar.style.top = '12px';
            if (navContainer) {
                navContainer.style.background = 'var(--bg-card)';
                navContainer.style.boxShadow = '0 10px 40px rgba(0, 0, 0, 0.4)';
                navContainer.style.borderColor = 'transparent'; // Let the SVG handle the color
            }
        } else {
            navbar.style.top = '24px';
            if (navContainer) {
                navContainer.style.background = 'var(--bg-card)';
                navContainer.style.boxShadow = '0 20px 50px rgba(0, 0, 0, 0.3)';
                navContainer.style.borderColor = 'var(--border-color)';
            }
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

// ===== ADVANCED INTERACTIVE PARTICLES ANIMATION =====
function initParticles() {
    const canvas = document.getElementById('particlesCanvas');
    if (!canvas) {
        // If the wrapper is still a div, inject a canvas inside it
        const container = document.getElementById('particles');
        if (!container) return;
        container.innerHTML = '<canvas id="particlesCanvas" style="width:100%; height:100%; display:block;"></canvas>';
        initParticles();
        return;
    }

    const ctx = canvas.getContext('2d');
    let particlesArray = [];

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let mouse = { x: null, y: null, radius: 150 };

    window.addEventListener('mousemove', function (event) {
        mouse.x = event.x;
        mouse.y = event.y;
    });

    window.addEventListener('mouseout', function () {
        mouse.x = undefined;
        mouse.y = undefined;
    });

    class Particle {
        constructor(x, y, directionX, directionY, size, color) {
            this.x = x;
            this.y = y;
            this.directionX = directionX;
            this.directionY = directionY;
            this.size = size;
            this.color = color;
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
            ctx.fillStyle = this.color;
            ctx.fill();
        }
        update() {
            if (this.x > canvas.width || this.x < 0) this.directionX = -this.directionX;
            if (this.y > canvas.height || this.y < 0) this.directionY = -this.directionY;

            // Mouse interaction
            let dx = mouse.x - this.x;
            let dy = mouse.y - this.y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < mouse.radius + this.size) {
                if (mouse.x < this.x && this.x < canvas.width - this.size * 10) this.x += 3;
                if (mouse.x > this.x && this.x > this.size * 10) this.x -= 3;
                if (mouse.y < this.y && this.y < canvas.height - this.size * 10) this.y += 3;
                if (mouse.y > this.y && this.y > this.size * 10) this.y -= 3;
            }
            this.x += this.directionX;
            this.y += this.directionY;
            this.draw();
        }
    }

    function init() {
        particlesArray = [];
        let numberOfParticles = (canvas.height * canvas.width) / 15000;
        const colorVal = getComputedStyle(document.documentElement).getPropertyValue('--primary-color').trim() || '#00d4ff';

        for (let i = 0; i < numberOfParticles; i++) {
            let size = (Math.random() * 2) + 1;
            let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
            let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
            let directionX = (Math.random() * 1) - 0.5;
            let directionY = (Math.random() * 1) - 0.5;
            let color = colorVal;
            particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
        }
    }

    function connect() {
        let opacityValue = 1;
        const colorVal = getComputedStyle(document.documentElement).getPropertyValue('--primary-color').trim() || '#00d4ff';
        // Convert hex to rgb string for lines
        let r = 0, g = 212, b = 255;
        if (colorVal.startsWith('#')) {
            const hex = colorVal.replace('#', '');
            if (hex.length === 6) {
                r = parseInt(hex.substring(0, 2), 16);
                g = parseInt(hex.substring(2, 4), 16);
                b = parseInt(hex.substring(4, 6), 16);
            }
        }

        for (let a = 0; a < particlesArray.length; a++) {
            for (let bInd = a; bInd < particlesArray.length; bInd++) {
                let distance = ((particlesArray[a].x - particlesArray[bInd].x) * (particlesArray[a].x - particlesArray[bInd].x))
                    + ((particlesArray[a].y - particlesArray[bInd].y) * (particlesArray[a].y - particlesArray[bInd].y));

                if (distance < (canvas.width / 7) * (canvas.height / 7)) {
                    opacityValue = 1 - (distance / 20000);
                    ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${opacityValue * 0.2})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                    ctx.lineTo(particlesArray[bInd].x, particlesArray[bInd].y);
                    ctx.stroke();
                }
            }
        }
    }

    function animate() {
        requestAnimationFrame(animate);
        ctx.clearRect(0, 0, innerWidth, innerHeight);
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
        }
        connect();
    }

    window.addEventListener('resize', function () {
        canvas.width = innerWidth;
        canvas.height = innerHeight;
        init();
    });

    // Handle theme color change seamlessly
    const observer = new MutationObserver(() => {
        const newColor = getComputedStyle(document.documentElement).getPropertyValue('--primary-color').trim();
        particlesArray.forEach(p => p.color = newColor);
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-color'] });

    init();
    animate();
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

// ===== AI MATCHMAKER WIZARD =====
function initAIMatchmaker() {
    const trigger = document.getElementById('matchmaker-trigger');
    const modal = document.getElementById('matchmaker-modal');
    const content = document.getElementById('matchmaker-content');
    const cancel = document.getElementById('matchmaker-cancel');
    const matchBtn = document.getElementById('matchmaker-btn');
    const input = document.getElementById('matchmaker-input');
    const status = document.getElementById('matchmaker-status');

    if (!trigger || !modal) return;

    // Open Modal
    trigger.addEventListener('click', () => {
        modal.classList.remove('hidden');
        modal.classList.add('flex');
        setTimeout(() => {
            content.classList.remove('scale-95', 'opacity-0');
            content.classList.add('scale-100', 'opacity-100');
            input.focus();
        }, 10);
    });

    // Close Modal
    const closeModal = () => {
        content.classList.remove('scale-100', 'opacity-100');
        content.classList.add('scale-95', 'opacity-0');
        setTimeout(() => {
            modal.classList.remove('flex');
            modal.classList.add('hidden');
        }, 300);
    };

    cancel.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    // Scan & Match Logic
    matchBtn.addEventListener('click', () => {
        const query = input.value.trim().toLowerCase();
        if (!query) return;

        status.classList.remove('hidden');
        matchBtn.disabled = true;
        matchBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';

        setTimeout(() => {
            closeModal();
            performMatching(query);
            
            // Reset button
            status.classList.add('hidden');
            matchBtn.disabled = false;
            matchBtn.innerHTML = 'Scan & Match <i class="fas fa-search"></i>';
        }, 2000);
    });

    function performMatching(query) {
        const keywords = query.split(/[\s,]+/).filter(k => k.length > 2);
        const matchableSelectors = [
            '#projects .grid > div', 
            '#projects .md\\:col-span-2 > div',
            '#skills .grid > div'
        ];
        
        const items = document.querySelectorAll(matchableSelectors.join(','));
        let foundAny = false;

        items.forEach(item => {
            const text = item.innerText.toLowerCase();
            const isMatch = keywords.some(key => text.includes(key));
            
            if (isMatch) {
                foundAny = true;
                item.style.transition = 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
                item.style.opacity = '1';
                item.style.transform = 'scale(1.05)';
                item.style.borderColor = 'var(--primary-color)';
                item.style.boxShadow = '0 0 30px var(--primary-color)';
                item.style.zIndex = '50';
                
                // Scroll first match into view
                if (foundAny && !window.hasScrolledToMatch) {
                    item.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    window.hasScrolledToMatch = true;
                }
            } else {
                item.style.transition = 'all 0.6s ease';
                item.style.opacity = '0.15';
                item.style.filter = 'grayscale(1) blur(2px)';
                item.style.transform = 'scale(0.9)';
                item.style.pointerEvents = 'none';
            }
        });

        window.hasScrolledToMatch = false;

        // Show a "Reset AI Filter" floating button if we matched anything
        if (foundAny) {
            showResetButton();
        }
    }

    function showResetButton() {
        if (document.getElementById('ai-reset-filter')) return;
        
        const resetBtn = document.createElement('button');
        resetBtn.id = 'ai-reset-filter';
        resetBtn.className = 'fixed top-24 left-1/2 -translate-x-1/2 z-[60] px-6 py-3 bg-primary text-bgDark font-bold rounded-full shadow-2xl hover:scale-110 transition-all flex items-center gap-2 animate-bounce';
        resetBtn.innerHTML = '<i class="fas fa-undo"></i> Reset AI Filter';
        
        resetBtn.onclick = () => {
            const items = document.querySelectorAll('#projects div, #skills div');
            items.forEach(item => {
                item.style.opacity = '';
                item.style.transform = '';
                item.style.borderColor = '';
                item.style.boxShadow = '';
                item.style.filter = '';
                item.style.pointerEvents = '';
                item.style.zIndex = '';
            });
            resetBtn.remove();
        };
        
        document.body.appendChild(resetBtn);
    }
}

// ===== THEME PICKER =====
function initThemePicker() {
    const themePickerIcon = document.getElementById('themePickerIcon');
    const themePalette = document.getElementById('themePalette');
    const themePickerContainer = document.getElementById('themePickerContainer');
    const themeOptions = document.querySelectorAll('.theme-option');

    if (!themePickerIcon || !themePalette) return;

    // Load saved theme
    const savedTheme = localStorage.getItem('userTheme') || 'black-blue';
    setTheme(savedTheme);

    // Toggle dropdown
    themePickerIcon.addEventListener('click', (e) => {
        e.stopPropagation();
        themePalette.classList.toggle('active'); // In case CSS active is used, or just visibility
        if (themePalette.classList.contains('active')) {
            themePalette.style.opacity = '1';
            themePalette.style.visibility = 'visible';
            themePalette.style.transform = 'translateY(0)';
        } else {
            themePalette.style.opacity = '0';
            themePalette.style.visibility = 'hidden';
            themePalette.style.transform = 'translateY(10px)';
        }
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
        if (themePickerContainer && !themePickerContainer.contains(e.target)) {
            themePalette.style.opacity = '0';
            themePalette.style.visibility = 'hidden';
            themePalette.style.transform = 'translateY(10px)';
            themePalette.classList.remove('active');
        }
    });

    // Handle theme selection
    themeOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.stopPropagation();
            const themeName = this.getAttribute('data-theme-name');
            setTheme(themeName);
            localStorage.setItem('userTheme', themeName);
            
            // Highlight active option
            themeOptions.forEach(opt => opt.classList.remove('text-primary'));
            this.classList.add('text-primary');

            // Hide palette
            themePalette.style.opacity = '0';
            themePalette.style.visibility = 'hidden';
            themePalette.style.transform = 'translateY(10px)';
            themePalette.classList.remove('active');
        });
    });

    function setTheme(themeName) {
        document.documentElement.setAttribute('data-theme', themeName);
        
        // Refresh cursor color since it uses var(--primary-color)
        const cursor = document.getElementById('cursorOutline');
        if(cursor) {
            cursor.style.borderColor = getComputedStyle(document.documentElement).getPropertyValue('--primary-color');
        }
    }
}

// ===== AI PERSONA PROFILER =====
function initPersonaProfiler() {
    const personaBtns = document.querySelectorAll('.persona-btn');
    const content = document.getElementById('persona-content');
    
    if (!personaBtns.length || !content) return;

    const personas = {
        general: `
            <p class="text-xl md:text-2xl text-textSecondary leading-relaxed md:leading-relaxed mb-6">
                I'm a results-driven Full-Stack developer with <span class="text-textPrimary font-bold inline-block border-b-2 border-primary">3.5+ years</span> of hands-on experience building enterprise-grade software. My focus combines robust C# backends, dynamic Angular/React frontends, and scalable Azure cloud architectures.
            </p>
            <p class="text-lg text-textSecondary/80">
                Fascinated by the intersection of Software Engineering and AI, I harness tools like ChatGPT and GitHub Copilot to accelerate shipping cycles while maintaining pristine code quality.
            </p>`,
        cto: `
            <p class="text-xl md:text-2xl text-textSecondary leading-relaxed md:leading-relaxed mb-6">
                Technical leader specializing in <span class="text-textPrimary font-bold inline-block border-b-2 border-primary">Scalable .NET Ecosystems</span>. I architect high-availability systems that bridge the gap between complex business logic and cloud-native performance.
            </p>
            <p class="text-lg text-textSecondary/80">
                My approach focuses on architectural integrity, rigorous automated testing, and proactive technical debt management, ensuring 100% uptime for mission-critical VMS and CRM platforms.
            </p>`,
        recruiter: `
            <p class="text-xl md:text-2xl text-textSecondary leading-relaxed md:leading-relaxed mb-6">
                Proven Full-Stack Engineer with <span class="text-textPrimary font-bold inline-block border-b-2 border-primary">3.5+ Years of Tenure</span>. I have a track record of delivering over 15+ high-priority software projects from inception to production deployment.
            </p>
            <p class="text-lg text-textSecondary/80">
                Highly adaptable, communicative, and skilled in Agile methodologies. I bring a combination of rapid problem-solving and expertise in modern C#, Angular, and Azure cloud suites.
            </p>`,
        dev: `
            <p class="text-xl md:text-2xl text-textSecondary leading-relaxed md:leading-relaxed mb-6">
                Passionate coder dedicated to <span class="text-textPrimary font-bold inline-block border-b-2 border-primary">Clean Code & Solid Principles</span>. I live in the .NET ecosystem, optimizing LINQ queries, Refactoring legacy modules, and crafting beautiful RxJS streams.
            </p>
            <p class="text-lg text-textSecondary/80">
                Current Stack: .NET Core 8, Angular 17, Azure Functions, and Docker. I leverage AI to automate boilerplate, giving me more time to solve deep engineering challenges.
            </p>`
    };

    personaBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const type = btn.getAttribute('data-persona');
            
            // Update active button
            personaBtns.forEach(b => {
                b.classList.remove('active', 'bg-primary', 'text-bgDark');
                b.classList.add('bg-bgCard', 'text-textSecondary', 'border-borderColor');
            });
            btn.classList.add('active', 'bg-primary', 'text-bgDark');
            btn.classList.remove('bg-bgCard', 'text-textSecondary', 'border-borderColor');

            // Apply transition and update text
            content.style.opacity = '0';
            content.style.transform = 'translateY(10px)';
            
            setTimeout(() => {
                content.innerHTML = personas[type];
                content.style.opacity = '1';
                content.style.transform = 'translateY(0)';
            }, 300);
        });
    });
}

// ===== AI BACKGROUND CONSOLE =====
function initAIConsole() {
    const logContainer = document.getElementById('ai-console-logs');
    if (!logContainer) return;

    const logMessages = [
        "Analyzing .NET 8 Performance Metrics...",
        "Optimizing LINQ execution plans...",
        "Scanning Azure cloud environment...",
        "Synchronizing local CRM data modules...",
        "Detecting potential memory leaks... CLEAN",
        "Updating AI Matchmaker knowledge base...",
        "status: ALL SYSTEMS NOMINAL",
        "Refactoring backend services for maximum uptime...",
        "Training Neural Network with new project data...",
        "Validating SQL Server connection pools...",
        "Injecting clean code dependencies...",
        "Monitoring user activity trends...",
        "Deploying Docker micro-containers...",
        "Latency check: 12ms... EXCELLENT",
        "Ashvin Mori: Professional Status... READY FOR HIRE"
    ];

    let messageIndex = 0;

    function addLog() {
        const text = logMessages[messageIndex];
        const log = document.createElement('span');
        log.className = 'log-entry whitespace-nowrap opacity-0 transition-opacity duration-1000';
        log.style.color = 'var(--text-secondary)';
        log.textContent = `[LOG] ${text}`;
        
        // Add to container
        logContainer.prepend(log);
        
        // Animate entrance
        setTimeout(() => {
            log.classList.remove('opacity-0');
            log.classList.add('opacity-60');
        }, 50);

        // Remove old logs to keep it clean
        if (logContainer.children.length > 3) {
            const last = logContainer.lastElementChild;
            last.classList.add('opacity-0');
            setTimeout(() => last.remove(), 1000);
        }

        messageIndex = (messageIndex + 1) % logMessages.length;
    }

    // Initialize with a few logs
    addLog();
    
    // Cycle logs every 3 seconds
    setInterval(addLog, 3500);
}
// ===== DEVELOPER TERMINAL =====
function initTerminal() {
    const trigger = document.getElementById('terminal-trigger');
    const terminal = document.getElementById('dev-terminal');
    const close = document.getElementById('terminal-close');
    const input = document.getElementById('terminal-input');
    const output = document.getElementById('terminal-output');

    if (!trigger || !terminal) return;

    // Toggle Modal
    const openTerminal = () => {
        terminal.classList.remove('hidden');
        terminal.classList.add('flex');
        setTimeout(() => {
            terminal.classList.remove('scale-95', 'opacity-0');
            terminal.classList.add('scale-100', 'opacity-100');
            input.focus();
        }, 10);
    };

    const closeTerminal = () => {
        terminal.classList.remove('scale-100', 'opacity-100');
        terminal.classList.add('scale-95', 'opacity-0');
        setTimeout(() => {
            terminal.classList.remove('flex');
            terminal.classList.add('hidden');
        }, 300);
    };

    trigger.addEventListener('click', openTerminal);
    close.addEventListener('click', closeTerminal);

    // Keyboard Shortcut (Tilde key ` )
    window.addEventListener('keydown', (e) => {
        if (e.key === '`') {
            e.preventDefault();
            terminal.classList.contains('hidden') ? openTerminal() : closeTerminal();
        }
    });

    // Command Logic
    const commands = {
        'help': 'Available commands: about, skills, projects, contact, resume, clear, whoami, themes, exit',
        'whoami': 'User: Authorized Guest System Admin. Host: ASHVIN-ROOT-VPS. Role: Executive Recruiter.',
        'about': 'Ashvin Mori: Full-Stack Engineer with 3.5+ years experience. Expert in .NET Core & Angular. specialized in AI-Powered ERP and VMS solutions.',
        'skills': 'CORE: C#, .NET 8, Angular 17. TOOLS: Azure, Docker, SQL Server. AI: OpenAI, LLM Integration.',
        'projects': 'Active Deployments: VMS-Secure, CRM-Advanced, AI-Assistant. Type "ls" for file system view.',
        'contact': 'Secure Channel: ashvin.mori@professional.dev. Status: Online.',
        'resume': 'Fetching document... [File: resume_ashvin.pdf]. Opening stream.',
        'ls': 'about.info  skills.cap  projects.list  resume.pdf  contact.sh  secrets.crypt',
        'cat about.info': 'Ashvin is a top-tier engineer focusing on clean architecture and high-scale cloud solutions.',
        'cat secrets.crypt': 'ERROR: Access Denied. Level 4 clearance required.',
        'themes': 'Active Theme Modules: orange-white, blue-white, black-blue, emerald-night, cyber-pink.',
        'exit': () => { closeTerminal(); return 'Closing session...'; },
        'clear': () => { output.innerHTML = ''; return ''; }
    };

    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const cmd = input.value.trim().toLowerCase();
            input.value = '';
            
            // Add prompt to output
            const prompt = document.createElement('div');
            prompt.innerHTML = `<span class="text-green-500 font-bold">ashvin@root:~$</span> <span class="text-white">${cmd}</span>`;
            output.appendChild(prompt);

            if (cmd) {
                const response = document.createElement('div');
                response.classList.add('mb-3', 'mt-1', 'opacity-90');
                
                if (commands[cmd]) {
                    if (typeof commands[cmd] === 'function') {
                        const result = commands[cmd]();
                        response.innerHTML = result || `Command ${cmd} executed successfully.`;
                    } else {
                        response.innerHTML = commands[cmd];
                    }
                } else if (cmd.startsWith('themes set ')) {
                    const theme = cmd.replace('themes set ', '');
                    document.documentElement.setAttribute('data-theme', theme);
                    response.innerHTML = `System: Theme module [${theme}] initialized.`;
                } else {
                    response.innerHTML = `<span class="text-red-500">Error: Command [${cmd}] not recognized. Type 'help' for manual.</span>`;
                }
                output.appendChild(response);
            }
            
            // Scroll to bottom
            output.scrollTop = output.scrollHeight;
        }
    });

    // Handle clicks inside terminal to focus input
    terminal.addEventListener('click', () => {
        input.focus();
    });
}
function initExperienceCalculator() {
    // Started January 2023
    const startDate = new Date('2022-09-2');
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
