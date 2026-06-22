// ===== WORKING SEARCH SYSTEM =====

// Initialize search on all pages
function initSearch() {
  // Header search
  const headerSearchInput = document.querySelector('.header__search-input');
  const headerSearchToggle = document.querySelector('.header__search-toggle');

  if (headerSearchInput) {
    // Search on Enter key
    headerSearchInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        performSearch(this.value.trim());
      }
    });

    // Search on toggle button click
    if (headerSearchToggle) {
      headerSearchToggle.addEventListener('click', function() {
        const searchBox = document.querySelector('.header__search');
        if (searchBox && searchBox.classList.contains('active')) {
          performSearch(headerSearchInput.value.trim());
        }
      });
    }

    // Live search suggestions
    headerSearchInput.addEventListener('input', function() {
      const value = this.value.trim().toLowerCase();
      if (value.length < 1) {
        hideSearchSuggestions();
        return;
      }
      showSearchSuggestions(value);
    });

    // Hide suggestions when clicking outside
    document.addEventListener('click', function(e) {
      if (!e.target.closest('.header__search')) {
        hideSearchSuggestions();
      }
    });
  }

  // Hero search (index.html)
  const heroSearchBtn = document.querySelector('.search-box__btn');
  const destinationInput = document.getElementById('destination-input');

  if (heroSearchBtn && destinationInput) {
    heroSearchBtn.addEventListener('click', function() {
      const query = destinationInput.value.trim();
      if (query) {
        window.location.href = './catalog.html?search=' + encodeURIComponent(query);
      }
    });
  }
}

function performSearch(query) {
  if (!query) return;
  window.location.href = './catalog.html?search=' + encodeURIComponent(query);
}

function showSearchSuggestions(query) {
  if (typeof hotels === 'undefined') return;

  // Search by hotel name, city, or region
  const matches = hotels.filter(h => 
    h.name.toLowerCase().includes(query) ||
    h.city.toLowerCase().includes(query) ||
    h.region.toLowerCase().includes(query)
  ).slice(0, 5);

  let dropdown = document.getElementById('header-search-dropdown');
  if (!dropdown) {
    dropdown = document.createElement('div');
    dropdown.id = 'header-search-dropdown';
    dropdown.style.cssText = `
      position: absolute;
      top: calc(100% + 8px);
      left: 0;
      right: 0;
      background: var(--bg-card);
      border: 1px solid rgba(168, 85, 247, 0.2);
      border-radius: 12px;
      box-shadow: 0 12px 40px rgba(107, 33, 168, 0.4);
      z-index: 1000;
      max-height: 400px;
      overflow-y: auto;
      display: none;
    `;
    const searchBox = document.querySelector('.header__search');
    if (searchBox) {
      searchBox.style.position = 'relative';
      searchBox.appendChild(dropdown);
    }
  }

  if (matches.length === 0) {
    dropdown.innerHTML = `
      <div style="padding: 16px 20px; color: var(--text-light); text-align: center; font-size: 0.9rem;">
        Ничего не найдено
      </div>
    `;
  } else {
    dropdown.innerHTML = matches.map(hotel => `
      <a href="./property.html?id=${hotel.id}" style="
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 12px 16px;
        text-decoration: none;
        color: inherit;
        transition: all 0.2s ease;
        border-bottom: 1px solid rgba(168, 85, 247, 0.1);
      " onmouseover="this.style.background='rgba(168, 85, 247, 0.1)'" onmouseout="this.style.background='transparent'">
        <div style="
          width: 48px;
          height: 48px;
          border-radius: 8px;
          background-image: url('${hotel.images[0]}');
          background-size: cover;
          background-position: center;
          flex-shrink: 0;
        "></div>
        <div style="flex: 1; min-width: 0;">
          <div style="font-weight: 600; color: var(--text); font-size: 0.95rem; margin-bottom: 2px;">${hotel.name}</div>
          <div style="font-size: 0.8rem; color: var(--text-light);">📍 ${hotel.city}, ${hotel.region}</div>
        </div>
        <div style="font-weight: 700; color: var(--accent); font-size: 0.9rem; white-space: nowrap;">
          ${hotel.price.toLocaleString('ru-RU')} ₽
        </div>
      </a>
    `).join('') + `
      <a href="./catalog.html?search=${encodeURIComponent(query)}" style="
        display: block;
        padding: 14px 16px;
        text-align: center;
        color: var(--accent);
        font-weight: 600;
        font-size: 0.9rem;
        text-decoration: none;
        border-top: 1px solid rgba(168, 85, 247, 0.1);
      " onmouseover="this.style.background='rgba(168, 85, 247, 0.1)'" onmouseout="this.style.background='transparent'">
        Показать все результаты →
      </a>
    `;
  }

  dropdown.style.display = 'block';
}

function hideSearchSuggestions() {
  const dropdown = document.getElementById('header-search-dropdown');
  if (dropdown) {
    dropdown.style.display = 'none';
  }
}

// Handle search on catalog page
document.addEventListener('DOMContentLoaded', function() {
  initSearch();

  // Check if we're on catalog page with search query
  const urlParams = new URLSearchParams(window.location.search);
  const searchQuery = urlParams.get('search');

  if (searchQuery && document.getElementById('properties-grid')) {
    // Apply search filter
    if (typeof hotels !== 'undefined') {
      const query = searchQuery.toLowerCase();
      const results = hotels.filter(h => 
        h.name.toLowerCase().includes(query) ||
        h.city.toLowerCase().includes(query) ||
        h.region.toLowerCase().includes(query) ||
        h.description.toLowerCase().includes(query)
      );

      // Update title
      const titleEl = document.querySelector('.catalog-header__title');
      if (titleEl) {
        titleEl.textContent = `Результаты поиска: «${searchQuery}»`;
      }

      const subtitleEl = document.querySelector('.catalog-header__subtitle');
      if (subtitleEl) {
        subtitleEl.textContent = `Найдено ${results.length} объектов`;
      }

      // Render results
      renderFilteredHotels(results);
      updateFilterCount(results.length);

      // Hide pagination when searching
      const pagination = document.querySelector('.pagination');
      if (pagination) pagination.style.display = 'none';
    }
  }
});
