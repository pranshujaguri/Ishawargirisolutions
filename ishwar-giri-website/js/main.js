/* =============================================
   ISHWAR GIRI (Solution India) - Main JS
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---- Navbar: hamburger toggle ---- */
  const hamburger = document.querySelector('.hamburger');
  const navLinks  = document.querySelector('.nav-links');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      navLinks.classList.toggle('open');
    });
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
      });
    });
  }

  /* ---- Navbar: add shadow on scroll ---- */
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 20);
    }, { passive: true });
  }

  /* ---- Active nav link by current page ---- */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });

  /* ---- Scroll-reveal: fade-up ---- */
  const fadeEls = document.querySelectorAll('.fade-up');
  if (fadeEls.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          observer.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    fadeEls.forEach(el => observer.observe(el));
  }

  /* ---- Animated counters ---- */
  function animateCounter(el) {
    const target  = parseInt(el.dataset.target, 10);
    const suffix  = el.dataset.suffix || '';
    const dur     = 1800;
    const step    = 16;
    const inc     = target / (dur / step);
    let   current = 0;
    const timer = setInterval(() => {
      current += inc;
      if (current >= target) {
        el.textContent = target + suffix;
        clearInterval(timer);
      } else {
        el.textContent = Math.floor(current) + suffix;
      }
    }, step);
  }

  const statNums = document.querySelectorAll('.stat-number[data-target]');
  if (statNums.length) {
    const statsBar = document.querySelector('.stats-bar');
    const statsObs = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        statNums.forEach(animateCounter);
        statsObs.unobserve(statsBar);
      }
    }, { threshold: 0.5 });
    statsObs.observe(statsBar);
  }

  /* ---- Contact form: mailto with validation ---- */
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      const name    = form.querySelector('[name="name"]').value.trim();
      const email   = form.querySelector('[name="email"]').value.trim();
      const message = form.querySelector('[name="message"]').value.trim();
      if (!name || !email || !message) {
        e.preventDefault();
        alert('Please fill in all required fields.');
        return;
      }
      /* mailto submission proceeds naturally */
    });
  }

});
