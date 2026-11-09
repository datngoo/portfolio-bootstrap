'use strict';

// Extra feature 1: keyboard-friendly responsive navigation.
const menuButton = document.querySelector('#menu-toggle');
const navigation = document.querySelector('#site-nav');

function closeMenu() {
  navigation.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Open navigation');
}

menuButton.addEventListener('click', () => {
  const opening = !navigation.classList.contains('open');
  navigation.classList.toggle('open', opening);
  menuButton.setAttribute('aria-expanded', String(opening));
  menuButton.setAttribute('aria-label', opening ? 'Close navigation' : 'Open navigation');
});

navigation.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', closeMenu);
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeMenu();
});

// Extra feature 2: saved light/dark theme preference.
const themeButton = document.querySelector('#theme-toggle');
const themeIcon = themeButton.querySelector('.theme-icon');

function setTheme(isDark) {
  document.body.classList.toggle('dark', isDark);
  themeButton.setAttribute('aria-label', isDark ? 'Switch to light theme' : 'Switch to dark theme');
  themeIcon.textContent = isDark ? '☀' : '☾';
}

let savedTheme = null;
try {
  savedTheme = window.localStorage.getItem('portfolio-theme');
} catch (_error) {
  // Some browser privacy settings disable localStorage. The toggle still works.
}
setTheme(savedTheme === 'dark');

themeButton.addEventListener('click', () => {
  const useDark = !document.body.classList.contains('dark');
  setTheme(useDark);
  try {
    window.localStorage.setItem('portfolio-theme', useDark ? 'dark' : 'light');
  } catch (_error) {
    // Store preference only when the browser allows it.
  }
});

// Extra feature 3: interactive project category filtering.
const filterButtons = document.querySelectorAll('.filter-button');
// Bootstrap project columns are hidden as a whole, preventing blank spaces.
const projects = document.querySelectorAll('.project-item');
const projectStatus = document.querySelector('#project-status');

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const selectedCategory = button.dataset.filter;
    let visibleCount = 0;

    filterButtons.forEach((item) => {
      const selected = item === button;
      item.classList.toggle('active', selected);
      item.setAttribute('aria-pressed', String(selected));
    });

    projects.forEach((project) => {
      const visible = selectedCategory === 'all' || project.dataset.category === selectedCategory;
      project.hidden = !visible;
      if (visible) visibleCount += 1;
    });

    projectStatus.textContent = `Showing ${visibleCount} project${visibleCount === 1 ? '' : 's'}`;
  });
});

// Keep the copyright year current.
document.querySelector('#year').textContent = String(new Date().getFullYear());
