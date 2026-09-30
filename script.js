/* ============================================
   Landing Page JavaScript
   Interactions, Animations & Scroll Effects
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // === Mobile Menu Toggle ===
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuToggle && mobileMenu) {
        const desktopNavigation = window.matchMedia('(min-width: 1024px)');
        const setMenuOpen = isOpen => {
            menuToggle.classList.toggle('active', isOpen);
            mobileMenu.classList.toggle('active', isOpen);
            menuToggle.setAttribute('aria-expanded', String(isOpen));
            menuToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
            mobileMenu.setAttribute('aria-hidden', String(!isOpen && !desktopNavigation.matches));
            mobileMenu.inert = !isOpen && !desktopNavigation.matches;
            document.body.style.overflow = isOpen ? 'hidden' : '';
        };

        setMenuOpen(false);
        menuToggle.addEventListener('click', () => {
            setMenuOpen(!mobileMenu.classList.contains('active'));
        });

        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => setMenuOpen(false));
        });

        document.addEventListener('keydown', event => {
            if (event.key === 'Escape' && mobileMenu.classList.contains('active')) setMenuOpen(false);
        });

        desktopNavigation.addEventListener('change', () => setMenuOpen(false));
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
    let headerIsScrolled = null;

    window.addEventListener('scroll', () => {
        const isScrolled = window.scrollY > 50;
        if (isScrolled === headerIsScrolled) return;
        headerIsScrolled = isScrolled;

        if (header) {
            if (isScrolled) {
                header.style.borderBottomColor = 'rgba(124, 58, 237, 0.1)';
                header.style.background = 'rgba(10, 10, 15, 0.95)';
            } else {
                header.style.borderBottomColor = 'rgba(255, 255, 255, 0.05)';
                header.style.background = 'rgba(10, 10, 15, 0.85)';
            }
        }
    }, { passive: true });

    // === Accordion functionality ===
    function initAccordion(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const items = container.querySelectorAll('.accordion-item');
        const syncOpenPanelHeights = () => {
            container.querySelectorAll('.accordion-item.active .accordion-body').forEach(panel => {
                panel.style.setProperty('--accordion-panel-height', `${panel.scrollHeight}px`);
            });
        };

        items.forEach(item => {
            const header = item.querySelector('.accordion-header');
            const icon = item.querySelector('.accordion-icon');
            const panel = item.querySelector('.accordion-body');

            if (panel && item.classList.contains('active')) {
                panel.style.setProperty('--accordion-panel-height', `${panel.scrollHeight}px`);
                header.setAttribute('aria-expanded', 'true');
            } else {
                header.setAttribute('aria-expanded', 'false');
            }

            header.addEventListener('click', () => {
                const isActive = item.classList.contains('active');

                items.forEach(other => {
                    other.classList.remove('active');
                    const otherIcon = other.querySelector('.accordion-icon');
                    const otherPanel = other.querySelector('.accordion-body');
                    const otherHeader = other.querySelector('.accordion-header');
                    if (otherIcon) otherIcon.textContent = '+';
                    if (otherPanel) otherPanel.style.setProperty('--accordion-panel-height', '0px');
                    if (otherHeader) otherHeader.setAttribute('aria-expanded', 'false');
                });

                if (!isActive) {
                    item.classList.add('active');
                    if (icon) icon.textContent = '×';
                    if (panel) panel.style.setProperty('--accordion-panel-height', `${panel.scrollHeight}px`);
                    header.setAttribute('aria-expanded', 'true');
                }
            });
        });

        window.addEventListener('resize', syncOpenPanelHeights, { passive: true });
    }

    initAccordion('accordion');
    initAccordion('ae-accordion');
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

        function syncActiveCard() {
            const trackCenter = projectTrack.getBoundingClientRect().left + projectTrack.clientWidth / 2;
            let closestCard = null;
            let closestDistance = Infinity;

            projectCards.forEach(card => {
                const bounds = card.getBoundingClientRect();
                const distance = Math.abs(bounds.left + bounds.width / 2 - trackCenter);
                if (distance < closestDistance) {
                    closestDistance = distance;
                    closestCard = card;
                }
            });

            projectCards.forEach(card => card.classList.toggle('is-active', card === closestCard));
        }

        function setPage(page, announce = false) {
            currentPage = Math.max(0, Math.min(pageCount - 1, page));
            projectTrack.scrollTo({ left: pagePosition(currentPage), behavior: scrollBehavior });
            updateControls(announce);
        }

        function updateControls(announce = false) {
            syncActiveCard();
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

    // === Scroll Reveal Observer ===
    const revealElements = document.querySelectorAll('.reveal, .reveal-scale, .reveal-left, .reveal-right');
    if (revealElements.length > 0) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.08,
            rootMargin: '0px 0px -30px 0px'
        });

        revealElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                el.classList.add('reveal-visible');
            } else {
                revealObserver.observe(el);
            }
        });
    }


});

