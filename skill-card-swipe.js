/* Scroll-stacking animation for Skill Outcomes cards.
   Each card pins via CSS sticky. As you scroll, the next card slides
   under the previous one — achieved by incrementing the sticky top
   offset per card and scaling down previous cards slightly. */
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
        wrapper.style.zIndex = String(i + 1); // later cards on top
      });
    };

    // Optional: scale down cards as they get scrolled past (parallax feel)
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const stackRect = stack.getBoundingClientRect();
        wrappers.forEach((wrapper, i) => {
          const card = wrapper.querySelector('.skill-card');
          if (!card) return;

          const rect = wrapper.getBoundingClientRect();
          const stickyTop = HEADER_HEIGHT + i * STACK_GAP;

          // How far this card has been pushed into its sticky position
          // (negative = card is pinned and being covered by next card)
          const distFromTop = rect.top - stickyTop;

          if (distFromTop <= 0 && i < wrappers.length - 1) {
            // Card is pinned — scale it down slightly based on how many
            // cards are stacked above it
            const coverAmount = Math.min(Math.abs(distFromTop) / 300, 1);
            const scale = 1 - coverAmount * 0.03;
            const brightness = 1 - coverAmount * 0.25;
            card.style.transform = `scale(${scale})`;
            card.style.filter = `brightness(${brightness})`;
          } else {
            card.style.transform = '';
            card.style.filter = '';
          }
        });
        ticking = false;
      });
    };

    // Respect reduced motion
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const setupScroll = () => {
      if (reducedMotion.matches) {
        window.removeEventListener('scroll', onScroll);
        wrappers.forEach(w => {
          const card = w.querySelector('.skill-card');
          if (card) {
            card.style.transform = '';
            card.style.filter = '';
          }
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
      if (!reducedMotion.matches) onScroll();
    }, { passive: true });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
