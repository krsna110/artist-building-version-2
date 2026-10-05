/**
 * Stacking Cards on Scroll Engine
 * Handles smooth sticky pinning, dynamic scale/dimming of covered cards,
 * alternating tilt, and intelligent RAF-throttled video playback management.
 */

(() => {
  'use strict';

  // Config constants
  const STACK_SELECTORS = [
    '#sw-stack',
    '#mentors-stack',
    '#skills-stack',
    '#testimonials-stack',
    '#process-stack'
  ];

  let isModalActive = false;

  function initStackingEngine() {
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Collect all stack decks
    const stackContainers = STACK_SELECTORS.map(sel => document.querySelector(sel)).filter(Boolean);
    if (stackContainers.length === 0) return;

    // Collect all card wrappers across all stacks
    const allStacksData = stackContainers.map(stack => {
      const wrappers = Array.from(stack.children).filter(el => 
        el.classList.contains('sw-card-wrapper') ||
        el.classList.contains('mentor-card-wrapper') ||
        el.classList.contains('skill-card-wrapper') ||
        el.classList.contains('testimonial-card-wrapper') ||
        el.classList.contains('process-card-wrapper')
      );

      // Assign stacking z-indexes so cards stack over each other naturally
      wrappers.forEach((wrapper, index) => {
        wrapper.style.zIndex = String(index + 1);
      });

      return {
        container: stack,
        wrappers: wrappers
      };
    });

    // Collect all videos inside card wrappers
    const videoEntries = [];
    document.querySelectorAll('.sw-card video, .skills-stack .skill-card video, .testimonials-stack .testimonial-card video').forEach(video => {
      video.muted = true;
      video.playsInline = true;
      video.loop = true;
      video.setAttribute('playsinline', '');
      video.setAttribute('muted', '');
      video.setAttribute('loop', '');

      const card = video.closest('.sw-card, .skill-card, .testimonial-card');
      const wrapper = video.closest('.sw-card-wrapper, .skill-card-wrapper, .testimonial-card-wrapper');

      videoEntries.push({
        video,
        card,
        wrapper,
        loaded: false
      });
    });

    // Lazy loader for video streams
    function loadVideoSource(entry) {
      if (entry.loaded) return;
      const v = entry.video;
      const src = v.dataset.src || v.getAttribute('src');
      if (src && !v.src) {
        v.src = src;
        v.preload = 'metadata';
        v.load();
      }
      entry.loaded = true;
    }

    // Lazy load observer (preloads video before it hits the viewport)
    if ('IntersectionObserver' in window) {
      const preloadObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const vEntry = videoEntries.find(e => e.wrapper === entry.target);
            if (vEntry) loadVideoSource(vEntry);
            observer.unobserve(entry.target);
          }
        });
      }, { rootMargin: '350px 0px 350px 0px', threshold: 0.01 });

      videoEntries.forEach(entry => {
        if (entry.wrapper) preloadObserver.observe(entry.wrapper);
      });
    } else {
      videoEntries.forEach(loadVideoSource);
    }

    // Safe video playback controllers
    function playVideo(video) {
      if (!video || isModalActive || document.hidden) return;
      video.muted = true;
      const promise = video.play();
      if (promise !== undefined) {
        promise.catch(() => {
          // Autoplay was prevented or interrupted safely
        });
      }
    }

    function pauseVideo(video) {
      if (!video) return;
      try {
        if (!video.paused) {
          video.pause();
        }
      } catch (_) {}
    }

    // Main RAF Scroll Loop
    let ticking = false;

    function updateStacking() {
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;
      const headerOffset = window.innerWidth <= 860 ? 72 : 88;

      allStacksData.forEach(({ wrappers }) => {
        const total = wrappers.length;

        wrappers.forEach((wrapper, index) => {
          const card = wrapper.firstElementChild;
          if (!card) return;

          const rect = wrapper.getBoundingClientRect();
          const isLast = index === total - 1;
          const nextWrapper = !isLast ? wrappers[index + 1] : null;

          if (isReducedMotion) {
            card.style.transform = '';
            card.style.filter = '';
            return;
          }

          // Calculate how much this card is covered by the NEXT card
          let coverProgress = 0;

          if (nextWrapper) {
            const nextRect = nextWrapper.getBoundingClientRect();
            // Next card starts covering when its top approaches this card's top + height
            const distance = nextRect.top - rect.top;
            const threshold = rect.height || 400;

            if (distance < threshold && distance > 0) {
              coverProgress = 1 - (distance / threshold);
            } else if (distance <= 0) {
              coverProgress = 1;
            }
          }

          // Alternating tilt: even cards -0.8deg, odd cards +0.8deg
          const baseTilt = (index % 2 === 0 ? -0.8 : 0.8);
          const currentTilt = baseTilt * (1 - coverProgress * 0.4);

          if (coverProgress > 0.01) {
            // Card is being covered: smoothly shrink and dim
            const scale = 1 - (coverProgress * 0.05); // Down to 0.95
            const brightness = 1 - (coverProgress * 0.28); // Down to 0.72
            const opacity = 1 - (coverProgress * 0.15); // Down to 0.85

            card.style.transform = `scale(${scale.toFixed(4)}) rotate(${currentTilt.toFixed(2)}deg)`;
            card.style.filter = `brightness(${brightness.toFixed(3)})`;
            card.style.opacity = opacity.toFixed(3);
          } else {
            // Card is active/top
            card.style.transform = `scale(1) rotate(${currentTilt.toFixed(2)}deg)`;
            card.style.filter = 'brightness(1)';
            card.style.opacity = '1';
          }
        });
      });

      // Video Playback Management:
      // Play a video ONLY when its card is in the viewport AND NOT covered by the next card!
      videoEntries.forEach((entry, i) => {
        const { video, wrapper } = entry;
        if (!wrapper) return;

        const rect = wrapper.getBoundingClientRect();
        const isInViewport = rect.bottom > headerOffset + 40 && rect.top < windowHeight - 60;

        // Check if next sibling is covering this card
        let isCovered = false;
        const parentStack = wrapper.parentElement;
        if (parentStack) {
          const nextCardWrapper = wrapper.nextElementSibling;
          if (nextCardWrapper) {
            const nextRect = nextCardWrapper.getBoundingClientRect();
            if (nextRect.top <= rect.top + (rect.height * 0.35)) {
              isCovered = true;
            }
          }
        }

        if (isInViewport && !isCovered && !isModalActive && !document.hidden) {
          loadVideoSource(entry);
          playVideo(video);
        } else {
          pauseVideo(video);
        }
      });

      ticking = false;
    }

    function onScroll() {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(updateStacking);
      }
    }

    // Attach listeners
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    // Tab visibility handling
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        videoEntries.forEach(e => pauseVideo(e.video));
      } else {
        onScroll();
      }
    });

    // Video modal synchronization
    const modal = document.getElementById('testimonial-modal');
    if (modal) {
      const observer = new MutationObserver(() => {
        isModalActive = modal.classList.contains('active');
        if (isModalActive) {
          videoEntries.forEach(e => pauseVideo(e.video));
        } else {
          onScroll();
        }
      });
      observer.observe(modal, { attributes: true, attributeFilter: ['class'] });
    }

    // Initial run
    updateStacking();
  }

  // Initialize once DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initStackingEngine, { once: true });
  } else {
    initStackingEngine();
  }
})();
