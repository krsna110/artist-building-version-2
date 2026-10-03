/* Scroll-stacking animation for Skill Outcomes cards.
   Each card pins via CSS sticky. As you scroll, the next card slides
   under the previous one — achieved by incrementing the sticky top
   offset per card and scaling down previous cards slightly.
   Optimized for 60/120fps smooth scrolling. */
(() => {
  const init = () => {
    const stack = document.getElementById('skills-stack');
    if (!stack) return;
    if (stack.dataset.stackInit === 'true') return;
    stack.dataset.stackInit = 'true';

    const wrappers = Array.from(stack.querySelectorAll('.skill-card-wrapper'));
    if (wrappers.length < 2) return;

    const HEADER_HEIGHT = 80; // px, matches sticky top in CSS
    const STACK_GAP = 8;     // each subsequent card offsets down by this much

    // Set incremental sticky top so cards fan out slightly as they stack
    const applyOffsets = () => {
      wrappers.forEach((wrapper, i) => {
        wrapper.style.top = `${HEADER_HEIGHT + i * STACK_GAP}px`;
        wrapper.style.zIndex = String(i + 1);
      });
    };

    // Track whether skills-stack is near or inside viewport to eliminate idle scroll overhead
    let isStackInView = false;
    let ticking = false;

    const onScroll = () => {
      if (ticking || !isStackInView) return;
      ticking = true;

      requestAnimationFrame(() => {
        wrappers.forEach((wrapper, i) => {
          const card = wrapper.querySelector('.skill-card');
          if (!card) return;

          const rect = wrapper.getBoundingClientRect();
          const stickyTop = HEADER_HEIGHT + i * STACK_GAP;
          const distFromTop = rect.top - stickyTop;

          if (distFromTop <= 0 && i < wrappers.length - 1) {
            const coverAmount = Math.min(Math.abs(distFromTop) / 300, 1);
            const scale = 1 - coverAmount * 0.03;
            // Use transform (compositor thread) - do NOT use filter: brightness (forces CPU/GPU re-raster)
            card.style.transform = `scale(${scale})`;
            const overlay = card.querySelector('.skill-card-overlay');
            if (overlay) {
              overlay.style.opacity = String(0.75 + coverAmount * 0.25);
            }
          } else {
            card.style.transform = '';
            const overlay = card.querySelector('.skill-card-overlay');
            if (overlay) overlay.style.opacity = '';
          }
        });
        ticking = false;
      });
    };

    // IntersectionObserver so scroll calculations ONLY run when skills stack is in view
    if ('IntersectionObserver' in window) {
      const stackObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          isStackInView = entry.isIntersecting;
          if (isStackInView) onScroll();
        });
      }, { rootMargin: '250px 0px 250px 0px' });
      stackObserver.observe(stack);
    } else {
      isStackInView = true;
    }

    // Respect reduced motion
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const setupScroll = () => {
      if (reducedMotion.matches) {
        window.removeEventListener('scroll', onScroll);
        wrappers.forEach(w => {
          const card = w.querySelector('.skill-card');
          if (card) card.style.transform = '';
        });
      } else {
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
      }
    };

    applyOffsets();
    setupScroll();
    reducedMotion.addEventListener?.('change', setupScroll);

    // Recompute on resize
    window.addEventListener('resize', () => {
      applyOffsets();
      if (!reducedMotion.matches && isStackInView) onScroll();
    }, { passive: true });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
