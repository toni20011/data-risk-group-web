/* ── MOBILE NAV ── */
(function () {
  const nav       = document.getElementById('nav');
  const hamburger = document.getElementById('hamburger');
  const menu      = document.getElementById('nav-menu');

  // Overlay element for closing menu when tapping outside
  const overlay = document.createElement('div');
  overlay.className = 'nav-overlay';
  document.body.appendChild(overlay);

  function openMenu() {
    menu.classList.add('open');
    overlay.classList.add('open');
    hamburger.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    menu.classList.remove('open');
    overlay.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', () => {
    menu.classList.contains('open') ? closeMenu() : openMenu();
  });

  overlay.addEventListener('click', closeMenu);

  // Close menu when a nav link is clicked
  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Close on Escape key
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeMenu();
  });
})();

/* ── NAV SCROLL SHADOW ── */
(function () {
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });
})();

/* ── SCROLL REVEAL ── */
(function () {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0, rootMargin: '0px 0px 60px 0px' });

  els.forEach(el => observer.observe(el));
})();

/* ── TRUST SCORE RING ANIMATION ── */
(function () {
  const ring = document.querySelector('.score-demo__ring svg circle:last-child');
  if (!ring) return;

  // Start fully empty, animate to the target on scroll-into-view
  const target = 206; // dasharray value matching the 63/100 score
  ring.style.strokeDasharray = '0 327';

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        ring.style.transition = 'stroke-dasharray 1.2s cubic-bezier(.4,0,.2,1)';
        ring.style.strokeDasharray = target + ' 327';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  observer.observe(ring.closest('.score-demo__ring'));
})();

/* ── PATHWAY ACCORDION ── */
(function () {
  const headers = document.querySelectorAll('.pathway-step__header');
  if (!headers.length) return;

  headers.forEach(header => {
    header.addEventListener('click', () => {
      const body = header.closest('.pathway-step__body');
      const isOpen = body.classList.contains('is-open');

      // Close all steps
      document.querySelectorAll('.pathway-step__body').forEach(b => {
        b.classList.remove('is-open');
        b.querySelector('.pathway-step__header').setAttribute('aria-expanded', 'false');
      });

      // Open clicked step if it was closed
      if (!isOpen) {
        body.classList.add('is-open');
        header.setAttribute('aria-expanded', 'true');
      }
    });

    header.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        header.click();
      }
    });
  });
})();

/* ── CONTACT FORM ── */
(function () {
  const form    = document.getElementById('contact-form');
  const success = document.getElementById('form-success');
  if (!form) return;

  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    const btn = form.querySelector('button[type="submit"]');
    btn.textContent = 'Sending…';
    btn.disabled = true;

    const data = Object.fromEntries(new FormData(form));

    // Replace the action URL below with your form backend (Formspree, etc.)
    const ACTION_URL = form.getAttribute('action');

    try {
      const res = await fetch(ACTION_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        form.style.display = 'none';
        success.style.display = 'block';
      } else {
        throw new Error('Server error');
      }
    } catch {
      btn.textContent = 'Try Again';
      btn.disabled = false;
      alert('Something went wrong — please email us directly at toni@datariskgroup.com');
    }
  });
})();
