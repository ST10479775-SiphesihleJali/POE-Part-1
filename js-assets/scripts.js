/**
 * GreenSteps Community Gardens - Interactive Features
 * Author: [Your Name]
 * Date: November 2025
 * Description: JavaScript for all interactive elements, form validation, and dynamic content
 */

// ================== MOBILE MENU TOGGLE ==================
document.addEventListener('DOMContentLoaded', function() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('nav');
    
    if (mobileToggle) {
        mobileToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            mobileToggle.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('header') && nav && nav.classList.contains('active')) {
            nav.classList.remove('active');
            if (mobileToggle) mobileToggle.classList.remove('active');
        }
    });
});

// ================== ANIMATED COUNTER FOR STATS ==================
function animateCounter() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current) + '+';
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target + '+';
            }
        };
        
        // Start animation when element is in viewport
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(counter);
    });
}

// Initialize counter animation
if (document.querySelector('.stat-number')) {
    animateCounter();
}

// ================== SMOOTH SCROLL NAVIGATION ==================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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

// ================== GALLERY LIGHTBOX ==================
class Lightbox {
    constructor() {
        this.images = [];
        this.currentIndex = 0;
        this.init();
    }

    init() {
        // Find all gallery images
        const galleryImages = document.querySelectorAll('.gallery-image, #impact img, .impact-story img');
        
        if (galleryImages.length === 0) return;

        // Create lightbox HTML
        this.createLightbox();
        
        // Add click handlers to images
        galleryImages.forEach((img, index) => {
            img.style.cursor = 'pointer';
            img.addEventListener('click', () => this.open(index));
            this.images.push(img);
        });
    }

    createLightbox() {
        const lightboxHTML = `
            <div class="lightbox" id="lightbox">
                <span class="lightbox-close">&times;</span>
                <span class="lightbox-prev">&#10094;</span>
                <span class="lightbox-next">&#10095;</span>
                <img class="lightbox-image" src="" alt="">
                <div class="lightbox-caption"></div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', lightboxHTML);

        // Add event listeners
        document.querySelector('.lightbox-close').addEventListener('click', () => this.close());
        document.querySelector('.lightbox-prev').addEventListener('click', () => this.prev());
        document.querySelector('.lightbox-next').addEventListener('click', () => this.next());
        document.getElementById('lightbox').addEventListener('click', (e) => {
            if (e.target.id === 'lightbox') this.close();
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (!document.getElementById('lightbox').classList.contains('active')) return;
            if (e.key === 'Escape') this.close();
            if (e.key === 'ArrowLeft') this.prev();
            if (e.key === 'ArrowRight') this.next();
        });
    }

    open(index) {
        this.currentIndex = index;
        const lightbox = document.getElementById('lightbox');
        const img = document.querySelector('.lightbox-image');
        const caption = document.querySelector('.lightbox-caption');
        
        img.src = this.images[index].src;
        img.alt = this.images[index].alt;
        caption.textContent = this.images[index].alt;
        
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    close() {
        document.getElementById('lightbox').classList.remove('active');
        document.body.style.overflow = '';
    }

    next() {
        this.currentIndex = (this.currentIndex + 1) % this.images.length;
        this.open(this.currentIndex);
    }

    prev() {
        this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
        this.open(this.currentIndex);
    }
}

// Initialize lightbox
new Lightbox();

// ================== DYNAMIC SEARCH FUNCTIONALITY ==================
class SearchFilter {
    constructor(searchInputId, contentSelector) {
        this.searchInput = document.getElementById(searchInputId);
        this.contentItems = document.querySelectorAll(contentSelector);
        
        if (this.searchInput && this.contentItems.length > 0) {
            this.init();
        }
    }

    init() {
        this.searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase().trim();
            this.filter(searchTerm);
        });
    }

    filter(searchTerm) {
        let visibleCount = 0;
        
        this.contentItems.forEach(item => {
            const text = item.textContent.toLowerCase();
            const isVisible = text.includes(searchTerm);
            
            item.style.display = isVisible ? '' : 'none';
            if (isVisible) visibleCount++;
        });

        // Show "no results" message
        this.showNoResults(visibleCount === 0);
    }

    showNoResults(show) {
        let noResultsMsg = document.querySelector('.no-results-message');
        
        if (show && !noResultsMsg) {
            noResultsMsg = document.createElement('div');
            noResultsMsg.className = 'no-results-message';
            noResultsMsg.textContent = 'No results found. Try a different search term.';
            this.searchInput.parentElement.appendChild(noResultsMsg);
        } else if (!show && noResultsMsg) {
            noResultsMsg.remove();
        }
    }
}

// Initialize search on programs and resources pages
if (document.getElementById('program-search')) {
    new SearchFilter('program-search', 'section > div > div, article');
}

// ================== FORM VALIDATION & PROCESSING ==================
class FormHandler {
    constructor(formId) {
        this.form = document.getElementById(formId);
        if (!this.form) return;
        
        this.init();
    }

    init() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        
        // Real-time validation
        const inputs = this.form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearError(input));
        });
    }

    validateField(field) {
        const value = field.value.trim();
        const fieldName = field.name;
        let errorMessage = '';

        // Required field validation
        if (field.hasAttribute('required') && !value) {
            errorMessage = `${this.getFieldLabel(field)} is required.`;
        }

        // Email validation
        if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                errorMessage = 'Please enter a valid email address.';
            }
        }

        // Phone validation
        if (field.type === 'tel' && value) {
            const phoneRegex = /^[\d\s\-\+\(\)]+$/;
            if (!phoneRegex.test(value) || value.length < 10) {
                errorMessage = 'Please enter a valid phone number.';
            }
        }

        // Display error or clear it
        if (errorMessage) {
            this.showError(field, errorMessage);
            return false;
        } else {
            this.clearError(field);
            return true;
        }
    }

    validateForm() {
        const inputs = this.form.querySelectorAll('input[required], textarea[required], select[required]');
        let isValid = true;

        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isValid = false;
            }
        });

        return isValid;
    }

    showError(field, message) {
        this.clearError(field);
        
        field.classList.add('error');
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        field.parentElement.appendChild(errorDiv);
    }

    clearError(field) {
        field.classList.remove('error');
        const existingError = field.parentElement.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
    }

    getFieldLabel(field) {
        const label = this.form.querySelector(`label[for="${field.id}"]`);
        return label ? label.textContent.replace('*', '').trim() : field.name;
    }

    async handleSubmit(e) {
        e.preventDefault();

        // Validate form
        if (!this.validateForm()) {
            this.showNotification('Please correct the errors before submitting.', 'error');
            return;
        }

        // Show loading state
        const submitBtn = this.form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        // Collect form data
        const formData = new FormData(this.form);
        const data = Object.fromEntries(formData);

        // Simulate email sending (in production, use EmailJS or backend API)
        try {
            await this.sendEmail(data);
            this.showNotification('Thank you! Your message has been sent successfully. We\'ll get back to you soon.', 'success');
            this.form.reset();
        } catch (error) {
            this.showNotification('Sorry, there was an error sending your message. Please try again or contact us directly.', 'error');
        } finally {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    }

    async sendEmail(data) {
        // Simulate API call
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // In production, replace with actual EmailJS or backend call
                console.log('Form data:', data);
                resolve();
            }, 1500);
        });
    }

    showNotification(message, type) {
        // Remove existing notifications
        const existing = document.querySelector('.form-notification');
        if (existing) existing.remove();

        const notification = document.createElement('div');
        notification.className = `form-notification ${type}`;
        notification.textContent = message;
        
        this.form.insertAdjacentElement('beforebegin', notification);

        // Scroll to notification
        notification.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

        // Auto-remove after 5 seconds
        setTimeout(() => notification.remove(), 5000);
    }
}

// Initialize form handlers
if (document.getElementById('contact-form')) {
    new FormHandler('contact-form');
}
if (document.getElementById('enquiry-form')) {
    new FormHandler('enquiry-form');
}

// ================== INTERACTIVE MAP ENHANCEMENTS ==================
function initCustomMap() {
    const mapIframe = document.querySelector('iframe[src*="google.com/maps"]');
    
    if (mapIframe) {
        // Add loading indicator
        const loadingDiv = document.createElement('div');
        loadingDiv.className = 'map-loading';
        loadingDiv.textContent = 'Loading map...';
        mapIframe.parentElement.insertBefore(loadingDiv, mapIframe);
        
        mapIframe.addEventListener('load', () => {
            loadingDiv.style.display = 'none';
        });
    }
}

initCustomMap();

// ================== SCROLL ANIMATIONS ==================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for scroll animation
document.querySelectorAll('section, article, .feature-card, .stat-item').forEach(el => {
    observer.observe(el);
});

// ================== BACK TO TOP BUTTON ==================
const backToTopBtn = document.createElement('button');
backToTopBtn.className = 'back-to-top';
backToTopBtn.innerHTML = '↑';
backToTopBtn.setAttribute('aria-label', 'Back to top');
document.body.appendChild(backToTopBtn);

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ================== LAZY LOADING IMAGES ==================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

console.log('GreenSteps Interactive Features Loaded Successfully ✓');