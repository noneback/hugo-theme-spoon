import * as params from '@params';

const mode = document.getElementById('mode');
const darkModeTheme = params.darkModeTheme || 'data-dark-mode';
const colorScheme = window.matchMedia('(prefers-color-scheme: dark)');

if (mode !== null) {
  colorScheme.addEventListener('change', event => {
    if (getStoredTheme() === null) {
      applyTheme(event.matches ? 'dark' : 'light');
    }
  });

  mode.addEventListener('click', () => {
    const theme = document.documentElement.hasAttribute(darkModeTheme) ? 'light' : 'dark';
    setStoredTheme(theme);
    applyTheme(theme);
  });

  const initialTheme = getStoredTheme() || (colorScheme.matches ? 'dark' : 'light');
  applyTheme(initialTheme, false);

  document.querySelectorAll('#giscus-comments, #utterances-comments').forEach(container => {
    new MutationObserver(() => {
      changeCommentsTheme(document.documentElement.hasAttribute(darkModeTheme));
    }).observe(container, { childList: true, subtree: true });
  });
}

function getStoredTheme () {
  try {
    return window.localStorage.getItem('theme');
  } catch (_) {
    return null;
  }
}

function setStoredTheme (theme) {
  try {
    window.localStorage.setItem('theme', theme);
  } catch (_) {
    // The selected theme still applies for the current page load.
  }
}

function applyTheme (theme, syncComments = true) {
  const isDark = theme === 'dark';
  document.documentElement.toggleAttribute(darkModeTheme, isDark);
  document.documentElement.style.colorScheme = isDark ? 'dark' : 'light';
  mode?.setAttribute('aria-pressed', String(isDark));

  if (syncComments) {
    changeCommentsTheme(isDark);
  }
}

function changeCommentsTheme (isDark) {
  const giscusScript = document.querySelector('#giscus-comments script[src*="giscus.app"]');
  if (giscusScript) {
    giscusScript.dataset.theme = isDark ? 'dark' : 'light';
  }

  const utterances = document.querySelector('.utterances-frame');
  if (utterances?.contentWindow) {
    utterances.contentWindow.postMessage({
      type: 'set-theme',
      theme: isDark ? 'github-dark' : 'github-light'
    }, 'https://utteranc.es');
  }

  const giscus = document.querySelector('.giscus-frame');
  if (giscus?.contentWindow) {
    giscus.contentWindow.postMessage({
      giscus: {
        setConfig: { theme: isDark ? 'dark' : 'light' }
      }
    }, 'https://giscus.app');
  }
}
