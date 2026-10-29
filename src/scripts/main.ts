/* ----------------------------------------------------------------------------
 * Page behaviour: theme toggle, mobile navigation, scroll spy + progress,
 * copy-to-clipboard, share links.
 * Everything degrades gracefully if it is not present on the page.
 * ------------------------------------------------------------------------- */

/* -- Colour theme ---------------------------------------------------------- */

function initTheme(): void {
  const buttons = document.querySelectorAll<HTMLButtonElement>('[data-theme-toggle]');
  if (!buttons.length) return;

  const sync = () => {
    const dark = document.documentElement.classList.contains('dark');
    buttons.forEach((b) => {
      b.setAttribute('aria-pressed', String(dark));
      b.setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme');
    });
  };

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      const dark = document.documentElement.classList.toggle('dark');
      try {
        localStorage.setItem('si-theme', dark ? 'dark' : 'light');
      } catch {
        /* ignore */
      }
      sync();
    });
  });

  sync();
}

/* -- Mobile navigation ----------------------------------------------------- */

function initMobileNav(): void {
  const toggle = document.querySelector<HTMLButtonElement>('[data-nav-toggle]');
  const panel = document.querySelector<HTMLElement>('[data-nav-panel]');
  if (!toggle || !panel) return;

  const header = document.querySelector<HTMLElement>('[data-site-header]');

  const setOpen = (open: boolean) => {
    panel.classList.toggle('hidden', !open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.dataset.open = String(open);
    toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    // Keep the bar opaque while the panel is down, even at scroll position 0.
    if (header && open) header.classList.add('is-stuck');
    if (header && !open && window.scrollY <= 8) header.classList.remove('is-stuck');
  };

  toggle.addEventListener('click', () => {
    setOpen(toggle.getAttribute('aria-expanded') !== 'true');
  });

  panel.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => setOpen(false));
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') setOpen(false);
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth >= 1280) setOpen(false);
  });
}

/* -- Scroll progress + active section -------------------------------------- */

function initScroll(): void {
  const bar = document.querySelector<HTMLElement>('[data-scroll-progress]');
  const header = document.querySelector<HTMLElement>('[data-site-header]');

  const onScroll = () => {
    if (bar) {
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      const ratio = max > 0 ? doc.scrollTop / max : 0;
      bar.style.transform = `scaleX(${Math.min(1, Math.max(0, ratio))})`;
    }
    if (header) {
      const menuOpen = document.querySelector('[data-nav-toggle]')?.getAttribute('aria-expanded') === 'true';
      header.classList.toggle('is-stuck', window.scrollY > 8 || menuOpen);
    }
  };

  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  const links = Array.from(
    document.querySelectorAll<HTMLAnchorElement>('[data-nav-link]'),
  );
  const sections = links
    .map((link) => document.querySelector<HTMLElement>(link.hash))
    .filter((el): el is HTMLElement => Boolean(el));

  if (!sections.length || !('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = entry.target.id;
        links.forEach((link) => {
          const active = link.hash === `#${id}`;
          link.classList.toggle('is-active', active);
          if (active) {
            link.setAttribute('aria-current', 'true');
          } else {
            link.removeAttribute('aria-current');
          }
        });
      });
    },
    { rootMargin: '-45% 0px -50% 0px', threshold: 0 },
  );

  sections.forEach((section) => observer.observe(section));
}

/* -- Copy to clipboard ----------------------------------------------------- */

function initCopy(): void {
  document.querySelectorAll<HTMLButtonElement>('[data-copy]').forEach((button) => {
    button.addEventListener('click', async () => {
      const value = button.dataset.copy ?? '';
      const label = button.querySelector<HTMLElement>('[data-copy-label]');
      const original = label?.textContent ?? '';
      let copied = false;
      try {
        await navigator.clipboard.writeText(value);
        copied = true;
      } catch {
        const field = document.createElement('textarea');
        field.value = value;
        field.setAttribute('readonly', '');
        field.style.position = 'fixed';
        field.style.opacity = '0';
        document.body.appendChild(field);
        field.select();
        try {
          copied = document.execCommand('copy');
        } catch {
          /* The visible text remains available for manual copying. */
        }
        field.remove();
      }
      button.classList.toggle('is-copied', copied);
      if (label) label.textContent = copied ? 'Copied' : 'Please copy manually';
      window.setTimeout(() => {
        button.classList.remove('is-copied');
        if (label) label.textContent = original;
      }, 1600);
    });
  });
}

/* -- Share links ----------------------------------------------------------- */

function initShare(): void {
  const url = document.querySelector<HTMLElement>('[data-share-root]')?.dataset.shareUrl
    ?? window.location.href;

  document.querySelectorAll<HTMLButtonElement>('[data-share-native]').forEach((button) => {
    if (!('share' in navigator)) {
      button.classList.add('hidden');
      return;
    }
    button.classList.remove('hidden');
    button.addEventListener('click', () => {
      void navigator.share({ title: document.title, url }).catch(() => undefined);
    });
  });
}

/* -- Boot ------------------------------------------------------------------ */

function boot(): void {
  initTheme();
  initMobileNav();
  initScroll();
  initCopy();
  initShare();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot, { once: true });
} else {
  boot();
}
