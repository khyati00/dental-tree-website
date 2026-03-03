document.addEventListener('DOMContentLoaded', () => {
    // Mobile navigation toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileNavOverlay = document.querySelector('.mobile-nav-overlay');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    const icon = mobileMenuBtn.querySelector('i');

    function toggleMenu() {
        mobileNavOverlay.classList.toggle('active');
        if (mobileNavOverlay.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-xmark');
        } else {
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
        }
    }

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', toggleMenu);
    }

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileNavOverlay.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    // Sticky Header
    const header = document.querySelector('.header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Scroll Animations (Intersection Observer)
    const fadeElements = document.querySelectorAll('.service-card, .trust-item, .about-content, .about-image-wrapper, .contact-info, .map-card');

    // Set initial state for elements to fade in
    fadeElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.7s ease-out, transform 0.7s ease-out';
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                // Optional: delay based on index for staggered effect
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    fadeElements.forEach(el => observer.observe(el));

    // WhatsApp Form Submission
    const waForm = document.getElementById('whatsapp-form');
    if (waForm) {
        waForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const name = document.getElementById('wa-name').value;
            const phone = document.getElementById('wa-phone').value;
            const service = document.getElementById('wa-service').value;

            // Clinic's phone number
            const waNumber = '8130767068';

            // Constructing the message
            const message = `Hello Dental Tree! I would like to request a callback.\n\n*Name:* ${name}\n*Phone:* ${phone}\n*Service Required:* ${service}`;

            // Open WhatsApp
            const whatsappUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`;

            // Try to open in same window to avoid popup blockers
            window.location.href = whatsappUrl;

            // Reset form
            setTimeout(() => {
                waForm.reset();
            }, 100);
        });
    }
});
