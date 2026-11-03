/* ════════════════════════════════════════════════
   WATEEN PERFUMES — CHECKOUT
   Reads the cart saved by hero.js, renders the summary,
   validates the form, and confirms the order.
   ════════════════════════════════════════════════ */
// Waits for site-data.js's window.__dataReady first — see the matching note
// in hero.js. That promise never rejects and always settles, so this always
// runs; it just starts once window.CATALOG/SITE_SETTINGS are real instead of
// possibly reading them empty before an async fetch has landed.
(window.__dataReady || Promise.resolve()).then(function () {
  'use strict';

  var CATALOG  = (typeof window !== 'undefined' && window.CATALOG) || [];
  var CART_KEY = 'wateen_cart';
  var SETTINGS = (typeof window !== 'undefined' && window.SITE_SETTINGS) || {};

  // watches ship free; every other product (perfumes) ships at a flat rate
  // that varies by governorate — see shipping_rates_by_governorate in Settings.
  var GOV_RATES    = SETTINGS.shippingRatesByGovernorate || {};
  var DEFAULT_SHIP = SETTINGS.defaultShippingFee || 80;
  // toggled from the dashboard's Shipping page; defaults on when unset
  var WATCHES_FREE = SETTINGS.watchesFreeShipping !== false;

  function isWatch(p) {
    return p && (p.cat === 'watches' || (p.extraCats || []).indexOf('watches') !== -1);
  }

  // the perfume shipping fee for whatever governorate is currently selected
  function perfumeShippingFee() {
    var gov = ($('coGov') && $('coGov').value) || '';
    if (gov && GOV_RATES[gov] != null) return Number(GOV_RATES[gov]);
    return Number(DEFAULT_SHIP);
  }

  var fmt = function (n) { return Math.round(n).toLocaleString('en-US'); };
  var $   = function (id) { return document.getElementById(id); };

  function findProduct(id) {
    for (var i = 0; i < CATALOG.length; i++) if (CATALOG[i].id === id) return CATALOG[i];
    return null;
  }

  /* ---------- cart state ---------- */

  var cart = (function () {
    try {
      var saved = JSON.parse(localStorage.getItem(CART_KEY));
      return Array.isArray(saved) ? saved : [];
    } catch (e) { return []; }
  })();

  function saveCart() {
    try { localStorage.setItem(CART_KEY, JSON.stringify(cart)); } catch (e) {}
  }

  var promo = null;   // the applied discount, once a valid code is entered

  /* ---------- render: line items ---------- */

  function renderItems() {
    var wrap = $('coItems');
    if (!wrap) return;

    if (!cart.length) {
      wrap.innerHTML =
        '<p class="coEmpty">' + t('Your cart is empty.') + '<br>' +
        '<a href="shop.html">' + t('Browse the collection') + '</a></p>';
      return;
    }

    wrap.innerHTML = cart.map(function (line) {
      var p = findProduct(line.id);
      if (!p) return '';
      return (
        '<div class="coItem" data-id="' + p.id + '">' +
          '<div class="coItem__media"><img src="' + p.img + '" alt="' + pName(p) + '"></div>' +
          '<div class="coItem__body">' +
            '<h3 class="coItem__name">' + pName(p) + '</h3>' +
            '<p class="coItem__meta">' + t(p.type) + ' · ' + t(p.size) + '</p>' +
            '<div class="coItem__foot">' +
              '<span class="coQty">' +
                '<button type="button" data-act="dec" aria-label="Decrease quantity">−</button>' +
                '<span>' + line.qty + '</span>' +
                '<button type="button" data-act="inc" aria-label="Increase quantity">+</button>' +
              '</span>' +
              '<span class="coItem__price">' + fmt(p.price * line.qty) + ' ' + t('EGP') + '</span>' +
            '</div>' +
          '</div>' +
          '<button type="button" class="coItem__x" data-act="remove" aria-label="Remove ' + pName(p) + '">' +
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">' +
              '<path d="M6 6l12 12M18 6L6 18" stroke-linecap="round"/>' +
            '</svg>' +
          '</button>' +
        '</div>'
      );
    }).join('');
  }

  /* ---------- render: money ---------- */

  function totals() {
    var subtotal = 0, count = 0;
    var hasNonWatch = false;

    cart.forEach(function (line) {
      var p = findProduct(line.id);
      if (!p) return;
      subtotal += p.price * line.qty;
      count += line.qty;
      if (!isWatch(p)) hasNonWatch = true;
    });

    // watches ship free (while that rule is enabled); if the cart has any
    // non-watch item (perfume), the whole order ships at the perfume rate for
    // the selected governorate — there's a single delivery, so it doesn't make
    // sense to charge per line.
    var chargeShipping = hasNonWatch || !WATCHES_FREE;
    var shipping = (count === 0) ? 0 : (chargeShipping ? perfumeShippingFee() : 0);
    var discount = 0;

    if (promo) {
      discount = promo.discount || 0;
      if (promo.freeShipping) shipping = 0;
    }

    return {
      count: count,
      subtotal: subtotal,
      shipping: shipping,
      discount: discount,
      hasNonWatch: hasNonWatch,
      total: Math.max(0, subtotal - discount) + shipping
    };
  }

  function renderTotals() {
    // named "tot" rather than "t" so it doesn't shadow the global translator
    var tot = totals();
    var egp = t('EGP');
    var itemWord = isAr() ? 'عنصر' : (tot.count === 1 ? 'item' : 'items');

    $('coCount').textContent    = '(' + tot.count + ' ' + itemWord + ')';
    $('coSubtotal').textContent = fmt(tot.subtotal) + ' ' + egp;
    $('coShipping').textContent = tot.shipping === 0 ? t('FREE') : fmt(tot.shipping) + ' ' + egp;
    $('coDiscount').textContent = '- ' + fmt(tot.discount) + ' ' + egp;
    $('coTotal').textContent    = fmt(tot.total) + ' ' + egp;

    // the shipping option mirrors whatever the order currently qualifies for
    var shipPrice = $('coShipPrice');
    if (shipPrice) shipPrice.textContent = tot.shipping === 0 ? t('FREE') : fmt(tot.shipping) + ' ' + egp;

    // shipping is watches-free / perfume-flat-by-governorate now, not a
    // subtotal threshold — the progress bar no longer applies
    var noteTitle = $('coShipNoteTitle');
    var noteAway = $('coShipAway');
    if (noteTitle && noteAway) {
      if (!tot.hasNonWatch && tot.count > 0) {
        noteTitle.textContent = t('FREE SHIPPING ON WATCHES');
        noteAway.textContent = t('Applied to this order.');
      } else if (tot.hasNonWatch) {
        var gov = ($('coGov') && $('coGov').value) || '';
        var govLabel = gov ? t(gov) : '';
        noteTitle.textContent = t('PERFUME SHIPPING:') + ' ' + fmt(perfumeShippingFee()) + ' ' + egp;
        noteAway.textContent = gov ? (t('Rate for') + ' ' + govLabel + '.') : t('Select your governorate for the exact rate.');
      } else {
        noteTitle.textContent = t('FREE SHIPPING ON WATCHES');
        noteAway.textContent = '';
      }
    }

    var progress = $('coProgress');
    if (progress) progress.hidden = true;

    // the InstaPay panel quotes the exact amount to transfer
    var payAmount = $('coPayAmount');
    if (payAmount) payAmount.textContent = fmt(tot.total) + ' ' + egp;
  }

  function render() {
    renderItems();
    renderTotals();

    // nothing to buy — make that unmistakable rather than allowing an empty order
    var place = $('coPlace');
    if (place) {
      place.disabled = cart.length === 0;
      place.style.opacity = cart.length === 0 ? '.45' : '';
      place.style.pointerEvents = cart.length === 0 ? 'none' : '';
    }
  }

  // re-read the saved cart when this page comes back from the back/forward
  // cache or another tab changes it, so checkout never shows a stale cart
  function reloadCart() {
    try {
      var saved = JSON.parse(localStorage.getItem(CART_KEY));
      cart = Array.isArray(saved) ? saved : [];
    } catch (e) { return; }
    render();
  }
  window.addEventListener('pageshow', function (e) { if (e.persisted) reloadCart(); });
  window.addEventListener('storage', function (e) { if (e.key === CART_KEY) reloadCart(); });

  /* ---------- quantity / remove ---------- */

  var itemsRoot = $('coItems');
  if (itemsRoot) {
    itemsRoot.addEventListener('click', function (e) {
      var act = e.target.closest('[data-act]');
      if (!act) return;
      var row = e.target.closest('.coItem');
      if (!row) return;

      var id = row.getAttribute('data-id');
      var line = null;
      for (var i = 0; i < cart.length; i++) if (cart[i].id === id) line = cart[i];
      if (!line) return;

      var a = act.dataset.act;
      if (a === 'inc') line.qty += 1;
      else if (a === 'dec') {
        line.qty -= 1;
        if (line.qty <= 0) cart = cart.filter(function (l) { return l.id !== id; });
      }
      else if (a === 'remove') cart = cart.filter(function (l) { return l.id !== id; });

      saveCart();
      render();
      // the discount was worked out for the old subtotal — check the code again
      if (promo && promoBtn) {
        $('coPromo').value = promo.code;
        promoBtn.click();
      }
    });
  }

  /* ---------- promo code ---------- */

  var promoBtn = $('coPromoBtn');
  if (promoBtn) {
    promoBtn.addEventListener('click', function () {
      var input = $('coPromo');
      var out   = $('coPromoMsg');
      var code  = (input.value || '').trim().toUpperCase();

      out.classList.remove('is-ok', 'is-bad');

      if (!code) {
        out.textContent = t('Enter a code first.');
        out.classList.add('is-on', 'is-bad');
        return;
      }

      var tot = totals();
      var productIds = cart.map(function (line) { var p = findProduct(line.id); return p ? p.dbId : null; }).filter(Boolean);

      promoBtn.disabled = true;
      fetch('/api/public/coupons/validate', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: code, subtotal: tot.subtotal, productIds: productIds })
      })
        .then(function (res) { return res.json().then(function (data) { return { ok: res.ok, data: data }; }); })
        .then(function (result) {
          promoBtn.disabled = false;
          if (!result.ok) {
            promo = null;
            out.textContent = result.data.error || t('That code is not valid.');
            out.classList.add('is-on', 'is-bad');
            renderTotals();
            return;
          }
          promo = result.data;
          out.textContent = code + ' ' + t('applied —') + ' ' + promo.label + '.';
          out.classList.add('is-on', 'is-ok');
          renderTotals();
        })
        .catch(function () {
          promoBtn.disabled = false;
          out.textContent = t('Could not check that code — try again.');
          out.classList.add('is-on', 'is-bad');
        });
    });
  }

  /* ---------- payment method: highlight + card fields ---------- */

  function syncOptions(groupName) {
    document.querySelectorAll('input[name="' + groupName + '"]').forEach(function (input) {
      var opt = input.closest('.coOpt');
      if (opt) opt.classList.toggle('is-on', input.checked);
    });
  }

  function currentPayment() {
    var picked = document.querySelector('input[name="payment"]:checked');
    return picked ? picked.value : 'cod';
  }

  // each method reveals only its own panel
  function syncPaymentPanels() {
    var method = currentPayment();
    var card  = $('coCardFields');
    var insta = $('coInstaFields');
    if (card)  card.hidden  = method !== 'card';
    if (insta) insta.hidden = method !== 'instapay';
  }

  document.querySelectorAll('input[name="payment"]').forEach(function (input) {
    input.addEventListener('change', function () {
      syncOptions('payment');
      syncPaymentPanels();
    });
  });
  document.querySelectorAll('input[name="shipping"]').forEach(function (input) {
    input.addEventListener('change', function () { syncOptions('shipping'); });
  });

  /* ---------- input niceties ---------- */

  var notes = $('coNotes');
  if (notes) {
    notes.addEventListener('input', function () {
      $('coNotesCount').textContent = notes.value.length;
    });
  }

  // digits only where a number is what's meant
  ['coPhone', 'coInstaFrom'].forEach(function (id) {
    var el = $(id);
    if (!el) return;
    el.addEventListener('input', function () {
      el.value = el.value.replace(/[^\d\s+]/g, '');
    });
  });

  /* ---------- copy the InstaPay number ---------- */

  var copyBtn = $('coPayCopy');
  if (copyBtn) {
    copyBtn.addEventListener('click', function () {
      var number = ($('coPayNumber').textContent || '').trim();
      var label  = $('coPayCopyTxt');

      function flash() {
        copyBtn.classList.add('is-done');
        label.textContent = 'COPIED';
        setTimeout(function () {
          copyBtn.classList.remove('is-done');
          label.textContent = 'COPY';
        }, 1600);
      }

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(number).then(flash, fallback);
      } else fallback();

      // older browsers, and any page not served over https
      function fallback() {
        var tmp = document.createElement('textarea');
        tmp.value = number;
        tmp.setAttribute('readonly', '');
        tmp.style.position = 'fixed';
        tmp.style.opacity = '0';
        document.body.appendChild(tmp);
        tmp.select();
        try { document.execCommand('copy'); flash(); } catch (e) {}
        document.body.removeChild(tmp);
      }
    });
  }

  var cardNum = $('coCardNum');
  if (cardNum) {
    cardNum.addEventListener('input', function () {
      var digits = cardNum.value.replace(/\D/g, '').slice(0, 16);
      cardNum.value = digits.replace(/(.{4})/g, '$1 ').trim();
    });
  }

  var cardExp = $('coCardExp');
  if (cardExp) {
    cardExp.addEventListener('input', function () {
      var d = cardExp.value.replace(/\D/g, '').slice(0, 4);
      cardExp.value = d.length > 2 ? d.slice(0, 2) + ' / ' + d.slice(2) : d;
    });
  }

  var cardCvc = $('coCardCvc');
  if (cardCvc) {
    cardCvc.addEventListener('input', function () {
      cardCvc.value = cardCvc.value.replace(/\D/g, '').slice(0, 4);
    });
  }

  /* ---------- validation ---------- */

  function setError(id, message) {
    var field = $(id);
    if (!field) return;
    var box = field.closest('.coInput');
    var err = document.querySelector('.coErr[data-for="' + id + '"]');

    if (box) box.classList.toggle('is-bad', !!message);
    if (err) {
      err.textContent = message || '';
      err.classList.toggle('is-on', !!message);
    }
  }

  function checkField(id) {
    var el = $(id);
    if (!el) return true;
    var val = (el.value || '').trim();

    if (!val) { setError(id, t('This field is required.')); return false; }

    if ((id === 'coPhone' || id === 'coInstaFrom') && val.replace(/\D/g, '').length < 10) {
      setError(id, t('Enter a valid phone number.')); return false;
    }
    if (id === 'coCardNum' && val.replace(/\D/g, '').length !== 16) {
      setError(id, t('Enter the 16-digit card number.')); return false;
    }
    if (id === 'coCardExp' && !/^\d{2}\s?\/\s?\d{2}$/.test(val)) {
      setError(id, t('Use MM / YY.')); return false;
    }
    if (id === 'coCardCvc' && val.length < 3) {
      setError(id, t('Enter the 3-digit code.')); return false;
    }

    setError(id, '');
    return true;
  }

  // clear a field's error as soon as the person starts fixing it
  ['coName','coGov','coCity','coAddr','coPhone','coInstaFrom',
   'coCardNum','coCardExp','coCardCvc'].forEach(function (id) {
    var el = $(id);
    if (!el) return;
    var ev = el.tagName === 'SELECT' ? 'change' : 'input';
    el.addEventListener(ev, function () {
      var box = el.closest('.coInput');
      if (box && box.classList.contains('is-bad')) setError(id, '');
    });
    el.addEventListener('blur', function () {
      if ((el.value || '').trim()) checkField(id);
    });
  });

  /* ---------- receipt ---------- */

  function payLabel(method) {
    if (method === 'cod') return t('Cash on Delivery');
    if (method === 'instapay') return t('InstaPay');
    if (method === 'card') return t('Credit / Debit Card');
    return method;
  }

  // "tot" rather than "t" so it doesn't shadow the global translator
  function buildReceipt(num, method, tot, lines) {
    $('coRcNum').textContent = '#' + num;

    $('coRcDate').textContent = new Date().toLocaleString('en-GB', {
      day: '2-digit', month: 'short', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });

    $('coRcPay').textContent = payLabel(method);

    // each method carries its own reference line
    var refRow = $('coRcRefRow');
    if (method === 'instapay') {
      $('coRcRefLabel').textContent = t('Paid From');
      $('coRcRef').textContent = ($('coInstaFrom').value || '').trim();
      refRow.hidden = false;
    } else if (method === 'card') {
      $('coRcRefLabel').textContent = t('Card');
      var digits = ($('coCardNum').value || '').replace(/\D/g, '');
      // only ever the last four — the full number is never stored or shown
      $('coRcRef').textContent = digits ? '•••• •••• •••• ' + digits.slice(-4) : '—';
      refRow.hidden = false;
    } else {
      refRow.hidden = true;
    }

    // delivery address, assembled from what was filled in
    var addr = [
      ($('coName').value || '').trim(),
      ($('coPhone').value || '').trim(),
      [($('coApt').value || '').trim(), ($('coAddr').value || '').trim()]
        .filter(Boolean).join(', '),
      [($('coCity').value || '').trim(), ($('coGov').value || '').trim()]
        .filter(Boolean).join(', ')
    ].filter(Boolean);
    $('coRcAddr').innerHTML = addr.join('<br>');

    // items
    $('coRcItems').innerHTML = lines.map(function (l) {
      return (
        '<tr>' +
          '<td>' + l.displayName + '<i>' + l.displayBrand + ' · ' + t(l.size) + '</i></td>' +
          '<td>' + l.qty + '</td>' +
          '<td>' + fmt(l.price * l.qty) + '</td>' +
        '</tr>'
      );
    }).join('');

    // money
    var egp = t('EGP');
    var sums = [
      '<p><span>' + t('Subtotal') + '</span><b>' + fmt(tot.subtotal) + ' ' + egp + '</b></p>',
      '<p><span>' + t('Shipping') + '</span><b>' + (tot.shipping === 0 ? t('FREE') : fmt(tot.shipping) + ' ' + egp) + '</b></p>'
    ];
    if (tot.discount > 0) {
      sums.push('<p><span>' + t('Discount') + '</span><b>- ' + fmt(tot.discount) + ' ' + egp + '</b></p>');
    }
    $('coRcSums').innerHTML = sums.join('');
    $('coRcTotal').textContent = fmt(tot.total) + ' ' + egp;

    // a short line that says what actually happens next for this method
    var note = $('coRcNote');
    if (method === 'cod') {
      note.innerHTML = '<b>' + t('Cash on Delivery:') + '</b> ' + t('please have') + ' ' + fmt(tot.total) +
        ' ' + egp + ' ' + t('ready when your order arrives.');
    } else if (method === 'instapay') {
      note.innerHTML = '<b>' + t('InstaPay:') + '</b> ' + t('transfer') + ' ' + fmt(tot.total) + ' ' + egp + ' ' + t('to') + ' ' +
        '<b>01027380269</b>. ' + t('Your order is confirmed once the transfer is received.');
    } else {
      note.innerHTML = '<b>' + t('Card:') + '</b> ' + t('payment of') + ' ' + fmt(tot.total) +
        ' ' + egp + ' ' + t('was authorised for this order.');
    }
  }

  /* ---------- save the receipt ---------- */

  var saveBtn = $('coRcSave');
  if (saveBtn) {
    // the print dialog is what lets people save it as a PDF or print it
    saveBtn.addEventListener('click', function () { window.print(); });
  }

  function validateInformation() {
    var required = ['coName', 'coGov', 'coCity', 'coAddr', 'coPhone'];
    var firstBad = null;
    required.forEach(function (id) {
      if (!checkField(id) && !firstBad) firstBad = id;
    });
    if (firstBad) {
      var el = $(firstBad);
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setTimeout(function () { el.focus({ preventScroll: true }); }, 320);
      return false;
    }
    return true;
  }

  /* ---------- submit ---------- */

  var form = $('coForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!cart.length) return;

      if (!validateInformation()) return;

      var method = currentPayment();
      var required = [];

      if (method === 'card') required = required.concat(['coCardNum','coCardExp','coCardCvc']);
      if (method === 'instapay') required = required.concat(['coInstaFrom']);

      var firstBad = null;
      required.forEach(function (id) {
        if (!checkField(id) && !firstBad) firstBad = id;
      });

      if (firstBad) {
        var el = $(firstBad);
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        setTimeout(function () { el.focus({ preventScroll: true }); }, 320);
        return;
      }

      // the totals must be read before the cart is emptied
      var snapshot = totals();
      var lines = cart.map(function (line) {
        var p = findProduct(line.id);
        // "name"/"brand" stay in English for the order record sent to the
        // backend (admin dashboard, WhatsApp notification, etc. all expect
        // consistent English data); the on-screen receipt reads the
        // language-aware copies below instead of these two fields
        return p ? {
          name: p.name, brand: p.brand, size: p.size, qty: line.qty, price: p.price,
          productId: p.dbId, image: p.img,
          displayName: pName(p), displayBrand: pBrand(p)
        } : null;
      }).filter(Boolean);

      var place = $('coPlace');
      place.classList.add('is-busy');
      place.querySelector('.coPlace__label').textContent = t('PLACING ORDER…');

      var orderPayload = {
        customer: {
          name: $('coName').value.trim(),
          phone: $('coPhone').value.trim(),
          email: null
        },
        address: {
          governorate: $('coGov').value,
          city: $('coCity').value.trim(),
          address: $('coAddr').value.trim(),
          apartment: $('coApt').value.trim()
        },
        items: lines.map(function (l) {
          return { productId: l.productId, name: l.name, brand: l.brand, size: l.size, qty: l.qty, unitPrice: l.price, image: l.image };
        }),
        subtotal: snapshot.subtotal, discountTotal: snapshot.discount, shippingFee: snapshot.shipping, total: snapshot.total,
        couponCode: promo ? promo.code : null,
        paymentMethod: method,
        paymentReference: method === 'instapay' ? $('coInstaFrom').value.trim() : (method === 'card' ? (($('coCardNum').value||'').replace(/\D/g,'').slice(-4)) : null),
        shippingMethod: 'standard',
        customerNotes: $('coNotes').value.trim() || null
      };

      fetch('/api/public/orders', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(orderPayload)
      })
        .then(function (res) { return res.json().then(function (data) { return { ok: res.ok, data: data }; }); })
        .then(function (result) {
          if (!result.ok) {
            place.classList.remove('is-busy');
            place.querySelector('.coPlace__label').textContent = t('PLACE ORDER');
            alert(result.data.error || 'Could not place your order — please try again.');
            return;
          }

          buildReceipt(result.data.orderNumber, method, snapshot, lines);

          // browser half of the Purchase event; the server already sent the
          // Conversions API half with this same event id, so Meta counts it once
          if (window.wmTrack) {
            window.wmTrack('Purchase', {
              value: snapshot.total, currency: 'EGP', content_type: 'product',
              content_ids: lines.map(function (l) { return String(l.productId || l.name); }),
              contents: lines.map(function (l) { return { id: String(l.productId || l.name), quantity: l.qty }; }),
              num_items: lines.reduce(function (n, l) { return n + l.qty; }, 0)
            }, { eventId: 'purchase.' + result.data.orderNumber, browserOnly: true });
          }
          $('coDonePhone').textContent = $('coPhone').value.trim();

          cart = [];
          saveCart();

          var done = $('coDone');
          done.classList.add('is-open');
          done.setAttribute('aria-hidden', 'false');
          document.body.style.overflow = 'hidden';
          done.scrollTop = 0;
        })
        .catch(function () {
          place.classList.remove('is-busy');
          place.querySelector('.coPlace__label').textContent = t('PLACE ORDER');
          alert('Could not reach the server — please check your connection and try again.');
        });
    });
  }

  /* ---------- governorate change recalculates the perfume shipping fee ---------- */

  var govSelect = $('coGov');
  if (govSelect) govSelect.addEventListener('change', renderTotals);

  /* ---------- go ---------- */

  syncOptions('payment');
  syncOptions('shipping');
  syncPaymentPanels();
  render();

  // Meta Pixel: shopper reached checkout with something in the cart
  if (cart.length && window.wmTrack) {
    var metaLines = cart.map(function (l) { var p = findProduct(l.id); return p ? { p: p, qty: l.qty } : null; }).filter(Boolean);
    if (metaLines.length) {
      window.wmTrack('InitiateCheckout', {
        value: totals().total, currency: 'EGP', content_type: 'product',
        content_ids: metaLines.map(function (m) { return String(m.p.dbId || m.p.id); }),
        contents: metaLines.map(function (m) { return { id: String(m.p.dbId || m.p.id), quantity: m.qty }; }),
        num_items: metaLines.reduce(function (n, m) { return n + m.qty; }, 0)
      });
    }
  }
});
