const footer = document.querySelector('footer');
footer.innerHTML = '<a href="https://github.com/lundaTempo/lundaTempo.github.io">Källkod</a> <button id="theme-toggle" aria-label="Växla mörkt läge">🌙</button>';

const themeToggle = document.getElementById('theme-toggle');

function applyTheme(dark) {
  document.documentElement.setAttribute('data-theme', dark ? 'dark' : '');
  themeToggle.textContent = dark ? '☀️' : '🌙';
}

const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const saved = localStorage.getItem('theme');
const isDark = saved ? saved === 'dark' : prefersDark;
applyTheme(isDark);

themeToggle.addEventListener('click', () => {
  const nowDark = document.documentElement.getAttribute('data-theme') === 'dark';
  localStorage.setItem('theme', nowDark ? 'light' : 'dark');
  applyTheme(!nowDark);
});

const script = document.createElement('script');
script.dataset.goatcounter = 'https://lundatempo.goatcounter.com/count';
script.async = true;
script.src = '//gc.zgo.at/count.js';
footer.appendChild(script);
