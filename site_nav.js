document.addEventListener('DOMContentLoaded', function () {
  // === Drawer Nav Open/Close ===
  const navToggle = document.querySelector('.nav-toggle');
  const navDrawer = document.querySelector('.nav-drawer');
  const navDrawerBg = document.querySelector('.nav-drawer-bg');
  const navDrawerClose = document.querySelector('.drawer-close');

  function openDrawer() {
    navDrawer.classList.add('open');
    navDrawerBg.classList.add('open');
    document.body.style.overflow = 'hidden';
    navDrawer.setAttribute('tabindex', '0');
    navDrawer.focus();
    document.body.classList.add('drawer-open');
  }
  function closeDrawer() {
    navDrawer.classList.remove('open');
    navDrawerBg.classList.remove('open');
    document.body.style.overflow = '';
    document.body.classList.remove('drawer-open');
  }

  navToggle.addEventListener('click', openDrawer);
  navDrawerClose.addEventListener('click', closeDrawer);
  navDrawerBg.addEventListener('click', closeDrawer);

  // Close drawer on link click (but not on dropdown triggers)
  navDrawer.querySelectorAll('.nav-drawer-links a').forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  // Close drawer on ESC key
  window.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeDrawer();
  });

  // === Drawer Dropdowns (Plus/Chevron) ===
  navDrawer.querySelectorAll('.drawer-dropdown-trigger').forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      const icon = btn.querySelector('i.fa-solid');
      const dropdown = btn.nextElementSibling;
      const open = dropdown.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      icon.classList.toggle('fa-plus', !open);
      icon.classList.toggle('fa-chevron-down', open);
    });
  });

  // === Sticky/Flyaway Nav on Scroll ===
  (function() {
    const nav = document.querySelector('.nav-container');
    let lastScroll = window.scrollY;
    let ticking = false;
    function checkScroll() {
      const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight);
      if (window.scrollY < 40 || window.scrollY < lastScroll || pct < 0.45) {
        nav.classList.remove('flyaway');
      } else if (pct > 0.45 && window.scrollY > lastScroll) {
        nav.classList.add('flyaway');
      }
      lastScroll = window.scrollY;
      ticking = false;
    }
    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(checkScroll);
        ticking = true;
      }
    });
  })();

  // === Font Toggle: Three-state (small, default, large), only affects <main> ===
  document.querySelector('.font-toggle-btn').addEventListener('click', function() {
    const main = document.querySelector('main');
    if (main.classList.contains('font-large')) {
      main.classList.remove('font-large');
      main.classList.add('font-small');
    } else if (main.classList.contains('font-small')) {
      main.classList.remove('font-small');
      // Now it's default/medium
    } else {
      main.classList.add('font-large');
    }
  });

  // === Light/Dark Theme Toggle (drawer controls only) ===
  const themeBtn = document.querySelector('.theme-toggle-btn');
  const themeIcon = themeBtn.querySelector('i');
  function setTheme(theme) {
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    themeIcon.className = theme === 'light' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
  }
  themeBtn.addEventListener('click', function() {
    const current = document.body.getAttribute('data-theme') || 'dark';
    setTheme(current === 'dark' ? 'light' : 'dark');
  });

  // Initialize theme on load
  (function() {
    const stored = localStorage.getItem('theme');
    if (stored === 'light' || stored === 'dark') {
      setTheme(stored);
    } else {
      setTheme('dark');
    }
  })();
});