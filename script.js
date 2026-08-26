// ============================================================
// BRIGHTROOTS KIDS CARE - Complete JavaScript
// Single file for all pages
// ============================================================

document.addEventListener('DOMContentLoaded', function() {

    // ---------- MOBILE MENU ----------
    const menuToggle = document.getElementById('menuToggle');
    const mobileNav = document.getElementById('mobileNav');
    const overlay = document.getElementById('overlay');
    const closeBtn = document.getElementById('closeMenu');

    function openMenu() {
        if (mobileNav) mobileNav.classList.add('open');
        if (overlay) overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
        if (mobileNav) mobileNav.classList.remove('open');
        if (overlay) overlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (menuToggle) {
        menuToggle.addEventListener('click', openMenu);
    }
    if (closeBtn) {
        closeBtn.addEventListener('click', closeMenu);
    }
    if (overlay) {
        overlay.addEventListener('click', closeMenu);
    }

    // Close menu on ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') closeMenu();
    });

    // Close menu on link click
    document.querySelectorAll('.mobile-nav a').forEach(function(link) {
        link.addEventListener('click', closeMenu);
    });

    // ---------- HEADER SCROLL EFFECT ----------
    const header = document.getElementById('header');

    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('header-scrolled');
        } else {
            header.classList.remove('header-scrolled');
        }
    });

    // ---------- SCROLL ANIMATIONS ----------
    const animateElements = document.querySelectorAll('.scroll-animate');

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                const delay = parseInt(entry.target.dataset.delay) || 0;
                setTimeout(function() {
                    entry.target.classList.add('visible');
                }, delay);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animateElements.forEach(function(el) {
        observer.observe(el);
    });

    // ---------- FORM VALIDATION ----------
    const enquiryForm = document.getElementById('enquiryForm');

    function validateForm(form) {
        const inputs = form.querySelectorAll('input, select, textarea');
        let isValid = true;

        inputs.forEach(function(input) {
            // Remove existing error
            const existingError = input.parentElement.querySelector('.error-message');
            if (existingError) existingError.remove();
            input.classList.remove('error');

            // Required validation
            if (input.hasAttribute('required') && !input.value.trim()) {
                isValid = false;
                input.classList.add('error');
                const error = document.createElement('span');
                error.className = 'error-message';
                error.style.color = '#D7195B';
                error.style.fontSize = '0.85rem';
                error.style.marginTop = '0.25rem';
                error.style.display = 'block';
                error.textContent = 'This field is required';
                input.parentElement.appendChild(error);
            }

            // Email validation
            if (input.type === 'email' && input.value.trim()) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(input.value.trim())) {
                    isValid = false;
                    input.classList.add('error');
                    const error = document.createElement('span');
                    error.className = 'error-message';
                    error.style.color = '#D7195B';
                    error.style.fontSize = '0.85rem';
                    error.style.marginTop = '0.25rem';
                    error.style.display = 'block';
                    error.textContent = 'Please enter a valid email';
                    input.parentElement.appendChild(error);
                }
            }

            // Phone validation
            if (input.type === 'tel' && input.value.trim()) {
                const phoneRegex = /^[0-9]{10}$/;
                if (!phoneRegex.test(input.value.trim().replace(/\s/g, ''))) {
                    isValid = false;
                    input.classList.add('error');
                    const error = document.createElement('span');
                    error.className = 'error-message';
                    error.style.color = '#D7195B';
                    error.style.fontSize = '0.85rem';
                    error.style.marginTop = '0.25rem';
                    error.style.display = 'block';
                    error.textContent = 'Please enter a valid 10-digit phone number';
                    input.parentElement.appendChild(error);
                }
            }
        });

        return isValid;
    }

    function handleFormSubmit(e) {
        e.preventDefault();
        const form = e.target;

        if (validateForm(form)) {
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;

            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            // Simulate form submission
            setTimeout(function() {
                const successMsg = document.createElement('div');
                successMsg.className = 'form-success';
                successMsg.style.cssText = `
                    background: #4A9B45;
                    color: white;
                    padding: 1rem;
                    border-radius: 0.5rem;
                    margin-top: 1rem;
                    text-align: center;
                    font-weight: 600;
                `;
                successMsg.innerHTML = '✅ Thank you! Our team will contact you shortly.';

                form.appendChild(successMsg);
                form.reset();

                submitBtn.textContent = originalText;
                submitBtn.disabled = false;

                // Remove success message after 5 seconds
                setTimeout(function() {
                    if (successMsg.parentElement) {
                        successMsg.remove();
                    }
                }, 5000);
            }, 1500);
        }
    }

    if (enquiryForm) {
        enquiryForm.addEventListener('submit', handleFormSubmit);
    }

    // ---------- REAL-TIME PHONE FORMATTING ----------
    document.querySelectorAll('input[type="tel"]').forEach(function(input) {
        input.addEventListener('input', function() {
            let value = this.value.replace(/\D/g, '');
            if (value.length > 10) value = value.slice(0, 10);
            if (value.length > 5) {
                value = value.slice(0, 5) + ' ' + value.slice(5);
            }
            this.value = value;
        });
    });

    // ---------- SMOOTH SCROLL ----------
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const headerHeight = document.getElementById('header').offsetHeight || 80;
                const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ---------- CURRENT YEAR IN FOOTER ----------
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // ---------- WHATSAPP PREFILLED MESSAGES ----------
    document.querySelectorAll('[data-whatsapp]').forEach(function(el) {
        el.addEventListener('click', function(e) {
            const message = this.dataset.whatsapp || 'Hello BrightRoots Kids Care, I would like to know more about admission for my child.';
            const phone = '918438142540';
            const url = 'https://wa.me/' + phone + '?text=' + encodeURIComponent(message);
            window.open(url, '_blank');
        });
    });

    // ---------- GALLERY LIGHTBOX ----------
    const galleryItems = document.querySelectorAll('.gallery-item, .gallery-page-grid .item');

    function createLightbox() {
        const existing = document.querySelector('.lightbox-overlay');
        if (existing) return existing;

        const overlay = document.createElement('div');
        overlay.className = 'lightbox-overlay';
        overlay.style.cssText = `
            position: fixed;
            inset: 0;
            background: rgba(0,0,0,0.92);
            z-index: 2000;
            display: none;
            align-items: center;
            justify-content: center;
            padding: 2rem;
            cursor: pointer;
        `;

        const img = document.createElement('img');
        img.className = 'lightbox-image';
        img.style.cssText = `
            max-width: 100%;
            max-height: 90vh;
            border-radius: 0.5rem;
            object-fit: contain;
            cursor: default;
        `;

        const close = document.createElement('button');
        close.className = 'lightbox-close';
        close.textContent = '✕';
        close.style.cssText = `
            position: fixed;
            top: 1.5rem;
            right: 1.5rem;
            background: none;
            border: none;
            color: white;
            font-size: 2.5rem;
            cursor: pointer;
            z-index: 2001;
            font-family: var(--font-body);
        `;

        overlay.appendChild(img);
        overlay.appendChild(close);
        document.body.appendChild(overlay);

        overlay.addEventListener('click', function(e) {
            if (e.target === overlay || e.target === close) {
                overlay.style.display = 'none';
                document.body.style.overflow = '';
            }
        });

        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && overlay.style.display === 'flex') {
                overlay.style.display = 'none';
                document.body.style.overflow = '';
            }
        });

        return overlay;
    }

    galleryItems.forEach(function(item) {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            if (!img) return;

            const overlay = createLightbox();
            const lightboxImg = overlay.querySelector('.lightbox-image');
            lightboxImg.src = img.src;
            lightboxImg.alt = img.alt || '';
            overlay.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
    });

    // ---------- ACTIVE NAV LINK (for page highlighting) ----------
    // This is handled by adding 'active' class in HTML

    console.log('🌳 BrightRoots Kids Care - Website loaded successfully!');
});
