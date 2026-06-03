// js/layout-loader.js
// Loads shared nav, mobile drawer, and footer from master.html.
(function () {
  'use strict';

  async function loadMaster() {
    const response = await fetch('master.html');
    if (!response.ok) {
      throw new Error('Cannot load master.html. Open the project with Live Server / Visual Studio local server, not file://');
    }

    const html = await response.text();
    const doc = new DOMParser().parseFromString(html, 'text/html');

    const nav = doc.querySelector('.site-nav');
    const drawer = doc.querySelector('.nav-drawer');
    const footer = doc.querySelector('.site-footer');

    const headerTarget = document.getElementById('master-header');
    const drawerTarget = document.getElementById('master-drawer');
    const footerTarget = document.getElementById('master-footer');

    if (headerTarget && nav) headerTarget.innerHTML = nav.outerHTML;
    if (drawerTarget && drawer) drawerTarget.innerHTML = drawer.outerHTML;
    if (footerTarget && footer) footerTarget.innerHTML = footer.outerHTML;

    configureMasterLinks();
    initMobileNav();
    initRevealAnimation();
    initActiveNavHighlight();
  }

  function configureMasterLinks() {
    const linkMap = {
      'Factors': 'app.html#factors',
      'Platform': 'app.html#platform',
      'ASEAN': 'app.html#asean',
      'Pricing': 'app.html#pricing',
      'Partners': 'app.html#partners',
      'Request Demo': 'app.html#cta'
    };

    document.querySelectorAll('.nav-logo').forEach(a => a.href = 'app.html');

    document.querySelectorAll('.nav-links a, .nav-drawer a').forEach(a => {
      const label = a.textContent.trim();
      if (linkMap[label]) a.href = linkMap[label];
      a.classList.remove('active');
    });

    const page = document.body.dataset.page;
    if (page === 'detail') {
      document.querySelectorAll('.nav-links a, .nav-drawer a').forEach(a => {
        if (a.textContent.trim() === 'Platform') a.classList.add('active');
      });
    }

    document.querySelectorAll('.footer-col__links a').forEach(a => {
      const label = a.textContent.trim();
      if (label === 'Dashboard') a.href = 'app.html#platform';
      if (label === 'Momentum Tracker') a.href = 'app.html#value';
      if (label === 'Partners') a.href = 'app.html#partners';
      if (label === 'Contact') a.href = 'app.html#cta';
    });
  }

  function initRevealAnimation() {
    const revealEls = document.querySelectorAll('.reveal');
    if (!revealEls.length) return;

    const ro = new IntersectionObserver((entries) => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) {
          setTimeout(() => e.target.classList.add('visible'), i * 55);
          ro.unobserve(e.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -36px 0px' });

    revealEls.forEach(el => ro.observe(el));
  }

  function initMobileNav() {
    const toggle = document.getElementById('navToggle');
    const drawer = document.getElementById('navDrawer');
    if (!toggle || !drawer) return;

    function closeDrawer() {
      drawer.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.querySelectorAll('span').forEach(b => b.style.cssText = '');
    }

    toggle.addEventListener('click', () => {
      const open = drawer.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
      const bars = toggle.querySelectorAll('span');
      if (open) {
        bars[0].style.cssText = 'transform:translateY(7px) rotate(45deg)';
        bars[1].style.cssText = 'opacity:0';
        bars[2].style.cssText = 'transform:translateY(-7px) rotate(-45deg)';
      } else {
        bars.forEach(b => b.style.cssText = '');
      }
    });

    drawer.querySelectorAll('a').forEach(a => a.addEventListener('click', closeDrawer));

    document.addEventListener('click', (e) => {
      if (!toggle.contains(e.target) && !drawer.contains(e.target)) closeDrawer();
    });
  }

  function initActiveNavHighlight() {
    if (document.body.dataset.page !== 'app') return;

    const sections = document.querySelectorAll('section[id]');
    const navAnchors = document.querySelectorAll('.nav-links a, .nav-drawer a');
    if (!sections.length || !navAnchors.length) return;

    function updateActiveLink() {
      let current = '';
      sections.forEach(section => {
        if (window.scrollY >= section.offsetTop - 130) current = section.id;
      });

      navAnchors.forEach(a => {
        const href = a.getAttribute('href') || '';
        const isMatch = href === '#' + current || href.endsWith('#' + current);
        a.classList.toggle('active', isMatch);
      });
    }

    window.addEventListener('scroll', updateActiveLink, { passive: true });
    updateActiveLink();
  }

  loadMaster().catch(console.error);
})();
