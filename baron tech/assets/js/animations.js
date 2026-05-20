/* =============================================
   BARONTECH — animations.js
   Intersection Observer scroll reveals
   ============================================= */

(function () {
  'use strict';

  /* ── GENERIC REVEAL ── */
  const revealEls = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          revealObserver.unobserve(entry.target); // fire once
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  revealEls.forEach((el) => revealObserver.observe(el));

  /* ── SKILL ITEMS STAGGER ── */
  const skillItems = document.querySelectorAll('.skill-item');

  const skillObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const items = entry.target.querySelectorAll('.skill-item');
          items.forEach((item, i) => {
            setTimeout(() => item.classList.add('in-view'), i * 60);
          });
          skillObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  const skillLists = document.querySelectorAll('.skills__list');
  skillLists.forEach((list) => skillObserver.observe(list));

  /* ── PROJECT ITEMS STAGGER ── */
  const projectObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const items = entry.target.querySelectorAll('.project-item');
          items.forEach((item, i) => {
            setTimeout(() => item.classList.add('in-view'), i * 100);
          });
          projectObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.05 }
  );

  const projectsList = document.querySelector('.projects__list');
  if (projectsList) projectObserver.observe(projectsList);

  /* ── HERO BG TEXT PARALLAX ── */
  const heroBgText = document.querySelector('.hero__bg-text');
  if (heroBgText) {
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      heroBgText.style.transform = `translate(-50%, calc(-50% + ${scrollY * 0.3}px))`;
    }, { passive: true });
  }

})();