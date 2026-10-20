/* DuctLine. Plain JavaScript, no dependencies. */
(function () {
  'use strict';

  document.documentElement.classList.add('js');

  var year = document.querySelector('[data-year]');
  if (year) year.textContent = new Date().getFullYear();

  // Reveal sections as they scroll in
  var items = document.querySelectorAll('.block .wrap > *, .price, .season');
  items.forEach(function (el) { el.classList.add('reveal'); });
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add('is-in'); });
  }

  // Tabs: click or arrow keys
  var tabsRoot = document.querySelector('[data-tabs]');
  if (tabsRoot) {
    var tabs = Array.prototype.slice.call(tabsRoot.querySelectorAll('[role="tab"]'));
    var panels = tabs.map(function (t) { return document.getElementById(t.getAttribute('aria-controls')); });
    var select = function (i, focus) {
      tabs.forEach(function (t, n) {
        var on = n === i;
        t.classList.toggle('is-active', on);
        t.setAttribute('aria-selected', on ? 'true' : 'false');
        t.setAttribute('tabindex', on ? '0' : '-1');
        if (panels[n]) panels[n].hidden = !on;
      });
      if (focus) tabs[i].focus();
    };
    tabs.forEach(function (t, i) {
      t.addEventListener('click', function () { select(i, false); });
      t.addEventListener('keydown', function (e) {
        var k = e.key, next = null;
        if (k === 'ArrowDown' || k === 'ArrowRight') next = (i + 1) % tabs.length;
        else if (k === 'ArrowUp' || k === 'ArrowLeft') next = (i - 1 + tabs.length) % tabs.length;
        else if (k === 'Home') next = 0;
        else if (k === 'End') next = tabs.length - 1;
        if (next !== null) { e.preventDefault(); select(next, true); }
      });
    });
  }

  // Seasonal headline preview
  var seasonBox = document.querySelector('[data-season]');
  if (seasonBox) {
    var copy = {
      summer: ["AC not cooling? We'll get it fixed.", 'Fast AC repair for homeowners in your area.'],
      shoulder: ['Get your system checked before the rush.', 'Book a tune-up and avoid a breakdown later.'],
      winter: ['Furnace out? We can help tonight.', 'Fast heating repair so your home stays warm.']
    };
    var h = seasonBox.querySelector('[data-season-h]');
    var p = seasonBox.querySelector('[data-season-p]');
    seasonBox.querySelectorAll('.chip').forEach(function (chip) {
      chip.addEventListener('click', function () {
        seasonBox.querySelectorAll('.chip').forEach(function (c) { c.classList.remove('is-on'); });
        chip.classList.add('is-on');
        var c = copy[chip.getAttribute('data-s')];
        h.textContent = c[0];
        p.textContent = c[1];
      });
    });
  }

  // Forms: sent to Netlify Forms (shows in the Netlify dashboard under Forms).
  // The plain POST in the markup is the fallback if JavaScript is off.
  function wireForm(form, doneSel, okMsg) {
    if (!form) return;
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var done = form.querySelector(doneSel);
      var btn = form.querySelector('button[type="submit"]');
      var label = btn ? btn.textContent : '';
      if (btn) { btn.disabled = true; btn.textContent = 'Sending...'; }
      done.textContent = '';
      var body = new URLSearchParams(new FormData(form)).toString();
      fetch('/', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: body })
        .then(function (res) {
          if (!res.ok) throw new Error('bad status');
          done.textContent = typeof okMsg === 'function' ? okMsg(form) : okMsg;
          form.reset();
        })
        .catch(function () {
          done.textContent = 'Sorry, that did not send. Please try again in a moment.';
        })
        .then(function () {
          if (btn) { btn.disabled = false; btn.textContent = label; }
        });
    });
  }

  wireForm(document.querySelector('[data-hero-form]'), '.panel__done',
    'Received. We will send your website check shortly.');

  wireForm(document.querySelector('[data-audit-form]'), '.audit__done', function (form) {
    var first = (form.elements.name.value || '').split(' ')[0] || 'there';
    return 'Thanks, ' + first + '. We will reply shortly.';
  });
})();
