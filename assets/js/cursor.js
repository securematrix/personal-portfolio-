/* ============================================= */
/*  LUXURY GLOW CURSOR JS — MULTI-PART LERP      */
/* ============================================= */

(function () {
  'use strict';

  // Check for device compatibility — disable on touch devices only
  if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) return;

  const cursorDot = document.getElementById('cursorDot');
  const cursorOutline = document.getElementById('cursorOutline');
  
  if (!cursorDot || !cursorOutline) return;

  // LERP Variables for delayed outer ring effect
  let mouse = { x: 0, y: 0 };    // Target mouse positions
  let outlinePos = { x: 0, y: 0 }; // Outer ring positions for smooth lerp
  const lerpSpeed = 0.22;        // Adjust for desired "drag" effect

  // Interactive element selectors
  const interactiveElements = 'a, button, input, textarea, select, [role="button"], .project-card, .timeline-item';

  // 1. Mouse Move: Move dot immediately, update target for lerp
  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;

    // Movement for the DOT — Instant follow
    cursorDot.style.transform = `translate(${mouse.x}px, ${mouse.y}px) translate(-50%, -50%)`;
  });

  // 2. Animation Loop: Smoothly lerp the OUTLINE position
  function updateOutline() {
    // Current Position += (target - Current Position) * speed
    outlinePos.x += (mouse.x - outlinePos.x) * lerpSpeed;
    outlinePos.y += (mouse.y - outlinePos.y) * lerpSpeed;

    // Apply the lerped position to the OUTLINE
    cursorOutline.style.transform = `translate(${outlinePos.x}px, ${outlinePos.y}px) translate(-50%, -50%)`;

    requestAnimationFrame(updateOutline);
  }

  // 3. Hover States: Apply global classes to body
  function handleHoverStates() {
    const targets = document.querySelectorAll(interactiveElements);
    
    targets.forEach(target => {
      target.addEventListener('mouseenter', () => document.body.classList.add('is-hovering'));
      target.addEventListener('mouseleave', () => document.body.classList.remove('is-hovering'));
    });
  }

  // 4. Click States: Subtle shrinking effect on outer ring
  window.addEventListener('mousedown', () => document.body.classList.add('is-clicking'));
  window.addEventListener('mouseup', () => document.body.classList.remove('is-clicking'));

  // ===========================
  // INITIALIZATION
  // ===========================
  updateOutline();
  handleHoverStates();

  // Watch for dynamic DOM changes to re-bind hovers (crucial for modern sites)
  const observer = new MutationObserver(handleHoverStates);
  observer.observe(document.body, { childList: true, subtree: true });

})();
