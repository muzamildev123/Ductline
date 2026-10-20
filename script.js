/* Ductline. Plain JavaScript, no dependencies. Forms are demos and send nothing yet. */
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

  // Hero demo form
  var heroForm = document.querySelector('[data-hero-form]');
  if (heroForm) {
    heroForm.addEventListener('submit', function (e) {
      e.preventDefault();
      heroForm.querySelector('.panel__done').textContent = 'Received. We will send your audit shortly.';
      heroForm.reset();
    });
  }

  // Audit form
  var audit = document.querySelector('[data-audit-form]');
  if (audit) {
    audit.addEventListener('submit', function (e) {
      e.preventDefault();
      var first = (audit.elements.name.value || '').split(' ')[0] || 'there';
      audit.querySelector('.audit__done').textContent = 'Thanks, ' + first + '. We will reply shortly.';
      audit.reset();
    });
  }
})();
