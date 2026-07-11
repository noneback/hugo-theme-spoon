import * as params from '@params';

const darkModeTheme = params.darkModeTheme || 'data-dark-mode';
const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false;
let storedTheme = null;

try {
  storedTheme = window.localStorage.getItem('theme');
} catch (_) {
  // Storage can be unavailable in privacy-restricted browser contexts.
}

if (storedTheme === 'dark' || (storedTheme === null && prefersDark)) {
  document.documentElement.setAttribute(darkModeTheme, '');
  document.documentElement.style.colorScheme = 'dark';
} else {
  document.documentElement.style.colorScheme = 'light';
}
