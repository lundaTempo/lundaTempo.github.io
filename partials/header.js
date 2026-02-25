document.querySelector('header').innerHTML = `<a href="/"><h1>lundaTempo</h1></a>
  <button id="theme-toggle" aria-label="växla tema"></button>&nbsp
  <button id="copy-link" aria-label="kopiera länk"></button>&nbsp
  <button id="lucky" aria-label="gå till slumpmässig sång">jag har tur</button>&nbsp
  <button id="group-toggle" aria-label="växla grupp"></button>`
const themeToggle = document.getElementById('theme-toggle');

const themeLabels = {
  light: 'låt mörker bli',
  dark: 'gamla böcker',
  book: 'varde ljus',
};

const themeNext = {
  light: 'dark',
  dark: 'book',
  book: 'light',
};

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme === 'light' ? '' : theme);
  themeToggle.textContent = themeLabels[theme];
}

const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const saved = localStorage.getItem('theme');
const initialTheme = saved || (prefersDark ? 'dark' : 'light');
applyTheme(initialTheme);

themeToggle.addEventListener('click', () => {
  const current = localStorage.getItem('theme') || 'light';
  const next = themeNext[current] || 'dark';
  localStorage.setItem('theme', next);
  applyTheme(next);
});

const groupToggle = document.getElementById('group-toggle');

const groupLabels = {
  cs: 'pluggar cs',
  dsek: 'krischanit',
  krn: 'med i cs',
};

const groupNext = {
  cs: 'dsek',
  dsek: 'krn',
  krn: 'cs',
};

function applyGroup(group) {
  document.documentElement.setAttribute('data-group', group);
  groupToggle.textContent = groupLabels[group];
}

const savedGroup = localStorage.getItem('group') || 'cs';
applyGroup(savedGroup);

groupToggle.addEventListener('click', () => {
  const current = localStorage.getItem('group') || 'cs';
  const next = groupNext[current];
  localStorage.setItem('group', next);
  applyGroup(next);
});

const copyButton = document.getElementById('copy-link');
copyButton.textContent = 'kopiera länk';
copyButton.addEventListener('click', copyLink);

function mulberry32(seed) {
  return function() {
    seed |= 0; seed = seed + 0x6D2B79F5 | 0;
    let t = Math.imul(seed ^ seed >>> 15, 1 | seed);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}

document.getElementById('lucky').addEventListener('click', async () => {
  const response = await fetch('/songIndex.json');
  const songs = await response.json();
  const current = window.location.pathname;
  const others = songs.filter(url => url !== current);
  const pool = others.length ? others : songs;
  const rand = mulberry32(Date.now());
  const url = pool[Math.floor(rand() * pool.length)];
  window.location.href = url;
});

function copyLink() {
  const link = window.location.href;
  
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(link)
      .then(() => {
        showCopyFeedback();
      })
      .catch((err) => {
        console.error('Failed to copy:', err);
      });
  }
}

function showCopyFeedback() {
  const copyButton = document.getElementById('copy-link');
  if (!copyButton) return;
  
  const originalText = copyButton.textContent;
  copyButton.textContent = 'länk kopierad';
  
  setTimeout(() => {
    copyButton.textContent = originalText;
    copyButton.style.backgroundColor = '';
  }, 2000);
}