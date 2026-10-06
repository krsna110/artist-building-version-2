/* ============================================
   Landing Page JavaScript
   Interactions, Animations & Scroll Effects
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // === Dropdown Menu Toggle ===
    const menuToggle = document.getElementById('menu-toggle');
    const dropdownMenu = document.getElementById('dropdown-menu');

    if (menuToggle && dropdownMenu) {
        const setMenuOpen = isOpen => {
            menuToggle.classList.toggle('active', isOpen);
            dropdownMenu.classList.toggle('active', isOpen);
            menuToggle.setAttribute('aria-expanded', String(isOpen));
            menuToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
            dropdownMenu.setAttribute('aria-hidden', String(!isOpen));
        };

        setMenuOpen(false);
        menuToggle.addEventListener('click', () => {
            setMenuOpen(!dropdownMenu.classList.contains('active'));
        });

        dropdownMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => setMenuOpen(false));
        });

        document.addEventListener('keydown', event => {
            if (event.key === 'Escape' && dropdownMenu.classList.contains('active')) setMenuOpen(false);
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', event => {
            if (dropdownMenu.classList.contains('active') &&
                !dropdownMenu.contains(event.target) &&
                !menuToggle.contains(event.target)) {
                setMenuOpen(false);
            }
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
    let headerIsScrolled = null;

    window.addEventListener('scroll', () => {
        const isScrolled = window.scrollY > 40;
        if (isScrolled === headerIsScrolled) return;
        headerIsScrolled = isScrolled;

        if (header) {
            header.classList.toggle('header-scrolled', isScrolled);
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

    // === Mentor & Co-Founder Carousel Functionality ===
    document.querySelectorAll('.mentor-carousel').forEach((mentorCarousel) => {
        const slides = Array.from(mentorCarousel.querySelectorAll('.mentor-slide'));
        if (slides.length <= 1) return;
        const prevBtn = mentorCarousel.querySelector('.prev-btn');
        const nextBtn = mentorCarousel.querySelector('.next-btn');
        const dots = Array.from(mentorCarousel.querySelectorAll('.mentor-dot'));
        let currentSlide = 0;
        let autoSlideTimer = null;

        function updateSlide(index) {
            currentSlide = (index + slides.length) % slides.length;
            slides.forEach((slide, i) => {
                const isActive = i === currentSlide;
                slide.classList.toggle('active', isActive);
                slide.setAttribute('aria-hidden', String(!isActive));
            });
            dots.forEach((dot, i) => {
                const isActive = i === currentSlide;
                dot.classList.toggle('active', isActive);
                dot.setAttribute('aria-selected', String(isActive));
            });
        }

        function startAutoSlide() {
            stopAutoSlide();
            autoSlideTimer = setInterval(() => {
                updateSlide(currentSlide + 1);
            }, 6000);
        }

        function stopAutoSlide() {
            if (autoSlideTimer) {
                clearInterval(autoSlideTimer);
                autoSlideTimer = null;
            }
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                updateSlide(currentSlide - 1);
                startAutoSlide();
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                updateSlide(currentSlide + 1);
                startAutoSlide();
            });
        }

        dots.forEach((dot, i) => {
            dot.addEventListener('click', () => {
                updateSlide(i);
                startAutoSlide();
            });
        });

        // Keyboard arrow support
        mentorCarousel.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                updateSlide(currentSlide - 1);
                startAutoSlide();
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                updateSlide(currentSlide + 1);
                startAutoSlide();
            }
        });

        // Touch swipe support
        let touchStartX = 0;
        let touchEndX = 0;

        mentorCarousel.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            stopAutoSlide();
        }, { passive: true });

        mentorCarousel.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            const diff = touchEndX - touchStartX;
            if (Math.abs(diff) > 40) {
                if (diff < 0) {
                    updateSlide(currentSlide + 1);
                } else {
                    updateSlide(currentSlide - 1);
                }
            }
            startAutoSlide();
        }, { passive: true });

        // Pause auto-sliding on hover
        mentorCarousel.addEventListener('mouseenter', stopAutoSlide);
        mentorCarousel.addEventListener('mouseleave', startAutoSlide);

        // Start auto-rotation
        startAutoSlide();
    });

    // === Exclusive Bonuses Deck & Spread Animation ===
    const bonusesStage = document.getElementById('bonuses-stage');
    const btnStackView = document.getElementById('btn-stack-view');
    const btnSpreadView = document.getElementById('btn-spread-view');
    const bonusesSection = document.getElementById('bonuses');

    if (bonusesStage) {
        let isSpread = false;
        let userInteracted = false;
        let bloomTimeout = null;

        function setBonusView(spread, announce = false, isUserClick = false) {
            if (isUserClick) {
                userInteracted = true;
                if (bloomTimeout) {
                    clearTimeout(bloomTimeout);
                    bloomTimeout = null;
                }
            }
            isSpread = spread;
            if (spread) {
                bonusesStage.classList.remove('is-stacked');
                bonusesStage.classList.add('is-spread');
                if (btnSpreadView) {
                    btnSpreadView.classList.add('active');
                    btnSpreadView.setAttribute('aria-pressed', 'true');
                }
                if (btnStackView) {
                    btnStackView.classList.remove('active');
                    btnStackView.setAttribute('aria-pressed', 'false');
                }
            } else {
                bonusesStage.classList.remove('is-spread');
                bonusesStage.classList.add('is-stacked');
                if (btnStackView) {
                    btnStackView.classList.add('active');
                    btnStackView.setAttribute('aria-pressed', 'true');
                }
                if (btnSpreadView) {
                    btnSpreadView.classList.remove('active');
                    btnSpreadView.setAttribute('aria-pressed', 'false');
                }
            }
        }

        // Initialize state to Deck (stacked) view
        setBonusView(false);

        if (btnStackView) {
            btnStackView.addEventListener('click', () => setBonusView(false, true, true));
        }

        if (btnSpreadView) {
            btnSpreadView.addEventListener('click', () => setBonusView(true, true, true));
        }

        // Clicking on any card while stacked blooms them out into spread view
        bonusesStage.querySelectorAll('.bonus-card').forEach(card => {
            card.addEventListener('click', () => {
                if (!isSpread) {
                    setBonusView(true, true, true);
                }
            });
        });

        // Dynamic Scroll Triggered Animation:
        // Starts stacked as the user approaches; once the cards enter view,
        // they smoothly bloom and fan out into the spread view!
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) {
            // For reduced motion preference, display in spread view immediately
            setBonusView(true);
        } else {
            function checkBonusScroll() {
                if (userInteracted) return;

                const stageRect = bonusesStage.getBoundingClientRect();
                const windowHeight = window.innerHeight || document.documentElement.clientHeight;

                // When cards stage enters comfortably into view (top is within 80% of viewport height)
                const stageInView = stageRect.top < windowHeight * 0.80 && stageRect.bottom > 80;

                // When scrolled completely back above the section (cards are below viewport)
                const stageBelowView = stageRect.top > windowHeight;

                if (stageInView && !isSpread) {
                    if (!bloomTimeout) {
                        bloomTimeout = setTimeout(() => {
                            setBonusView(true);
                            bloomTimeout = null;
                        }, 220);
                    }
                } else if (stageBelowView && isSpread) {
                    // Reset back to stacked deck when user scrolls back up
                    if (bloomTimeout) {
                        clearTimeout(bloomTimeout);
                        bloomTimeout = null;
                    }
                    setBonusView(false);
                }
            }

            // IntersectionObserver for modern high-performance viewport detection
            if ('IntersectionObserver' in window) {
                const stageObserver = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (userInteracted) return;

                        if (entry.isIntersecting && entry.intersectionRatio >= 0.15) {
                            if (!isSpread && !bloomTimeout) {
                                bloomTimeout = setTimeout(() => {
                                    setBonusView(true);
                                    bloomTimeout = null;
                                }, 220);
                            }
                        } else if (!entry.isIntersecting) {
                            const rect = entry.boundingClientRect;
                            if (rect.top > (window.innerHeight || document.documentElement.clientHeight)) {
                                if (bloomTimeout) {
                                    clearTimeout(bloomTimeout);
                                    bloomTimeout = null;
                                }
                                setBonusView(false);
                            }
                        }
                    });
                }, {
                    threshold: [0, 0.15, 0.35, 0.6],
                    rootMargin: '0px 0px -40px 0px'
                });

                stageObserver.observe(bonusesStage);
            }

            // Passive scroll listener to guarantee trigger regardless of scroll speed
            let scrollThrottle = false;
            window.addEventListener('scroll', () => {
                if (!scrollThrottle) {
                    scrollThrottle = true;
                    requestAnimationFrame(() => {
                        checkBonusScroll();
                        scrollThrottle = false;
                    });
                }
            }, { passive: true });

            // Initial check on load
            checkBonusScroll();
        }
    }

    // === Intelligent Video Playback & Performance Manager ===
    const testimonialModal = document.getElementById('testimonial-modal');
    const modalBackdrop = document.getElementById('modal-backdrop');
    const modalClose = document.getElementById('modal-close');
    const modalVideo = document.getElementById('modal-video-player');
    const modalNotice = document.getElementById('modal-notice');
    const modalStudentName = document.getElementById('modal-student-name');
    const modalStudentRole = document.getElementById('modal-student-role');
    const noticeTitle = document.getElementById('notice-title');
    let isModalOpen = false;

    // Track active intersecting cards for responsive playback management
    const intersectingCards = new Set();

    function safePlayVideo(video) {
        if (!video || !video.src || isModalOpen || document.hidden) return;
        video.muted = true;
        const playPromise = video.play();
        if (playPromise !== undefined) {
            playPromise.catch(() => {
                // Autoplay blocked or interrupted gracefully
            });
        }
    }

    function safePauseVideo(video) {
        if (!video) return;
        try {
            if (!video.paused) {
                video.pause();
            }
        } catch (_) {}
    }

    function loadCardVideo(video) {
        if (!video) return;
        if (video.dataset && video.dataset.src && !video.src) {
            video.src = video.dataset.src;
            video.preload = 'metadata';
            video.load();
        }
    }

    // Proximity observer: lazily loads MP4 streams only when card approaches viewport (300px buffer)
    let preloadObserver = null;
    let playbackObserver = null;

    if ('IntersectionObserver' in window) {
        preloadObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const video = entry.target.querySelector('video');
                    if (video) {
                        loadCardVideo(video);
                    }
                    observer.unobserve(entry.target);
                }
            });
        }, {
            rootMargin: '350px 0px 350px 0px',
            threshold: 0.01
        });

        playbackObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const card = entry.target;
                const video = card.querySelector('video');
                if (!video) return;

                if (entry.isIntersecting) {
                    intersectingCards.add(card);
                    loadCardVideo(video);
                    safePlayVideo(video);
                } else {
                    intersectingCards.delete(card);
                    safePauseVideo(video);
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px 0px 0px'
        });
    }

    const allVideoCards = document.querySelectorAll('.skills-stack .skill-card, #projects .sw-card');

    allVideoCards.forEach(card => {
        const video = card.querySelector('video');
        if (video) {
            video.muted = true;
            video.playsInline = true;

            // Handle network/decode errors gracefully without breaking layout
            video.addEventListener('error', () => {
                video.style.opacity = '0';
            }, { once: true });

            video.addEventListener('loadeddata', () => {
                video.style.opacity = '1';
            }, { once: true });

            // Hover to play/focus enhancement
            card.addEventListener('mouseenter', () => {
                if (!isModalOpen && !document.hidden) {
                    loadCardVideo(video);
                    safePlayVideo(video);
                }
            });
        }

        if (preloadObserver) preloadObserver.observe(card);
        if (playbackObserver) playbackObserver.observe(card);

        // Card modal click binding
        card.addEventListener('click', () => openVideoModal(card));
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openVideoModal(card);
            }
        });
    });

    // === Student Testimonials Interactive Auto-Scrolling Engine ===
    const testimonialCarouselWrapper = document.getElementById('testimonials-carousel-wrapper');
    const testimonialsTrack = document.getElementById('testimonials-track');
    const testimonialCards = document.querySelectorAll('.testimonial-card');

    if (testimonialCarouselWrapper && testimonialsTrack && testimonialCards.length > 0) {
        // Scroller Engine State
        let currentX = 0;
        let baseSpeed = 0.85; // Pixels per frame at 60Hz
        let currentVelocity = 0;
        let isAutoScrolling = true;
        let isHovered = false;
        let isInteracting = false;
        let isPlayingVideo = false;
        let animationFrameId = null;
        let lastTimestamp = 0;

        // Pointer Drag State
        let isDragging = false;
        let startPointerX = 0;
        let startTranslateX = 0;
        let lastPointerX = 0;
        let lastMoveTime = 0;
        let dragDistance = 0;
        let hasMovedSignificantly = false;

        // Smooth glide tween state for keyboard navigation
        let isTweening = false;
        let tweenStartX = 0;
        let tweenTargetX = 0;
        let tweenStartTime = 0;
        let tweenDuration = 450; // ms

        // Calculate single loop width (half of total scrollWidth because of duplicate set)
        function getHalfTrackWidth() {
            return testimonialsTrack.scrollWidth / 2;
        }

        // Keep currentX within [-halfWidth, 0] bounds seamlessly
        function normalizePosition(x) {
            const halfWidth = getHalfTrackWidth();
            if (halfWidth <= 0) return x;
            while (x <= -halfWidth) x += halfWidth;
            while (x > 0) x -= halfWidth;
            return x;
        }

        function applyTransform(x) {
            testimonialsTrack.style.transform = `translate3d(${x}px, 0, 0)`;
        }

        // Cubic ease out for glide jumps
        function easeOutCubic(t) {
            return 1 - Math.pow(1 - t, 3);
        }

        // Main 60/120fps Animation Loop
        function stepAnimation(timestamp) {
            if (!lastTimestamp) lastTimestamp = timestamp;
            const delta = Math.min((timestamp - lastTimestamp) / 16.67, 2.5); // Normalized to ~60fps
            lastTimestamp = timestamp;

            const halfWidth = getHalfTrackWidth();

            if (isTweening) {
                const elapsed = timestamp - tweenStartTime;
                const progress = Math.min(elapsed / tweenDuration, 1);
                const eased = easeOutCubic(progress);
                currentX = tweenStartX + (tweenTargetX - tweenStartX) * eased;
                currentX = normalizePosition(currentX);
                applyTransform(currentX);

                if (progress >= 1) {
                    isTweening = false;
                }
            } else if (isDragging) {
                // Handled directly in pointermove
            } else if (Math.abs(currentVelocity) > 0.05) {
                // Momentum inertia after release
                currentX += currentVelocity * delta;
                currentX = normalizePosition(currentX);
                applyTransform(currentX);
                currentVelocity *= Math.pow(0.92, delta); // Friction deceleration
            } else {
                currentVelocity = 0;
                const shouldDrift = isAutoScrolling && !isHovered && !isInteracting && !isPlayingVideo;
                if (shouldDrift && halfWidth > 0) {
                    currentX -= baseSpeed * delta;
                    currentX = normalizePosition(currentX);
                    applyTransform(currentX);
                }
            }

            animationFrameId = requestAnimationFrame(stepAnimation);
        }

        animationFrameId = requestAnimationFrame(stepAnimation);

        // Smooth jump forward or backward by card width
        function glideBy(offsetPx) {
            isTweening = true;
            tweenStartX = currentX;
            tweenTargetX = currentX + offsetPx;
            tweenStartTime = performance.now();
        }

        const getCardStep = () => {
            const firstCard = testimonialCards[0];
            const cardWidth = firstCard ? firstCard.offsetWidth : 280;
            const gap = 24;
            return cardWidth + gap;
        };

        // Pointer Drag Handling (Mouse Drag & Touch Swipe with Inertia)
        function onPointerDown(e) {
            if (e.target.closest('.card-sound-badge') || e.target.closest('.card-expand-badge')) return;
            isDragging = true;
            isTweening = false;
            currentVelocity = 0;
            startPointerX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
            startTranslateX = currentX;
            lastPointerX = startPointerX;
            lastMoveTime = performance.now();
            dragDistance = 0;
            hasMovedSignificantly = false;
            testimonialCarouselWrapper.setPointerCapture?.(e.pointerId);
        }

        function onPointerMove(e) {
            if (!isDragging) return;
            const pointerX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
            const now = performance.now();
            const deltaX = pointerX - startPointerX;
            dragDistance = Math.abs(deltaX);

            if (dragDistance > 6) {
                hasMovedSignificantly = true;
            }

            // Calculate instantaneous drag velocity
            const timeDiff = now - lastMoveTime;
            if (timeDiff > 0) {
                const moveDiff = pointerX - lastPointerX;
                currentVelocity = (moveDiff / timeDiff) * 16.67; // Normalized px per frame
            }

            lastPointerX = pointerX;
            lastMoveTime = now;

            currentX = normalizePosition(startTranslateX + deltaX);
            applyTransform(currentX);
        }

        function onPointerUp(e) {
            if (!isDragging) return;
            isDragging = false;
            testimonialCarouselWrapper.releasePointerCapture?.(e.pointerId);

            // Clamp max release velocity for pleasant flick feel
            currentVelocity = Math.max(-14, Math.min(14, currentVelocity));
        }

        testimonialCarouselWrapper.addEventListener('pointerdown', onPointerDown);
        testimonialCarouselWrapper.addEventListener('pointermove', onPointerMove);
        testimonialCarouselWrapper.addEventListener('pointerup', onPointerUp);
        testimonialCarouselWrapper.addEventListener('pointercancel', onPointerUp);

        // Hover & Focus Pause Handling
        testimonialCarouselWrapper.addEventListener('mouseenter', () => {
            isHovered = true;
        });

        testimonialCarouselWrapper.addEventListener('mouseleave', () => {
            isHovered = false;
        });

        testimonialCarouselWrapper.addEventListener('focusin', () => {
            isHovered = true;
        });

        testimonialCarouselWrapper.addEventListener('focusout', () => {
            isHovered = false;
        });

        // Testimonial Cards Video Playback & Sound Coordination
        function resetTestimonialCard(c) {
            c.classList.remove('is-playing');
            const v = c.querySelector('video');
            if (v && !v.paused) {
                v.pause();
            }
            const playIcon = c.querySelector('.play-icon');
            const pauseIcon = c.querySelector('.pause-icon');
            const soundBtn = c.querySelector('.card-sound-badge');
            const expandBtn = c.querySelector('.card-expand-badge');
            const progressBar = c.querySelector('.card-progress-bar');

            if (playIcon) playIcon.style.display = 'block';
            if (pauseIcon) pauseIcon.style.display = 'none';
            if (soundBtn) soundBtn.style.display = 'none';
            if (expandBtn) expandBtn.style.display = 'none';
            if (progressBar) progressBar.style.width = '0%';
        }

        function syncSoundUI(card, isMuted) {
            const soundBtn = card.querySelector('.card-sound-badge');
            if (!soundBtn) return;
            const soundOn = soundBtn.querySelector('.sound-on-icon');
            const soundOff = soundBtn.querySelector('.sound-off-icon');
            if (soundOn) soundOn.style.display = isMuted ? 'none' : 'block';
            if (soundOff) soundOff.style.display = isMuted ? 'block' : 'none';
            soundBtn.setAttribute('aria-label', isMuted ? 'Unmute' : 'Mute');
        }

        testimonialCards.forEach(card => {
            const video = card.querySelector('video');
            const soundBtn = card.querySelector('.card-sound-badge');
            const expandBtn = card.querySelector('.card-expand-badge');
            const playIcon = card.querySelector('.play-icon');
            const pauseIcon = card.querySelector('.pause-icon');
            const progressBar = card.querySelector('.card-progress-bar');

            // Sound button toggle
            if (soundBtn && video) {
                soundBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    video.muted = !video.muted;
                    syncSoundUI(card, video.muted);
                });
            }

            // Expand to modal popup
            if (expandBtn) {
                expandBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    openVideoModal(card);
                });
            }

            // Real-time video progress bar
            if (video && progressBar) {
                video.addEventListener('timeupdate', () => {
                    if (video.duration) {
                        const progress = (video.currentTime / video.duration) * 100;
                        progressBar.style.width = `${progress}%`;
                    }
                });
            }

            // Toggle inline video playback on card click
            function toggleCardPlayback(e) {
                if (hasMovedSignificantly) {
                    hasMovedSignificantly = false;
                    return;
                }

                if (!video) return;

                if (card.classList.contains('is-playing')) {
                    // Pause playing card
                    video.pause();
                    card.classList.remove('is-playing');
                    if (playIcon) playIcon.style.display = 'block';
                    if (pauseIcon) pauseIcon.style.display = 'none';
                    if (soundBtn) soundBtn.style.display = 'none';
                    if (expandBtn) expandBtn.style.display = 'none';

                    isPlayingVideo = Array.from(testimonialCards).some(c => c.classList.contains('is-playing'));
                } else {
                    // Reset all other testimonial cards
                    testimonialCards.forEach(c => {
                        if (c !== card) resetTestimonialCard(c);
                    });

                    // Pause background cards in other sections for optimal bandwidth & performance
                    intersectingCards.forEach(c => {
                        const bgVid = c.querySelector('video');
                        safePauseVideo(bgVid);
                    });

                    // Load video stream if lazy
                    if (!video.src || video.src === window.location.href) {
                        const targetSrc = card.dataset.videoSrc || (video.dataset && video.dataset.src);
                        if (targetSrc) {
                            video.src = targetSrc;
                            video.load();
                        }
                    }

                    // Activate playing state & pause auto-drift
                    card.classList.add('is-playing');
                    isPlayingVideo = true;

                    if (playIcon) playIcon.style.display = 'none';
                    if (pauseIcon) pauseIcon.style.display = 'block';
                    if (soundBtn) {
                        soundBtn.style.display = 'flex';
                        syncSoundUI(card, video.muted);
                    }
                    if (expandBtn) {
                        expandBtn.style.display = 'flex';
                    }

                    // Play video with audio
                    video.muted = false;
                    syncSoundUI(card, false);

                    const playPromise = video.play();
                    if (playPromise !== undefined) {
                        playPromise.catch(() => {
                            // If unmuted playback is blocked by browser policy, fall back to muted and allow user tap
                            video.muted = true;
                            syncSoundUI(card, true);
                            video.play().catch(() => {});
                        });
                    }

                    video.onended = () => {
                        resetTestimonialCard(card);
                        isPlayingVideo = Array.from(testimonialCards).some(c => c.classList.contains('is-playing'));
                    };
                }
            }

            card.addEventListener('click', toggleCardPlayback);
            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleCardPlayback(e);
                } else if (e.key === 'ArrowRight') {
                    e.preventDefault();
                    glideBy(-getCardStep());
                } else if (e.key === 'ArrowLeft') {
                    e.preventDefault();
                    glideBy(getCardStep());
                }
            });
        });
    }

    // Pause all background video streams when user navigates away from tab
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            intersectingCards.forEach(card => {
                const video = card.querySelector('video');
                safePauseVideo(video);
            });
            testimonialCards.forEach(c => {
                const video = c.querySelector('video');
                if (video && !video.paused) {
                    video.pause();
                }
            });
            if (modalVideo && !modalVideo.paused) {
                safePauseVideo(modalVideo);
            }
        } else if (!isModalOpen) {
            intersectingCards.forEach(card => {
                const video = card.querySelector('video');
                safePlayVideo(video);
            });
        }
    });

    // === Video Reel Modal Coordinator ===
    function openVideoModal(card) {
        if (!testimonialModal || !modalVideo) return;
        isModalOpen = true;

        // Pause all background video loops to allocate maximum bandwidth & GPU to the modal player
        intersectingCards.forEach(c => {
            const video = c.querySelector('video');
            safePauseVideo(video);
        });

        const videoSrc = card.dataset.videoSrc || '';
        const title = card.dataset.title || card.dataset.student || 'Video Reel';
        const role = card.dataset.tag || card.dataset.role || '';
        const poster = card.dataset.poster || '';

        if (modalStudentName) modalStudentName.textContent = title;
        if (modalStudentRole) modalStudentRole.textContent = role;

        if (videoSrc.trim()) {
            if (modalNotice) modalNotice.style.display = 'none';
            modalVideo.style.display = 'block';
            modalVideo.poster = poster;
            modalVideo.src = videoSrc;
            modalVideo.currentTime = 0;
            const modalPlayPromise = modalVideo.play();
            if (modalPlayPromise !== undefined) {
                modalPlayPromise.catch(() => {});
            }
        } else {
            // Placeholder notice if videoSrc is blank
            modalVideo.pause();
            modalVideo.removeAttribute('src');
            modalVideo.style.display = 'none';
            if (modalNotice) {
                modalNotice.style.display = 'flex';
                if (noticeTitle) noticeTitle.textContent = `${title} Reel`;
                const noticeDesc = document.getElementById('notice-desc');
                if (noticeDesc) noticeDesc.innerHTML = `Video reel coming soon! Set <code>data-video-src</code> on this card.`;
            }
        }

        testimonialModal.classList.add('active');
        testimonialModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeVideoModal() {
        if (!testimonialModal || !modalVideo) return;
        modalVideo.pause();
        modalVideo.removeAttribute('src');
        modalVideo.load();
        testimonialModal.classList.remove('active');
        testimonialModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        isModalOpen = false;

        // Resume playback for in-view background videos
        if (!document.hidden) {
            intersectingCards.forEach(card => {
                const video = card.querySelector('video');
                safePlayVideo(video);
            });
        }
    }

    if (modalClose) modalClose.addEventListener('click', closeVideoModal);
    if (modalBackdrop) modalBackdrop.addEventListener('click', closeVideoModal);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && testimonialModal && testimonialModal.classList.contains('active')) {
            closeVideoModal();
        }
    });

    // === Interactive YouTube Course Preview Video Player ===
    const courseVideoPlayer = document.getElementById('video-player');
    const courseVideoPlaceholder = document.getElementById('video-placeholder');

    if (courseVideoPlayer && courseVideoPlaceholder) {
        const initCourseVideo = () => {
            const videoId = courseVideoPlayer.getAttribute('data-video-id') || 'JKVwowo19GU';
            const iframe = document.createElement('iframe');
            iframe.className = 'video-iframe';
            iframe.src = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&playsinline=1&enablejsapi=1`;
            iframe.title = "See What You'll Learn Inside - Video Editing Course Trailer";
            iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
            iframe.allowFullscreen = true;
            iframe.setAttribute('loading', 'lazy');

            courseVideoPlayer.innerHTML = '';
            courseVideoPlayer.appendChild(iframe);
        };

        courseVideoPlaceholder.addEventListener('click', initCourseVideo);
        courseVideoPlaceholder.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                initCourseVideo();
            }
        });
    }

});
