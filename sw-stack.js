/**
 * Student Works Stacking Cards Engine
 * Strictly scoped to #projects section ONLY.
 */
(() => {
  'use strict';

  function initStudentWorksStack() {
    const projectsSection = document.getElementById('projects');
    if (!projectsSection) return;

    const stack = projectsSection.querySelector('.sw-stack');
    if (!stack) return;

    const wrappers = Array.from(stack.querySelectorAll('.sw-card-wrapper'));
    if (wrappers.length === 0) return;

    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Assign CSS variable --i and z-index to each wrapper
    wrappers.forEach((wrapper, index) => {
      wrapper.style.setProperty('--i', String(index));
      wrapper.style.zIndex = String(index + 1);
    });

    // Collect ONLY videos inside #projects .sw-card
    const videoEntries = [];
    stack.querySelectorAll('.sw-card video').forEach(video => {
      video.muted = true;
      video.playsInline = true;
      video.loop = true;
      video.setAttribute('playsinline', '');
      video.setAttribute('muted', '');
      video.setAttribute('loop', '');

      const card = video.closest('.sw-card');
      const wrapper = video.closest('.sw-card-wrapper');

      videoEntries.push({
        video,
        card,
        wrapper,
        loaded: false
      });
    });

    // Lazy load source handler
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

    // Lazy load observer with 350px viewport buffer
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

    // Safe play/pause helpers
    function playVideo(video) {
      if (!video || document.hidden) return;
      video.muted = true;
      const promise = video.play();
      if (promise !== undefined) {
        promise.catch(() => {});
      }
    }

    function pauseVideo(video) {
      if (!video) return;
      try {
        if (!video.paused) video.pause();
      } catch (_) {}
    }

    // Modal state tracker
    let isModalActive = false;
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

    // rAF Scroll Update Loop
    let ticking = false;

    function updateStacking() {
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;
      const headerOffset = window.innerWidth <= 768 ? 72 : 90;
      const total = wrappers.length;

      wrappers.forEach((wrapper, index) => {
        const card = wrapper.querySelector('.sw-card');
        if (!card) return;

        if (isReducedMotion) {
          card.style.transform = '';
          card.style.filter = '';
          return;
        }

        const rect = wrapper.getBoundingClientRect();
        const isLast = index === total - 1;
        const nextWrapper = !isLast ? wrappers[index + 1] : null;

        let coverProgress = 0;
        if (nextWrapper) {
          const nextRect = nextWrapper.getBoundingClientRect();
          const distance = nextRect.top - rect.top;
          const threshold = rect.height || 400;

          if (distance < threshold && distance > 0) {
            coverProgress = 1 - (distance / threshold);
          } else if (distance <= 0) {
            coverProgress = 1;
          }
        }

        // Alternating tilt: even cards -1deg, odd cards +1deg
        const baseTilt = (index % 2 === 0 ? -1 : 1);
        const currentTilt = baseTilt * (1 - coverProgress * 0.4);

        if (coverProgress > 0.01) {
          const scale = 1 - (coverProgress * 0.05); // down to 0.95
          const brightness = 1 - (coverProgress * 0.28); // down to 0.72
          const opacity = 1 - (coverProgress * 0.15); // down to 0.85

          card.style.transform = `scale(${scale.toFixed(4)}) rotate(${currentTilt.toFixed(2)}deg)`;
          card.style.filter = `brightness(${brightness.toFixed(3)})`;
          card.style.opacity = opacity.toFixed(3);
        } else {
          card.style.transform = `scale(1) rotate(${currentTilt.toFixed(2)}deg)`;
          card.style.filter = 'brightness(1)';
          card.style.opacity = '1';
        }
      });

      // Video Playback Management:
      // Play a video ONLY when its card is in viewport AND NOT covered by next card!
      videoEntries.forEach(entry => {
        const { video, wrapper } = entry;
        if (!wrapper) return;

        const rect = wrapper.getBoundingClientRect();
        const isInViewport = rect.bottom > headerOffset + 40 && rect.top < windowHeight - 60;

        let isCovered = false;
        const nextWrapper = wrapper.nextElementSibling;
        if (nextWrapper && nextWrapper.classList.contains('sw-card-wrapper')) {
          const nextRect = nextWrapper.getBoundingClientRect();
          if (nextRect.top <= rect.top + (rect.height * 0.35)) {
            isCovered = true;
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

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        videoEntries.forEach(e => pauseVideo(e.video));
      } else {
        onScroll();
      }
    });

    updateStacking();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initStudentWorksStack, { once: true });
  } else {
    initStudentWorksStack();
  }
})();
