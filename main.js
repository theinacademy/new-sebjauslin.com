/* =============================================================
   MAIN.JS — Seb Jauslin
   Content loading, render helpers, scroll animation, sticky nav,
   nav highlight and mobile menu. No external libraries.
   ============================================================= */

(function () {
  'use strict';

  const nav = document.getElementById('nav');
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  let fadeObserver = null;
  const discoveryCta = {
    text: 'Take the quiz',
    longText: 'Take the quiz',
    href: 'https://tally.so/r/44N90A'
  };

  function getPath(source, path) {
    return path.split('.').reduce(function (value, key) {
      if (value === null || value === undefined) return undefined;
      return value[key];
    }, source);
  }

  function escapeHtml(value) {
    return String(value === undefined || value === null ? '' : value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function setText(selector, value) {
    if (value === undefined || value === null) return;
    const el = document.querySelector(selector);
    if (el) el.textContent = value;
  }

  function setHtml(selector, value) {
    if (value === undefined || value === null) return;
    const el = document.querySelector(selector);
    if (el) el.innerHTML = value;
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

  function enforceDiscoveryCtas() {
    document.querySelectorAll('.nav-cta').forEach(function (link) {
      link.textContent = discoveryCta.text;
      link.setAttribute('href', discoveryCta.href);
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener');
    });

    document.querySelectorAll('.mobile-menu-cta').forEach(function (link) {
      link.textContent = discoveryCta.longText;
      link.setAttribute('href', discoveryCta.href);
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener');
    });
  }

  function observeFadeElement(el) {
    if (fadeObserver && el) fadeObserver.observe(el);
  }

  function observeFadeElements(root) {
    if (!fadeObserver || !root) return;
    root.querySelectorAll('.fade-in').forEach(observeFadeElement);
  }

  function paragraphList(paragraphs) {
    return (paragraphs || []).map(function (paragraph) {
      return '<p>' + escapeHtml(paragraph) + '</p>';
    }).join('');
  }

  function bulletList(items) {
    return '<ul>' + (items || []).map(function (item) {
      return '<li>' + escapeHtml(item) + '</li>';
    }).join('') + '</ul>';
  }

  function renderPlainList(selector, items) {
    const list = document.querySelector(selector);
    if (!list || !Array.isArray(items)) return;
    list.innerHTML = items.map(function (item) {
      return '<li>' + escapeHtml(item) + '</li>';
    }).join('');
  }

  function renderNavLinks(links, cta) {
    if (!Array.isArray(links) || links.length === 0) return;
    const desktop = document.querySelector('[data-content-list="navLinks"]');
    const mobile = document.querySelector('[data-content-list="mobileNavLinks"]');
    const footer = document.querySelector('[data-content-list="footerNavLinks"]');

    const navItems = links.map(function (link) {
      return '<li><a href="' + escapeHtml(link.href) + '">' + escapeHtml(link.label) + '</a></li>';
    }).join('');

    if (desktop) {
      desktop.innerHTML = navItems + (
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

    if (footer) footer.innerHTML = navItems;
  }

  function renderStats(stats) {
    const grid = document.querySelector('[data-content-list="costStats"]');
    if (!grid || !Array.isArray(stats)) return;
    grid.innerHTML = stats.map(function (stat, index) {
      const delay = index % 2 === 1 ? ' delay-1' : '';
      return [
        '<article class="stat-card fade-in' + delay + '">',
        '  <span class="stat-value gradient-text">' + escapeHtml(stat.value) + '</span>',
        '  <p>' + escapeHtml(stat.label) + '</p>',
        '</article>'
      ].join('');
    }).join('');
    observeFadeElements(grid);
  }

  function renderStages(stages) {
    const grid = document.querySelector('[data-content-list="methodStages"]');
    if (!grid || !Array.isArray(stages)) return;
    grid.innerHTML = stages.map(function (stage, index) {
      const delay = index === 1 ? ' delay-1' : index === 2 ? ' delay-2' : '';
      return [
        '<article class="stage-card fade-in' + delay + '">',
        '  <img src="' + escapeHtml(stage.image.src) + '" alt="' + escapeHtml(stage.image.alt) + '" class="stage-img" loading="lazy" decoding="async">',
        '  <div class="stage-body">',
        '    <span class="stage-label">' + escapeHtml(stage.label) + '</span>',
        '    <h3>' + escapeHtml(stage.name) + '</h3>',
        '    <p class="stage-headline">' + escapeHtml(stage.headline) + '</p>',
        '    <p>' + escapeHtml(stage.body) + '</p>',
        '    <dl>',
        '      <dt>1:1 coaching</dt>',
        '      <dd>' + escapeHtml(stage.coaching) + '</dd>',
        '      <dt>Workshop</dt>',
        '      <dd>' + escapeHtml(stage.workshop) + '</dd>',
        '    </dl>',
        '  </div>',
        '</article>'
      ].join('');
    }).join('');
    observeFadeElements(grid);
  }

  function renderCaseStudies(caseStudies) {
    const list = document.querySelector('[data-content-list="caseStudies"]');
    if (!list || !Array.isArray(caseStudies)) return;
    list.innerHTML = caseStudies.map(function (study) {
      return [
        '<article class="case-study fade-in">',
        '  <div class="case-study-head">',
        '    <span class="case-meta">' + escapeHtml(study.meta) + '</span>',
        '    <h3>' + escapeHtml(study.title) + '</h3>',
        '  </div>',
        '  <div class="case-study-grid">',
        '    <div class="case-copy">',
        '      <h4>The Situation</h4>',
        '      <p>' + escapeHtml(study.situation) + '</p>',
        '      <h4>The Intervention</h4>',
        '      <p>' + escapeHtml(study.intervention) + '</p>',
        '      <h4>The ROI</h4>',
        '      <p>' + escapeHtml(study.roi) + '</p>',
        '    </div>',
        '    <div class="case-results">',
        '      <h4>The Outcome</h4>',
        bulletList(study.outcome),
        '      <blockquote>',
        '        <p>' + escapeHtml(study.quote) + '</p>',
        '        <cite>',
        '          <img src="' + escapeHtml(study.avatar) + '" alt="' + escapeHtml(study.person) + '" loading="lazy" decoding="async">',
        '          <span><strong>' + escapeHtml(study.person) + '</strong> ' + escapeHtml(study.role) + '</span>',
        '        </cite>',
        '      </blockquote>',
        '    </div>',
        '  </div>',
        '</article>'
      ].join('');
    }).join('');
    observeFadeElements(list);
  }

  function renderPullQuotes(quotes) {
    const grid = document.querySelector('[data-content-list="pullQuotes"]');
    if (!grid || !Array.isArray(quotes)) return;
    grid.innerHTML = quotes.map(function (quote) {
      return [
        '<article class="pull-quote fade-in">',
        '  <p>' + escapeHtml(quote.quote) + '</p>',
        '  <span>' + escapeHtml(quote.person) + ' · ' + escapeHtml(quote.role) + '</span>',
        '</article>'
      ].join('');
    }).join('');
    observeFadeElements(grid);
  }

  function renderOffers(offers) {
    const grid = document.querySelector('[data-content-list="offers"]');
    if (!grid || !Array.isArray(offers)) return;
    grid.innerHTML = offers.map(function (offer, index) {
      const delay = index === 1 ? ' delay-1' : index === 2 ? ' delay-2' : '';
      return [
        '<article class="offer-card fade-in' + delay + '">',
        '  <span>' + escapeHtml(offer.audience) + '</span>',
        '  <h3>' + escapeHtml(offer.title) + '</h3>',
        '  <p>' + escapeHtml(offer.body) + '</p>',
        bulletList(offer.bullets),
        '</article>'
      ].join('');
    }).join('');
    observeFadeElements(grid);
  }

  function renderCredentials(credentials) {
    const list = document.querySelector('[data-content-list="whySebCreds"]');
    if (!list || !Array.isArray(credentials)) return;
    list.innerHTML = credentials.map(function (credential) {
      return '<li>' + escapeHtml(credential) + '</li>';
    }).join('');
  }

  function applyContent(data) {
    if (!data) return;

    if (data.seo) {
      setText('title', data.seo.title);
      const description = document.querySelector('meta[name="description"]');
      if (description && data.seo.description) description.setAttribute('content', data.seo.description);
    }

    renderNavLinks(getPath(data, 'nav.links'), getPath(data, 'nav.cta'));
    setLink('[data-content="nav.cta"]', getPath(data, 'nav.cta'));
    setLink('[data-content="mobile.cta"]', getPath(data, 'nav.cta'));

    setText('[data-content="hero.kicker"]', getPath(data, 'hero.kicker'));
    setHtml('[data-content="hero.headline"]', getPath(data, 'hero.headline'));
    setText('[data-content="hero.subtitle"]', getPath(data, 'hero.subtitle'));
    setText('[data-content="hero.support"]', getPath(data, 'hero.support'));
    renderPlainList('[data-content-list="heroProof"]', getPath(data, 'hero.proof'));
    setLink('[data-content="hero.cta"]', getPath(data, 'hero.cta'));

    setText('[data-content="cost.kicker"]', getPath(data, 'cost.kicker'));
    setText('[data-content="cost.headline"]', getPath(data, 'cost.headline'));
    const costIntro = document.querySelector('[data-content-list="costIntro"]');
    if (costIntro) costIntro.innerHTML = paragraphList(getPath(data, 'cost.intro'));
    renderStats(getPath(data, 'cost.stats'));
    setText('[data-content="cost.truth"]', getPath(data, 'cost.truth'));

    setText('[data-content="method.kicker"]', getPath(data, 'method.kicker'));
    setText('[data-content="method.headline"]', getPath(data, 'method.headline'));
    const methodIntro = document.querySelector('[data-content-list="methodIntro"]');
    if (methodIntro) methodIntro.innerHTML = paragraphList(getPath(data, 'method.intro'));
    setText('[data-content="method.quote"]', getPath(data, 'method.quote'));
    setText('[data-content="method.quoteAttr"]', getPath(data, 'method.quoteAttr'));
    setText('[data-content="method.architecture.headline"]', getPath(data, 'method.architecture.headline'));
    setText('[data-content="method.architecture.intro"]', getPath(data, 'method.architecture.intro'));
    setText('[data-content="method.architecture.body"]', getPath(data, 'method.architecture.body'));
    renderStages(getPath(data, 'method.stages'));

    setText('[data-content="proof.kicker"]', getPath(data, 'proof.kicker'));
    setText('[data-content="proof.headline"]', getPath(data, 'proof.headline'));
    renderCaseStudies(getPath(data, 'caseStudies') || getPath(data, 'proof.caseStudies'));
    renderPullQuotes(getPath(data, 'pullQuotes') || getPath(data, 'proof.pullQuotes'));

    setText('[data-content="offer.kicker"]', getPath(data, 'offer.kicker'));
    setText('[data-content="offer.headline"]', getPath(data, 'offer.headline'));
    renderOffers(getPath(data, 'offers') || getPath(data, 'offer.items'));
    setText('[data-content="offer.note"]', getPath(data, 'offer.note'));

    setText('[data-content="whySeb.kicker"]', getPath(data, 'whySeb.kicker'));
    setText('[data-content="whySeb.headline"]', getPath(data, 'whySeb.headline'));
    const whyBody = document.querySelector('[data-content-list="whySebBody"]');
    if (whyBody) whyBody.innerHTML = paragraphList(getPath(data, 'whySeb.body'));
    renderCredentials(getPath(data, 'whySeb.credentials'));
    setText('[data-content="whySeb.cities"]', getPath(data, 'whySeb.cities'));
    const whyImage = document.querySelector('[data-content-image="whySeb.image"]');
    if (whyImage && getPath(data, 'whySeb.image.src')) {
      whyImage.setAttribute('src', data.whySeb.image.src);
      whyImage.setAttribute('alt', data.whySeb.image.alt || '');
    }
    const forbesFeature = document.querySelector('[data-content-link="whySeb.forbes"]');
    if (forbesFeature && getPath(data, 'whySeb.forbes.href')) {
      forbesFeature.setAttribute('href', data.whySeb.forbes.href);
    }
    setText('[data-content="whySeb.forbes.headline"]', getPath(data, 'whySeb.forbes.headline'));
    setText('[data-content="whySeb.forbes.meta"]', getPath(data, 'whySeb.forbes.meta'));

    setText('[data-content="cta.kicker"]', getPath(data, 'cta.kicker'));
    setText('[data-content="cta.headline"]', getPath(data, 'cta.headline'));
    setText('[data-content="cta.subtitle"]', getPath(data, 'cta.subtitle'));
    setText('[data-content="cta.line"]', getPath(data, 'cta.line'));
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
      const response = await fetch('./content/site.json?v=20260525-header-tally-only', { cache: 'no-store' });
      if (!response.ok) throw new Error('Unable to load site content');
      applyContent(await response.json());
    } catch (error) {
      console.warn('Using fallback HTML content:', error.message);
    }
  }

  function updateNav() {
    if (!nav) return;
    nav.classList.toggle('scrolled', window.scrollY > 60);
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
          if (!entry.isIntersecting) return;
          const id = entry.target.id;
          document.querySelectorAll('.nav-links a:not(.nav-cta)').forEach(function (link) {
            const href = link.getAttribute('href');
            link.classList.toggle('active', href === '#' + id);
          });
        });
      },
      { threshold: 0.32 }
    );

    document.querySelectorAll('main section[id]').forEach(function (section) {
      sectionObserver.observe(section);
    });
  }

  function initMobileMenu() {
    if (!hamburger || !mobileMenu) return;

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
      if (mobileMenu.classList.contains('open')) closeMenu();
      else openMenu();
    });

    mobileMenu.addEventListener('click', function (event) {
      if (event.target.closest('a')) closeMenu();
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && mobileMenu.classList.contains('open')) closeMenu();
    });
  }

  function initSmoothScroll() {
    document.addEventListener('click', function (event) {
      const anchor = event.target.closest('a[href^="#"]');
      if (!anchor) return;
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (!target) return;
      event.preventDefault();
      const navHeight = nav ? nav.offsetHeight : 0;
      const targetY = target.getBoundingClientRect().top + window.scrollY - navHeight - 16;
      window.scrollTo({ top: targetY, behavior: 'smooth' });
    });
  }

  async function init() {
    initFadeAnimations();
    await loadSiteContent();
    enforceDiscoveryCtas();
    window.addEventListener('scroll', updateNav, { passive: true });
    updateNav();
    initNavHighlight();
    initMobileMenu();
    initSmoothScroll();
  }

  init();
})();
