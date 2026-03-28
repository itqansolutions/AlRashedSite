/* ============================================================
   AL-RASHED – MAIN.JS
   Navbar scroll · Mobile menu · i18n · Scroll reveal
   ============================================================ */

// ── Navbar scroll effect ────────────────────────────────────
const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 30);
  }, { passive: true });
}

// ── Active nav link ──────────────────────────────────────────
(function setActiveLink() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navbar__links a, .mobile-nav a').forEach(a => {
    if (a.getAttribute('href') === path) a.classList.add('active');
  });
})();

// ── Mobile hamburger ─────────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');
if (hamburger && mobileNav) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileNav.classList.toggle('open');
    document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
  });
  mobileNav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileNav.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

// ── i18n ──────────────────────────────────────────────────────
async function loadLang(lang) {
  try {
    const res  = await fetch(`/lang/${lang}.json`);
    const dict = await res.json();
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.dataset.i18n;
      if (dict[key] !== undefined) {
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
          el.placeholder = dict[key];
        } else {
          el.textContent = dict[key];
        }
      }
    });
    document.documentElement.dir  = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
    localStorage.setItem('lang', lang);

    // Update toggle button label
    const langBtn = document.getElementById('langToggle');
    if (langBtn) langBtn.textContent = lang === 'ar' ? 'EN' : 'عر';
  } catch (e) {
    console.error('Language load failed:', e);
  }
}

// Lang toggle button
const langToggle = document.getElementById('langToggle');
if (langToggle) {
  langToggle.addEventListener('click', () => {
    const current = localStorage.getItem('lang') || 'ar';
    loadLang(current === 'ar' ? 'en' : 'ar');
  });
}

// Load saved or default language on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  const savedLang = localStorage.getItem('lang') || 'ar';
  loadLang(savedLang);
});

// ── Scroll Reveal ─────────────────────────────────────────────
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ── Hero background parallax/loaded state ────────────────────
const hero = document.querySelector('.hero');
if (hero) {
  window.addEventListener('load', () => hero.classList.add('loaded'));
}

// ── Smooth anchor scrolling ───────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
