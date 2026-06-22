// ===== WORKING FILTERS SYSTEM =====

let currentFilters = {
  type: 'all',
  minPrice: 0,
  maxPrice: 50000,
  rating: 0,
  amenities: [],
  sortBy: 'popular'
};

let filteredHotels = [];

// Initialize filters on page load
document.addEventListener('DOMContentLoaded', function() {
  if (document.getElementById('properties-grid')) {
    initFilters();
    // Check if there's a search query
    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get('search');
    if (!searchQuery) {
      applyFilters();
    }
  }
});

function initFilters() {
  // Type filter radio buttons
  const typeRadios = document.querySelectorAll('input[name="type-filter"]');
  typeRadios.forEach(radio => {
    radio.addEventListener('change', function() {
      if (this.checked) {
        currentFilters.type = this.value;
        applyFilters();
      }
    });
  });

  // Price range inputs
  const minPriceInput = document.getElementById('price-min');
  const maxPriceInput = document.getElementById('price-max');

  if (minPriceInput) {
    minPriceInput.addEventListener('change', function() {
      currentFilters.minPrice = parseInt(this.value) || 0;
      applyFilters();
    });
  }

  if (maxPriceInput) {
    maxPriceInput.addEventListener('change', function() {
      currentFilters.maxPrice = parseInt(this.value) || 50000;
      applyFilters();
    });
  }

  // Rating radio buttons
  const ratingRadios = document.querySelectorAll('input[name="rating"]');
  ratingRadios.forEach(radio => {
    radio.addEventListener('change', function() {
      currentFilters.rating = parseInt(this.value) || 0;
      applyFilters();
    });
  });

  // Amenities checkboxes (only those with specific amenity values)
  const amenityInputs = document.querySelectorAll('.filters__list input[type="checkbox"]');
  amenityInputs.forEach(cb => {
    const value = cb.value;
    if (['wifi', 'pool', 'parking', 'spa', 'restaurant', 'gym', 'pets', 'cancel'].includes(value)) {
      cb.addEventListener('change', function() {
        if (this.checked) {
          if (!currentFilters.amenities.includes(value)) {
            currentFilters.amenities.push(value);
          }
        } else {
          currentFilters.amenities = currentFilters.amenities.filter(a => a !== value);
        }
        applyFilters();
      });
    }
  });

  // Sort dropdown
  const sortSelect = document.getElementById('sort-select');
  if (sortSelect) {
    sortSelect.addEventListener('change', function() {
      currentFilters.sortBy = this.value;
      applyFilters();
    });
  }
}

function applyFilters() {
  // Use all hotels if available (for cross-page filtering), otherwise current page hotels
  let sourceHotels = (typeof window.allHotels !== 'undefined') ? window.allHotels : 
                     (typeof hotels !== 'undefined') ? hotels : [];

  if (!sourceHotels || sourceHotels.length === 0) {
    console.error('No hotels array found!');
    return;
  }

  console.log('Applying filters:', currentFilters);
  console.log('Source hotels count:', sourceHotels.length);

  // Start with all hotels
  let result = sourceHotels.slice(); // Copy array

  console.log('Starting with', result.length, 'hotels');

  // Apply type filter
  if (currentFilters.type && currentFilters.type !== 'all') {
    result = result.filter(h => h.type === currentFilters.type);
    console.log('After type filter:', result.length);
  }

  // Apply price filter
  result = result.filter(h => {
    const price = h.price || 0;
    return price >= currentFilters.minPrice && price <= currentFilters.maxPrice;
  });
  console.log('After price filter:', result.length);

  // Apply rating filter
  if (currentFilters.rating > 0) {
    result = result.filter(h => (h.rating || 0) >= currentFilters.rating);
    console.log('After rating filter:', result.length);
  }

  // Apply amenities filter
  if (currentFilters.amenities.length > 0) {
    result = result.filter(h => {
      if (!h.amenities || !Array.isArray(h.amenities)) return false;
      return currentFilters.amenities.every(amenity => h.amenities.includes(amenity));
    });
    console.log('After amenities filter:', result.length);
  }

  // Apply sorting
  switch (currentFilters.sortBy) {
    case 'price-asc':
      result.sort((a, b) => (a.price || 0) - (b.price || 0));
      break;
    case 'price-desc':
      result.sort((a, b) => (b.price || 0) - (a.price || 0));
      break;
    case 'rating':
      result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      break;
    case 'popular':
    default:
      result.sort((a, b) => (b.reviews || 0) - (a.reviews || 0));
      break;
  }

  filteredHotels = result;
  console.log('Final result:', result.length, 'hotels');
  renderFilteredHotels(result);
  updateFilterCount(result.length);
}

function renderFilteredHotels(hotelsToRender) {
  const grid = document.getElementById('properties-grid');
  if (!grid) return;

  const favorites = JSON.parse(localStorage.getItem('hotelpay_favorites') || '[]');

  if (hotelsToRender.length === 0) {
    grid.innerHTML = `
      <div class="empty-state" style="grid-column: 1/-1; text-align: center; padding: 64px 24px;">
        <div class="empty-state__icon" style="font-size: 4rem; margin-bottom: 16px;">🔍</div>
        <div class="empty-state__title" style="font-size: 1.25rem; font-weight: 700; margin-bottom: 8px; color: var(--text);">Ничего не найдено</div>
        <div class="empty-state__text" style="color: var(--text-light); margin-bottom: 24px;">Попробуйте изменить параметры фильтров</div>
        <button class="empty-state__btn" onclick="resetFilters()">Сбросить фильтры</button>
      </div>
    `;
    return;
  }

  grid.innerHTML = hotelsToRender.map(hotel => {
    const isFav = favorites.includes(hotel.id);
    const stars = Math.floor(hotel.rating || 0);
    const ratingText = (hotel.rating || 0) >= 4.8 ? 'Превосходно' : (hotel.rating || 0) >= 4.5 ? 'Отлично' : 'Хорошо';

    return `
    <article class="property-card" data-hotel-id="${hotel.id}">
      <div class="property-card__gallery">
        <div class="property-card__img" style="background-image: url('${hotel.images && hotel.images[0] ? hotel.images[0] : ''}')"></div>
        ${hotel.promotion ? `<span class="property-card__badge property-card__badge--promotion">АКЦИЯ -${hotel.discountPercent}%</span>` : ''}
        ${hotel.oldPrice && !hotel.promotion ? `<span class="property-card__badge">Лучшая цена</span>` : ''}
        <button class="property-card__favorite ${isFav ? 'active' : ''}" data-hotel-id="${hotel.id}" onclick="event.stopPropagation(); toggleFavorite(${hotel.id}, this)">${isFav ? '❤️' : '🤍'}</button>
        <div class="property-card__gallery-nav">
          ${hotel.images ? hotel.images.map((_, i) => `<span class="property-card__gallery-dot ${i === 0 ? 'active' : ''}"></span>`).join('') : ''}
        </div>
      </div>
      <div class="property-card__content">
        <div class="property-card__header">
          <div>
            <h3 class="property-card__name">${hotel.name || 'Отель'}</h3>
            <div class="property-card__stars">${'⭐'.repeat(stars)}</div>
          </div>
          <div class="property-card__rating">
            <span class="property-card__rating-score">${hotel.rating || 0}</span>
            <span class="property-card__rating-text">${ratingText}</span>
          </div>
        </div>
        <div class="property-card__location">📍 ${hotel.city || ''}, ${hotel.region || ''}</div>
        <p class="property-card__desc">${hotel.description || ''}</p>
        <div class="property-card__tags">
          ${hotel.tags ? hotel.tags.map(tag => `<span class="property-card__tag ${tag.includes('Бесплатная') || tag.includes('Экскурсии') ? 'property-card__tag--orange' : ''}">${tag}</span>`).join('') : ''}
        </div>
        <div class="property-card__footer">
          <div class="property-card__price">
            <span class="property-card__price-value">${(hotel.price || 0).toLocaleString('ru-RU')} ₽</span>
            <span class="property-card__price-unit">/ночь</span>
            ${hotel.oldPrice ? `<span class="property-card__price-old">${hotel.oldPrice.toLocaleString('ru-RU')} ₽</span>` : ''}
          </div>
          <a href="./property.html?id=${hotel.id}" class="property-card__btn">Забронировать</a>
        </div>
      </div>
    </article>
  `}).join('');
}

function updateFilterCount(count) {
  const countEl = document.querySelector('.sort-bar__count strong');
  if (countEl) countEl.textContent = count;

  const titleEl = document.querySelector('.catalog-header__title');
  if (titleEl) titleEl.textContent = `Найдено ${count} объектов`;
}

function resetFilters() {
  currentFilters = {
    type: 'all',
    minPrice: 0,
    maxPrice: 50000,
    rating: 0,
    amenities: [],
    sortBy: 'popular'
  };

  // Reset all type radios to "all"
  const allTypeRadio = document.querySelector('input[name="type-filter"][value="all"]');
  if (allTypeRadio) {
    allTypeRadio.checked = true;
    // Uncheck others
    document.querySelectorAll('input[name="type-filter"]').forEach(r => {
      if (r.value !== 'all') r.checked = false;
    });
  }

  // Reset rating radios
  document.querySelectorAll('input[name="rating"]').forEach(r => r.checked = false);

  // Reset amenity checkboxes
  document.querySelectorAll('.filters__list input[type="checkbox"]').forEach(cb => {
    cb.checked = false;
  });

  // Reset price inputs
  const minPrice = document.getElementById('price-min');
  const maxPrice = document.getElementById('price-max');
  if (minPrice) minPrice.value = 0;
  if (maxPrice) maxPrice.value = 50000;

  // Reset sort
  const sortSelect = document.getElementById('sort-select');
  if (sortSelect) sortSelect.value = 'popular';

  applyFilters();
}

// Override the original filter functions
window.filterByType = function(type) {
  currentFilters.type = type;
  // Update radio buttons to match
  document.querySelectorAll('input[name="type-filter"]').forEach(r => {
    r.checked = (r.value === type);
  });
  applyFilters();
};

window.filterByRating = function(rating) {
  currentFilters.rating = rating;
  applyFilters();
};

window.filterByAmenity = function(amenity) {
  const index = currentFilters.amenities.indexOf(amenity);
  if (index > -1) {
    currentFilters.amenities.splice(index, 1);
  } else {
    currentFilters.amenities.push(amenity);
  }
  applyFilters();
};

window.sortHotels = function(value) {
  currentFilters.sortBy = value;
  applyFilters();
};

window.toggleView = function(view) {
  const grid = document.getElementById('properties-grid');
  const btns = document.querySelectorAll('.sort-bar__view-btn');

  btns.forEach(btn => btn.classList.toggle('active', btn.dataset.view === view));
  if (grid) grid.classList.toggle('list-view', view === 'list');
};
