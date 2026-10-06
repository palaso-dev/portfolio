const root = document.documentElement;

const getSystemTheme = () => window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

document.getElementById('theme-toggle').addEventListener('click', () => {
  const current = root.dataset.theme || getSystemTheme();
  const next = current === 'dark' ? 'light' : 'dark';
  root.dataset.theme = next;
  localStorage.setItem('theme_preference', next);
});

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
  if (!localStorage.getItem('theme_preference')) {
    root.dataset.theme = e.matches ? 'dark' : 'light';
  }
});

const menuToggle = document.getElementById('menu-toggle');
const siteNav = document.getElementById('site-nav');

if (menuToggle && siteNav) {
  const closeMenu = () => {
    siteNav.classList.remove('is-open');
    menuToggle.setAttribute('aria-expanded', 'false');
  };

  menuToggle.addEventListener('click', () => {
    const isOpen = siteNav.classList.toggle('is-open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  siteNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('click', (e) => {
    if (!siteNav.contains(e.target) && !menuToggle.contains(e.target) && siteNav.classList.contains('is-open')) {
      closeMenu();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && siteNav.classList.contains('is-open')) {
      closeMenu();
      menuToggle.focus();
    }
  });
}

document.getElementById('year').textContent = new Date().getFullYear();

const items = document.querySelectorAll('section:not(.hero) > *');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

items.forEach((el) => {
  el.classList.add('reveal');
  observer.observe(el);
});

let lastScrollY = window.scrollY;
const header = document.querySelector('.site-header');
window.addEventListener('scroll', () => {
  if (siteNav && siteNav.classList.contains('is-open')) return;
  const currentScrollY = window.scrollY;
  if (currentScrollY > 50 && currentScrollY > lastScrollY) {
    header.classList.add('header-hidden');
  } else {
    header.classList.remove('header-hidden');
  }
  lastScrollY = Math.max(0, currentScrollY);
}, { passive: true });
