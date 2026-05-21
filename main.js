/* =============================================================
   MAIN.JS — Seb Jauslin
   CMS-powered copy loading, scroll animations, sticky nav,
   nav highlight, mobile menu and testimonials slider.
   No external libraries.
   ============================================================= */

(function () {
  'use strict';

  const nav = document.getElementById('nav');
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const autoplayDelay = 4500;
  let fadeObserver = null;

  function getPath(source, path) {
    return path.split('.').reduce(function (value, key) {
      if (value === null || value === undefined) return undefined;
      return value[key];
    }, source);
  }

  function setText(selector, value) {
    if (value === undefined || value === null) return;
    const el = document.querySelector(selector);
    if (!el) return;
    el.textContent = value;
  }

  function setHtml(selector, value) {
    if (value === undefined || value === null) return;
    const el = document.querySelector(selector);
    if (!el) return;
    el.innerHTML = value;
  }

  function escapeHtml(value) {
    return String(value === undefined || value === null ? '' : value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function setLink(selector, data) {
    if (!data) return;
    const el = document.querySelector(selector);
    if (!el) return;
    if (data.text) {
      el.innerHTML = escapeHtml(data.text) + (data.showArrow === false ? '' : ' <span>→</span>');
    }
    if (data.href) el.setAttribute('href', data.href);
  }

  function observeFadeElement(el) {
    if (!fadeObserver || !el) return;
    fadeObserver.observe(el);
  }

  function observeFadeElements(root) {
    if (!fadeObserver) return;
    root.querySelectorAll('.fade-in').forEach(observeFadeElement);
  }

  function createListItems(items) {
    return (items || []).map(function (item) {
      return '<li>' + escapeHtml(item) + '</li>';
    }).join('');
  }

  function renderPrograms(programs) {
    const grid = document.querySelector('[data-content-list="programs"]');
    if (!grid || !Array.isArray(programs) || programs.length === 0) return;

    grid.innerHTML = programs.map(function (program, index) {
      const delay = index === 1 ? ' delay-1' : index === 2 ? ' delay-2' : '';
      return [
        '<div class="program-card fade-in' + delay + '">',
        '  <img src="' + escapeHtml(program.image.src) + '" alt="' + escapeHtml(program.image.alt) + '" class="program-img">',
        '  <div class="program-body">',
        '    <span class="program-tier">' + escapeHtml(program.tier) + '</span>',
        '    <h3 class="program-name">' + escapeHtml(program.name) + '</h3>',
        '    <span class="program-duration">' + escapeHtml(program.duration) + '</span>',
        '    <p class="program-desc">' + escapeHtml(program.description) + '</p>',
        '    <ul class="program-features">' + createListItems(program.features) + '</ul>',
        '    <span class="program-report">' + escapeHtml(program.report) + '</span>',
        '  </div>',
        '</div>'
      ].join('');
    }).join('');

    observeFadeElements(grid);
  }

  function renderWorkshops(workshops) {
    const list = document.querySelector('[data-content-list="workshops"]');
    if (!list || !Array.isArray(workshops) || workshops.length === 0) return;

    list.innerHTML = workshops.map(function (workshop, index) {
      const delay = index % 3 === 1 ? ' delay-1' : index % 3 === 2 ? ' delay-2' : '';
      return [
        '<article class="workshop-item fade-in' + delay + '">',
        '  <h3 class="workshop-name">' + escapeHtml(workshop.name) + '</h3>',
        '  <p class="workshop-desc">' + escapeHtml(workshop.description) + '</p>',
        '</article>'
      ].join('');
    }).join('');

    observeFadeElements(list);
  }

  function renderWorkshopPhotos(photos) {
    const wrap = document.querySelector('[data-content-list="workshopPhotos"]');
    if (!wrap || !Array.isArray(photos) || photos.length === 0) return;

    wrap.innerHTML = photos.map(function (photo, index) {
      const sizeClass = photo.size === 'tall' ? ' workshop-photo-tall' : ' workshop-photo-wide';
      return [
        '<figure class="workshop-photo-wrap' + sizeClass + '">',
        '  <img src="' + escapeHtml(photo.src) + '" alt="' + escapeHtml(photo.alt) + '" class="workshop-photo">',
        '  <figcaption class="workshop-caption">' + escapeHtml(photo.caption) + '</figcaption>',
        '</figure>'
      ].join('');
    }).join('');
  }

  function renderTestimonials(testimonials) {
    const track = document.querySelector('[data-content-list="testimonials"]');
    if (!track || !Array.isArray(testimonials) || testimonials.length === 0) return;

    track.innerHTML = testimonials.map(function (testimonial) {
      return [
        '<article class="testimonial-card">',
        '  <span class="t-mark gradient-text">"</span>',
        '  <p class="t-quote">' + escapeHtml(testimonial.quote) + '</p>',
        '  <div class="t-author">',
        '    <img src="' + escapeHtml(testimonial.avatar.src) + '" alt="' + escapeHtml(testimonial.avatar.alt) + '" class="t-avatar">',
        '    <div>',
        '      <p class="t-name">' + escapeHtml(testimonial.name) + '</p>',
        '      <p class="t-role">' + escapeHtml(testimonial.role) + '</p>',
        '    </div>',
        '  </div>',
        '</article>'
      ].join('');
    }).join('');
  }

  function renderNavLinks(links, cta) {
    if (!Array.isArray(links) || links.length === 0) return;
    const desktop = document.querySelector('[data-content-list="navLinks"]');
    const mobile = document.querySelector('[data-content-list="mobileNavLinks"]');
    const footer = document.querySelector('[data-content-list="footerNavLinks"]');

    if (desktop) {
      desktop.innerHTML = links.map(function (link) {
        return '<li><a href="' + escapeHtml(link.href) + '">' + escapeHtml(link.label) + '</a></li>';
      }).join('') + (
        cta
          ? '<li><a href="' + escapeHtml(cta.href) + '" target="_blank" rel="noopener" class="nav-cta" data-content="nav.cta">' + escapeHtml(cta.text) + '</a></li>'
          : ''
      );
    }

    if (mobile) {
      mobile.innerHTML = links.map(function (link) {
        return '<li><a href="' + escapeHtml(link.href) + '" class="mobile-nav-link">' + escapeHtml(link.label) + '</a></li>';
      }).join('');
    }

    if (footer) {
      footer.innerHTML = links.map(function (link) {
        return '<li><a href="' + escapeHtml(link.href) + '">' + escapeHtml(link.label) + '</a></li>';
      }).join('');
    }
  }

  function applyContent(data) {
    if (!data) return;

    if (data.seo) {
      setText('title', data.seo.title);
      const description = document.querySelector('meta[name="description"]');
      if (description && data.seo.description) {
        description.setAttribute('content', data.seo.description);
      }
    }

    renderNavLinks(getPath(data, 'nav.links'), getPath(data, 'nav.cta'));
    setLink('[data-content="nav.cta"]', getPath(data, 'nav.cta'));
    setLink('[data-content="mobile.cta"]', getPath(data, 'nav.mobileCta'));

    setText('[data-content="hero.kicker"]', getPath(data, 'hero.kicker'));
    setHtml('[data-content="hero.headline"]', getPath(data, 'hero.headline'));
    setText('[data-content="hero.subtitle"]', getPath(data, 'hero.subtitle'));
    setLink('[data-content="hero.cta"]', getPath(data, 'hero.cta'));

    setText('[data-content="problem.kicker"]', getPath(data, 'problem.kicker'));
    setHtml('[data-content="problem.headline"]', getPath(data, 'problem.headline'));
    (getPath(data, 'problem.items') || []).forEach(function (item, index) {
      setText('[data-content="problem.items.' + index + '.title"]', item.title);
      setText('[data-content="problem.items.' + index + '.body"]', item.body);
    });

    setText('[data-content="programs.kicker"]', getPath(data, 'programs.kicker'));
    setHtml('[data-content="programs.headline"]', getPath(data, 'programs.headline'));
    setText('[data-content="programs.intro"]', getPath(data, 'programs.intro'));
    setText('[data-content="programs.footerText"]', getPath(data, 'programs.footerText'));
    setLink('[data-content="programs.cta"]', getPath(data, 'programs.cta'));
    renderPrograms(getPath(data, 'programs.items'));

    setText('[data-content="workshops.kicker"]', getPath(data, 'workshops.kicker'));
    setText('[data-content="workshops.headline"]', getPath(data, 'workshops.headline'));
    setText('[data-content="workshops.intro"]', getPath(data, 'workshops.intro'));
    renderWorkshops(getPath(data, 'workshops.items'));
    renderWorkshopPhotos(getPath(data, 'workshops.photos'));

    setText('[data-content="about.kicker"]', getPath(data, 'about.kicker'));
    setHtml('[data-content="about.headline"]', getPath(data, 'about.headline'));
    (getPath(data, 'about.bio') || []).forEach(function (paragraph, index) {
      setText('[data-content="about.bio.' + index + '"]', paragraph);
    });
    const creds = document.querySelector('[data-content-list="aboutCreds"]');
    if (creds && Array.isArray(getPath(data, 'about.credentials'))) {
      creds.innerHTML = data.about.credentials.map(function (cred) {
        return '<li class="cred-tag">' + escapeHtml(cred) + '</li>';
      }).join('');
    }
    setText('[data-content="about.cities"]', getPath(data, 'about.cities'));

    setText('[data-content="forbes.kicker"]', getPath(data, 'forbes.kicker'));
    setText('[data-content="forbes.headline"]', getPath(data, 'forbes.headline'));
    setText('[data-content="forbes.meta"]', getPath(data, 'forbes.meta'));
    setLink('[data-content="forbes.link"]', getPath(data, 'forbes.link'));
    const forbesFeature = document.querySelector('.forbes-feature');
    if (forbesFeature && getPath(data, 'forbes.link.href')) {
      forbesFeature.setAttribute('href', data.forbes.link.href);
    }

    setText('[data-content="testimonials.kicker"]', getPath(data, 'testimonials.kicker'));
    setText('[data-content="testimonials.headline"]', getPath(data, 'testimonials.headline'));
    renderTestimonials(getPath(data, 'testimonials.items'));

    setText('[data-content="credentials.label"]', getPath(data, 'credentials.label'));
    const badges = document.querySelector('[data-content-list="credentialBadges"]');
    if (badges && Array.isArray(getPath(data, 'credentials.badges'))) {
      badges.innerHTML = data.credentials.badges.map(function (badge) {
        return '<span class="cred-badge">' + escapeHtml(badge) + '</span>';
      }).join('');
    }

    setText('[data-content="cta.kicker"]', getPath(data, 'cta.kicker'));
    setHtml('[data-content="cta.headline"]', getPath(data, 'cta.headline'));
    setText('[data-content="cta.subtitle"]', getPath(data, 'cta.subtitle'));
    setLink('[data-content="cta.button"]', getPath(data, 'cta.button'));
    setHtml('[data-content="cta.quote"]', getPath(data, 'cta.quote'));
    setText('[data-content="cta.attr"]', getPath(data, 'cta.attr'));

    setText('[data-content="footer.tagline"]', getPath(data, 'footer.tagline'));
    setText('[data-content="footer.navLabel"]', getPath(data, 'footer.navLabel'));
    setText('[data-content="footer.locationsLabel"]', getPath(data, 'footer.locationsLabel'));
    setHtml('[data-content="footer.cities"]', getPath(data, 'footer.cities'));
    const contact = document.querySelector('[data-content="footer.contact"]');
    if (contact && getPath(data, 'footer.email')) {
      contact.textContent = data.footer.email;
      contact.setAttribute('href', 'mailto:' + data.footer.email);
    }
    setText('[data-content="footer.copy"]', getPath(data, 'footer.copy'));
    setText('[data-content="footer.meta"]', getPath(data, 'footer.meta'));
  }

  async function loadSiteContent() {
    try {
      const response = await fetch('./content/site.json', { cache: 'no-store' });
      if (!response.ok) throw new Error('Unable to load site content');
      const data = await response.json();
      applyContent(data);
    } catch (error) {
      console.warn('Using fallback HTML content:', error.message);
    }
  }

  function updateNav() {
    if (window.scrollY > 60) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }

  function initFadeAnimations() {
    fadeObserver = new IntersectionObserver(
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

    document.querySelectorAll('.fade-in').forEach(observeFadeElement);
  }

  function initNavHighlight() {
    const sectionObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            document.querySelectorAll('.nav-links a:not(.nav-cta)').forEach(function (link) {
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

    document.querySelectorAll('section[id]').forEach(function (section) {
      sectionObserver.observe(section);
    });
  }

  function initMobileMenu() {
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

    mobileMenu.addEventListener('click', function (e) {
      if (e.target.closest('a')) closeMenu();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
        closeMenu();
      }
    });
  }

  function initSmoothScroll() {
    document.addEventListener('click', function (e) {
      const anchor = e.target.closest('a[href^="#"]');
      if (!anchor) return;
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (!target) return;
      e.preventDefault();
      const navHeight = nav.offsetHeight;
      const targetY = target.getBoundingClientRect().top + window.scrollY - navHeight - 16;
      window.scrollTo({ top: targetY, behavior: 'smooth' });
    });
  }

  function initTestimonialsSlider() {
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

      dotsWrap.querySelectorAll('.testimonial-dot').forEach(function (dot, index) {
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

    slider.addEventListener('mouseenter', stopAutoplay);
    slider.addEventListener('mouseleave', startAutoplay);
    slider.addEventListener('focusin', stopAutoplay);
    slider.addEventListener('focusout', startAutoplay);
    window.addEventListener('resize', refreshSlider);

    refreshSlider();
    startAutoplay();
  }

  async function init() {
    initFadeAnimations();
    await loadSiteContent();

    window.addEventListener('scroll', updateNav, { passive: true });
    updateNav();
    initNavHighlight();
    initMobileMenu();
    initSmoothScroll();
    initTestimonialsSlider();
  }

  init();
})();
