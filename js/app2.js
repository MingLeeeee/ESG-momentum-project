// Scroll reveal
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('visible'), i * 60);
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  reveals.forEach(r => observer.observe(r));

  // ESG command centre search and filters
  const companySearch = document.getElementById('companySearch');
  const companyItems = Array.from(document.querySelectorAll('.company-card, .company-row'));
  const companyFilters = Array.from(document.querySelectorAll('.explorer-filter'));
  const companyEmpty = document.getElementById('companyEmpty');
  let activeCompanyFilter = 'all';

  function updateCompanyExplorer() {
    if (!companyItems.length) return;
    const query = (companySearch?.value || '').trim().toLowerCase();
    let visibleCount = 0;

    companyItems.forEach(item => {
      const haystack = (item.dataset.search || '').toLowerCase();
      const matchesSearch = !query || haystack.includes(query);
      const matchesFilter = activeCompanyFilter === 'all' || haystack.includes(activeCompanyFilter);
      const visible = matchesSearch && matchesFilter;
      item.style.display = visible ? '' : 'none';
      if (visible) visibleCount += 1;
    });

    if (companyEmpty) companyEmpty.style.display = visibleCount ? 'none' : 'block';
  }

  if (companySearch) companySearch.addEventListener('input', updateCompanyExplorer);
  companyFilters.forEach(btn => {
    btn.addEventListener('click', () => {
      companyFilters.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeCompanyFilter = btn.dataset.filter || 'all';
      updateCompanyExplorer();
    });
  });

  // Company row click
  document.querySelectorAll('.company-item').forEach(item => {
    item.addEventListener('click', () => {
      document.querySelectorAll('.company-item').forEach(i => i.classList.remove('active'));
      item.classList.add('active');
    });
  });

  // Nav active state on scroll
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 120) current = s.getAttribute('id');
    });
    navLinks.forEach(a => {
      const href = a.getAttribute('href') || '';
      if (!href.startsWith('#')) return;
      a.style.color = href === '#' + current ? 'var(--gold)' : '';
    });
  });
