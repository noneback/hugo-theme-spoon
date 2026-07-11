import * as params from '@params';

const menuButton = document.getElementById('menu-toggle');
const navigationList = document.getElementById('navigation-list');

function setMenuOpen (open) {
  if (!menuButton || !navigationList) return;
  menuButton.setAttribute('aria-expanded', String(open));
  navigationList.classList.toggle('is-open', open);
}

menuButton?.addEventListener('click', () => {
  setMenuOpen(menuButton.getAttribute('aria-expanded') !== 'true');
});

navigationList?.addEventListener('click', event => {
  if (event.target instanceof Element && event.target.closest('a')) setMenuOpen(false);
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape') setMenuOpen(false);
});

const topLink = document.getElementById('top-link');
const progressBar = document.getElementById('reading-progress');
let scrollUpdatePending = false;

function updateScrollUI () {
  const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  topLink?.classList.toggle('is-visible', scrollTop > 800);

  if (progressBar) {
    const scrollableHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = scrollableHeight > 0 ? Math.min((scrollTop / scrollableHeight) * 100, 100) : 0;
    progressBar.style.width = `${progress}%`;
  }

  scrollUpdatePending = false;
}

window.addEventListener('scroll', () => {
  if (!scrollUpdatePending) {
    scrollUpdatePending = true;
    window.requestAnimationFrame(updateScrollUI);
  }
}, { passive: true });

updateScrollUI();

document.querySelectorAll('.code-block, .highlight').forEach(block => {
  if (block.classList.contains('highlight') && block.closest('.code-block')) return;

  const pre = block.querySelector('pre');
  if (!pre) return;

  let copyButton = block.querySelector('.copy-code');
  if (!copyButton) {
    copyButton = document.createElement('button');
    copyButton.className = 'copy-code';
    copyButton.type = 'button';
    block.appendChild(copyButton);
  }

  copyButton.textContent = params.copyLabel;
  copyButton.setAttribute('aria-label', params.copyLabel);

  copyButton.addEventListener('click', async () => {
    const code = pre.querySelector('code');
    const text = code ? code.textContent : pre.textContent;

    try {
      await navigator.clipboard.writeText(text);
    } catch (_) {
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(pre);
      selection.removeAllRanges();
      selection.addRange(range);
      document.execCommand('copy');
      selection.removeAllRanges();
    }

    copyButton.textContent = params.copiedLabel;
    window.setTimeout(() => {
      copyButton.textContent = params.copyLabel;
    }, 2000);
  });
});

if (typeof window.mediumZoom === 'function') {
  window.mediumZoom('.blog-content[data-enable-image-zoom="true"] img', {
    margin: 10,
    scrollOffset: 40,
    background: 'rgba(0, 0, 0, 0.5)'
  });
}

const tocLinks = Array.from(document.querySelectorAll('.toc-content a[href^="#"]'));
const tocTargets = tocLinks
  .map(link => ({ link, target: document.getElementById(decodeURIComponent(link.hash.slice(1))) }))
  .filter(item => item.target);

function setActiveTOCLink (activeLink) {
  tocLinks.forEach(link => {
    const isActive = link === activeLink;
    link.classList.toggle('is-active', isActive);
    if (isActive) {
      link.setAttribute('aria-current', 'location');
    } else {
      link.removeAttribute('aria-current');
    }
  });
}

if (tocTargets.length) {
  const tocObserver = new IntersectionObserver(entries => {
    const visibleEntries = entries
      .filter(entry => entry.isIntersecting)
      .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

    if (visibleEntries.length) {
      const current = tocTargets.find(item => item.target === visibleEntries[0].target);
      if (current) setActiveTOCLink(current.link);
    }
  }, {
    rootMargin: '-15% 0px -70% 0px',
    threshold: [0, 1]
  });

  tocTargets.forEach(item => tocObserver.observe(item.target));
}
