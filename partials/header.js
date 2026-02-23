document.querySelector('header').innerHTML = `<a href="/"><h1>lundaTempo</h1></a>
  <button id="theme-toggle" aria-label="växla mörkt läge"></button>
  <button id="copy-link" aria-label="kopiera länk"></button><br>`

const themeToggle = document.getElementById('theme-toggle');

function applyTheme(dark) {
  document.documentElement.setAttribute('data-theme', dark ? 'dark' : '');
  themeToggle.textContent = dark ? 'gör ljust' : 'gör mörkt';
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

const copyButton = document.getElementById('copy-button');
copyButton.textContent = "wip";

/*
async function getSongIndex(){
  const response = await fetch('/songIndex.json');
  if (!response.ok) {
    throw new Error('Failed to load song index');
  }
  return response.json();
}

function copyLink() {
  const link = window.location.href;
  
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(link)
      .then(() => {
        showCopyFeedback();
      })
      .catch((err) => {
        console.error('Failed to copy:', err);
        fallbackCopy(link);
      });
  } else {
    fallbackCopy(link);
  }
}

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

function showCopyFeedback() {
  const copyButton = document.querySelector('.copyButton');
  if (!copyButton) return;
  
  const originalText = copyButton.textContent;
  copyButton.textContent = 'Länk kopierad!';
  
  setTimeout(() => {
    copyButton.textContent = originalText;
    copyButton.style.backgroundColor = '';
  }, 2000);
} */