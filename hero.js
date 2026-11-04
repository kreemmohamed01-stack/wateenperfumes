/* ════════════════════════════════════════════════
   WATEEN PERFUMES — HERO INTERACTIONS
   ════════════════════════════════════════════════ */

(function () {
  'use strict';

  const nav        = document.getElementById('nav');
  const burger     = document.getElementById('burger');
  const drawer     = document.getElementById('drawer');
  const drawerClose= document.getElementById('drawerClose');
  const hero       = document.getElementById('hero');

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ─────────── shared scroll lock ───────────
     the mobile drawer, cart drawer, and search modal can all be triggered
     independently and can end up open at the same time (e.g. open the
     drawer, then search from inside it). Each used to set
     body.style.overflow directly, so closing whichever one closed last
     unlocked scrolling even while another was still open. This tracks how
     many things currently want scroll locked and only releases it once
     none do. */
  let scrollLockCount = 0;
  function lockScroll() {
    scrollLockCount++;
    document.body.style.overflow = 'hidden';
  }
  function unlockScroll() {
    scrollLockCount = Math.max(0, scrollLockCount - 1);
    if (scrollLockCount === 0) document.body.style.overflow = '';
  }
  // The cart drawer and search modal live in a separate IIFE further down
  // this file and call these by bare name, which threw "lockScroll is not
  // defined" and left the page scrollable behind them. Share the same
  // counter rather than giving those a second, competing implementation —
  // the whole point of the count is that it spans every overlay.
  window.__lockScroll = lockScroll;
  window.__unlockScroll = unlockScroll;


  /* ─────────── NAV: glass on scroll + hide/reveal ───────────
     category/product pages have no hero for the nav to float over —
     their nav is always small, fixed and plain white (see category.css /
     product.css), so none of this scroll-driven state applies there. */

  const isPlainNavPage = document.body.classList.contains('cat-page') ||
                         document.body.classList.contains('product-page');

  const STICK_AT  = 40;   // px before the nav detaches and turns to glass
  const HIDE_AT   = 260;  // px before hide-on-scroll-down kicks in

  let lastY  = window.scrollY;
  let ticking = false;
  let scrollEndTimer = null;

  function onScroll() {
    const y = window.scrollY;

    nav.classList.toggle('is-stuck', y > STICK_AT);

    // only hide once we're well past the hero top, and never while the drawer is open
    if (y > HIDE_AT && y > lastY && !drawer.classList.contains('is-open')) {
      nav.classList.add('is-hidden');
    } else {
      nav.classList.remove('is-hidden');
    }

    lastY = y;
    ticking = false;

    // momentum scrolling can end mid-"down" gesture with no further event to
    // correct the nav's state, leaving it stuck hidden — so once scrolling
    // has actually stopped, always bring it back.
    clearTimeout(scrollEndTimer);
    scrollEndTimer = setTimeout(() => {
      nav.classList.remove('is-hidden');
    }, 160);
  }

  if (isPlainNavPage) {
    // never let scrolling touch the nav's classes on these pages
    nav.classList.remove('is-stuck', 'is-hidden');
  } else {
    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(onScroll);
        ticking = true;
      }
    }, { passive: true });

    onScroll();
  }


  /* ─────────── MOBILE DRAWER ─────────── */

  function openDrawer() {
    drawer.classList.add('is-open');
    drawer.setAttribute('aria-hidden', 'false');
    burger.setAttribute('aria-expanded', 'true');
    lockScroll();
  }

  function closeDrawer() {
    drawer.classList.remove('is-open');
    drawer.setAttribute('aria-hidden', 'true');
    burger.setAttribute('aria-expanded', 'false');
    unlockScroll();
  }

  burger.addEventListener('click', openDrawer);
  drawerClose.addEventListener('click', closeDrawer);

  // click the dimmed backdrop (anything outside the panel) to close
  drawer.addEventListener('click', (e) => {
    if (e.target === drawer) closeDrawer();
  });

  drawer.querySelectorAll('.drawer__links a').forEach((link) => {
    link.addEventListener('click', closeDrawer);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('is-open')) closeDrawer();
  });


  /* ─────────── HERO PARALLAX (pointer, desktop only) ─────────── */
  /* category pages have no #hero section, so all of this is skipped there */

  if (hero) {
    const bgWrap = hero.querySelector('.hero__bg');
    const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    if (bgWrap && canHover && !reduceMotion) {
      let tx = 0, ty = 0, cx = 0, cy = 0, raf = null;

      hero.addEventListener('pointermove', (e) => {
        const r = hero.getBoundingClientRect();
        tx = ((e.clientX - r.left) / r.width  - 0.5) * -18; // max 18px drift
        ty = ((e.clientY - r.top)  / r.height - 0.5) * -12;
        if (!raf) raf = requestAnimationFrame(loop);
      });

      hero.addEventListener('pointerleave', () => {
        tx = 0; ty = 0;
        if (!raf) raf = requestAnimationFrame(loop);
      });

      function loop() {
        cx += (tx - cx) * 0.07;
        cy += (ty - cy) * 0.07;
        // the wrapper carries the parallax; the img keeps its own ken-burns
        bgWrap.style.setProperty('--px', cx.toFixed(2) + 'px');
        bgWrap.style.setProperty('--py', cy.toFixed(2) + 'px');

        if (Math.abs(tx - cx) > 0.1 || Math.abs(ty - cy) > 0.1) {
          raf = requestAnimationFrame(loop);
        } else {
          raf = null;
        }
      }
    }


    /* ─────────── HERO SCROLL FADE ─────────── */

    const content = hero.querySelector('.hero__content');

    if (content && !reduceMotion) {
      let cTicking = false;

      window.addEventListener('scroll', () => {
        if (cTicking) return;
        cTicking = true;

        requestAnimationFrame(() => {
          const y = window.scrollY;
          const h = hero.offsetHeight;
          const p = Math.min(y / (h * 0.75), 1);

          content.style.opacity   = String(1 - p);
          content.style.transform = `translateY(${p * 46}px)`;
          cTicking = false;
        });
      }, { passive: true });
    }
  }

})();


/* ════════════════════════════════════════════════
   SECTIONS — reveal, price roll, rails, video
   ════════════════════════════════════════════════ */

(function () {
  'use strict';

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ─────────── scroll reveal ─────────── */

  const revealEls = document.querySelectorAll('.reveal');

  // number each section's direct content blocks so they ease in one by one
  revealEls.forEach((sec) => {
    const wrap = sec.querySelector(':scope > .wrap');
    const kids = wrap ? wrap.children : sec.children;
    let i = 0;
    Array.prototype.forEach.call(kids, (kid) => {
      if (kid.hasAttribute('style') && kid.style.getPropertyValue('--d')) return;
      kid.style.setProperty('--i', i++);
    });
  });

  if (!('IntersectionObserver' in window) || reduce) {
    revealEls.forEach((el) => el.classList.add('is-in'));
  } else {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('is-in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -6% 0px' });

    revealEls.forEach((el) => io.observe(el));
  }


  /* ─────────── page-load entrance (category / product / shop / wishlist) ───────────
     these pages have no hero of their own to carry a load-in, so every
     section marked .pageIn settles in slowly, one after another, right
     after the page opens — not tied to scrolling since it's above the fold. */

  const pageInEls = document.querySelectorAll('.pageIn');
  pageInEls.forEach((el, i) => el.style.setProperty('--i', i));

  if (pageInEls.length) {
    if (reduce) {
      pageInEls.forEach((el) => el.classList.add('is-in'));
    } else {
      // a real, deliberate pause — not just "next frame" — so the opacity:0
      // start state is actually visible for a beat before easing in
      setTimeout(() => {
        pageInEls.forEach((el) => el.classList.add('is-in'));
      }, 200);
    }
  }


  /* ─────────── price roll-up counter ───────────
     Each price spins through random numbers for ~1.2s,
     then settles on its real value. Runs once per element. */

  const rolls = document.querySelectorAll('.roll');

  function runRoll(el) {
    const target = parseInt(el.dataset.value, 10);
    if (isNaN(target)) return;

    // an element can be observed twice (once from the page-load snapshot, once
    // via __wireRolls after its value is filled in), and two concurrent
    // animations on the same node fight over textContent — whichever finishes
    // last wins, which can leave a stale number on screen. Only ever run once.
    if (el.dataset.rolled === '1') return;
    el.dataset.rolled = '1';

    const fmt = (n) => n.toLocaleString('en-US');

    if (reduce) { el.textContent = fmt(target); return; }

    const spinMs = 1200;          // scramble phase
    const settleMs = 600;         // ease into the real number
    const digits = String(target).length;
    const start = performance.now();

    function frame(now) {
      const t = now - start;

      if (t < spinMs) {
        // random number of the same magnitude
        const lo = Math.pow(10, Math.max(digits - 1, 0));
        const hi = Math.pow(10, digits) - 1;
        el.textContent = fmt(Math.floor(lo + Math.random() * (hi - lo)));
        requestAnimationFrame(frame);
      } else if (t < spinMs + settleMs) {
        // ease from a near value up to the target
        const p = (t - spinMs) / settleMs;
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = fmt(Math.round(target * (0.82 + 0.18 * eased)));
        requestAnimationFrame(frame);
      } else {
        el.textContent = fmt(target);
      }
    }
    requestAnimationFrame(frame);
  }

  if ('IntersectionObserver' in window) {
    const ro = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          runRoll(e.target);
          ro.unobserve(e.target);
        }
      });
    }, { threshold: 0.6 });
    rolls.forEach((el) => ro.observe(el));

    // querySelectorAll above is a static snapshot taken at parse time, so
    // .roll elements injected later (e.g. the best-sellers grid, rendered
    // from CATALOG data after this runs) never get observed and stay
    // frozen at their placeholder "0" forever. Expose a hook so any
    // later-injected markup can opt its own .roll spans into the same
    // animation instead of duplicating this logic.
    window.__wireRolls = function (root) {
      (root || document).querySelectorAll('.roll').forEach((el) => ro.observe(el));
    };
  } else {
    rolls.forEach(runRoll);
    window.__wireRolls = function (root) {
      (root || document).querySelectorAll('.roll').forEach(runRoll);
    };
  }


  /* ─────────── size chips ─────────── */

  document.querySelectorAll('.sizes').forEach((group) => {
    group.addEventListener('click', (e) => {
      const btn = e.target.closest('.size');
      if (!btn) return;
      group.querySelectorAll('.size').forEach((b) => b.classList.remove('is-on'));
      btn.classList.add('is-on');
    });
  });


  /* ─────────── wishlist toggle ─────────── */

  document.querySelectorAll('.wish').forEach((btn) => {
    btn.addEventListener('click', () => btn.classList.toggle('is-on'));
  });


  /* ─────────── collection rails ───────────
     one quiet hint per row: click it to nudge the row forward, and it
     fades away once there's nothing left to scroll to. */

  document.querySelectorAll('.col__rail').forEach((rail) => {
    const track = rail.querySelector('.col__track');
    const hint = rail.querySelector('.col__hint');
    if (!track) return;

    const step = () => {
      const item = track.querySelector('.mini');
      if (!item) return track.clientWidth * 0.8;
      const gap = parseFloat(getComputedStyle(track).gap) || 20;
      return (item.getBoundingClientRect().width + gap) * 2;
    };

    if (hint) {
      hint.addEventListener('click', () => {
        const atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 4;
        track.scrollBy({ left: atEnd ? -track.scrollWidth : step(), behavior: 'smooth' });
      });

      const syncHint = () => {
        const atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 4;
        hint.classList.toggle('is-done', atEnd);
      };
      track.addEventListener('scroll', () => requestAnimationFrame(syncHint), { passive: true });
      syncHint();
    }
  });


  /* ─────────── reviews carousel ─────────── */

  const revTrack = document.getElementById('revTrack');
  const revDots  = document.getElementById('revDots');

  if (revTrack && revDots) {
    const prev = document.querySelector('.revrail__nav--prev');
    const next = document.querySelector('.revrail__nav--next');
    const cards = Array.from(revTrack.querySelectorAll('.revcard'));

    // one dot per "page" — how many cards are visible at once decides that
    function perPage() {
      const first = cards[0];
      if (!first) return 1;
      const w = first.getBoundingClientRect().width;
      const gap = parseFloat(getComputedStyle(revTrack).gap) || 0;
      return Math.max(Math.round(revTrack.clientWidth / (w + gap)), 1);
    }

    let pages = 1;

    function buildDots() {
      pages = Math.max(Math.ceil(cards.length / perPage()), 1);
      revDots.innerHTML = '';
      for (let i = 0; i < pages; i++) {
        const dot = document.createElement('i');
        dot.addEventListener('click', () => {
          const first = cards[0];
          const w = first ? first.getBoundingClientRect().width : revTrack.clientWidth;
          const gap = parseFloat(getComputedStyle(revTrack).gap) || 0;
          revTrack.scrollTo({ left: i * perPage() * (w + gap), behavior: 'smooth' });
        });
        revDots.appendChild(dot);
      }
      syncDots();
    }

    function syncDots() {
      const max = revTrack.scrollWidth - revTrack.clientWidth;
      const p = max > 0 ? revTrack.scrollLeft / max : 0;
      const idx = Math.min(Math.round(p * (pages - 1)), pages - 1);
      Array.from(revDots.children).forEach((d, i) => d.classList.toggle('is-on', i === idx));
    }

    function step() {
      const first = cards[0];
      if (!first) return revTrack.clientWidth * 0.9;
      const gap = parseFloat(getComputedStyle(revTrack).gap) || 0;
      return (first.getBoundingClientRect().width + gap) * perPage();
    }

    if (prev) prev.addEventListener('click', () => revTrack.scrollBy({ left: -step(), behavior: 'smooth' }));
    if (next) next.addEventListener('click', () => revTrack.scrollBy({ left: step(), behavior: 'smooth' }));

    revTrack.addEventListener('scroll', () => requestAnimationFrame(syncDots), { passive: true });
    window.addEventListener('resize', buildDots);
    buildDots();
  }


  /* ─────────── brand rail + progress ─────────── */

  const brandRail = document.getElementById('brandRail');
  const brandBar = document.getElementById('brandBar');
  const brandCount = document.getElementById('brandCount');

  if (brandRail) {
    const prev = document.querySelector('.rail__nav--prev');
    const next = document.querySelector('.rail__nav--next');

    const step = () => {
      const chip = brandRail.querySelector('.brandchip');
      return chip ? chip.getBoundingClientRect().width * 2 : brandRail.clientWidth * 0.5;
    };

    if (prev) prev.addEventListener('click', () => brandRail.scrollBy({ left: -step(), behavior: 'smooth' }));
    if (next) next.addEventListener('click', () => brandRail.scrollBy({ left: step(), behavior: 'smooth' }));

    const total = brandRail.querySelectorAll('.brandchip').length;

    function sync() {
      const max = brandRail.scrollWidth - brandRail.clientWidth;
      const p = max > 0 ? brandRail.scrollLeft / max : 0;

      if (brandBar) {
        // the bar is 24% wide and slides across the remaining 76%
        brandBar.style.transform = `translateX(${p * (100 / 0.24 - 100)}%)`;
      }
      if (brandCount) {
        const per = Math.max(Math.round(brandRail.clientWidth / (brandRail.scrollWidth / total)), 1);
        const pages = Math.max(total - per + 1, 1);
        const idx = Math.min(Math.round(p * (pages - 1)) + 1, pages);
        brandCount.textContent = String(idx).padStart(2, '0');
      }
    }

    brandRail.addEventListener('scroll', () => requestAnimationFrame(sync), { passive: true });
    window.addEventListener('resize', sync);
    sync();
  }


  /* ─────────── story video ───────────
     Plays by itself on loop (muted, as autoplay policies require).
     The button toggles sound; WATCH THE STORY scrolls to it and unmutes. */

  const player = document.querySelector('.story__player');
  const video = document.getElementById('storyVideo');
  const soundBtn = document.getElementById('soundBtn');
  const watchBtn = document.getElementById('watchBtn');

  if (video && player) {
    player.classList.add('is-playing');

    // some browsers ignore the attribute until a script asks
    const tryPlay = () => {
      const p = video.play();
      if (p && p.catch) p.catch(() => {});
    };
    // The video is preload="none", so nothing downloads until it's first
    // played — which now only happens once it scrolls into view, keeping its
    // ~750KB from competing with the hero image and catalog on first load.
    // Also pauses off-screen so it never burns battery in the background.
    if ('IntersectionObserver' in window) {
      const vo = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) tryPlay();
          else video.pause();
        });
      }, { threshold: 0.25 });
      vo.observe(player);
    } else {
      tryPlay();
    }

    function setSound(on) {
      video.muted = !on;
      player.classList.toggle('is-loud', on);
      if (soundBtn) {
        soundBtn.setAttribute('aria-pressed', String(on));
        soundBtn.setAttribute('aria-label', on ? 'Mute video' : 'Unmute video');
      }
    }

    if (soundBtn) {
      soundBtn.addEventListener('click', () => {
        setSound(video.muted);
        tryPlay();
      });
    }

    if (watchBtn) {
      watchBtn.addEventListener('click', (e) => {
        e.preventDefault();
        player.scrollIntoView({ behavior: 'smooth', block: 'center' });
        setTimeout(() => { setSound(true); tryPlay(); }, 500);
      });
    }
  }

})();


/* ════════════════════════════════════════════════
   CART DRAWER + SEARCH MODAL
   (shared across every page — index & category pages alike)
   ════════════════════════════════════════════════ */

// This is the one IIFE in this file that actually reads window.CATALOG, so
// it's the only one that needs to wait for site-data.js's window.__dataReady
// first. That promise never rejects and always settles (site-data.js has its
// own timeout fallback), so this always runs — on a slow/flaky connection it
// just starts a little later, rather than the cart/wishlist/search/best-
// sellers grid it defines going dark the way it did the last time this ran
// conditionally on a fetch succeeding. site-data.js loads immediately before
// this script tag, so __dataReady is guaranteed to already exist here.
(window.__dataReady || Promise.resolve()).then(function () {
  'use strict';

  // shared catalog — defined in catalog.js, loaded before this file
  var CATALOG = (typeof window !== 'undefined' && window.CATALOG) || [];

  var fmt = function (n) { return n.toLocaleString('en-US'); };

  /* ---------- homepage best-sellers grid: rendered live from CATALOG,
     never hand-authored, so price/name/image can never drift from the
     real product data in the database ---------- */
  (function renderBestSellers() {
    var grid = document.getElementById('bestSellersGrid');
    if (!grid) return;
    var items = CATALOG.filter(function (p) { return p.bestSeller; }).slice(0, 8);
    grid.innerHTML = items.map(function (p, i) {
      var onSale = p.compareAtPrice && Number(p.compareAtPrice) > Number(p.price);
      var isLow = !!p.isLowStock;
      var cornerBadge = isLow
        ? '<span class="card__badge card__badge--low" style="left:auto;right:10px;top:auto;bottom:10px">' + t('LOW STOCK') + '</span>'
        : (onSale ? '<span class="card__badge card__badge--sale" style="top:auto;bottom:10px">' + t('SALE') + '</span>' : '');
      var priceHtml = onSale
        ? '<span class="card__priceNow">' + t('EGP') + ' <span class="roll" data-value="' + p.price + '">0</span></span><span class="card__priceWas">' + t('EGP') + ' ' + Number(p.compareAtPrice).toLocaleString('en-US') + '</span>'
        : t('EGP') + ' <span class="roll" data-value="' + p.price + '">0</span>';
      return (
        '<article class="card" style="--d:' + (i % 4) + '" data-id="' + p.id + '">' +
          '<div class="card__media">' +
            '<span class="card__badge">' + t('BEST SELLER') + '</span>' +
            cornerBadge +
            '<img src="' + p.img + '" alt="' + pName(p) + '" loading="lazy">' +
          '</div>' +
          '<p class="card__brand">' + pBrand(p) + '</p>' +
          '<h3 class="card__name">' + pName(p) + '</h3>' +
          '<p class="card__type">' + t(p.type) + '</p>' +
          '<p class="card__price' + (onSale ? ' card__price--sale' : '') + '">' + priceHtml + '</p>' +
          '<div class="card__buy">' +
            '<button class="add">' +
              '<span class="add__fill"></span>' +
              '<span class="add__label">' +
                '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">' +
                  '<path d="M4.5 7.5h15l-1.2 12.2a1.6 1.6 0 0 1-1.6 1.4H7.3a1.6 1.6 0 0 1-1.6-1.4L4.5 7.5Z" stroke-linejoin="round"/>' +
                  '<path d="M8.8 10V6.6a3.2 3.2 0 0 1 6.4 0V10" stroke-linecap="round"/>' +
                '</svg>' + t('ADD TO CART') + '</span>' +
            '</button>' +
            '<button class="wish" aria-label="Add to wishlist">' +
              '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4">' +
                '<path d="M12 20.4 4.6 13a4.6 4.6 0 0 1 6.5-6.5l.9.9.9-.9A4.6 4.6 0 0 1 19.4 13Z" stroke-linejoin="round"/>' +
              '</svg>' +
            '</button>' +
          '</div>' +
        '</article>'
      );
    }).join('');
    // these .roll spans were injected after hero.js's own roll-animation
    // setup took its one-time querySelectorAll snapshot, so they'd never
    // animate (or even show their real number) without this
    if (window.__wireRolls) window.__wireRolls(grid);
  })();

  /* ---------- cart state (persisted so checkout.html can read it) ---------- */

  var CART_KEY = 'wateen_cart';

  var cart = (function () {          // [{ id, qty }]
    try {
      var saved = JSON.parse(localStorage.getItem(CART_KEY));
      return Array.isArray(saved) ? saved : [];
    } catch (e) { return []; }       // private mode / blocked storage
  })();

  function saveCart() {
    try { localStorage.setItem(CART_KEY, JSON.stringify(cart)); } catch (e) {}
  }

  function findProduct(id) {
    for (var i = 0; i < CATALOG.length; i++) if (CATALOG[i].id === id) return CATALOG[i];
    return null;
  }

  // Meta Pixel payload for one product — content id is the DB id, matching
  // what the server reports on Purchase (see server/lib/meta-capi.js)
  function metaProductData(p, qty) {
    qty = qty || 1;
    var cid = String(p.dbId || p.id);
    return {
      content_ids: [cid], content_type: 'product', content_name: p.name,
      content_category: p.cat || undefined,
      contents: [{ id: cid, quantity: qty }],
      value: (Number(p.price) || 0) * qty, currency: 'EGP'
    };
  }

  function addToCart(id, qty) {
    qty = qty || 1;
    var line = null;
    for (var i = 0; i < cart.length; i++) if (cart[i].id === id) line = cart[i];
    if (line) line.qty += qty;
    else cart.push({ id: id, qty: qty });
    renderCart();
    var added = findProduct(id);
    if (added && window.wmTrack) window.wmTrack('AddToCart', metaProductData(added, qty));
  }

  function setQty(id, qty) {
    for (var i = 0; i < cart.length; i++) {
      if (cart[i].id === id) {
        if (qty <= 0) cart.splice(i, 1);
        else cart[i].qty = qty;
        break;
      }
    }
    renderCart();
  }

  function removeFromCart(id) {
    cart = cart.filter(function (l) { return l.id !== id; });
    renderCart();
  }

  var FREE_SHIP_AT = 1000;
  var SHIP_FEE = 90;

  function renderCart() {
    saveCart();   // every mutation routes through here, so this is the one hook

    var itemsEl = document.getElementById('cartItems');
    var emptyEl = document.getElementById('cartEmpty');
    var footEl  = document.getElementById('cartFoot');
    if (!itemsEl) return;

    var subtotal = 0, count = 0;
    cart.forEach(function (line) {
      var p = findProduct(line.id);
      if (p) { subtotal += p.price * line.qty; count += line.qty; }
    });

    // badges
    ['cartCount', 'cartCountMob', 'drawerCartCount'].forEach(function (id) {
      var el = document.getElementById(id);
      if (el) el.textContent = String(count);
    });
    var headCount = document.getElementById('cartHeadCount');
    if (headCount) headCount.textContent = '(' + count + ')';

    if (count === 0) {
      itemsEl.innerHTML = '';
      itemsEl.hidden = true;
      if (emptyEl) emptyEl.hidden = false;
      if (footEl) footEl.hidden = true;
      var shipBlock = document.querySelector('.cartd__ship');
      if (shipBlock) shipBlock.hidden = true;
      return;
    }

    itemsEl.hidden = false;
    if (emptyEl) emptyEl.hidden = true;
    if (footEl) footEl.hidden = false;
    var shipBlockOn = document.querySelector('.cartd__ship');
    if (shipBlockOn) shipBlockOn.hidden = true;   // no free-shipping threshold (see below)

    itemsEl.innerHTML = cart.map(function (line) {
      var p = findProduct(line.id);
      if (!p) return '';
      return (
        '<div class="cartd__item" data-id="' + p.id + '">' +
          '<div class="cartd__itemImg"><img src="' + p.img + '" alt="' + pName(p) + '"></div>' +
          '<div class="cartd__itemInfo">' +
            '<b>' + pBrand(p) + '</b>' +
            '<i>' + pName(p) + '</i>' +
            '<i>' + t(p.type) + ' &middot; ' + t(p.size) + '</i>' +
            '<div class="cartd__qty">' +
              '<button type="button" data-act="dec" aria-label="Decrease quantity">&minus;</button>' +
              '<span>' + line.qty + '</span>' +
              '<button type="button" data-act="inc" aria-label="Increase quantity">+</button>' +
            '</div>' +
          '</div>' +
          '<div>' +
            '<button class="cartd__itemRemove" data-act="remove" aria-label="Remove item">' +
              '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M6 6l12 12M18 6L6 18" stroke-linecap="round"/></svg>' +
            '</button>' +
            '<span class="cartd__itemPrice">' + fmt(p.price * line.qty) + ' ' + t('EGP') + '</span>' +
          '</div>' +
        '</div>'
      );
    }).join('');

    // Shipping follows the same rules as checkout and the server (orders.js):
    // a flat fee by governorate, watches free when that's switched on. There is
    // no free-shipping threshold there, so the drawer no longer promises one
    // (it used to say "You've unlocked free shipping!" over 1,000 EGP and then
    // checkout charged shipping anyway). The governorate isn't known yet, so
    // the fee is shown as "calculated at checkout" unless the cart is all
    // watches and watches ship free.
    var S = window.SITE_SETTINGS || {};
    var watchesFree = S.watchesFreeShipping !== false;
    var allWatches = cart.length > 0 && cart.every(function (l) {
      var p = findProduct(l.id);
      return p && (p.cat === 'watches' || (p.extraCats || []).indexOf('watches') !== -1);
    });
    var shipping = (allWatches && watchesFree) ? 0 : null;   // null = depends on governorate
    var shipBlockEl = document.querySelector('.cartd__ship');
    if (shipBlockEl) shipBlockEl.hidden = true;

    var subEl = document.getElementById('cartSubtotal');
    var feeEl = document.getElementById('cartShippingFee');
    var totalEl = document.getElementById('cartTotal');
    if (subEl) subEl.textContent = fmt(subtotal) + ' ' + t('EGP');
    var shipText = function () { return shipping === 0 ? t('FREE') : t('Calculated at checkout'); };
    if (feeEl) feeEl.textContent = shipText();
    var discount = 0;
    if (cartPromo) {
      discount = cartPromo.discount || 0;
      if (cartPromo.freeShipping) shipping = 0;
      if (feeEl) feeEl.textContent = shipText();
    }
    var discEl = document.getElementById('cartDiscount');
    if (discEl) {
      discEl.hidden = !discount;
      discEl.querySelector('b').textContent = '-' + fmt(discount) + ' ' + t('EGP');
    }
    if (totalEl) totalEl.textContent = fmt(Math.max(0, subtotal - discount) + (shipping || 0)) + ' ' + t('EGP') + (shipping === null ? ' + ' + t('shipping') : '');

    // the discount was worked out for the old cart — check the code again
    var sig = JSON.stringify(cart);
    if (cartPromo && sig !== promoCartSig) { promoCartSig = sig; applyPromo(cartPromo.code, true); }
  }

  /* ---------- discount code in the cart drawer ----------
     The "Add a discount code" button used to have no handler at all. It now
     opens a small field, checks the code with the same endpoint checkout
     uses, and remembers it (PROMO_KEY) so checkout applies it automatically. */
  var PROMO_KEY = 'wateen_promo';
  var cartPromo = null;      // { code, discount, freeShipping, label }
  var promoCartSig = null;

  function cartSubtotal() {
    return cart.reduce(function (s, l) { var p = findProduct(l.id); return s + (p ? p.price * l.qty : 0); }, 0);
  }

  function promoMsg(text, ok) {
    var m = document.getElementById('cartPromoMsg');
    if (!m) return;
    m.textContent = text || '';
    m.style.color = ok ? '#3c7a3c' : '#b23b3b';
  }

  function applyPromo(code, silent) {
    code = (code || '').trim().toUpperCase();
    if (!code) { promoMsg(t('Enter a code first.')); return; }
    var productIds = cart.map(function (l) { var p = findProduct(l.id); return p ? p.dbId : null; }).filter(Boolean);
    fetch('/api/public/coupons/validate', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code: code, subtotal: cartSubtotal(), productIds: productIds })
    })
      .then(function (res) { return res.json().then(function (d) { return { ok: res.ok, data: d }; }); })
      .then(function (r) {
        if (!r.ok) {
          cartPromo = null;
          try { localStorage.removeItem(PROMO_KEY); } catch (e) {}
          promoMsg(r.data.error || t('That code is not valid.'));
        } else {
          cartPromo = { code: r.data.code, discount: r.data.discount, freeShipping: r.data.freeShipping, label: r.data.label };
          try { localStorage.setItem(PROMO_KEY, cartPromo.code); } catch (e) {}
          if (!silent) promoMsg(cartPromo.code + ' ' + t('applied —') + ' ' + cartPromo.label + '.', true);
        }
        promoCartSig = JSON.stringify(cart);
        renderCart();
      })
      .catch(function () { if (!silent) promoMsg(t('Could not check that code — try again.')); });
  }

  (function wirePromo() {
    var btn = document.querySelector('.cartd__promo');
    if (!btn) return;

    var box = document.createElement('div');
    box.hidden = true;
    box.style.cssText = 'margin:8px 0 12px';
    box.innerHTML =
      '<div style="display:flex;gap:8px">' +
        '<input id="cartPromoInput" type="text" autocomplete="off" placeholder="' + t('Enter code') + '" ' +
          'style="flex:1;min-width:0;padding:10px 12px;border:1px solid rgba(0,0,0,.2);background:transparent;font:inherit;text-transform:uppercase">' +
        '<button type="button" id="cartPromoApply" style="padding:10px 16px;border:0;background:#1a1a1a;color:#fff;font:inherit;cursor:pointer">' + t('APPLY') + '</button>' +
      '</div>' +
      '<em id="cartPromoMsg" style="display:block;margin-top:6px;font-size:12px;font-style:normal"></em>';
    btn.parentNode.insertBefore(box, btn.nextSibling);

    var input = box.querySelector('#cartPromoInput');
    btn.addEventListener('click', function () {
      box.hidden = !box.hidden;
      if (!box.hidden) input.focus();
    });
    box.querySelector('#cartPromoApply').addEventListener('click', function () { applyPromo(input.value); });
    input.addEventListener('keydown', function (e) { if (e.key === 'Enter') { e.preventDefault(); applyPromo(input.value); } });

    // discount line above the total
    var totals = document.querySelector('.cartd__totals');
    if (totals) {
      var p = document.createElement('p');
      p.id = 'cartDiscount';
      p.hidden = true;
      p.innerHTML = '<span>' + t('Discount') + '</span><b>0</b>';
      totals.appendChild(p);
    }

    var saved = null;
    try { saved = localStorage.getItem(PROMO_KEY); } catch (e) {}
    if (saved && cart.length) { input.value = saved; applyPromo(saved, true); }
  })();

  var itemsRoot = document.getElementById('cartItems');
  if (itemsRoot) {
    itemsRoot.addEventListener('click', function (e) {
      var row = e.target.closest('.cartd__item');
      if (!row) return;
      var id = row.getAttribute('data-id');
      var line = null;
      for (var i = 0; i < cart.length; i++) if (cart[i].id === id) line = cart[i];
      if (!line) return;

      var act = e.target.closest('[data-act]');
      if (!act) return;
      if (act.dataset.act === 'inc') setQty(id, line.qty + 1);
      else if (act.dataset.act === 'dec') setQty(id, line.qty - 1);
      else if (act.dataset.act === 'remove') removeFromCart(id);
    });
  }

  /* ---------- cart drawer open/close ---------- */

  var cartDrawer = document.getElementById('cartDrawer');
  var cartClose  = document.getElementById('cartClose');

  function openCart() {
    if (!cartDrawer) return;
    cartDrawer.classList.add('is-open');
    cartDrawer.setAttribute('aria-hidden', 'false');
    window.__lockScroll();
  }
  function closeCart() {
    if (!cartDrawer) return;
    cartDrawer.classList.remove('is-open');
    cartDrawer.setAttribute('aria-hidden', 'true');
    window.__unlockScroll();
  }

  ['cartBtn', 'cartBtnMob', 'drawerCartBtn'].forEach(function (id) {
    var btn = document.getElementById(id);
    if (btn) btn.addEventListener('click', function (e) {
      e.preventDefault();
      openCart();
    });
  });
  if (cartClose) cartClose.addEventListener('click', closeCart);
  if (cartDrawer) cartDrawer.addEventListener('click', function (e) { if (e.target === cartDrawer) closeCart(); });

  var cartEmptyShop = document.getElementById('cartEmptyShop');
  var cartContinue  = document.getElementById('cartContinue');
  if (cartEmptyShop) cartEmptyShop.addEventListener('click', closeCart);
  if (cartContinue) cartContinue.addEventListener('click', closeCart);

  // the cart is already saved on every change, so checkout just needs the trip
  var cartCheckout = document.getElementById('cartCheckout');
  if (cartCheckout) cartCheckout.addEventListener('click', function () {
    if (!cart.length) return;
    saveCart();
    window.location.href = 'checkout.html';
  });

  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    if (cartDrawer && cartDrawer.classList.contains('is-open')) closeCart();
  });

  // wire every "ADD TO CART" button on the page (best-sellers grid, category
  // grids, product page, and any grid built later by a page's own script,
  // like shop.html's filtered results) into the shared cart — delegated on
  // document so it also catches buttons injected after this script runs
  document.addEventListener('click', function (e) {
    var btn = e.target.closest('.add');
    if (!btn) return;

    // a card that carries an id directly (shop.html, wishlist.html) skips
    // the name lookup entirely
    var directId = btn.dataset.add;
    if (directId) { addToCart(directId, 1); openCart(); return; }

    var card = btn.closest('.card, .pd__info, .wlCard');
    var nameEl = card ? card.querySelector('.card__name, .pd__name') : null;
    var name = nameEl ? nameEl.textContent.trim() : null;
    // cards show the Arabic name when the site is in Arabic, so match on
    // either language rather than only the English name
    var product = name ? CATALOG.filter(function (p) {
      return p.name === name || p.nameAr === name;
    })[0] : null;
    if (product) addToCart(product.id, 1);
    else if (CATALOG[0]) addToCart(CATALOG[0].id, 1); // fallback demo product
    openCart();
  });

  renderCart();

  // The cart lives in localStorage, but this page keeps its own in-memory
  // copy. When the browser restores a page from the back/forward cache (or
  // another tab changes the cart), that copy is stale — the drawer showed
  // "your cart is empty" for a cart that had items, and the next add would
  // overwrite the saved cart with the stale one. Re-read it whenever the
  // page is shown again or the saved cart changes elsewhere.
  function reloadCart() {
    try {
      var saved = JSON.parse(localStorage.getItem(CART_KEY));
      cart = Array.isArray(saved) ? saved : [];
    } catch (e) { return; }
    renderCart();
  }
  window.addEventListener('pageshow', function (e) { if (e.persisted) reloadCart(); });
  window.addEventListener('storage', function (e) { if (e.key === CART_KEY) reloadCart(); });
  document.addEventListener('visibilitychange', function () { if (!document.hidden) reloadCart(); });


  /* ─────────── make every product card/rail-item open its product page ───────────
     matched by name against the shared catalog, so this works on the
     best-sellers grid, every category grid, and the collection rails —
     without disturbing the size/wishlist/add-to-cart controls inside a card. */

  function slugify(text) {
    return text.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  }

  // matches on the English or Arabic name, since which one is on screen
  // depends on the active language
  function findByName(name) {
    if (!name) return null;
    var clean = name.trim().toLowerCase();
    for (var i = 0; i < CATALOG.length; i++) {
      if (CATALOG[i].name.toLowerCase() === clean) return CATALOG[i];
      if (CATALOG[i].nameAr && CATALOG[i].nameAr.trim() === name.trim()) return CATALOG[i];
    }
    // loose match for rail links whose text carries extra words ("Shuhrah EDP")
    for (var j = 0; j < CATALOG.length; j++) {
      if (clean.indexOf(CATALOG[j].name.toLowerCase()) !== -1) return CATALOG[j];
    }
    return null;
  }

  // don't hijack a click that started on one of the card's own controls
  var STOP_SELECTOR = '.add, .wish, .card__wish, .pd__wish, .size, .sizes, .card__buy';

  document.querySelectorAll('.card').forEach(function (card) {
    if (card.closest('.pd__related')) return; // related cards already link per-item (built in product.html)
    var nameEl = card.querySelector('.card__name');
    var product = nameEl ? findByName(nameEl.textContent) : null;
    if (!product) return;

    card.classList.add('is-clickable');
    card.addEventListener('click', function (e) {
      if (e.target.closest(STOP_SELECTOR)) return;
      window.location.href = 'product.html?id=' + product.id;
    });
  });

  document.querySelectorAll('.mini').forEach(function (mini) {
    var nameEl = mini.querySelector('em');
    var product = nameEl ? findByName(nameEl.textContent) : null;
    if (!product) return;
    mini.setAttribute('href', 'product.html?id=' + product.id);
    // the brand/name/price printed in this rail card is hand-authored
    // English markup — always override with the product's real live data
    // (in whichever language is active) so it can never drift from what
    // the category page / checkout actually charges, and reads correctly
    // when the site is switched to Arabic
    var brandEl = mini.querySelector('b');
    if (brandEl) brandEl.textContent = pBrand(product);
    nameEl.textContent = pName(product);
    var priceEl = mini.querySelector('i');
    if (priceEl) priceEl.textContent = t('EGP') + ' ' + Number(product.price).toLocaleString('en-US');
  });


  /* ─────────── wishlist (persisted in localStorage — shared across every page) ─────────── */

  var WISH_KEY = 'wateen_wishlist';

  function getWishlist() {
    try {
      var raw = window.localStorage.getItem(WISH_KEY);
      var ids = raw ? JSON.parse(raw) : [];
      return Array.isArray(ids) ? ids : [];
    } catch (e) { return []; }
  }
  function saveWishlist(ids) {
    try { window.localStorage.setItem(WISH_KEY, JSON.stringify(ids)); } catch (e) {}
  }
  function isWished(id) { return getWishlist().indexOf(id) !== -1; }
  function toggleWishlist(id) {
    var ids = getWishlist();
    var i = ids.indexOf(id);
    if (i === -1) ids.push(id); else ids.splice(i, 1);
    saveWishlist(ids);
    syncWishCount();
    var wished = i === -1 ? findProduct(id) : null;
    if (wished && window.wmTrack) window.wmTrack('AddToWishlist', metaProductData(wished, 1));
    return i === -1; // true = now wished
  }

  function syncWishCount() {
    var n = getWishlist().length;
    ['wishCount', 'wishCountMob', 'drawerWishCount'].forEach(function (id) {
      var el = document.getElementById(id);
      if (el) el.textContent = String(n);
    });
  }

  // resolve the product behind a wish button the same way .add buttons do —
  // by the name printed on its card — then flip the persisted heart state
  document.querySelectorAll('.wish, .card__wish, .pd__wish').forEach(function (btn) {
    var card = btn.closest('.card, .pd__info');
    var nameEl = card ? card.querySelector('.card__name, .pd__name') : null;
    var name = nameEl ? nameEl.textContent.trim() : null;
    var product = name ? findByName(name) : null;

    if (product && isWished(product.id)) btn.classList.add('is-on');

    btn.addEventListener('click', function (e) {
      e.stopPropagation(); // never trigger the card's own "open product" click
      if (!product) { btn.classList.toggle('is-on'); syncWishCount(); return; }
      var nowOn = toggleWishlist(product.id);
      btn.classList.toggle('is-on', nowOn);
    });
  });

  syncWishCount();


  /* ═══════════════ SEARCH MODAL ═══════════════ */

  var searchModal = document.getElementById('searchModal');
  var searchInput = document.getElementById('searchInput');
  var searchResults = document.getElementById('searchResults');
  var searchClear = document.getElementById('searchClear');

  function openSearch() {
    if (!searchModal) return;
    searchModal.classList.add('is-open');
    searchModal.setAttribute('aria-hidden', 'false');
    window.__lockScroll();
    runSearch();
    setTimeout(function () { if (searchInput) searchInput.focus(); }, 250);
  }
  function closeSearch() {
    if (!searchModal) return;
    searchModal.classList.remove('is-open');
    searchModal.setAttribute('aria-hidden', 'true');
    window.__unlockScroll();
  }

  ['searchBtn', 'searchBtnMob'].forEach(function (id) {
    var btn = document.getElementById(id);
    if (btn) btn.addEventListener('click', function (e) { e.preventDefault(); openSearch(); });
  });
  var searchClose = document.getElementById('searchClose');
  if (searchClose) searchClose.addEventListener('click', closeSearch);
  if (searchModal) searchModal.addEventListener('click', function (e) { if (e.target === searchModal) closeSearch(); });
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    if (searchModal && searchModal.classList.contains('is-open')) closeSearch();
  });

  function renderResults(list) {
    if (!searchResults) return;
    if (list.length === 0) {
      searchResults.innerHTML = '<p class="searchm__empty">No products found. Try a different search.</p>';
      return;
    }
    searchResults.innerHTML =
      '<p class="searchm__resultsTitle">PRODUCTS (' + list.length + ')</p>' +
      list.map(function (p) {
        return (
          '<div class="searchm__row" data-id="' + p.id + '" style="cursor:pointer">' +
            '<div class="searchm__rowImg"><img src="' + p.img + '" alt="' + pName(p) + '" loading="lazy" decoding="async"></div>' +
            '<div class="searchm__rowInfo">' +
              '<b>' + pBrand(p) + '</b>' +
              '<i>' + pName(p) + ' &middot; ' + t(p.type) + '</i>' +
              '<em>' + p.rating + ' (' + p.reviews + ')</em>' +
            '</div>' +
            '<span class="searchm__rowPrice">' + fmt(p.price) + ' EGP</span>' +
            '<button class="searchm__rowAdd" data-id="' + p.id + '">ADD TO CART</button>' +
            '<button class="searchm__rowWish' + (isWished(p.id) ? ' is-on' : '') + '" data-wish="' + p.id + '" aria-label="Add to wishlist">' +
              '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 20.4 4.6 13a4.6 4.6 0 0 1 6.5-6.5l.9.9.9-.9A4.6 4.6 0 0 1 19.4 13Z" stroke-linejoin="round"/></svg>' +
            '</button>' +
          '</div>'
        );
      }).join('');

    // clicking a result (but not its Add-to-cart/wishlist buttons) opens the product
    searchResults.querySelectorAll('.searchm__row').forEach(function (row) {
      row.addEventListener('click', function (e) {
        if (e.target.closest('.searchm__rowAdd, .searchm__rowWish')) return;
        window.location.href = 'product.html?id=' + row.dataset.id;
      });
    });
  }

  function runSearch() {
    var q = (searchInput && searchInput.value || '').trim().toLowerCase();
    if (searchClear) searchClear.hidden = q.length === 0;

    var list = CATALOG;
    if (q) {
      // rank so the product actually being searched for surfaces first:
      // an exact/near match on its own name outranks a match that only
      // hit on brand, category or scent family — those still show, just
      // lower, instead of mixing in at whatever order CATALOG happens to be
      list = CATALOG
        .map(function (p) {
          var name = (p.name || '').toLowerCase();
          var nameAr = (p.nameAr || '').toLowerCase();
          var rank;
          if (name === q || nameAr === q) rank = 0;
          else if (name.indexOf(q) === 0 || nameAr.indexOf(q) === 0) rank = 1;
          else if (name.indexOf(q) !== -1 || nameAr.indexOf(q) !== -1) rank = 2;
          else {
            var rest = [p.brand, p.cat, p.brandAr, p.family, p.type]
              .filter(Boolean).join(' ').toLowerCase();
            rank = rest.indexOf(q) !== -1 ? 3 : -1;
          }
          return { p: p, rank: rank };
        })
        .filter(function (r) { return r.rank !== -1; })
        .sort(function (a, b) { return a.rank - b.rank; })
        .map(function (r) { return r.p; });
    }
    renderResults(list);

    // report the search to Meta once the shopper stops typing, not per keystroke
    clearTimeout(searchTrackTimer);
    if (q.length >= 2 && window.wmTrack) {
      searchTrackTimer = setTimeout(function () {
        window.wmTrack('Search', { search_string: q, content_ids: list.slice(0, 10).map(function (p) { return String(p.dbId || p.id); }) });
      }, 1500);
    }
  }
  var searchTrackTimer = null;

  if (searchInput) searchInput.addEventListener('input', runSearch);
  if (searchClear) searchClear.addEventListener('click', function () {
    searchInput.value = '';
    runSearch();
    searchInput.focus();
  });

  if (searchResults) {
    searchResults.addEventListener('click', function (e) {
      var addBtn = e.target.closest('.searchm__rowAdd');
      if (addBtn) {
        addToCart(addBtn.dataset.id, 1);
        addBtn.textContent = t('ADDED ✓');
        setTimeout(function () { addBtn.textContent = t('ADD TO CART'); }, 1200);
        return;
      }
      var wishBtn = e.target.closest('.searchm__rowWish');
      if (wishBtn) {
        var nowOn = toggleWishlist(wishBtn.dataset.wish);
        wishBtn.classList.toggle('is-on', nowOn);
      }
    });
  }

  var searchTabs = document.querySelectorAll('.searchm__tabs button');
  searchTabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      searchTabs.forEach(function (t) { t.classList.remove('is-active'); });
      tab.classList.add('is-active');
      // category/brand/product tabs all read from the same small catalog,
      // so for now every tab shows the matching product list
      runSearch();
    });
  });

});


/* ════════════════════════════════════════════════
   BACK BUTTON
   Every page but the homepage carries a .backBtn — it
   returns to wherever the visitor came from (real browser
   history), and only falls back to the homepage when
   there's nowhere to go back to (arrived via a direct link
   or a new tab).
   ════════════════════════════════════════════════ */

(function () {
  'use strict';

  document.querySelectorAll('.backBtn').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      // came from another page on this site within this tab — go back to it
      if (window.history.length > 1 && document.referrer.indexOf(window.location.origin) === 0) {
        e.preventDefault();
        window.history.back();
      }
      // otherwise let the href (index.html) do its normal thing
    });
  });
})();
