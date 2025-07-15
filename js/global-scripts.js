/**
 * Global Scripts for Trinity Arts Group
 * Consolidated sitewide JavaScript functionality
 * Version: 1.0
 */

console.log('Global scripts loaded successfully');

// ===== MOBILE NAVIGATION CLASS =====
class MobileNavigation {
    constructor() {
        this.isOpen = false;
        this.init();
    }

    init() {
        this.bindEvents();
        this.initStickyNav();
        this.initFontToggle();
    }

    bindEvents() {
        // Mobile menu toggle
        const menuToggle = document.getElementById('mobileMenuToggle');
        const navToggle = document.getElementById('navToggle');
        const drawerClose = document.getElementById('drawerClose');
        const overlay = document.getElementById('navOverlay');
        const navDrawerOverlay = document.getElementById('navDrawerOverlay');

        // Support both ID variations
        const toggleButton = menuToggle || navToggle;
        const overlayElement = overlay || navDrawerOverlay;

        if (toggleButton) {
            toggleButton.addEventListener('click', () => this.toggleDrawer());
        }

        if (drawerClose) {
            drawerClose.addEventListener('click', () => this.closeDrawer());
        }

        if (overlayElement) {
            overlayElement.addEventListener('click', () => this.closeDrawer());
        }

        // Dropdown toggles in mobile drawer
        const dropdownTriggers = document.querySelectorAll('.drawer-dropdown-trigger');
        dropdownTriggers.forEach(trigger => {
            trigger.addEventListener('click', (e) => this.toggleDropdown(e));
        });

        // Close drawer when clicking nav links
        const navLinks = document.querySelectorAll('.nav-drawer-links a:not(.drawer-dropdown-trigger)');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                setTimeout(() => this.closeDrawer(), 100);
            });
        });

        // Handle escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.closeDrawer();
            }
        });

        // Handle window resize
        window.addEventListener('resize', () => {
            if (window.innerWidth >= 1200 && this.isOpen) {
                this.closeDrawer();
            }
        });
    }

    toggleDrawer() {
        if (this.isOpen) {
            this.closeDrawer();
        } else {
            this.openDrawer();
        }
    }

    openDrawer() {
        const hamburger = document.querySelector('.custom-hamburger');
        const drawer = document.getElementById('navDrawer');
        const overlay = document.getElementById('navOverlay') || document.getElementById('navDrawerOverlay');

        if (hamburger) hamburger.classList.add('active');
        if (drawer) drawer.classList.add('active');
        if (overlay) overlay.classList.add('active');

        // Prevent body scroll
        document.body.style.overflow = 'hidden';
        this.isOpen = true;

        // Focus management for accessibility
        const firstFocusableElement = drawer?.querySelector('a, button');
        if (firstFocusableElement) {
            setTimeout(() => firstFocusableElement.focus(), 300);
        }
    }

    closeDrawer() {
        const hamburger = document.querySelector('.custom-hamburger');
        const drawer = document.getElementById('navDrawer');
        const overlay = document.getElementById('navOverlay') || document.getElementById('navDrawerOverlay');

        if (hamburger) hamburger.classList.remove('active');
        if (drawer) drawer.classList.remove('active');
        if (overlay) overlay.classList.remove('active');

        // Restore body scroll
        document.body.style.overflow = '';
        this.isOpen = false;

        // Close all open dropdowns
        const openDropdowns = document.querySelectorAll('.drawer-dropdown.active');
        const openTriggers = document.querySelectorAll('.drawer-dropdown-trigger.active');
        
        openDropdowns.forEach(dropdown => dropdown.classList.remove('active'));
        openTriggers.forEach(trigger => trigger.classList.remove('active'));
    }

    toggleDropdown(e) {
        e.preventDefault();
        
        const trigger = e.currentTarget;
        const targetId = trigger.getAttribute('data-target');
        const dropdown = document.getElementById(targetId);
        const icon = trigger.querySelector('i');

        if (!dropdown) return;

        // Close other open dropdowns
        const otherDropdowns = document.querySelectorAll('.drawer-dropdown.active');
        const otherTriggers = document.querySelectorAll('.drawer-dropdown-trigger.active');
        
        otherDropdowns.forEach(dd => {
            if (dd !== dropdown) dd.classList.remove('active');
        });
        
        otherTriggers.forEach(tr => {
            if (tr !== trigger) tr.classList.remove('active');
        });

        // Toggle current dropdown
        const isOpen = dropdown.classList.contains('active');
        
        if (isOpen) {
            dropdown.classList.remove('active');
            trigger.classList.remove('active');
            if (icon) {
                icon.className = 'fas fa-plus';
                icon.style.transform = 'rotate(0deg)';
            }
        } else {
            dropdown.classList.add('active');
            trigger.classList.add('active');
            if (icon) {
                icon.className = 'fas fa-minus';
                icon.style.transform = 'rotate(45deg)';
            }
        }
    }

    // Sticky/Flyaway Nav on Scroll
    initStickyNav() {
        const nav = document.querySelector('.navbar') || document.querySelector('.nav-container');
        if (!nav) return;

        let lastScroll = window.scrollY;
        let ticking = false;
        
        const checkScroll = () => {
            const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight);
            if (window.scrollY < 40 || window.scrollY < lastScroll || pct < 0.45) {
                nav.classList.remove('flyaway');
            } else if (pct > 0.45 && window.scrollY > lastScroll) {
                nav.classList.add('flyaway');
            }
            lastScroll = window.scrollY;
            ticking = false;
        };
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(checkScroll);
                ticking = true;
            }
        });
    }

    // Font Toggle
    initFontToggle() {
        const fontBtn = document.querySelector('.font-toggle-btn');
        if (!fontBtn) return;

        fontBtn.addEventListener('click', () => {
            const main = document.querySelector('main');
            if (!main) return;

            if (main.classList.contains('font-large')) {
                main.classList.remove('font-large');
                main.classList.add('font-small');
            } else if (main.classList.contains('font-small')) {
                main.classList.remove('font-small');
            } else {
                main.classList.add('font-large');
            }
        });
    }
}

// ===== THEME TOGGLE CLASS =====
class ThemeToggle {
    constructor() {
        this.currentTheme = localStorage.getItem('theme') || 'light';
        this.init();
    }

    init() {
        this.applyTheme(this.currentTheme);
        this.bindEvents();
    }

    bindEvents() {
        // Desktop theme toggle
        const desktopToggle = document.getElementById('themeToggle');
        if (desktopToggle) {
            desktopToggle.addEventListener('click', () => this.toggleTheme());
        }

        // Mobile theme toggle
        const mobileToggle = document.getElementById('mobileThemeToggle');
        const themeToggleDrawer = document.getElementById('themeToggleDrawer');
        
        if (mobileToggle) {
            mobileToggle.addEventListener('click', () => this.toggleTheme());
        }
        
        if (themeToggleDrawer) {
            themeToggleDrawer.addEventListener('click', () => this.toggleTheme());
        }

        // Theme toggle button class
        const themeToggleBtn = document.querySelector('.theme-toggle-btn');
        if (themeToggleBtn) {
            themeToggleBtn.addEventListener('click', () => this.toggleDataTheme());
        }
    }

    toggleTheme() {
        // Style-based theme toggle (for compatibility)
        const body = document.body;
        const navbar = document.querySelector('.navbar');
        const drawers = document.querySelectorAll('.nav-drawer, .dropdown-menu');
        
        if (body.style.backgroundColor === 'white' || !body.style.backgroundColor) {
            // Switch to dark background
            body.style.backgroundColor = '#121212';
            if (navbar) navbar.style.backgroundColor = '#1a1a1a';
            drawers.forEach(el => el.style.backgroundColor = '#1a1a1a');
            
            // Update icons
            const desktopIcon = document.querySelector('#themeToggle i');
            const drawerIcon = document.querySelector('#themeToggleDrawer i');
            if (desktopIcon) desktopIcon.className = 'fa-solid fa-sun';
            if (drawerIcon) drawerIcon.className = 'fa-solid fa-sun';
        } else {
            // Switch to light background
            body.style.backgroundColor = 'white';
            if (navbar) navbar.style.backgroundColor = '#1a1a1a';
            drawers.forEach(el => el.style.backgroundColor = '#1a1a1a');
            
            // Update icons
            const desktopIcon = document.querySelector('#themeToggle i');
            const drawerIcon = document.querySelector('#themeToggleDrawer i');
            if (desktopIcon) desktopIcon.className = 'fa-solid fa-moon';
            if (drawerIcon) drawerIcon.className = 'fa-solid fa-moon';
        }
    }

    toggleDataTheme() {
        // Data-attribute based theme toggle
        this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.applyTheme(this.currentTheme);
        localStorage.setItem('theme', this.currentTheme);
    }

    applyTheme(theme) {
        const body = document.body;
        const themeIcons = document.querySelectorAll('#themeIcon, #mobileThemeToggle i, .theme-toggle-btn i');

        if (theme === 'dark') {
            body.setAttribute('data-theme', 'dark');
            themeIcons.forEach(icon => {
                icon.className = 'fas fa-sun';
            });
        } else {
            body.removeAttribute('data-theme');
            themeIcons.forEach(icon => {
                icon.className = 'fas fa-moon';
            });
        }
    }
}

// ===== GALLERY ANIMATIONS =====
function initGalleryAnimations() {
    // Scroll animation for gallery cards
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.getAttribute('data-delay') || 0;
                setTimeout(() => {
                    entry.target.classList.add('animate-in');
                }, delay);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all gallery cards
    document.querySelectorAll('.gallery-card').forEach(card => {
        observer.observe(card);
    });
}

// ===== FORM VALIDATION UTILITIES =====
function initFormValidation() {
    // Enhanced form validation - show only first error
    const contactForm = document.getElementById('mainContactForm');
    
    if (!contactForm) return;

    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Clear previous validation
        contactForm.classList.remove('was-validated');
        const invalidFields = contactForm.querySelectorAll('.is-invalid');
        invalidFields.forEach(field => field.classList.remove('is-invalid'));
        
        if (!contactForm.checkValidity()) {
            event.stopPropagation();
            
            // Find first invalid field and show only its error
            const firstInvalid = contactForm.querySelector(':invalid');
            if (firstInvalid) {
                firstInvalid.classList.add('is-invalid');
                firstInvalid.focus();
            }
            return;
        }
        
        // Show loading state
        contactForm.classList.add('submitting');
        
        // Submit form
        const formData = new FormData(contactForm);
        
        fetch(contactForm.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                // Show success modal
                const thankYouModal = new bootstrap.Modal(document.getElementById('thankYouModal'));
                thankYouModal.show();
                
                // Reset form
                contactForm.reset();
                contactForm.classList.remove('submitting');
            } else {
                throw new Error('Form submission failed');
            }
        }).catch(error => {
            console.error('Error:', error);
            alert('There was an error sending your message. Please try again.');
            contactForm.classList.remove('submitting');
        });
    });
    
    // Clear validation on input
    const formFields = contactForm.querySelectorAll('input, select, textarea');
    formFields.forEach(field => {
        field.addEventListener('input', function() {
            this.classList.remove('is-invalid');
        });
    });
}

// ===== UTILITY FUNCTIONS =====
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

// ===== INITIALIZE EVERYTHING =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing global components');
    
    // Initialize core components
    new MobileNavigation();
    new ThemeToggle();
    initGalleryAnimations();
    initFormValidation();
    
    console.log('Global components initialized successfully');
});

// ===== GLOBAL FUNCTIONS =====
// Optional: Global function to open contact modal
window.openContactModal = function() {
    const modal = document.getElementById('contactModal');
    if (modal && typeof bootstrap !== 'undefined') {
        const modalInstance = new bootstrap.Modal(modal);
        modalInstance.show();
    }
};

// Global function to close mobile drawer
window.closeMobileDrawer = function() {
    const mobileNav = new MobileNavigation();
    mobileNav.closeDrawer();
};

// Export for module use if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        MobileNavigation,
        ThemeToggle,
        initGalleryAnimations,
        initFormValidation
    };
}