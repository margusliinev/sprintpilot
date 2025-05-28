// Initialize intersection observers for animations on scroll
document.addEventListener('DOMContentLoaded', function () {
    // Header scroll effect
    const header = document.querySelector('header');

    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const ctaButtons = document.querySelector('.cta-buttons');

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

    // Observe all feature cards
    document.querySelectorAll('.feature-card').forEach((card) => {
        card.classList.add('fade-in');
        animationObserver.observe(card);
    });

    // Add sliding animation to all sections
    document.querySelectorAll('section:not(#hero)').forEach((section) => {
        section.classList.add('slide-up');
        animationObserver.observe(section);
    });

    // Testimonial carousel functionality
    const testimonials = document.querySelectorAll('.testimonial');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.getElementById('prev-testimonial');
    const nextBtn = document.getElementById('next-testimonial');

    if (testimonials.length > 0) {
        let currentTestimonial = 0;

        // Function to show testimonial by index
        const showTestimonial = (index) => {
            testimonials.forEach((testimonial) => {
                testimonial.classList.remove('active');
            });
            dots.forEach((dot) => {
                dot.classList.remove('active');
            });

            testimonials[index].classList.add('active');
            dots[index].classList.add('active');
        };

        // Event listeners for control buttons
        if (nextBtn && prevBtn) {
            nextBtn.addEventListener('click', () => {
                currentTestimonial = (currentTestimonial + 1) % testimonials.length;
                showTestimonial(currentTestimonial);
            });

            prevBtn.addEventListener('click', () => {
                currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
                showTestimonial(currentTestimonial);
            });
        }

        // Event listeners for dots
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentTestimonial = index;
                showTestimonial(currentTestimonial);
            });
        });

        // Auto-rotate testimonials
        let testimonialInterval = setInterval(() => {
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            showTestimonial(currentTestimonial);
        }, 8000);

        // Pause auto-rotation when interacting with controls
        document.querySelector('.testimonial-controls').addEventListener('mouseenter', () => {
            clearInterval(testimonialInterval);
        });

        document.querySelector('.testimonial-controls').addEventListener('mouseleave', () => {
            testimonialInterval = setInterval(() => {
                currentTestimonial = (currentTestimonial + 1) % testimonials.length;
                showTestimonial(currentTestimonial);
            }, 8000);
        });
    }

    // Pricing toggle functionality
    const pricingToggle = document.getElementById('pricing-toggle');

    if (pricingToggle) {
        pricingToggle.addEventListener('change', function () {
            document.body.classList.toggle('annual-pricing', this.checked);
        });
    }

    // Hero section animation
    const heroContent = document.querySelector('.hero-content');
    const heroImage = document.querySelector('.hero-image');

    if (heroContent && heroImage) {
        heroContent.classList.add('fade-in');
        heroImage.classList.add('fade-in');

        // Add floating effect to dashboard preview
        const dashboard = document.querySelector('.dashboard-preview');
        if (dashboard) {
            setInterval(() => {
                dashboard.style.transform = `translateY(${Math.sin(Date.now() / 1000) * 10}px)`;
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

        // Add animation to chart bars in the dashboard
        const chartBarFills = document.querySelectorAll('.chart-bar-fill');
        if (chartBarFills.length > 0) {
            // Animate chart bars on scroll into view
            const dashboardObserver = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            // Animate each bar with a delay
                            chartBarFills.forEach((bar, index) => {
                                setTimeout(() => {
                                    const originalHeight = getComputedStyle(bar).height;
                                    bar.style.height = '0';

                                    setTimeout(() => {
                                        bar.style.transition = 'height 1s ease-out';
                                        bar.style.height = originalHeight;
                                    }, 50);
                                }, index * 200);
                            });

                            // Animate task items with a slide-in effect
                            document.querySelectorAll('.task-item').forEach((task, index) => {
                                task.style.opacity = '0';
                                task.style.transform = 'translateX(20px)';

                                setTimeout(
                                    () => {
                                        task.style.transition = 'all 0.5s ease-out';
                                        task.style.opacity = '1';
                                        task.style.transform = 'translateX(0)';
                                    },
                                    (index + chartBarFills.length) * 200,
                                );
                            });

                            // Animate the progress bar
                            const progressFill = document.querySelector('.progress-fill');
                            if (progressFill) {
                                progressFill.style.width = '0';
                                setTimeout(() => {
                                    progressFill.style.transition = 'width 1.5s ease-out';
                                    progressFill.style.width = '73%';
                                }, 300);
                            }

                            dashboardObserver.unobserve(entry.target);
                        }
                    });
                },
                { threshold: 0.2 },
            );

            dashboardObserver.observe(document.querySelector('.dashboard-mockup'));
        }

        // Add interactivity to sidebar items
        const sidebarItems = document.querySelectorAll('.sidebar-item');
        sidebarItems.forEach((item) => {
            item.addEventListener('click', () => {
                sidebarItems.forEach((si) => si.classList.remove('active'));
                item.classList.add('active');
            });
        });

        // Add interactivity to task items
        const taskItems = document.querySelectorAll('.task-item');
        taskItems.forEach((task) => {
            task.addEventListener('click', () => {
                if (task.classList.contains('complete')) {
                    task.classList.remove('complete');
                    task.classList.add('in-progress');
                } else if (task.classList.contains('in-progress')) {
                    task.classList.remove('in-progress');
                    task.classList.add('complete');
                } else {
                    task.classList.add('complete');
                }
            });
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

    // Add particle effects to hero section
    const createParticleEffect = () => {
        const heroSection = document.querySelector('#hero');
        if (!heroSection) return;

        const particleContainer = document.createElement('div');
        particleContainer.classList.add('particle-container');
        particleContainer.style.position = 'absolute';
        particleContainer.style.top = '0';
        particleContainer.style.left = '0';
        particleContainer.style.width = '100%';
        particleContainer.style.height = '100%';
        particleContainer.style.overflow = 'hidden';
        particleContainer.style.zIndex = '0';

        heroSection.appendChild(particleContainer);

        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');

            // Random size
            const size = Math.random() * 6 + 1;

            // Random position
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;

            // Random opacity
            const opacity = Math.random() * 0.5 + 0.1;

            // Random animation duration
            const duration = Math.random() * 20 + 10;

            // Random gradient color
            const colorStop = Math.random() * 100;

            particle.style.cssText = `
                position: absolute;
                top: ${posY}%;
                left: ${posX}%;
                width: ${size}px;
                height: ${size}px;
                border-radius: 50%;
                background: linear-gradient(90deg, var(--color-accent) ${colorStop}%, var(--color-accent-secondary) ${colorStop + 50}%);
                opacity: ${opacity};
                pointer-events: none;
                animation: float ${duration}s linear infinite;
            `;

            particleContainer.appendChild(particle);
        }
    };

    // Add keyframe animation for particles
    const addParticleAnimation = () => {
        const styleSheet = document.createElement('style');
        styleSheet.innerHTML = `
            @keyframes float {
                0% {
                    transform: translateY(0) rotate(0deg);
                }
                25% {
                    transform: translateY(-${Math.random() * 20 + 10}px) rotate(${Math.random() * 180}deg);
                }
                50% {
                    transform: translateY(0) rotate(${Math.random() * 360}deg);
                }
                75% {
                    transform: translateY(${Math.random() * 20 + 10}px) rotate(${Math.random() * 540}deg);
                }
                100% {
                    transform: translateY(0) rotate(${Math.random() * 720}deg);
                }
            }
        `;
        document.head.appendChild(styleSheet);
    };

    // Initialize particle effects
    addParticleAnimation();
    createParticleEffect();

    // Typing animation for hero headline
    const initTypeAnimation = () => {
        const heroHeadline = document.querySelector('.hero-content h1');
        if (!heroHeadline) return;

        const originalText = heroHeadline.innerHTML;
        const words = originalText.split(' ');
        const gradientWord = words.find((word) => word.includes('span class="gradient-text"'));

        if (gradientWord) {
            // Don't animate the gradient word
            const textBeforeGradient = words.slice(0, words.indexOf(gradientWord)).join(' ');
            const textAfterGradient = words.slice(words.indexOf(gradientWord) + 1).join(' ');

            heroHeadline.innerHTML = '';

            // Add container for typing animation
            const typingContainer = document.createElement('span');
            typingContainer.classList.add('typing-text');

            heroHeadline.appendChild(typingContainer);
            heroHeadline.innerHTML += ' ' + gradientWord + ' ' + textAfterGradient;

            let i = 0;
            const typeInterval = setInterval(() => {
                if (i < textBeforeGradient.length) {
                    typingContainer.textContent += textBeforeGradient.charAt(i);
                    i++;
                } else {
                    clearInterval(typeInterval);

                    // Add cursor blinking after typing
                    const cursor = document.createElement('span');
                    cursor.classList.add('cursor');
                    cursor.innerHTML = '|';
                    cursor.style.opacity = '1';
                    cursor.style.animation = 'blink 1s infinite';
                    typingContainer.appendChild(cursor);

                    // Add cursor blinking animation
                    const cursorStyle = document.createElement('style');
                    cursorStyle.innerHTML = `
                        @keyframes blink {
                            0%, 100% { opacity: 1; }
                            50% { opacity: 0; }
                        }
                    `;
                    document.head.appendChild(cursorStyle);
                }
            }, 100);
        }
    };

    // Initialize typing effect with a delay
    setTimeout(initTypeAnimation, 500);
});
