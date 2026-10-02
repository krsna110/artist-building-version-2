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

    // === Video Testimonial Modal & Playback ===
    // ponytail: Built with native CSS marquee animation and lightweight HTML5 video dialog. Ceiling: no inertial drag-to-scroll touch gestures. Upgrade path: Integrate Hammer.js or Swiper if free touch-drag physics are needed.
    const testimonialModal = document.getElementById('testimonial-modal');
    const modalBackdrop = document.getElementById('modal-backdrop');
    const modalClose = document.getElementById('modal-close');
    const modalVideo = document.getElementById('modal-video-player');
    const modalNotice = document.getElementById('modal-notice');
    const modalStudentName = document.getElementById('modal-student-name');
    const modalStudentRole = document.getElementById('modal-student-role');
    const noticeTitle = document.getElementById('notice-title');

    function openVideoModal(card) {
        if (!testimonialModal || !modalVideo) return;
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
            modalVideo.play().catch(() => {});
        } else {
            // Friendly preview when user has not yet dropped their .mp4 file
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
    }

    // Testimonial Cards modal click
    document.querySelectorAll('.testimonial-card').forEach(card => {
        card.addEventListener('click', () => openVideoModal(card));
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openVideoModal(card);
            }
        });
    });

    // Skill Outcome Cards auto-play on appearance & modal click
    if ('IntersectionObserver' in window) {
        const skillVideoObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const bgVideo = entry.target.querySelector('.skill-video-bg');
                if (!bgVideo) return;
                if (entry.isIntersecting) {
                    bgVideo.muted = true;
                    bgVideo.play().catch(() => {});
                } else {
                    bgVideo.pause();
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '100px 0px 100px 0px'
        });

        document.querySelectorAll('.skills-stack .skill-card').forEach(card => {
            skillVideoObserver.observe(card);
        });
    }

    document.querySelectorAll('.skills-stack .skill-card').forEach(card => {
        const bgVideo = card.querySelector('.skill-video-bg');
        if (bgVideo) {
            bgVideo.muted = true;
            // Immediate initial trigger
            bgVideo.play().catch(() => {});
            card.addEventListener('mouseenter', () => {
                bgVideo.play().catch(() => {});
            });
        }

        card.addEventListener('click', () => openVideoModal(card));
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openVideoModal(card);
            }
        });
    });

    // Ensure all muted in-card video reels autoplay seamlessly
    document.querySelectorAll('.card-video, .skill-video-bg').forEach(video => {
        video.muted = true;
        video.play().catch(() => {});
    });

    if (modalClose) modalClose.addEventListener('click', closeVideoModal);
    if (modalBackdrop) modalBackdrop.addEventListener('click', closeVideoModal);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && testimonialModal && testimonialModal.classList.contains('active')) {
            closeVideoModal();
        }
    });

});

