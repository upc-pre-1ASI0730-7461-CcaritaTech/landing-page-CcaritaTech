/**
 * IoBuild Landing Page JavaScript
 * Main functionality for interactive components
 */

// Global variables for i18n
let currentLang = 'es'; // Default language
let translations = {};

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all interactive components
    initI18n();
    initMobileMenu();
    initSmoothScrolling();
    initFAQAccordion();
    initLazyLoading();
    initScrollAnimations();
    initFormHandling();
});

/**
 * Internationalization (i18n) Functionality
 * Handles language switching and content translation
 */
async function initI18n() {
    try {
        // Load translations
        const response = await fetch('./assets/translations.json');
        translations = await response.json();
        
        // Get saved language or use default
        currentLang = localStorage.getItem('preferred-language') || 'es';
        
        // Apply translations
        applyTranslations();
        
        // Initialize language switcher
        initLanguageSwitcher();
        
    } catch (error) {
        console.error('Error loading translations:', error);
    }
}

function initLanguageSwitcher() {
    const langSwitcher = document.querySelector('.language-switcher');
    if (!langSwitcher) return;
    
    const buttons = langSwitcher.querySelectorAll('.lang-btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const selectedLang = this.getAttribute('data-lang');
            if (selectedLang !== currentLang) {
                switchLanguage(selectedLang);
            }
        });
    });
    
    // Update active state
    updateLanguageSwitcherState();
}

function switchLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('preferred-language', lang);
    
    // Update HTML lang attribute
    document.documentElement.lang = lang;
    
    // Apply translations
    applyTranslations();
    
    // Update switcher state
    updateLanguageSwitcherState();
}

function updateLanguageSwitcherState() {
    const buttons = document.querySelectorAll('.lang-btn');
    buttons.forEach(button => {
        const isActive = button.getAttribute('data-lang') === currentLang;
        button.classList.toggle('active', isActive);
        button.setAttribute('aria-pressed', isActive);
    });
}

function applyTranslations() {
    if (!translations[currentLang]) return;
    
    const currentPage = getCurrentPage();
    const pageTranslations = translations[currentLang][currentPage] || {};
    const commonTranslations = translations[currentLang].common || {};
    
    // Apply translations to elements with data-translate attribute
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        const translation = pageTranslations[key] || commonTranslations[key];
        
        if (translation) {
            if (element.tagName === 'INPUT' && element.type === 'submit') {
                element.value = translation;
            } else if (element.hasAttribute('placeholder')) {
                element.placeholder = translation;
            } else if (element.hasAttribute('aria-label')) {
                element.setAttribute('aria-label', translation);
            } else if (element.hasAttribute('alt')) {
                element.setAttribute('alt', translation);
            } else {
                element.textContent = translation;
            }
        }
    });
    
    // Update meta tags
    updateMetaTags();
}

function getCurrentPage() {
    const path = window.location.pathname;
    if (path.includes('about-us')) return 'about';
    if (path.includes('faq')) return 'faq';
    return 'index';
}

function updateMetaTags() {
    const currentPage = getCurrentPage();
    const pageTranslations = translations[currentLang][currentPage] || {};
    
    // Update title
    if (pageTranslations.title) {
        document.title = pageTranslations.title;
    }
    
    // Update meta description
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc && pageTranslations.meta_description) {
        metaDesc.setAttribute('content', pageTranslations.meta_description);
    }
    
    // Update Open Graph tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle && pageTranslations.og_title) {
        ogTitle.setAttribute('content', pageTranslations.og_title);
    }
    
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc && pageTranslations.og_description) {
        ogDesc.setAttribute('content', pageTranslations.og_description);
    }
    
    // Update Twitter Card tags
    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitle && pageTranslations.twitter_title) {
        twitterTitle.setAttribute('content', pageTranslations.twitter_title);
    }
    
    const twitterDesc = document.querySelector('meta[name="twitter:description"]');
    if (twitterDesc && pageTranslations.twitter_description) {
        twitterDesc.setAttribute('content', pageTranslations.twitter_description);
    }
}

/**
 * Mobile Menu Toggle Functionality
 * Handles hamburger menu toggle for mobile navigation
 */
function initMobileMenu() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    const hamburgerLines = document.querySelectorAll('.hamburger__line');
    
    if (!mobileMenuToggle || !mainNav) return;
    
    mobileMenuToggle.addEventListener('click', function() {
        const isActive = mainNav.classList.contains('active');
        
        // Toggle navigation visibility
        mainNav.classList.toggle('active');
        
        // Update ARIA attribute for accessibility
        mobileMenuToggle.setAttribute('aria-expanded', !isActive);
        
        // Animate hamburger lines
        hamburgerLines.forEach((line, index) => {
            if (!isActive) {
                // Transform to X
                if (index === 0) {
                    line.style.transform = 'rotate(45deg) translate(5px, 5px)';
                } else if (index === 1) {
                    line.style.opacity = '0';
                } else if (index === 2) {
                    line.style.transform = 'rotate(-45deg) translate(7px, -6px)';
                }
            } else {
                // Return to hamburger
                line.style.transform = '';
                line.style.opacity = '1';
            }
        });
    });
    
    // Close menu when clicking nav links
    const navLinks = document.querySelectorAll('.nav__link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (mainNav.classList.contains('active')) {
                mobileMenuToggle.click();
            }
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideNav = mainNav.contains(event.target);
        const isClickOnToggle = mobileMenuToggle.contains(event.target);
        
        if (!isClickInsideNav && !isClickOnToggle && mainNav.classList.contains('active')) {
            mobileMenuToggle.click();
        }
    });
}

/**
 * Smooth Scrolling for Anchor Links
 * Provides smooth scrolling behavior for internal navigation links
 */
function initSmoothScrolling() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            const href = this.getAttribute('href');
            
            // Skip if href is just "#"
            if (href === '#') return;
            
            const targetElement = document.querySelector(href);
            
            if (targetElement) {
                event.preventDefault();
                
                // Calculate offset for sticky header
                const headerHeight = document.querySelector('.main-header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update URL without jumping
                history.pushState(null, null, href);
            }
        });
    });
}

/**
 * FAQ Accordion Functionality
 * Handles expanding and collapsing FAQ items
 */
function initFAQAccordion() {
    const faqCategories = document.querySelectorAll('.faq-category-btn');
    const faqGroups = document.querySelectorAll('.faq-group');
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    // FAQ Category switching
    faqCategories.forEach(categoryBtn => {
        categoryBtn.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // Update active category button
            faqCategories.forEach(btn => btn.classList.remove('faq-category-btn--active'));
            this.classList.add('faq-category-btn--active');
            
            // Show corresponding FAQ group
            faqGroups.forEach(group => {
                if (group.getAttribute('data-category') === category) {
                    group.classList.add('faq-group--active');
                } else {
                    group.classList.remove('faq-group--active');
                }
            });
            
            // Reset all expanded questions when switching categories
            faqQuestions.forEach(question => {
                question.setAttribute('aria-expanded', 'false');
            });
        });
    });
    
    // FAQ Question toggle
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            const answer = this.nextElementSibling;
            
            // Close all other questions in the same group
            const currentGroup = this.closest('.faq-group');
            const groupQuestions = currentGroup.querySelectorAll('.faq-question');
            
            groupQuestions.forEach(q => {
                if (q !== this) {
                    q.setAttribute('aria-expanded', 'false');
                }
            });
            
            // Toggle current question
            this.setAttribute('aria-expanded', !isExpanded);
            
            // Smooth height animation for answer
            if (!isExpanded) {
                answer.style.display = 'block';
                answer.style.maxHeight = 'none';
                const height = answer.offsetHeight;
                answer.style.maxHeight = '0';
                answer.offsetHeight; // Force reflow
                answer.style.transition = 'max-height 0.3s ease-out';
                answer.style.maxHeight = height + 'px';
            } else {
                answer.style.transition = 'max-height 0.3s ease-out';
                answer.style.maxHeight = '0';
                setTimeout(() => {
                    answer.style.display = 'none';
                }, 300);
            }
        });
    });
}

/**
 * Lazy Loading for Images
 * Implements intersection observer for performance optimization
 */
function initLazyLoading() {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    
                    // Create a new image to preload
                    const newImg = new Image();
                    newImg.onload = function() {
                        img.src = this.src;
                        img.classList.add('loaded');
                    };
                    
                    newImg.src = img.getAttribute('src');
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px 0px',
            threshold: 0.01
        });
        
        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    } else {
        // Fallback for browsers without IntersectionObserver
        lazyImages.forEach(img => {
            img.src = img.getAttribute('src');
        });
    }
}

/**
 * Scroll Animations
 * Adds fade-in animations for elements as they come into view
 */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll(
        '.benefit-card, .testimonial-card, .pricing-card, .value-card, .team-card'
    );
    
    // Add initial styles for animation
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    });
    
    if ('IntersectionObserver' in window) {
        const animationObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    
                    // Add delay based on element index for stagger effect
                    const index = Array.from(element.parentNode.children).indexOf(element);
                    const delay = index * 100;
                    
                    setTimeout(() => {
                        element.style.opacity = '1';
                        element.style.transform = 'translateY(0)';
                    }, delay);
                    
                    animationObserver.unobserve(element);
                }
            });
        }, {
            rootMargin: '0px 0px -100px 0px',
            threshold: 0.1
        });
        
        animatedElements.forEach(element => {
            animationObserver.observe(element);
        });
    } else {
        // Fallback: show all elements immediately
        animatedElements.forEach(element => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        });
    }
}

/**
 * Form Handling
 * Handles form submissions and contact interactions
 */
function initFormHandling() {
    // CTA Button click tracking
    const ctaButtons = document.querySelectorAll('.cta-button, .cta-primary');
    
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            const buttonText = this.textContent.trim();
            const href = this.getAttribute('href');
            
            // Track button clicks (you can integrate with analytics here)
            console.log('CTA Button clicked:', buttonText);
            
            // Handle demo requests
            if (buttonText.includes('Demo') || buttonText.includes('Consulta')) {
                event.preventDefault();
                showContactModal();
            }
            
            // Handle pricing navigation
            if (href === '#pricing') {
                event.preventDefault();
                scrollToPricing();
            }
        });
    });
    
    // Contact form handling (placeholder for modal)
    function showContactModal() {
        // This would typically open a modal or redirect to a contact form
        alert('¡Gracias por tu interés! Te contactaremos pronto para agendar tu demo personalizada.');
        
        // In a real implementation, you might:
        // - Open a modal with a contact form
        // - Redirect to a dedicated contact page
        // - Integrate with a CRM or email service
    }
    
    // Scroll to pricing section
    function scrollToPricing() {
        const pricingSection = document.querySelector('#pricing');
        if (pricingSection) {
            const headerHeight = document.querySelector('.main-header').offsetHeight;
            const targetPosition = pricingSection.offsetTop - headerHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    }
}

/**
 * Header Scroll Effect
 * Adds scroll-based styling to the header
 */
function initHeaderScrollEffect() {
    const header = document.querySelector('.main-header');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', function() {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Hide header when scrolling down, show when scrolling up
        if (currentScrollY > lastScrollY && currentScrollY > 200) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
    });
}

/**
 * Utility Functions
 */

// Debounce function for performance optimization
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

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Initialize header scroll effect with throttling
window.addEventListener('scroll', throttle(initHeaderScrollEffect, 10));

/**
 * Analytics Integration Placeholder
 * This section would typically integrate with analytics services
 */
function trackEvent(eventName, properties = {}) {
    console.log('Event tracked:', eventName, properties);
    
    // Example integrations:
    // Google Analytics: gtag('event', eventName, properties);
    // Facebook Pixel: fbq('track', eventName, properties);
    // Custom analytics: analytics.track(eventName, properties);
}

/**
 * Performance Monitoring
 * Basic performance tracking for optimization
 */
window.addEventListener('load', function() {
    // Measure page load time
    const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
    console.log('Page load time:', loadTime + 'ms');
    
    // Track to analytics
    trackEvent('page_loaded', {
        load_time: loadTime,
        page_type: document.title
    });
});

/**
 * Error Handling
 * Global error handler for debugging
 */
window.addEventListener('error', function(event) {
    console.error('JavaScript error:', event.error);
    
    // In production, you might want to send errors to a logging service
    // trackEvent('javascript_error', {
    //     message: event.error.message,
    //     stack: event.error.stack,
    //     url: window.location.href
    // });
});

/**
 * Accessibility Enhancements
 * Additional keyboard navigation and screen reader support
 */
function initAccessibilityEnhancements() {
    // Skip to main content link
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Saltar al contenido principal';
    skipLink.className = 'skip-link sr-only';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: var(--color-primary);
        color: white;
        padding: 8px;
        text-decoration: none;
        border-radius: 4px;
        z-index: 1000;
        transition: top 0.3s;
    `;
    
    skipLink.addEventListener('focus', function() {
        this.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', function() {
        this.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Keyboard navigation for FAQ
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('keydown', function(event) {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                this.click();
            }
        });
    });
    
    // Focus management for mobile menu
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (mobileMenuToggle && mainNav) {
        mobileMenuToggle.addEventListener('keydown', function(event) {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                this.click();
                
                // Focus first nav link when menu opens
                if (mainNav.classList.contains('active')) {
                    const firstNavLink = mainNav.querySelector('.nav__link');
                    if (firstNavLink) {
                        setTimeout(() => firstNavLink.focus(), 100);
                    }
                }
            }
        });
    }
}

// Initialize accessibility enhancements
initAccessibilityEnhancements();
