(function () {
  function markActiveNav() {
    var current = location.pathname.split('/').pop() || 'index.html';
    var inItemsDir = location.pathname.indexOf('/items/') !== -1;
    document.querySelectorAll('[data-nav]').forEach(function (link) {
      var target = link.getAttribute('href').split('/').pop();
      if ((inItemsDir && target === 'browse-auctions.html') || target === current) {
        link.classList.add('is-active');
      }
    });
  }

  function fillStatusPanel() {
    var urlNode = document.getElementById('current-url');
    var timeNode = document.getElementById('current-time');
    if (urlNode) urlNode.textContent = window.location.href;
    if (timeNode) timeNode.textContent = new Date().toISOString();
  }

  function initFilters() {
    var list = document.querySelectorAll('[data-item-card]');
    if (!list.length) return;

    var categoryEl = document.getElementById('filter-category');
    var eraEl = document.getElementById('filter-era');
    var priceEl = document.getElementById('filter-price');

    function matchesPrice(range, text) {
      var value = Number(text.replace(/[^0-9]/g, ''));
      if (!value || range === 'all') return true;
      if (range === '0-2000') return value <= 2000;
      if (range === '2001-8000') return value > 2000 && value <= 8000;
      if (range === '8001-20000') return value > 8000 && value <= 20000;
      return true;
    }

    function applyFilters() {
      var c = categoryEl ? categoryEl.value : 'all';
      var e = eraEl ? eraEl.value : 'all';
      var p = priceEl ? priceEl.value : 'all';

      list.forEach(function (card) {
        var cat = card.getAttribute('data-category');
        var era = card.getAttribute('data-era');
        var price = card.getAttribute('data-price');
        var visible = (c === 'all' || c === cat) &&
          (e === 'all' || e === era) &&
          matchesPrice(p, price);
        card.style.display = visible ? '' : 'none';
      });
    }

    [categoryEl, eraEl, priceEl].forEach(function (el) {
      if (!el) return;
      el.addEventListener('change', applyFilters);
    });

    applyFilters();
  }

  markActiveNav();
  fillStatusPanel();
  initFilters();
})();
