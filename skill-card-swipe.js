/* Swipe/stack animation for the existing Skill Outcomes cards.
   The original desktop grid and all card content are left untouched. */
(() => {
  const initSkillSwipe = () => {
    const grid = document.getElementById('skills-grid');
    if (!grid) return;

    if (grid.dataset.swipeInitialized === 'true') return;
    grid.dataset.swipeInitialized = 'true';

    const mediaQuery = window.matchMedia('(max-width: 560px)');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const originalCards = Array.from(grid.querySelectorAll('.skill-card'));
    let cards = [...originalCards];
    if (cards.length < 2) return;

    let active = false;
    let paused = false;
    let visible = false;
    let timer = null;
    let pointerStart = null;
    let isDragging = false;
    let isHorizontalSwipe = false;
    let isAnimating = false;
    const SWIPE_THRESHOLD = 45;
    const AUTO_DELAY = 4200;

    const stopTimer = () => {
      if (timer) window.clearInterval(timer);
      timer = null;
    };

    const paintStack = () => {
      cards.forEach((card, index) => {
        card.classList.remove('swipe-card-active', 'swipe-exit-left', 'swipe-exit-right');
        card.style.removeProperty('transition');
        card.style.setProperty('--swipe-x', '0px');
        card.style.setProperty('--swipe-y', `${Math.min(index, 3) * 11}px`);
        card.style.setProperty('--swipe-scale', String(1 - Math.min(index, 3) * 0.035));
        card.style.setProperty('--swipe-rotate', `${index === 0 ? 0 : (index % 2 ? 1 : -1) * Math.min(index, 3) * 1.1}deg`);
        card.style.setProperty('--swipe-z', String(cards.length - index));
        card.setAttribute('aria-hidden', index === 0 ? 'false' : 'true');
        card.inert = index !== 0;
      });
      cards[0].classList.add('swipe-card-active');
      grid.setAttribute('role', 'region');
      grid.setAttribute('aria-label', 'Skill outcomes cards. Swipe left or right to explore.');
      grid.setAttribute('aria-roledescription', 'carousel');
      grid.tabIndex = 0;
    };

    const nextCard = direction => {
      if (!active || cards.length < 2 || isAnimating) return;
      isAnimating = true;
      const topCard = cards[0];
      topCard.classList.remove('swipe-card-active');
      topCard.style.removeProperty('transition');
      topCard.classList.add(direction < 0 ? 'swipe-exit-left' : 'swipe-exit-right');
      topCard.inert = true;
      const duration = reducedMotion.matches ? 1 : 320;
      window.setTimeout(() => {
        topCard.classList.remove('swipe-exit-left', 'swipe-exit-right');
        cards.push(cards.shift());
        grid.appendChild(topCard);
        paintStack();
        isAnimating = false;
      }, duration);
    };

    const startTimer = () => {
      stopTimer();
      if (!active || paused || !visible || reducedMotion.matches) return;
      timer = window.setInterval(() => nextCard(-1), AUTO_DELAY);
    };

    const enable = () => {
      if (active || !mediaQuery.matches) return;
      active = true;
      grid.classList.add('skill-swipe-active');
      paintStack();
      startTimer();
    };

    const disable = () => {
      if (!active) return;
      active = false;
      stopTimer();
      grid.classList.remove('skill-swipe-active');
      grid.removeAttribute('role');
      grid.removeAttribute('aria-label');
      grid.removeAttribute('aria-roledescription');
      grid.removeAttribute('tabindex');
      cards.forEach(card => {
        card.classList.remove('swipe-card-active', 'swipe-exit-left', 'swipe-exit-right');
        card.style.removeProperty('--swipe-x');
        card.style.removeProperty('--swipe-y');
        card.style.removeProperty('--swipe-scale');
        card.style.removeProperty('--swipe-rotate');
        card.style.removeProperty('--swipe-z');
        card.style.removeProperty('transition');
        card.removeAttribute('aria-hidden');
        card.inert = false;
      });
      // Restore the original card order for the desktop grid.
      originalCards.forEach(card => grid.appendChild(card));
      cards = [...originalCards];
    };

    grid.addEventListener('pointerdown', event => {
      if (!active || isAnimating || event.target.closest('a, button')) return;
      pointerStart = { x: event.clientX, y: event.clientY, id: event.pointerId };
      isDragging = true;
      isHorizontalSwipe = false;
      paused = true;
      stopTimer();
    });

    grid.addEventListener('pointermove', event => {
      if (!isDragging || !pointerStart || isAnimating || event.pointerId !== pointerStart.id) return;
      const dx = event.clientX - pointerStart.x;
      const dy = event.clientY - pointerStart.y;

      if (!isHorizontalSwipe) {
        if (Math.abs(dy) > 10 && Math.abs(dy) > Math.abs(dx)) {
          isDragging = false;
          pointerStart = null;
          paused = false;
          startTimer();
          return;
        }
        if (Math.abs(dx) > 8) {
          isHorizontalSwipe = true;
          try {
            grid.setPointerCapture?.(event.pointerId);
          } catch (_) {}
        }
      }

      if (isHorizontalSwipe) {
        const topCard = cards[0];
        if (topCard) {
          topCard.style.transition = 'none';
          topCard.style.setProperty('--swipe-x', `${dx}px`);
          topCard.style.setProperty('--swipe-rotate', `${dx * 0.05}deg`);
        }
      }
    });

    const finishPointer = event => {
      if (!isDragging || !pointerStart || event.pointerId !== pointerStart.id) return;
      const dx = event.clientX - pointerStart.x;
      const dy = event.clientY - pointerStart.y;
      const wasHorizontal = isHorizontalSwipe;

      try {
        if (grid.hasPointerCapture?.(event.pointerId)) {
          grid.releasePointerCapture?.(event.pointerId);
        }
      } catch (_) {}

      isDragging = false;
      pointerStart = null;
      isHorizontalSwipe = false;

      const topCard = cards[0];
      if (topCard) {
        topCard.style.removeProperty('transition');
      }

      if (wasHorizontal && Math.abs(dx) > SWIPE_THRESHOLD && Math.abs(dx) > Math.abs(dy) * 1.15) {
        nextCard(dx < 0 ? -1 : 1);
      } else if (topCard) {
        topCard.style.setProperty('--swipe-x', '0px');
        topCard.style.setProperty('--swipe-rotate', '0deg');
      }

      paused = false;
      startTimer();
    };

    grid.addEventListener('pointerup', finishPointer);
    grid.addEventListener('pointercancel', finishPointer);

    grid.addEventListener('mouseenter', () => { paused = true; stopTimer(); });
    grid.addEventListener('mouseleave', () => { paused = false; startTimer(); });
    grid.addEventListener('focusin', () => { paused = true; stopTimer(); });
    grid.addEventListener('focusout', () => {
      window.setTimeout(() => {
        if (!grid.contains(document.activeElement)) { paused = false; startTimer(); }
      }, 0);
    });
    grid.addEventListener('keydown', event => {
      if (!active || isAnimating) return;
      if (event.key === 'ArrowLeft') { event.preventDefault(); nextCard(1); }
      if (event.key === 'ArrowRight') { event.preventDefault(); nextCard(-1); }
    });

    const visibilityObserver = new IntersectionObserver(entries => {
      visible = entries.some(entry => entry.isIntersecting);
      if (visible) startTimer(); else stopTimer();
    }, { threshold: 0.2 });
    visibilityObserver.observe(grid);

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) stopTimer();
      else if (visible && active && !paused) startTimer();
    });

    const updateMode = () => {
      if (mediaQuery.matches) enable(); else disable();
      startTimer();
    };
    if (mediaQuery.addEventListener) mediaQuery.addEventListener('change', updateMode);
    else mediaQuery.addListener(updateMode);
    reducedMotion.addEventListener?.('change', startTimer);
    updateMode();
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSkillSwipe, { once: true });
  } else {
    initSkillSwipe();
  }
})();
