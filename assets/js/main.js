 // Main JavaScript file for RosettaScripts static website
// Enhanced with modern ES6+ features and performance optimizations

class RosettaScriptsApp {
    constructor() {
        this.init();
    }

    init() {
        document.addEventListener('DOMContentLoaded', () => {
            console.log('🚀 RosettaScripts website loaded successfully!');
            this.setupEventListeners();
            this.initializeComponents();
        });
    }

    setupEventListeners() {
        // Smooth scrolling for anchor links with performance optimization
        this.setupSmoothScrolling();

        // Mobile menu functionality
        this.setupMobileMenu();

        // Scroll-to-top functionality
        this.setupScrollToTop();

        // Keyboard navigation enhancements
        this.setupKeyboardNavigation();

        // Form enhancements (if forms exist)
        this.setupFormEnhancements();
    }

    setupSmoothScrolling() {
        // Use event delegation for better performance
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a[href^="#"]');
            if (!link) return;

            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Account for sticky header height
                const headerHeight = document.querySelector('header')?.offsetHeight || 0;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Update focus for accessibility
                targetElement.focus({ preventScroll: true });
            }
        });
    }

    setupMobileMenu() {
        const navToggle = document.querySelector('.nav-toggle');
        const navLinks = document.querySelector('.nav-links');

        if (!navToggle || !navLinks) return;

        // Enhanced mobile menu with better UX
        navToggle.addEventListener('click', () => {
            const isActive = navLinks.classList.toggle('active');

            // Update ARIA attributes for accessibility
            navToggle.setAttribute('aria-expanded', isActive);
            navLinks.setAttribute('aria-hidden', !isActive);

            // Improve focus management
            if (isActive) {
                // Focus first menu item when opened
                const firstMenuItem = navLinks.querySelector('a');
                if (firstMenuItem) {
                    setTimeout(() => firstMenuItem.focus(), 100);
                }
            }
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
                navLinks.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
                navLinks.setAttribute('aria-hidden', 'true');
            }
        });

        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
                navLinks.setAttribute('aria-hidden', 'true');
                navToggle.focus();
            }
        });
    }

    setupScrollToTop() {
        const scrollToTopBtn = document.querySelector('.scroll-to-top');
        if (!scrollToTopBtn) return;

        // Throttled scroll listener for better performance
        let ticking = false;

        const updateScrollButton = () => {
            const scrolled = window.pageYOffset > 300;
            scrollToTopBtn.classList.toggle('visible', scrolled);
            ticking = false;
        };

        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateScrollButton);
                ticking = true;
            }
        }, { passive: true });

        // Smooth scroll to top
        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    setupKeyboardNavigation() {
        // Enhance keyboard navigation for menu items
        const menuItems = document.querySelectorAll('.nav-links a');

        menuItems.forEach((item, index) => {
            item.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    const nextItem = menuItems[index + 1] || menuItems[0];
                    nextItem.focus();
                } else if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    const prevItem = menuItems[index - 1] || menuItems[menuItems.length - 1];
                    prevItem.focus();
                }
            });
        });
    }

    setupFormEnhancements() {
        // Enhanced form validation and UX improvements
        const forms = document.querySelectorAll('form');

        forms.forEach(form => {
            form.addEventListener('submit', (e) => {
                const isValid = this.validateForm(form);
                if (!isValid) {
                    e.preventDefault();
                    showNotification('Please fill in all required fields correctly.', 'error');
                }
            });
        });

        // Setup contact form specifically
        this.setupContactForm();
    }

    setupContactForm() {
        const contactForm = document.getElementById('contact-form');
        if (!contactForm) return;

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleContactFormSubmit(contactForm);
        });

        // Real-time validation
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => {
                this.validateField(input);
            });
            input.addEventListener('input', () => {
                this.clearFieldError(input);
            });
        });
    }

    handleContactFormSubmit(form) {
        const submitBtn = form.querySelector('#submit-btn');
        const buttonText = submitBtn.querySelector('.button-text');
        const buttonLoading = submitBtn.querySelector('.button-loading');
        const formStatus = form.querySelector('#form-status');

        // Validate form
        if (!this.validateContactForm(form)) {
            return;
        }

        // Show loading state
        submitBtn.disabled = true;
        buttonText.style.display = 'none';
        buttonLoading.style.display = 'inline';
        formStatus.textContent = '';
        formStatus.className = 'form-status';

        // Get form data
        const formData = new FormData(form);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            subject: formData.get('subject'),
            message: formData.get('message'),
            timestamp: new Date().toISOString()
        };

        // Simulate form submission (replace with actual email service)
        setTimeout(() => {
            // For now, we'll use a mailto fallback
            this.sendEmailViaMailto(data);
            
            // Reset form
            form.reset();
            submitBtn.disabled = false;
            buttonText.style.display = 'inline';
            buttonLoading.style.display = 'none';
            
            // Show success message
            formStatus.textContent = 'Thank you! Your message has been sent successfully.';
            formStatus.className = 'form-status success';
            
            showNotification('Message sent successfully!', 'success');
        }, 1500);
    }

    sendEmailViaMailto(data) {
        const subject = encodeURIComponent(`Contact Form: ${data.subject}`);
        const body = encodeURIComponent(
            `Name: ${data.name}\n` +
            `Email: ${data.email}\n` +
            `Subject: ${data.subject}\n\n` +
            `Message:\n${data.message}\n\n` +
            `Sent from: RosettaScripts Contact Form\n` +
            `Timestamp: ${new Date().toLocaleString()}`
        );
        
        const mailtoLink = `mailto:kimgalicia.real@gmail.com?subject=${subject}&body=${body}`;
        window.open(mailtoLink, '_blank');
    }

    validateContactForm(form) {
        const fields = [
            { id: 'name', name: 'Name' },
            { id: 'email', name: 'Email' },
            { id: 'subject', name: 'Subject' },
            { id: 'message', name: 'Message' }
        ];

        let isValid = true;

        fields.forEach(field => {
            const input = form.querySelector(`#${field.id}`);
            if (!this.validateField(input)) {
                isValid = false;
            }
        });

        return isValid;
    }

    validateField(field) {
        const value = field.value.trim();
        const fieldName = field.name;
        const errorElement = document.getElementById(`${fieldName}-error`);

        // Clear previous error
        this.clearFieldError(field);

        // Required field validation
        if (field.hasAttribute('required') && !value) {
            this.showFieldError(field, errorElement, `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required.`);
            return false;
        }

        // Email validation
        if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                this.showFieldError(field, errorElement, 'Please enter a valid email address.');
                return false;
            }
        }

        // Message length validation
        if (fieldName === 'message' && value && value.length < 10) {
            this.showFieldError(field, errorElement, 'Message must be at least 10 characters long.');
            return false;
        }

        return true;
    }

    showFieldError(field, errorElement, message) {
        field.classList.add('error');
        if (errorElement) {
            errorElement.textContent = message;
        }
    }

    clearFieldError(field) {
        field.classList.remove('error');
        const errorElement = document.getElementById(`${field.name}-error`);
        if (errorElement) {
            errorElement.textContent = '';
        }
    }

    validateForm(form) {
        const requiredFields = form.querySelectorAll('[required]');
        let isValid = true;

        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                field.classList.add('error');
                field.setAttribute('aria-invalid', 'true');
                isValid = false;
            } else {
                field.classList.remove('error');
                field.setAttribute('aria-invalid', 'false');
            }
        });

        return isValid;
    }

    initializeComponents() {
        // Initialize any additional components
        this.setupLazyLoading();
        this.setupTooltips();
    }

    setupLazyLoading() {
        // Intersection Observer for lazy loading images
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.classList.remove('lazy');
                            imageObserver.unobserve(img);
                        }
                    }
                });
            });

            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }
    }

    setupTooltips() {
        // Enhanced tooltip functionality
        const tooltipElements = document.querySelectorAll('[data-tooltip]');

        tooltipElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                this.showTooltip(element);
            });

            element.addEventListener('mouseleave', () => {
                this.hideTooltip();
            });
        });
    }

    showTooltip(element) {
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.textContent = element.getAttribute('data-tooltip');
        tooltip.setAttribute('role', 'tooltip');

        document.body.appendChild(tooltip);

        // Position tooltip
        const rect = element.getBoundingClientRect();
        tooltip.style.left = `${rect.left + rect.width / 2}px`;
        tooltip.style.top = `${rect.top - tooltip.offsetHeight - 10}px`;

        requestAnimationFrame(() => {
            tooltip.classList.add('show');
        });
    }

    hideTooltip() {
        const tooltip = document.querySelector('.tooltip');
        if (tooltip) {
            tooltip.remove();
        }
    }
}

// Enhanced notification system
class NotificationManager {
    constructor() {
        this.container = null;
        this.createContainer();
    }

    createContainer() {
        this.container = document.createElement('div');
        this.container.className = 'notification-container';
        this.container.setAttribute('role', 'alert');
        this.container.setAttribute('aria-live', 'polite');
        document.body.appendChild(this.container);
    }

    show(message, type = 'info', duration = 5000) {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        notification.setAttribute('role', 'alert');

        // Add icon based on type
        const icon = this.getIcon(type);
        if (icon) {
            notification.innerHTML = `${icon} ${message}`;
        }

        this.container.appendChild(notification);

        // Trigger animation
        requestAnimationFrame(() => {
            notification.classList.add('show');
        });

        // Auto remove after duration
        setTimeout(() => {
            this.remove(notification);
        }, duration);

        return notification;
    }

    getIcon(type) {
        const icons = {
            success: '✓',
            error: '⚠',
            warning: '!',
            info: 'ℹ'
        };
        return icons[type] || '';
    }

    remove(notification) {
        if (notification && notification.parentNode) {
            notification.classList.remove('show');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }
    }

    success(message, duration) {
        return this.show(message, 'success', duration);
    }

    error(message, duration) {
        return this.show(message, 'error', duration);
    }

    warning(message, duration) {
        return this.show(message, 'warning', duration);
    }

    info(message, duration) {
        return this.show(message, 'info', duration);
    }
}

// Initialize the application
const app = new RosettaScriptsApp();
const notifications = new NotificationManager();

// Utility functions for global access
function showNotification(message, type = 'info', duration = 5000) {
    return notifications.show(message, type, duration);
}

// Export for use in other scripts
window.RosettaScripts = {
    app,
    notifications,
    showNotification,
    showSuccess: (msg, duration) => notifications.success(msg, duration),
    showError: (msg, duration) => notifications.error(msg, duration),
    showWarning: (msg, duration) => notifications.warning(msg, duration),
    showInfo: (msg, duration) => notifications.info(msg, duration)
};

// Add CSS for notifications if not already present
if (!document.getElementById('notification-styles')) {
    const style = document.createElement('style');
    style.id = 'notification-styles';
    style.textContent = `
        .notification-container {
            position: fixed;
            top: calc(80px + 1rem);
            right: 1rem;
            z-index: 1001;
            max-width: 400px;
        }

        .notification {
            margin-bottom: 0.5rem;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            opacity: 0;
            transform: translateX(100%);
            transition: all 0.3s ease;
            font-weight: 500;
            line-height: 1.4;
        }

        .notification.show {
            opacity: 1;
            transform: translateX(0);
        }

        .notification-success {
            background-color: #27ae60;
            color: white;
        }

        .notification-error {
            background-color: #e74c3c;
            color: white;
        }

        .notification-warning {
            background-color: #f39c12;
            color: white;
        }

        .notification-info {
            background-color: #3498db;
            color: white;
        }

        @media (max-width: 768px) {
            .notification-container {
                left: 1rem;
                right: 1rem;
                top: calc(70px + 0.5rem);
                max-width: none;
            }

            .notification {
                transform: translateY(-20px);
            }

            .notification.show {
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);
}




