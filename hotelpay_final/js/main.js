// ===== HOTELPAY MAIN =====

// Header scroll effect
const header = document.querySelector('.header');
if (header) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

// Mobile menu
const menuBtn = document.querySelector('.header__menu-btn');
const mobileMenu = document.querySelector('.mobile-menu');
if (menuBtn && mobileMenu) {
  menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
  });

  mobileMenu.querySelectorAll('.mobile-menu__link').forEach(link => {
    link.addEventListener('click', () => {
      menuBtn.classList.remove('active');
      mobileMenu.classList.remove('active');
      document.body.style.overflow = '';
    });
  });
}

// Search toggle
const searchToggle = document.querySelector('.header__search-toggle');
const searchBox = document.querySelector('.header__search');
if (searchToggle && searchBox) {
  searchToggle.addEventListener('click', () => {
    searchBox.classList.toggle('active');
    if (searchBox.classList.contains('active')) {
      searchBox.querySelector('input').focus();
    }
  });
}

// ===== GUESTS DROPDOWN =====
const guestsField = document.getElementById('guests-field');
const guestsDropdown = document.getElementById('guests-dropdown');
const guestsDisplay = document.getElementById('guests-display');

if (guestsField && guestsDropdown) {
  guestsField.addEventListener('click', (e) => {
    if (e.target.closest('.guests-counter')) return;
    guestsDropdown.classList.toggle('active');
  });

  document.addEventListener('click', (e) => {
    if (!guestsField.contains(e.target)) {
      guestsDropdown.classList.remove('active');
    }
  });
}

// Guests counter
document.querySelectorAll('.guests-counter').forEach(counter => {
  const minus = counter.querySelector('.guests-counter__btn--minus');
  const plus = counter.querySelector('.guests-counter__btn--plus');
  const value = counter.querySelector('.guests-counter__value');
  const min = parseInt(counter.dataset.min) || 0;

  if (minus && plus && value) {
    minus.addEventListener('click', () => {
      let current = parseInt(value.textContent);
      if (current > min) {
        value.textContent = current - 1;
        minus.disabled = current - 1 <= min;
        updateGuestsDisplay();
      }
    });

    plus.addEventListener('click', () => {
      let current = parseInt(value.textContent);
      if (current < 10) {
        value.textContent = current + 1;
        minus.disabled = false;
        updateGuestsDisplay();
      }
    });
  }
});

function updateGuestsDisplay() {
  if (!guestsDisplay) return;
  const adults = document.querySelector('.guests-row[data-type="adults"] .guests-counter__value');
  const children = document.querySelector('.guests-row[data-type="children"] .guests-counter__value');
  const rooms = document.querySelector('.guests-row[data-type="rooms"] .guests-counter__value');

  const a = adults ? parseInt(adults.textContent) : 2;
  const c = children ? parseInt(children.textContent) : 0;
  const r = rooms ? parseInt(rooms.textContent) : 1;

  const totalGuests = a + c;
  const guestWord = totalGuests === 1 ? 'гость' : totalGuests < 5 ? 'гостя' : 'гостей';
  const roomWord = r === 1 ? 'номер' : r < 5 ? 'номера' : 'номеров';

  guestsDisplay.textContent = `${totalGuests} ${guestWord}, ${r} ${roomWord}`;
}

// ===== AUTOCOMPLETE =====
const destinationInput = document.getElementById('destination-input');
const autocompleteDropdown = document.getElementById('autocomplete-dropdown');

if (destinationInput && autocompleteDropdown && typeof cities !== 'undefined') {
  destinationInput.addEventListener('input', () => {
    const value = destinationInput.value.toLowerCase();
    if (value.length < 1) {
      autocompleteDropdown.classList.remove('active');
      return;
    }

    const matches = cities.filter(c => c.name.toLowerCase().includes(value));
    if (matches.length > 0) {
      autocompleteDropdown.innerHTML = matches.map(city => `
        <div class="autocomplete-item" onclick="selectCity('${city.name}')">
          <div class="autocomplete-item__icon">📍</div>
          <div class="autocomplete-item__info">
            <div class="autocomplete-item__name">${city.name}</div>
            <div class="autocomplete-item__desc">${city.region} · ${city.count} объектов</div>
          </div>
        </div>
      `).join('');
      autocompleteDropdown.classList.add('active');
    } else {
      autocompleteDropdown.classList.remove('active');
    }
  });

  document.addEventListener('click', (e) => {
    if (!destinationInput.contains(e.target) && !autocompleteDropdown.contains(e.target)) {
      autocompleteDropdown.classList.remove('active');
    }
  });
}

function selectCity(name) {
  if (destinationInput) destinationInput.value = name;
  if (autocompleteDropdown) autocompleteDropdown.classList.remove('active');
}

function searchHotels() {
  const city = destinationInput ? destinationInput.value : '';
  const checkin = document.getElementById('checkin-date')?.value;
  const checkout = document.getElementById('checkout-date')?.value;

  let url = 'catalog.html';
  const params = [];
  if (city) params.push(`city=${encodeURIComponent(city)}`);
  if (checkin) params.push(`checkin=${checkin}`);
  if (checkout) params.push(`checkout=${checkout}`);

  if (params.length > 0) url += '?' + params.join('&');
  location.href = url;
}

// ===== FAVORITES =====
function updateFavoritesBadge() {
  const favorites = JSON.parse(localStorage.getItem('hotelpay_favorites') || '[]');
  const badge = document.querySelector('.header__btn-badge');
  if (badge) {
    badge.textContent = favorites.length;
    badge.style.display = favorites.length > 0 ? 'flex' : 'none';
  }
}

function toggleFavorite(hotelId, btn) {
  let favorites = JSON.parse(localStorage.getItem('hotelpay_favorites') || '[]');
  const index = favorites.indexOf(hotelId);

  if (index > -1) {
    favorites.splice(index, 1);
    btn.classList.remove('active');
    btn.innerHTML = '🤍';
  } else {
    favorites.push(hotelId);
    btn.classList.add('active');
    btn.innerHTML = '❤️';
  }

  localStorage.setItem('hotelpay_favorites', JSON.stringify(favorites));
  updateFavoritesBadge();
}

// ===== RENDER CATALOG =====

// Remove from favorites (for profile page)
function removeFromFavorites(hotelId, btn) {
  let favorites = JSON.parse(localStorage.getItem('hotelpay_favorites') || '[]');
  var index = favorites.indexOf(hotelId);

  if (index > -1) {
    favorites.splice(index, 1);
    localStorage.setItem('hotelpay_favorites', JSON.stringify(favorites));

    // Remove the card from DOM with smooth animation
    var card = btn.closest('.property-card');
    if (card) {
      card.classList.add('removing');
      setTimeout(function() {
        card.remove();
        // Check if empty and show empty state
        var grid = document.getElementById('favorites-grid');
        if (grid && grid.children.length === 0) {
          renderProfileFavorites();
        }
        // Update badge
        updateFavoritesBadge();
      }, 400);
    }
  }
}

function renderCatalog() {
  const grid = document.getElementById('properties-grid');
  if (!grid || typeof hotels === 'undefined') return;

  const urlParams = new URLSearchParams(window.location.search);
  const type = urlParams.get('type');
  const city = urlParams.get('city');

  let filteredHotels = hotels;
  if (type) filteredHotels = hotels.filter(h => h.type === type);
  if (city) filteredHotels = hotels.filter(h => h.city === city);

  const countEl = document.querySelector('.sort-bar__count strong');
  if (countEl) countEl.textContent = filteredHotels.length;
  const titleEl = document.querySelector('.catalog-header__title');
  if (titleEl) titleEl.textContent = `Найдено ${filteredHotels.length} объектов`;

  if (filteredHotels.length === 0) {
    grid.innerHTML = `
      <div class="empty-state" style="grid-column: 1/-1;">
        <div class="empty-state__icon">🔍</div>
        <div class="empty-state__title">Ничего не найдено</div>
        <div class="empty-state__text">Попробуйте изменить параметры поиска</div>
        <a href="catalog.html" class="empty-state__btn">Сбросить фильтры</a>
      </div>
    `;
    return;
  }

  const favorites = JSON.parse(localStorage.getItem('hotelpay_favorites') || '[]');

  grid.innerHTML = filteredHotels.map(hotel => {
    const isFav = favorites.includes(hotel.id);
    const stars = Math.floor(hotel.rating);
    const ratingText = hotel.rating >= 4.8 ? 'Превосходно' : hotel.rating >= 4.5 ? 'Отлично' : 'Хорошо';

    return `
    <article class="property-card" data-hotel-id="${hotel.id}">
      <div class="property-card__gallery">
        <div class="property-card__img" style="background-image: url('${hotel.images[0]}')"></div>
        ${hotel.promotion ? `<span class="property-card__badge property-card__badge--promotion">АКЦИЯ -${hotel.discountPercent}%</span>` : ''}
        ${hotel.oldPrice && !hotel.promotion ? `<span class="property-card__badge">Лучшая цена</span>` : ''}
        <button class="property-card__favorite ${isFav ? 'active' : ''}" data-hotel-id="${hotel.id}" onclick="event.stopPropagation(); toggleFavorite(${hotel.id}, this)">${isFav ? '❤️' : '🤍'}</button>
        <div class="property-card__gallery-nav">
          ${hotel.images.map((_, i) => `<span class="property-card__gallery-dot ${i === 0 ? 'active' : ''}"></span>`).join('')}
        </div>
      </div>
      <div class="property-card__content">
        <div class="property-card__header">
          <div>
            <h3 class="property-card__name">${hotel.name}</h3>
            <div class="property-card__stars">${'⭐'.repeat(stars)}</div>
          </div>
          <div class="property-card__rating">
            <span class="property-card__rating-score">${hotel.rating}</span>
            <span class="property-card__rating-text">${ratingText}</span>
          </div>
        </div>
        <div class="property-card__location">📍 ${hotel.city}, ${hotel.region}</div>
        <p class="property-card__desc">${hotel.description}</p>
        <div class="property-card__tags">
          ${hotel.tags.map(tag => `<span class="property-card__tag ${tag.includes('Бесплатная') || tag.includes('Экскурсии') ? 'property-card__tag--orange' : ''}">${tag}</span>`).join('')}
        </div>
        <div class="property-card__footer">
          <div class="property-card__price">
            <span class="property-card__price-value">${hotel.price.toLocaleString('ru-RU')} ₽</span>
            <span class="property-card__price-unit">/ночь</span>
            ${hotel.oldPrice ? `<span class="property-card__price-old">${hotel.oldPrice.toLocaleString('ru-RU')} ₽</span>` : ''}
          </div>
          <a href="property.html?id=${hotel.id}" class="property-card__btn">Забронировать</a>
        </div>
      </div>
    </article>
  `}).join('');
}

// ===== RENDER PROPERTY PAGE =====
function renderPropertyPage() {
  const urlParams = new URLSearchParams(window.location.search);
  const hotelId = parseInt(urlParams.get('id'));
  if (!hotelId || typeof hotels === 'undefined') return;

  const hotel = hotels.find(h => h.id === hotelId);
  if (!hotel) return;

  document.title = `${hotel.name} — HotelPay`;

  const galleryMain = document.querySelector('.property-gallery__main');
  const galleryThumbs = document.querySelectorAll('.property-gallery__thumb');
  if (galleryMain) galleryMain.style.backgroundImage = `url('${hotel.images[0]}')`;
  galleryThumbs.forEach((thumb, i) => {
    if (hotel.images[i + 1]) {
      thumb.style.backgroundImage = `url('${hotel.images[i + 1]}')`;
    }
  });

  const titleEl = document.querySelector('.property-info__title');
  if (titleEl) titleEl.textContent = hotel.name;

  const ratingScore = document.querySelector('.property-info__rating-score');
  if (ratingScore) ratingScore.textContent = hotel.rating;

  const ratingText = document.querySelector('.property-info__rating-text');
  if (ratingText) ratingText.textContent = hotel.rating >= 4.8 ? 'Превосходно' : hotel.rating >= 4.5 ? 'Отлично' : 'Хорошо';

  const ratingCount = document.querySelector('.property-info__rating-count');
  if (ratingCount) ratingCount.textContent = `· ${hotel.reviews} отзывов`;

  const locationEl = document.querySelector('.property-info__location');
  if (locationEl) locationEl.innerHTML = `📍 ${hotel.city}, ${hotel.region}, Россия`;

  const descEl = document.querySelector('.property-desc__text');
  if (descEl) descEl.textContent = hotel.description;

  const badgesEl = document.querySelector('.property-info__badges');
  if (badgesEl) badgesEl.innerHTML = hotel.tags.map(tag => `<span class="property-info__badge">${tag}</span>`).join('');

  const amenitiesGrid = document.getElementById('amenities-grid');
  if (amenitiesGrid && typeof amenitiesList !== 'undefined') {
    amenitiesGrid.innerHTML = hotel.amenities.map(amenityId => {
      const amenity = amenitiesList.find(a => a.id === amenityId);
      return amenity ? `
        <div class="amenity-item">
          <div class="amenity-item__icon">${amenity.icon}</div>
          <span class="amenity-item__name">${amenity.name}</span>
        </div>
      ` : '';
    }).join('');
  }

  const roomsContainer = document.getElementById('rooms-container');
  if (roomsContainer) {
    roomsContainer.innerHTML = hotel.rooms.map((room, i) => `
      <div class="room-card">
        <div class="room-card__img" style="background-image: url('${room.image}')"></div>
        <div class="room-card__info">
          <h3 class="room-card__name">${room.name}</h3>
          <div class="room-card__details">
            <span class="room-card__detail">📐 ${room.area} м²</span>
            <span class="room-card__detail">👥 До ${room.guests} гостей</span>
          </div>
          <div class="room-card__amenities">
            ${room.amenities.map(a => `<span class="room-card__amenity">${a}</span>`).join('')}
          </div>
        </div>
        <div class="room-card__price-block">
          <div class="room-card__price">
            <span class="room-card__price-value">${room.price.toLocaleString('ru-RU')} ₽</span>
            <span class="room-card__price-unit">/ночь</span>
          </div>
          <a href="booking.html?hotel=${hotel.id}&room=${i}" class="room-card__btn">Выбрать</a>
        </div>
      </div>
    `).join('');
  }

  const widgetPrice = document.querySelector('.booking-widget__price-value');
  if (widgetPrice) widgetPrice.textContent = `${hotel.price.toLocaleString('ru-RU')} ₽`;

  const widgetBtn = document.querySelector('.booking-widget__btn');
  if (widgetBtn) widgetBtn.href = `booking.html?hotel=${hotel.id}`;

  const similarGrid = document.getElementById('similar-grid');
  if (similarGrid) {
    const similar = hotels.filter(h => h.id !== hotel.id && (h.city === hotel.city || h.type === hotel.type)).slice(0, 2);
    similarGrid.innerHTML = similar.map(h => {
      const isFav = JSON.parse(localStorage.getItem('hotelpay_favorites') || '[]').includes(h.id);
      return `
        <article class="property-card">
          <div class="property-card__gallery">
            <div class="property-card__img" style="background-image: url('${h.images[0]}')"></div>
            <button class="property-card__favorite ${isFav ? 'active' : ''}" data-hotel-id="${h.id}" onclick="event.stopPropagation(); toggleFavorite(${h.id}, this)">${isFav ? '❤️' : '🤍'}</button>
          </div>
          <div class="property-card__content">
            <div class="property-card__header">
              <div><h3 class="property-card__name">${h.name}</h3></div>
              <div class="property-card__rating"><span class="property-card__rating-score">${h.rating}</span></div>
            </div>
            <div class="property-card__location">📍 ${h.city}</div>
            <div class="property-card__footer">
              <div class="property-card__price">
                <span class="property-card__price-value">${h.price.toLocaleString('ru-RU')} ₽</span>
                <span class="property-card__price-unit">/ночь</span>
              </div>
              <a href="property.html?id=${h.id}" class="property-card__btn">Забронировать</a>
            </div>
          </div>
        </article>
      `;
    }).join('');
  }

  const favBtn = document.querySelector('.property-card__favorite');
  if (favBtn) {
    const favorites = JSON.parse(localStorage.getItem('hotelpay_favorites') || '[]');
    if (favorites.includes(hotel.id)) {
      favBtn.classList.add('active');
      favBtn.innerHTML = '❤️';
    }
  }
}

// ===== RENDER POPULAR DESTINATIONS =====
function renderDestinations() {
  const grid = document.getElementById('popular-grid');
  if (!grid || typeof cities === 'undefined') return;

  const featuredCities = cities.slice(0, 4);
  grid.innerHTML = featuredCities.map(city => `
    <div class="destination-card" onclick="location.href='catalog.html?city=${city.name}'">
      <div class="destination-card__img" style="background-image: url('${city.image}')"></div>
      <div class="destination-card__overlay">
        <div class="destination-card__name">${city.name}</div>
        <div class="destination-card__info">
          <span class="destination-card__price">от ${(Math.random() * 5000 + 5000).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} ₽</span>
          <span class="destination-card__rating">⭐ ${(4.5 + Math.random() * 0.5).toFixed(1)}</span>
        </div>
      </div>
      <button class="destination-card__btn">Смотреть</button>
    </div>
  `).join('');
}

// ===== RENDER REVIEWS =====
function renderReviews() {
  const track = document.getElementById('reviews-track');
  if (!track || typeof reviews === 'undefined') return;

  track.innerHTML = reviews.map(review => `
    <div class="review-card">
      <div class="review-card__header">
        <div class="review-card__avatar">${review.avatar}</div>
        <div class="review-card__meta">
          <div class="review-card__name">${review.name}</div>
          <div class="review-card__date">${review.date}</div>
        </div>
      </div>
      <div class="review-card__rating">${'⭐'.repeat(review.rating)}</div>
      <div class="review-card__text">${review.text}</div>
      <div class="review-card__property">
        <div class="review-card__property-img" style="background-image: url('${review.propertyImage}')"></div>
        <div>
          <div class="review-card__property-name">${review.property}</div>
          <div class="review-card__property-type">${review.propertyType}</div>
        </div>
      </div>
    </div>
  `).join('');

  // Reviews carousel
  let currentReview = 0;
  const reviewCards = track.querySelectorAll('.review-card');
  const dotsContainer = document.getElementById('reviews-dots');

  if (dotsContainer && reviewCards.length > 0) {
    dotsContainer.innerHTML = Array.from({length: Math.ceil(reviewCards.length / 3)}).map((_, i) => 
      `<div class="reviews__dot ${i === 0 ? 'active' : ''}" onclick="goToReview(${i})"></div>`
    ).join('');
  }

  const prevBtn = document.getElementById('reviews-prev');
  const nextBtn = document.getElementById('reviews-next');

  if (prevBtn) prevBtn.addEventListener('click', () => goToReview(currentReview - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => goToReview(currentReview + 1));
}

function goToReview(index) {
  const track = document.getElementById('reviews-track');
  const dots = document.querySelectorAll('.reviews__dot');
  if (!track) return;

  const cards = track.querySelectorAll('.review-card');
  const maxIndex = Math.max(0, Math.ceil(cards.length / 3) - 1);
  currentReview = Math.max(0, Math.min(index, maxIndex));

  const cardWidth = cards[0]?.offsetWidth + 24 || 400;
  track.style.transform = `translateX(-${currentReview * cardWidth * 3}px)`;

  dots.forEach((dot, i) => dot.classList.toggle('active', i === currentReview));
}

// ===== STATS =====
function updateStats() {
  const grid = document.getElementById('stats-grid');
  if (!grid) return;

  const stats = [
    { value: '10,000+', label: 'Объектов размещения' },
    { value: '500K+', label: 'Довольных гостей' },
    { value: '4.9', label: 'Средний рейтинг' },
    { value: '24/7', label: 'Поддержка' }
  ];

  grid.innerHTML = stats.map(stat => `
    <div class="stats__item animate-on-scroll">
      <div class="stats__value">${stat.value}</div>
      <div class="stats__label">${stat.label}</div>
    </div>
  `).join('');
}

// ===== PROFILE TABS =====
function switchTab(tabId, link) {
  document.querySelectorAll('.profile-tab').forEach(t => t.style.display = 'none');
  document.querySelectorAll('.profile-sidebar__link').forEach(l => l.classList.remove('active'));

  const tab = document.getElementById(tabId);
  if (tab) tab.style.display = 'block';
  if (link) link.classList.add('active');

  if (tabId === 'favorites') renderProfileFavorites();
}

function renderProfileFavorites() {
  const grid = document.getElementById('favorites-grid');
  if (!grid || typeof hotels === 'undefined') return;

  const favorites = JSON.parse(localStorage.getItem('hotelpay_favorites') || '[]');
  const favHotels = hotels.filter(h => favorites.includes(h.id));

  if (favHotels.length === 0) {
    grid.innerHTML = `
      <div class="empty-state" style="grid-column: 1/-1;">
        <div class="empty-state__icon">💜</div>
        <div class="empty-state__title">Избранное пусто</div>
        <div class="empty-state__text">Добавьте отели в избранное, чтобы они появились здесь</div>
        <a href="catalog.html" class="empty-state__btn">Перейти в каталог</a>
      </div>
    `;
    return;
  }

  grid.innerHTML = favHotels.map(hotel => `
    <article class="property-card">
      <div class="property-card__gallery">
        <div class="property-card__img" style="background-image: url('${hotel.images[0]}')"></div>
      </div>
      <div class="property-card__content">
        <div class="property-card__header">
          <div>
            <h3 class="property-card__name">${hotel.name}</h3>
            <div class="property-card__stars">${'⭐'.repeat(Math.floor(hotel.rating))}</div>
          </div>
          <div class="property-card__rating">
            <span class="property-card__rating-score">${hotel.rating}</span>
          </div>
        </div>
        <div class="property-card__location">📍 ${hotel.city}</div>
        <div class="property-card__footer">
          <div class="property-card__price">
            <span class="property-card__price-value">${hotel.price.toLocaleString('ru-RU')} ₽</span>
            <span class="property-card__price-unit">/ночь</span>
          </div>
          <a href="property.html?id=${hotel.id}" class="property-card__btn">Забронировать</a>
        </div>
      </div>
      <div class="favorite-remove-wrapper">
        <button class="favorite-remove-btn" onclick="removeFromFavorites(${hotel.id}, this)">
          <span class="favorite-remove-icon">🗑</span>
          <span class="favorite-remove-text">Удалить из избранного</span>
        </button>
      </div>
    </article>
  `).join('');
}

// ===== FILTERS =====
function toggleFilter(title) {
  const toggle = title.querySelector('.filters__section-toggle');
  if (toggle) toggle.classList.toggle('rotated');
  const list = title.nextElementSibling;
  if (list) list.style.display = list.style.display === 'none' ? 'flex' : 'none';
}

function filterByType(type) {
  console.log('Filter by type:', type);
}

function filterByRating(rating) {
  console.log('Filter by rating:', rating);
}

function filterByAmenity(amenity) {
  console.log('Filter by amenity:', amenity);
}

function sortHotels(value) {
  console.log('Sort by:', value);
}

function toggleView(view) {
  const grid = document.getElementById('properties-grid');
  const btns = document.querySelectorAll('.sort-bar__view-btn');

  btns.forEach(btn => btn.classList.toggle('active', btn.dataset.view === view));
  if (grid) grid.classList.toggle('list-view', view === 'list');
}

// ===== FILTERS MOBILE =====
const filtersToggle = document.getElementById('filters-toggle');
const filtersSidebar = document.getElementById('filters-sidebar');
const filtersClose = document.getElementById('filters-close');

if (filtersToggle && filtersSidebar) {
  filtersToggle.addEventListener('click', () => {
    filtersSidebar.classList.add('active');
    document.body.style.overflow = 'hidden';
  });
}

if (filtersClose && filtersSidebar) {
  filtersClose.addEventListener('click', () => {
    filtersSidebar.classList.remove('active');
    document.body.style.overflow = '';
  });
}

// ===== LIGHTBOX =====
let currentImage = 0;
let lightboxImages = [];

function openLightbox(index) {
  const lightbox = document.getElementById('lightbox');
  if (!lightbox) return;

  const urlParams = new URLSearchParams(window.location.search);
  const hotelId = parseInt(urlParams.get('id'));
  const hotel = hotels?.find(h => h.id === hotelId);

  if (hotel) {
    lightboxImages = hotel.images;
    currentImage = index;
    showLightboxImage();
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeLightbox() {
  const lightbox = document.getElementById('lightbox');
  if (lightbox) {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }
}

function showLightboxImage() {
  const img = document.getElementById('lightbox-img');
  const counter = document.getElementById('lightbox-counter');
  if (img) img.src = lightboxImages[currentImage];
  if (counter) counter.textContent = `${currentImage + 1} / ${lightboxImages.length}`;
}

function nextImage() {
  currentImage = (currentImage + 1) % lightboxImages.length;
  showLightboxImage();
}

function prevImage() {
  currentImage = (currentImage - 1 + lightboxImages.length) % lightboxImages.length;
  showLightboxImage();
}

function toggleDesc() {
  const text = document.getElementById('property-desc-text');
  const toggle = document.getElementById('desc-toggle');
  if (text && toggle) {
    text.classList.toggle('collapsed');
    toggle.textContent = text.classList.contains('collapsed') ? 'Читать полностью ▼' : 'Скрыть ▲';
  }
}

// ===== BOOKING =====
function selectPayment(el, method) {
  document.querySelectorAll('.payment-method').forEach(m => m.classList.remove('active'));
  el.classList.add('active');
}

function submitBooking() {
  const firstname = document.getElementById('guest-firstname')?.value;
  const lastname = document.getElementById('guest-lastname')?.value;
  const email = document.getElementById('guest-email')?.value;
  const phone = document.getElementById('guest-phone')?.value;
  const terms = document.getElementById('terms-agree')?.checked;

  let hasError = false;

  if (!firstname) {
    document.getElementById('guest-firstname')?.closest('.form-group')?.classList.add('error');
    hasError = true;
  } else {
    document.getElementById('guest-firstname')?.closest('.form-group')?.classList.remove('error');
  }

  if (!lastname) {
    document.getElementById('guest-lastname')?.closest('.form-group')?.classList.add('error');
    hasError = true;
  } else {
    document.getElementById('guest-lastname')?.closest('.form-group')?.classList.remove('error');
  }

  if (!email || !email.includes('@')) {
    document.getElementById('guest-email')?.closest('.form-group')?.classList.add('error');
    hasError = true;
  } else {
    document.getElementById('guest-email')?.closest('.form-group')?.classList.remove('error');
  }

  if (!phone) {
    document.getElementById('guest-phone')?.closest('.form-group')?.classList.add('error');
    hasError = true;
  } else {
    document.getElementById('guest-phone')?.closest('.form-group')?.classList.remove('error');
  }

  if (!terms) {
    alert('Пожалуйста, примите условия бронирования');
    hasError = true;
  }

  if (!hasError) {
    const modal = document.getElementById('success-modal');
    if (modal) modal.classList.add('active');
  }
}

// ===== SUBSCRIBE =====
function subscribeNews() {
  const email = document.getElementById('subscribe-email')?.value;
  if (email && email.includes('@')) {
    alert('Спасибо за подписку!');
  } else {
    alert('Введите корректный email');
  }
}

// ===== ANIMATIONS =====
function initAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  updateFavoritesBadge();
  initAnimations();

  // Render page-specific content
  if (document.getElementById('popular-grid')) renderDestinations();
  if (document.getElementById('reviews-track')) renderReviews();
  if (document.getElementById('properties-grid')) renderCatalog();
  if (document.querySelector('.property-info')) renderPropertyPage();
  if (document.getElementById('favorites-grid')) renderProfileFavorites();
  updateStats();

  // Set default dates
  const checkin = document.getElementById('checkin-date');
  const checkout = document.getElementById('checkout-date');
  if (checkin) {
    const today = new Date();
    checkin.value = today.toISOString().split('T')[0];
  }
  if (checkout) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 2);
    checkout.value = tomorrow.toISOString().split('T')[0];
  }
});


// ===== BOOKING HISTORY =====
function saveBooking(bookingData) {
  const bookings = JSON.parse(localStorage.getItem('hotelpay_bookings') || '[]');
  bookings.push({
    ...bookingData,
    id: 'HP-' + Date.now(),
    createdAt: new Date().toISOString(),
    status: 'active'
  });
  localStorage.setItem('hotelpay_bookings', JSON.stringify(bookings));
}

function getBookings() {
  return JSON.parse(localStorage.getItem('hotelpay_bookings') || '[]');
}

function renderBookings() {
  const container = document.getElementById('bookings-list');
  if (!container) return;

  const bookings = getBookings();

  if (bookings.length === 0) {
    container.innerHTML = `
      <div class="empty-state" style="padding: 48px 24px;">
        <div class="empty-state__icon">📋</div>
        <div class="empty-state__title">У вас пока нет бронирований</div>
        <div class="empty-state__text">Забронируйте отель или глемпинг, и он появится здесь</div>
        <a href="catalog.html" class="empty-state__btn">Найти жильё</a>
      </div>
    `;
    return;
  }

  container.innerHTML = bookings.map(b => `
    <div class="booking-card">
      <div class="booking-card__img" style="background: linear-gradient(135deg, #667eea, #764ba2)"></div>
      <div class="booking-card__info">
        <h3 class="booking-card__name">${b.hotelName || 'Отель'}</h3>
        <div class="booking-card__dates">
          <span>📅</span>
          <span>${b.checkin} — ${b.checkout}</span>
        </div>
        <div class="booking-card__guests">👥 ${b.guests} · ${b.rooms} номер</div>
        <span class="booking-card__status booking-card__status--active">● Активно</span>
      </div>
      <div class="booking-card__actions">
        <button class="booking-card__btn booking-card__btn--secondary" onclick="alert('Ваучер скачан!')">Скачать ваучер</button>
        <button class="booking-card__btn booking-card__btn--primary" onclick="cancelBooking('${b.id}')">Отменить</button>
      </div>
    </div>
  `).join('');
}

function cancelBooking(bookingId) {
  let bookings = getBookings();
  bookings = bookings.filter(b => b.id !== bookingId);
  localStorage.setItem('hotelpay_bookings', JSON.stringify(bookings));
  renderBookings();
  alert('Бронирование отменено');
}

// Override submitBooking to save data
const originalSubmitBooking = window.submitBooking;
window.submitBooking = function() {
  const firstname = document.getElementById('guest-firstname')?.value;
  const lastname = document.getElementById('guest-lastname')?.value;
  const email = document.getElementById('guest-email')?.value;
  const phone = document.getElementById('guest-phone')?.value;
  const terms = document.getElementById('terms-agree')?.checked;

  let hasError = false;

  if (!firstname) {
    document.getElementById('guest-firstname')?.closest('.form-group')?.classList.add('error');
    hasError = true;
  } else {
    document.getElementById('guest-firstname')?.closest('.form-group')?.classList.remove('error');
  }

  if (!lastname) {
    document.getElementById('guest-lastname')?.closest('.form-group')?.classList.add('error');
    hasError = true;
  } else {
    document.getElementById('guest-lastname')?.closest('.form-group')?.classList.remove('error');
  }

  if (!email || !email.includes('@')) {
    document.getElementById('guest-email')?.closest('.form-group')?.classList.add('error');
    hasError = true;
  } else {
    document.getElementById('guest-email')?.closest('.form-group')?.classList.remove('error');
  }

  if (!phone) {
    document.getElementById('guest-phone')?.closest('.form-group')?.classList.add('error');
    hasError = true;
  } else {
    document.getElementById('guest-phone')?.closest('.form-group')?.classList.remove('error');
  }

  if (!terms) {
    alert('Пожалуйста, примите условия бронирования');
    hasError = true;
  }

  if (!hasError) {
    // Save booking
    const urlParams = new URLSearchParams(window.location.search);
    const hotelId = urlParams.get('hotel');
    const hotel = hotels?.find(h => h.id == hotelId);

    saveBooking({
      hotelName: hotel?.name || 'Отель',
      checkin: '18 июня 2026',
      checkout: '20 июня 2026',
      guests: '2 взрослых',
      rooms: '1',
      price: '17 000 ₽'
    });

    const modal = document.getElementById('success-modal');
    if (modal) modal.classList.add('active');
  }
};

// Render bookings on profile page
if (document.getElementById('bookings-list')) {
  renderBookings();
}
