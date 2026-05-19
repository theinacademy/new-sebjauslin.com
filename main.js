/* =============================================================
   MAIN.JS — Seb Jauslin
   Scroll animations, sticky nav, nav highlight, mobile menu.
   No external libraries.
   ============================================================= */

(function () {
  'use strict';

  /* --- Elements --- */
  const nav         = document.getElementById('nav');
  const hamburger   = document.getElementById('hamburger');
  const mobileMenu  = document.getElementById('mobileMenu');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');
  const navLinks    = document.querySelectorAll('.nav-links a:not(.nav-cta)');
  const sections    = document.querySelectorAll('section[id]');
  const fadeEls     = document.querySelectorAll('.fade-in');


  /* --- Sticky nav on scroll --- */
  function updateNav() {
    if (window.scrollY > 60) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();


  /* --- Fade-in on scroll (IntersectionObserver) --- */
  const fadeObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          fadeObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  fadeEls.forEach(function (el) {
    fadeObserver.observe(el);
  });


  /* --- Active nav link based on scroll position --- */
  const sectionObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navLinks.forEach(function (link) {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href === '#' + id || (id === 'hero' && href === '#hero')) {
              link.classList.add('active');
            }
          });
        }
      });
    },
    { threshold: 0.35 }
  );

  sections.forEach(function (section) {
    sectionObserver.observe(section);
  });


  /* --- Mobile hamburger menu --- */
  function openMenu() {
    hamburger.classList.add('open');
    mobileMenu.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', function () {
    if (mobileMenu.classList.contains('open')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  mobileLinks.forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  const mobileCta = document.querySelector('.mobile-menu-cta');
  if (mobileCta) {
    mobileCta.addEventListener('click', closeMenu);
  }

  /* Close menu on Escape */
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
      closeMenu();
    }
  });


  /* --- Smooth scroll for anchor links --- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (!target) return;
      e.preventDefault();
      const navHeight = nav.offsetHeight;
      const targetY = target.getBoundingClientRect().top + window.scrollY - navHeight - 16;
      window.scrollTo({ top: targetY, behavior: 'smooth' });
    });
  });


  /* --- Testimonials slider --- */
  const slider = document.querySelector('[data-testimonial-slider]');
  if (!slider) return;

  const track = slider.querySelector('.testimonials-track');
  const slides = Array.prototype.slice.call(slider.querySelectorAll('.testimonial-card'));
  const prevButton = slider.querySelector('[data-slider-prev]');
  const nextButton = slider.querySelector('[data-slider-next]');
  const dotsWrap = slider.querySelector('[data-slider-dots]');
  let currentIndex = 0;
  let maxIndex = 0;
  let autoplayTimer = null;
  const autoplayDelay = 4500;

  function getSlidesPerView() {
    const value = window.getComputedStyle(slider).getPropertyValue('--slides-per-view');
    return Math.max(1, parseInt(value, 10) || 1);
  }

  function getGap() {
    const value = window.getComputedStyle(track).gap || '0';
    return parseFloat(value) || 0;
  }

  function renderDots() {
    dotsWrap.innerHTML = '';
    for (let i = 0; i <= maxIndex; i += 1) {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'testimonial-dot';
      dot.setAttribute('aria-label', 'Show testimonial set ' + (i + 1));
      dot.addEventListener('click', function () {
        currentIndex = i;
        updateSlider();
      });
      dotsWrap.appendChild(dot);
    }
  }

  function updateSlider() {
    const slideWidth = slides[0] ? slides[0].getBoundingClientRect().width : 0;
    const offset = currentIndex * (slideWidth + getGap());
    track.style.transform = 'translateX(-' + offset + 'px)';

    if (prevButton) prevButton.disabled = currentIndex === 0;
    if (nextButton) nextButton.disabled = currentIndex === maxIndex;

    const dots = dotsWrap.querySelectorAll('.testimonial-dot');
    dots.forEach(function (dot, index) {
      dot.classList.toggle('active', index === currentIndex);
      dot.setAttribute('aria-current', index === currentIndex ? 'true' : 'false');
    });
  }

  function refreshSlider() {
    const slidesPerView = getSlidesPerView();
    maxIndex = Math.max(0, slides.length - slidesPerView);
    currentIndex = Math.min(currentIndex, maxIndex);
    renderDots();
    updateSlider();
  }

  if (prevButton) {
    prevButton.addEventListener('click', function () {
      currentIndex = Math.max(0, currentIndex - 1);
      updateSlider();
    });
  }

  if (nextButton) {
    nextButton.addEventListener('click', function () {
      currentIndex = Math.min(maxIndex, currentIndex + 1);
      updateSlider();
    });
  }

  function goToNextSlide() {
    currentIndex = currentIndex >= maxIndex ? 0 : currentIndex + 1;
    updateSlider();
  }

  function startAutoplay() {
    if (autoplayTimer || maxIndex === 0) return;
    autoplayTimer = window.setInterval(goToNextSlide, autoplayDelay);
  }

  function stopAutoplay() {
    if (!autoplayTimer) return;
    window.clearInterval(autoplayTimer);
    autoplayTimer = null;
  }

  slider.addEventListener('mouseenter', stopAutoplay);
  slider.addEventListener('mouseleave', startAutoplay);
  slider.addEventListener('focusin', stopAutoplay);
  slider.addEventListener('focusout', startAutoplay);

  window.addEventListener('resize', refreshSlider);
  refreshSlider();
  startAutoplay();

})();
