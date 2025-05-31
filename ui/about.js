document.addEventListener('DOMContentLoaded', function () {
    // Header scroll effect
    const header = document.querySelector('header');

    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const ctaButtons = document.querySelector('.cta-buttons');

    // Set active nav link based on current page
    const setActiveNavLink = () => {
        const currentPath = window.location.pathname;
        const navLinks = document.querySelectorAll('.nav-links a');

        navLinks.forEach((link) => {
            const href = link.getAttribute('href');

            // Check if the href matches the current path
            if ((href === '/' && currentPath === '/') || (href !== '/' && currentPath.includes(href))) {
                link.classList.add('active');
            }
        });
    };

    // Call the function to set active link
    setActiveNavLink();

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function () {
            navLinks.classList.toggle('mobile-active');
            ctaButtons.classList.toggle('mobile-active');
            mobileMenuBtn.querySelector('i').classList.toggle('fa-bars');
            mobileMenuBtn.querySelector('i').classList.toggle('fa-times');
        });
    }

    // Scroll event for header
    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Animate elements on scroll
    const animateOnScroll = function (entries, observer) {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    };

    // Create an observer for animation
    const animationObserver = new IntersectionObserver(animateOnScroll, {
        root: null,
        threshold: 0.15,
    });

    // Add animations to team members
    document.querySelectorAll('.team-member').forEach((member, index) => {
        member.classList.add('fade-in');
        member.style.animationDelay = `${index * 0.2}s`;
        animationObserver.observe(member);
    });

    // Add animations to mission cards
    document.querySelectorAll('.mission-card').forEach((card, index) => {
        card.classList.add('fade-in');
        card.style.animationDelay = `${index * 0.2}s`;
        animationObserver.observe(card);
    });

    // Add animations to timeline items
    document.querySelectorAll('.timeline-item').forEach((item, index) => {
        item.classList.add('slide-in-left');
        item.style.animationDelay = `${index * 0.3}s`;
        animationObserver.observe(item);
    });

    // Add animations to contact methods
    document.querySelectorAll('.contact-method').forEach((method, index) => {
        method.classList.add('slide-in-left');
        method.style.animationDelay = `${index * 0.2}s`;
        animationObserver.observe(method);
    });

    // Add sliding animation to all sections
    document.querySelectorAll('section:not(#about-hero)').forEach((section) => {
        section.classList.add('slide-up');
        animationObserver.observe(section);
    });

    // Hero section animations
    const heroContent = document.querySelector('.hero-content');
    const heroImage = document.querySelector('.hero-image');

    if (heroContent && heroImage) {
        heroContent.classList.add('slide-in-left');
        heroImage.classList.add('slide-in-right');
    }

    // Add floating animation to the hero image
    const aboutImage = document.querySelector('.about-img');
    if (aboutImage) {
        setInterval(() => {
            aboutImage.style.transform = `translateY(${Math.sin(Date.now() / 1000) * 5}px)`;
        }, 50);
    }

    // Add animation to the rocket logos
    const rockets = document.querySelectorAll('.rocket');
    if (rockets.length > 0) {
        rockets.forEach((rocket) => {
            // Subtle floating animation
            setInterval(() => {
                const randomOffset = Math.sin(Date.now() / 1200) * 3;
                rocket.style.transform = `rotate(45deg) translateY(${randomOffset}px)`;
            }, 50);
        });
    }

    // Form submission handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Simulate form submission with a success message
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;

            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';

            setTimeout(() => {
                // Reset form fields
                contactForm.reset();

                // Show success message
                submitButton.textContent = 'Message Sent!';
                submitButton.style.background = 'var(--color-success)';

                // Reset button after delay
                setTimeout(() => {
                    submitButton.textContent = originalText;
                    submitButton.style.background = '';
                    submitButton.disabled = false;
                }, 3000);
            }, 1500);
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth',
                });
            }
        });
    });
});
