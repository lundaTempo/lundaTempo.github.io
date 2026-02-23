document.querySelector('header').innerHTML = `<a href="/"><h1>lundaTempo</h1></a>
  <button id="theme-toggle" aria-label="växla mörkt läge"></button>
  <button id="copy-link" aria-label="kopiera länk"></button>
  <button id="lucky" aria-label="gå till slumpmässig sång">jag har tur</button><br>`

const themeToggle = document.getElementById('theme-toggle');

function applyTheme(dark) {
  document.documentElement.setAttribute('data-theme', dark ? 'dark' : '');
  themeToggle.textContent = dark ? 'varde ljus' : 'låt mörker bli';
}

const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const saved = localStorage.getItem('theme');
const isDark = saved ? saved === 'dark' : prefersDark;
applyTheme(isDark);

themeToggle.addEventListener('click', () => {
  const nowDark = document.documentElement.getAttribute('data-theme') === 'dark';
  localStorage.setItem('theme', nowDark ? 'light' : 'dark');
  applyTheme(!nowDark);
})

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
        //fallbackCopy(link);
      });
  /* } else {
    fallbackCopy(link); */
  }
}
/*
function fallbackCopy(text) {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  document.body.appendChild(textarea);
  textarea.select();
  try {
    document.execCommand("copy");
    showCopyFeedback();
  } catch (err) {
    alert("Failed to copy");
  }
  document.body.removeChild(textarea);
}
*/

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