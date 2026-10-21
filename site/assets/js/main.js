import { toBsDate, todayInNepal, formatDevanagari, formatLatin } from './bs.js';

const root = document.documentElement;

// ---- theme: follows the OS until the visitor picks one ----
const toggle = document.querySelector('.theme-toggle');
if (toggle) {
  const isDark = () =>
    root.dataset.theme
      ? root.dataset.theme === 'dark'
      : matchMedia('(prefers-color-scheme: dark)').matches;
  const label = () =>
    toggle.setAttribute('aria-label', isDark() ? 'Switch to light theme' : 'Switch to dark theme');
  label();
  toggle.addEventListener('click', () => {
    toggle.classList.toggle('is-turned');
    root.dataset.theme = isDark() ? 'light' : 'dark';
    try {
      localStorage.setItem('theme', root.dataset.theme);
    } catch {}
    label();
  });
}

// ---- header gets a hairline once the page scrolls ----
const header = document.querySelector('.site-header');
if (header) {
  const onScroll = () => header.classList.toggle('is-scrolled', scrollY > 8);
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// ---- nav lights up the section being read ----
// A section counts once its top passes a line a third of the way down the screen.
// Sections without a nav link (Toolbox, Education…) leave nothing lit.
const navLinks = [...document.querySelectorAll('.nav a[href^="#"]')];
const spied = [...document.querySelectorAll('section[id]')];
if (header && navLinks.length && spied.length) {
  let raf = 0;
  // The underline travels the way the page is moving: down the page it slides
  // rightwards along the nav, back up it slides leftwards.
  const nav = navLinks[0].closest('.nav');
  let lit = null;
  let lastY = scrollY;
  let settle = 0;
  const light = (next, backward) => {
    if (next === lit) return;
    nav.classList.toggle('is-backward', backward);
    clearTimeout(settle);
    settle = setTimeout(() => nav.classList.remove('is-backward'), 500);
    lit?.removeAttribute('aria-current');
    next?.setAttribute('aria-current', 'location');
    lit = next;
  };
  // A nav click goes straight to its section: the underline moves once, to the
  // target, instead of lighting every section the page scrolls past on the way.
  let jumping = false;
  let jumpEnd = 0;
  const land = () => {
    clearTimeout(jumpEnd);
    jumping = false;
    update();
  };
  // In-page buttons marked data-jump (the hero's "Get in touch") do the same.
  for (const a of [...navLinks, ...document.querySelectorAll('[data-jump]')]) {
    a.addEventListener('click', () => {
      const target = document.querySelector(a.hash);
      if (!target) return;
      const link = [...navLinks].find((l) => l.hash === a.hash);
      light(link, target.getBoundingClientRect().top < 0);
      jumping = true;
      clearTimeout(jumpEnd);
      jumpEnd = setTimeout(land, 1500);
    });
  }
  addEventListener('scrollend', () => jumping && land());
  const update = (syncUrl) => {
    const line = header.offsetHeight + innerHeight / 3;
    let current = null;
    for (const s of spied) if (s.getBoundingClientRect().top <= line) current = s;
    // The last section can be too short to reach the line; at the bottom, it wins.
    if (innerHeight + scrollY >= document.documentElement.scrollHeight - 2) current = spied.at(-1);
    const next = (current && navLinks.find((a) => a.hash === `#${current.id}`)) || null;
    if (!jumping) light(next, scrollY < lastY);
    lastY = scrollY;
    // Keep the address bar on the section being read, so a copied link opens there.
    // replaceState adds no history entries; back at the hero the hash is dropped.
    if (syncUrl === true && !jumping) {
      const hash = current ? `#${current.id}` : '';
      if (location.hash !== hash) history.replaceState(history.state, '', location.pathname + location.search + hash);
    }
  };
  // Only scrolls the visitor causes rewrite the URL. While the page loads, the
  // browser's jump to a #section and late layout shifts would otherwise rename it.
  let userScrolled = false;
  for (const type of ['wheel', 'touchstart', 'keydown', 'pointerdown']) {
    addEventListener(type, () => (userScrolled = true), { passive: true, once: true });
  }
  addEventListener('scroll', () => {
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => update(userScrolled));
  }, { passive: true });
  addEventListener('resize', () => update());
  update();
}

// ---- logo draws on arrival or reload (the <head> script decides: .play-intro on <html>) ----
const logo = document.querySelector('.logo');
if (logo && root.classList.contains('play-intro') && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  logo.classList.add('is-drawing');
}

// ---- phone menu (after the old site's): its staggered-lines icon, which swaps
// for an x, and a full-screen list of every nav link under the header. Built here, so
// without JS the header keeps its plain link row. ----
const siteHeader = document.querySelector('.site-header');
const siteNav = siteHeader?.querySelector('.nav');
if (siteNav) {
  const btn = document.createElement('button');
  btn.className = 'menu-toggle';
  btn.type = 'button';
  btn.setAttribute('aria-expanded', 'false');
  btn.setAttribute('aria-controls', 'mobile-menu');
  btn.setAttribute('aria-label', 'Open menu');
  // The old site's icons: three staggered lines, and an x with a gap in one stroke.
  btn.innerHTML =
    '<svg class="menu-open-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 5.7h16M1.1 10.9h19M1 16.3h16"/></svg>' +
    '<svg class="menu-close-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 5l14 14M5 19l4-4M15 9l4-4"/></svg>';
  siteNav.append(btn);

  const panel = document.createElement('nav');
  panel.id = 'mobile-menu';
  panel.className = 'mobile-menu';
  panel.setAttribute('aria-label', 'Menu');
  panel.hidden = true;
  const list = document.createElement('ul');
  const links = [...siteNav.querySelectorAll('a')];
  // Centred rows with an icon before each label, as on the old site.
  const ICONS = { experience: 'briefcase', 'open-source': 'merge', projects: 'folder', writing: 'pen', contact: 'mail' };
  links.forEach((a, i) => {
    const href = a.getAttribute('href');
    const key = Object.keys(ICONS).find((k) => href.includes(k));
    const li = document.createElement('li');
    li.style.setProperty('--i', i);
    const copy = document.createElement('a');
    copy.href = href;
    copy.innerHTML = key ? `<svg class="i" aria-hidden="true"><use href="/assets/icons.svg#${ICONS[key]}"/></svg>` : '';
    copy.append(Object.assign(document.createElement('span'), { textContent: a.textContent }));
    li.append(copy);
    list.append(li);
  });
  panel.append(list);
  document.body.append(panel);
  siteHeader.classList.add('has-menu');

  const setOpen = (open) => {
    btn.setAttribute('aria-expanded', String(open));
    btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    root.classList.toggle('menu-open', open);
    if (open) {
      // The header's backdrop blur would trap a fixed child, so the panel lives
      // in <body> and starts where the header ends.
      panel.style.top = siteHeader.getBoundingClientRect().bottom + 'px';
      // Mirror the header's current page / section.
      panel.querySelectorAll('a').forEach((copy, i) => {
        const cur = links[i].getAttribute('aria-current');
        if (cur) copy.setAttribute('aria-current', cur);
        else copy.removeAttribute('aria-current');
      });
      panel.hidden = false;
      requestAnimationFrame(() => panel.classList.add('is-open'));
    } else {
      panel.classList.remove('is-open');
      panel.hidden = true;
    }
  };
  btn.addEventListener('click', () => setOpen(btn.getAttribute('aria-expanded') !== 'true'));
  panel.addEventListener('click', (e) => e.target.closest('a') && setOpen(false));
  addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !panel.hidden) {
      setOpen(false);
      btn.focus();
    }
  });
  matchMedia('(min-width: 40.01rem)').addEventListener('change', (e) => e.matches && setOpen(false));
}

// ---- installable app: the service worker lets it open offline (see /sw.js) ----
if ('serviceWorker' in navigator) {
  addEventListener('load', () => navigator.serviceWorker.register('/sw.js').catch(() => {}));
}

// ---- copy email ----
for (const btn of document.querySelectorAll('[data-copy]')) {
  const label = btn.querySelector('span');
  const icon = btn.querySelector('use');
  let reset = 0;
  btn.addEventListener('click', async () => {
    clearTimeout(reset);
    try {
      await navigator.clipboard.writeText(btn.dataset.copy);
      label.textContent = 'Email copied';
      icon.setAttribute('href', '/assets/icons.svg#check');
      btn.classList.add('is-done');
    } catch {
      label.textContent = 'Select the email and press Ctrl+C';
      btn.title = label.textContent;
    }
    reset = setTimeout(() => {
      label.textContent = 'Copy email';
      btn.title = 'Copy email';
      icon.setAttribute('href', '/assets/icons.svg#copy');
      btn.classList.remove('is-done');
    }, 1800);
  });
}

// ---- contact form: posts to the email endpoint, with reCAPTCHA ----
// Google's script is heavy, so it loads only once someone starts on the form.
const form = document.querySelector('#contact-form');
if (form) {
  const ENDPOINT = 'https://email-endpoint.vercel.app/api/contact';
  const SITEKEY = '6LcWMlArAAAAADD4-ERBiMNTOZR7TmBa3npUUvk6';
  const status = form.querySelector('#cf-status');
  const submit = form.querySelector('button[type="submit"]');
  let widget = null;
  let loading = false;

  const say = (text, kind = '') => {
    status.textContent = text;
    status.className = 'form-status' + (kind ? ` is-${kind}` : '');
  };

  const loadCaptcha = () => {
    if (loading) return;
    loading = true;
    window.onCaptchaReady = () => {
      const dark = root.dataset.theme
        ? root.dataset.theme === 'dark'
        : matchMedia('(prefers-color-scheme: dark)').matches;
      widget = grecaptcha.render('cf-captcha', { sitekey: SITEKEY, theme: dark ? 'dark' : 'light' });
    };
    const s = document.createElement('script');
    s.src = 'https://www.google.com/recaptcha/api.js?onload=onCaptchaReady&render=explicit';
    s.async = true;
    s.onerror = () => {
      loading = false;
      say('The spam check didn’t load. Email me instead.', 'error');
    };
    document.head.append(s);
  };
  form.addEventListener('focusin', loadCaptcha);
  // "Get in touch" scrolls here, then puts the cursor in Name. Not on touch
  // screens, where focusing would pop the keyboard up mid-scroll.
  for (const a of document.querySelectorAll('[data-jump][href="#contact"]')) {
    a.addEventListener('click', () => {
      if (!matchMedia('(pointer: fine)').matches) return;
      const name = form.querySelector('#cf-name');
      let done = false;
      const focus = () => {
        if (done) return;
        done = true;
        name.focus({ preventScroll: true });
      };
      addEventListener('scrollend', focus, { once: true });
      setTimeout(focus, 1500);
    });
  }
  form.addEventListener('pointerenter', loadCaptcha);

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!form.reportValidity()) return;
    loadCaptcha();
    const token = widget !== null ? grecaptcha.getResponse(widget) : '';
    if (!token) {
      say('Tick “I’m not a robot” first.', 'error');
      return;
    }
    submit.disabled = true;
    submit.textContent = 'Sending…';
    say('');
    try {
      const data = Object.fromEntries(new FormData(form));
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, 'g-recaptcha-response': token }),
      });
      if (res.ok) {
        form.reset();
        say('Sent. Thanks, I’ll get back to you soon.', 'ok');
      } else {
        say((await res.text()) || 'Something went wrong. Please try again.', 'error');
      }
    } catch {
      say('Couldn’t reach the server. Email me instead.', 'error');
    } finally {
      grecaptcha.reset(widget);
      submit.disabled = false;
      submit.textContent = 'Send message';
    }
  });
}

// ---- footer: back to top ----
// Shown only when the page is taller than the window.
const toTops = document.querySelectorAll('.to-top');
const syncToTop = () => {
  const scrolls = document.documentElement.scrollHeight > innerHeight + 4;
  for (const a of toTops) a.hidden = !scrolls;
};
if (toTops.length) {
  syncToTop();
  addEventListener('resize', syncToTop);
  addEventListener('load', syncToTop);
}
for (const a of document.querySelectorAll('.to-top')) {
  a.addEventListener('click', (e) => {
    e.preventDefault();
    scrollTo({ top: 0 });
    history.replaceState(null, '', location.pathname + location.search);
  });
}

// ---- sections rise in once as they enter the viewport ----
const reveals = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (e.isIntersecting) {
        e.target.classList.add('is-in');
        io.unobserve(e.target);
      }
    }
  }, { threshold: 0.05, rootMargin: '0px 0px -6% 0px' });
  reveals.forEach((el) => io.observe(el));
} else {
  reveals.forEach((el) => el.classList.add('is-in'));
}

// ---- scroll hint disappears once the visitor starts scrolling ----
const hint = document.querySelector('.scroll-hint');
if (hint) {
  const hide = () => hint.classList.toggle('is-gone', scrollY > 60);
  addEventListener('scroll', hide, { passive: true });
  hide();
}

// ---- today in Bikram Sambat, using the table that ships in Plasma ----
const bsOut = document.querySelector('[data-bs-today]');
if (bsOut) {
  const t = todayInNepal();
  const bs = toBsDate(t.year, t.month, t.day);
  // Two unbreakable halves so large text sizes wrap at the comma, never mid-word.
  const [dayMonth, year] = formatDevanagari(bs).split(', ');
  const half = (text) => Object.assign(document.createElement('span'), { textContent: text });
  const first = half(`${dayMonth}, `);
  first.style.whiteSpace = 'nowrap';
  bsOut.replaceChildren(first, half(year));
  const kicker = document.querySelector('[data-bs-today-kicker]');
  if (kicker) kicker.textContent = 'Today in Nepal';
  const latin = document.querySelector('[data-bs-today-latin]');
  if (latin) {
    const ad = new Date(Date.UTC(t.year, t.month - 1, t.day)).toLocaleDateString('en-GB', {
      day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC',
    });
    latin.textContent = `${formatLatin(bs)} · ${ad}`;
  }
}

// ---- project carousels ----
// Auto-advances only while on screen and not being looked at closely: it pauses on
// hover, focus and touch, and never moves with reduced motion.
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

document.querySelectorAll('[data-carousel]').forEach((el, n) => {
  const track = el.querySelector('.carousel-track');
  const slides = [...track.children];
  if (slides.length < 2) return;

  const status = el.querySelector('.carousel-status');
  const dots = [...Array(slides.length)].map((_, i) => {
    const dot = document.createElement('span');
    dot.addEventListener('click', () => go(i));
    return dot;
  });
  el.querySelector('.carousel-dots')?.append(...dots);
  const DELAY = 4200;

  let index = 0;
  let timer = 0;
  let holding = false; // hover, focus or touch
  let visible = false;

  const go = (i) => {
    index = (i + slides.length) % slides.length;
    track.scrollTo({ left: index * track.clientWidth, behavior: reducedMotion ? 'auto' : 'smooth' });
  };

  const sync = () => {
    index = Math.round(track.scrollLeft / track.clientWidth);
    status.textContent = `Screenshot ${index + 1} of ${slides.length}`;
    dots.forEach((dot, i) => dot.classList.toggle('is-active', i === index));
  };

  const schedule = () => {
    clearTimeout(timer);
    if (reducedMotion || holding || !visible || document.hidden) return;
    timer = setTimeout(() => {
      go(index + 1);
      schedule();
    }, DELAY);
  };

  // A smooth scroll can be cut short (e.g. the page scrolls mid-slide) and leave the
  // track between two screenshots; once scrolling stops, settle on the nearest one.
  let raf = 0;
  let settle = 0;
  const settleToNearest = () => {
    const w = track.clientWidth;
    const nearest = Math.round(track.scrollLeft / w);
    if (Math.abs(track.scrollLeft - nearest * w) > 1) go(nearest);
  };
  track.addEventListener('scroll', () => {
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(sync);
    clearTimeout(settle);
    settle = setTimeout(settleToNearest, 180);
  }, { passive: true });

  track.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
      e.preventDefault();
      go(index + (e.key === 'ArrowRight' ? 1 : -1));
    }
  });

  const hold = (on) => {
    holding = on;
    schedule();
  };
  el.addEventListener('pointerenter', (e) => e.pointerType === 'mouse' && hold(true));
  el.addEventListener('pointerleave', (e) => e.pointerType === 'mouse' && hold(false));
  el.addEventListener('focusin', () => hold(true));
  el.addEventListener('focusout', () => hold(false));
  // A swipe means "let me look": stop moving for a while.
  let touchTimer = 0;
  el.addEventListener('touchstart', () => {
    clearTimeout(touchTimer);
    hold(true);
    touchTimer = setTimeout(() => hold(false), 8000);
  }, { passive: true });

  new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    // Stagger neighbouring carousels so they don't move in lockstep.
    if (visible) setTimeout(schedule, (n % 2) * 1800);
    else clearTimeout(timer);
  }, { threshold: 0.6 }).observe(el);
  document.addEventListener('visibilitychange', schedule);

  sync();
  el.classList.add('is-ready');
});

// ---- Read more: the opened card grows, its neighbours keep their height ----
// While pinned (.cards.is-pinned) the grid stops stretching rows, so before the first
// card opens, every card is held at the height it has now. Unpinning waits for the
// closing animation (0.3s in the CSS); otherwise the closing card, still tall, would
// briefly stretch its neighbour.
for (const grid of document.querySelectorAll('.cards')) {
  const cards = [...grid.querySelectorAll('.card')];
  let release = 0;
  const pin = () => {
    clearTimeout(release);
    if (grid.classList.contains('is-pinned')) return;
    cards.forEach((c) => (c.style.minHeight = `${c.offsetHeight}px`));
    grid.classList.add('is-pinned');
  };
  const unpin = () => {
    grid.classList.remove('is-pinned');
    cards.forEach((c) => (c.style.minHeight = ''));
  };
  for (const summary of grid.querySelectorAll('.more-info > summary')) {
    summary.addEventListener('click', pin);
  }
  grid.addEventListener('toggle', () => {
    if (grid.querySelector('.more-info[open]')) return;
    clearTimeout(release);
    release = setTimeout(unpin, 350);
  }, true);
}

// ---- live GitHub star counts (the number in the HTML is the fallback) ----
// GitHub allows 60 unauthenticated requests an hour per IP, so: one request covers all
// of my repos, one per upstream repo, and the counts are kept for six hours.
const starEls = [...document.querySelectorAll('[data-stars]')];
if (starEls.length) {
  const fmt = (n) => (n >= 1000 ? `${(n / 1000).toFixed(1).replace(/\.0$/, '')}k` : String(n));
  const apply = (counts) => {
    for (const el of starEls) {
      const n = counts[el.dataset.stars.toLowerCase()];
      if (typeof n === 'number') el.textContent = fmt(n);
    }
  };
  const TTL = 6 * 60 * 60 * 1000;
  let counts = {};
  try {
    const saved = JSON.parse(localStorage.getItem('stars') || 'null');
    if (saved && Date.now() - saved.at < TTL) counts = saved.counts;
  } catch {}
  apply(counts);

  const getJson = (url) =>
    fetch(url).then((r) => (r.ok ? r.json() : null)).catch(() => null);
  const wanted = new Set(starEls.map((e) => e.dataset.stars.toLowerCase()));
  const missing = [...wanted].filter((repo) => !(repo in counts));
  const mine = missing.some((repo) => repo.startsWith('satyadahal/'));
  const upstream = missing.filter((repo) => !repo.startsWith('satyadahal/'));

  Promise.all([
    mine ? getJson('https://api.github.com/users/SATYADAHAL/repos?per_page=100') : null,
    ...upstream.map((repo) => getJson(`https://api.github.com/repos/${repo}`)),
  ]).then(([own, ...others]) => {
    for (const r of [...(Array.isArray(own) ? own : []), ...others]) {
      if (r && typeof r.stargazers_count === 'number') counts[r.full_name.toLowerCase()] = r.stargazers_count;
    }
    apply(counts);
    try {
      localStorage.setItem('stars', JSON.stringify({ at: Date.now(), counts }));
    } catch {}
  });
}

// ---- AD -> BS converter (write-up page) ----
const input = document.querySelector('#ad-date');
const out = document.querySelector('#bs-out');
if (input && out) {
  const t = todayInNepal();
  const pad = (n) => String(n).padStart(2, '0');
  input.value = `${t.year}-${pad(t.month)}-${pad(t.day)}`;
  const render = () => {
    const [y, m, d] = input.value.split('-').map(Number);
    if (!y || !m || !d) return;
    const bs = toBsDate(y, m, d);
    out.innerHTML = '';
    out.append(formatDevanagari(bs));
    const small = document.createElement('small');
    small.textContent = formatLatin(bs) + (bs.approx ? ' · approx., outside the official table' : '');
    out.append(small);
  };
  input.addEventListener('input', render);
  render();
}
