/* ============================================
   Landing Page JavaScript
   Interactions, Animations & Scroll Effects
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // === Mobile Menu Toggle ===
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
        });

        // Close menu on link click
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // === Sticky CTA visibility ===
    const stickyCta = document.getElementById('sticky-cta');
    const heroSection = document.getElementById('hero');

    if (stickyCta && heroSection) {
        const stickyObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    stickyCta.classList.remove('visible');
                } else {
                    stickyCta.classList.add('visible');
                }
            });
        }, { threshold: 0.1 });

        stickyObserver.observe(heroSection);
    }

    // === Header background on scroll ===
    const header = document.getElementById('header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;

        if (header) {
            if (currentScroll > 50) {
                header.style.borderBottomColor = 'rgba(124, 58, 237, 0.1)';
                header.style.background = 'rgba(10, 10, 15, 0.95)';
            } else {
                header.style.borderBottomColor = 'rgba(255, 255, 255, 0.05)';
                header.style.background = 'rgba(10, 10, 15, 0.85)';
            }
        }

        lastScroll = currentScroll;
    }, { passive: true });

    // === Accordion functionality ===
    function initAccordion(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const items = container.querySelectorAll('.accordion-item');

        items.forEach(item => {
            const header = item.querySelector('.accordion-header');
            const icon = item.querySelector('.accordion-icon');

            header.addEventListener('click', () => {
                const isActive = item.classList.contains('active');

                // Close all items in this accordion
                items.forEach(other => {
                    other.classList.remove('active');
                    const otherIcon = other.querySelector('.accordion-icon');
                    if (otherIcon) otherIcon.textContent = '+';
                });

                // Toggle current item
                if (!isActive) {
                    item.classList.add('active');
                    if (icon) icon.textContent = '×';
                }
            });
        });
    }

    initAccordion('accordion');
    initAccordion('faq-accordion');

    // === Student projects carousel ===
    const projectTrack = document.getElementById('project-cards');
    const projectControls = document.getElementById('project-carousel-controls');
    const projectDots = document.getElementById('project-carousel-dots');
    const projectStatus = document.getElementById('project-carousel-status');

    if (projectTrack && projectControls && projectDots) {
        const projectCards = Array.from(projectTrack.querySelectorAll('.project-card'));
        const previousButton = projectControls.querySelector('[data-carousel-direction="-1"]');
        const nextButton = projectControls.querySelector('[data-carousel-direction="1"]');
        let pageCount = 1;
        let currentPage = 0;
        let scrollFrame = 0;
        let cardsPerPage = 1;
        let pageStep = projectTrack.clientWidth;
        const scrollBehavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';

        const pagePosition = page => Math.min(page * pageStep, projectTrack.scrollWidth - projectTrack.clientWidth);

        function visiblePage() {
            const maxScroll = projectTrack.scrollWidth - projectTrack.clientWidth;
            if (projectTrack.scrollLeft >= maxScroll - 4) return pageCount - 1;
            return Math.max(0, Math.min(pageCount - 1, Math.round(projectTrack.scrollLeft / pageStep)));
        }

        function setPage(page, announce = false) {
            currentPage = Math.max(0, Math.min(pageCount - 1, page));
            projectTrack.scrollTo({ left: pagePosition(currentPage), behavior: scrollBehavior });
            updateControls(announce);
        }

        function updateControls(announce = false) {
            const pageDots = projectDots.querySelectorAll('button');
            pageDots.forEach((dot, index) => {
                if (index === currentPage) dot.setAttribute('aria-current', 'true');
                else dot.removeAttribute('aria-current');
            });
            previousButton.disabled = currentPage === 0;
            nextButton.disabled = currentPage === pageCount - 1;
            if (announce && projectStatus) projectStatus.textContent = `Page ${currentPage + 1} of ${pageCount}`;
        }

        function configureCarousel() {
            const previousPosition = projectTrack.scrollLeft;
            const wasAtEnd = previousPosition >= projectTrack.scrollWidth - projectTrack.clientWidth - 4;
            const gap = parseFloat(getComputedStyle(projectTrack).columnGap) || 0;
            const cardStep = (projectCards[0]?.getBoundingClientRect().width || projectTrack.clientWidth) + gap;
            cardsPerPage = Math.max(1, Math.floor((projectTrack.clientWidth + gap) / cardStep));
            pageStep = cardsPerPage * cardStep;
            pageCount = Math.max(1, Math.ceil(projectCards.length / cardsPerPage));
            projectDots.replaceChildren();
            for (let page = 0; page < pageCount; page += 1) {
                const dot = document.createElement('button');
                dot.type = 'button';
                dot.className = 'project-carousel-dot';
                dot.setAttribute('aria-label', `Go to project page ${page + 1} of ${pageCount}`);
                dot.addEventListener('click', () => setPage(page, true));
                projectDots.append(dot);
            }
            currentPage = wasAtEnd
                ? pageCount - 1
                : Math.min(pageCount - 1, Math.round(previousPosition / pageStep));
            projectTrack.scrollLeft = pagePosition(currentPage);
            projectControls.hidden = projectCards.length < 2 || projectTrack.scrollWidth <= projectTrack.clientWidth + 1;
            updateControls();
        }

        previousButton.addEventListener('click', () => setPage(currentPage - 1, true));
        nextButton.addEventListener('click', () => setPage(currentPage + 1, true));

        projectTrack.addEventListener('scroll', () => {
            cancelAnimationFrame(scrollFrame);
            scrollFrame = requestAnimationFrame(() => {
                currentPage = visiblePage();
                updateControls();
            });
        }, { passive: true });

        projectTrack.addEventListener('keydown', event => {
            if (event.key === 'ArrowRight') {
                event.preventDefault();
                setPage(currentPage + 1, true);
            } else if (event.key === 'ArrowLeft') {
                event.preventDefault();
                setPage(currentPage - 1, true);
            }
        });

        const resizeObserver = new ResizeObserver(configureCarousel);
        resizeObserver.observe(projectTrack);
        configureCarousel();
    }

    // === Scroll Reveal Animations ===
    const revealElements = document.querySelectorAll(
        '.mentors-card, .brands-section, .tools-section, .project-card, ' +
        '.advantage-card, .curriculum-card, .framework-section, .community-card, ' +
        '.process-step, .faq-section, .showreel-card, .academy-banner, .partner-banner, ' +
        '.video-section, .problem-section, .student-work-section, .mentors-group-section'
    );

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal', 'visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => {
        el.classList.add('reveal');
        revealObserver.observe(el);
    });

    // === Framework Steps Animation ===
    const frameworkSteps = document.querySelectorAll('.framework-step');
    const timelineNodes = document.querySelectorAll('.timeline-node');
    let currentStep = 0;

    function activateFrameworkStep(index) {
        frameworkSteps.forEach((step, i) => {
            step.classList.toggle('active', i === index);
        });
        timelineNodes.forEach((node, i) => {
            node.classList.toggle('active', i === index);
        });
    }

    // Auto-rotate framework steps
    if (frameworkSteps.length > 0) {
        setInterval(() => {
            currentStep = (currentStep + 1) % frameworkSteps.length;
            activateFrameworkStep(currentStep);
        }, 4000);
    }

    // === Smooth scroll for anchor links ===
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                const headerHeight = header ? header.offsetHeight : 60;
                const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // === Brand items stagger animation ===
    const brandsGrid = document.getElementById('brands-grid');
    if (brandsGrid) {
        const brandObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const items = brandsGrid.querySelectorAll('.brand-item');
                    items.forEach((item, index) => {
                        item.style.opacity = '0';
                        item.style.transform = 'translateY(10px)';
                        setTimeout(() => {
                            item.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0)';
                        }, index * 50);
                    });
                    brandObserver.unobserve(brandsGrid);
                }
            });
        }, { threshold: 0.2 });

        brandObserver.observe(brandsGrid);
    }


    // === Counter animation for stats ===
    const statNumbers = document.querySelectorAll('.stat-number');
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.getAttribute('data-target'));
                if (!target) return;

                let current = 0;
                const step = Math.ceil(target / 60);
                const duration = 1500;
                const interval = duration / 60;

                const counter = setInterval(() => {
                    current += step;
                    if (current >= target) {
                        current = target;
                        clearInterval(counter);
                    }
                    el.textContent = current.toLocaleString() + '+';
                }, interval);

                statsObserver.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(el => statsObserver.observe(el));

    // === Play button interaction ===
    const playButton = document.getElementById('play-button');
    if (playButton) {
        playButton.addEventListener('click', () => {
            // Placeholder: you can embed a YouTube/Vimeo iframe here
            const videoPlayer = document.getElementById('video-player');
            if (videoPlayer) {
                videoPlayer.innerHTML = `
                    <div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:#111119;color:#a78bfa;font-size:14px;font-family:var(--font-accent);">
                        <p>Video will be embedded here</p>
                    </div>
                `;
            }
        });
    }

    // === Parallax effect on hero ===
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            if (scrolled < window.innerHeight) {
                heroContent.style.transform = `translateY(${scrolled * 0.15}px)`;
                heroContent.style.opacity = 1 - (scrolled / (window.innerHeight * 0.8));
            }
        }, { passive: true });
    }

    // === Advantage cards stagger ===
    const advantageCards = document.querySelectorAll('.advantage-card');
    const advObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const cards = document.querySelectorAll('.advantage-card');
                cards.forEach((card, index) => {
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, index * 150);
                });
                advObserver.disconnect();
            }
        });
    }, { threshold: 0.1 });

    if (advantageCards.length > 0) {
        advantageCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        });
        advObserver.observe(advantageCards[0]);
    }

    // === Process steps stagger ===
    const processSteps = document.querySelectorAll('.process-step');
    const processObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                processSteps.forEach((step, index) => {
                    setTimeout(() => {
                        step.style.opacity = '1';
                        step.style.transform = 'translateY(0)';
                    }, index * 200);
                });
                processObserver.disconnect();
            }
        });
    }, { threshold: 0.1 });

    if (processSteps.length > 0) {
        processSteps.forEach(step => {
            step.style.opacity = '0';
            step.style.transform = 'translateY(20px)';
            step.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        });
        processObserver.observe(processSteps[0]);
    }

});
