const hotels = [
  {
    id: 1,
    name: "Alpen Glamping",
    type: "glamping",
    typeLabel: "Глемпинг",
    city: "Сочи",
    region: "Краснодарский край",
    rating: 4.8,
    reviews: 124,
    price: 8500,
    oldPrice: 9800,
    promotion: true,
    discountPercent: 13,
    images: [
      "images/alpen-glamping.jpg",
      "images/sochi-mountains.png",
      "images/glamping-night.jpg"
    ],
    amenities: ["wifi", "pool", "parking", "spa", "restaurant"],
    coordinates: [43.6028, 39.7342],
    description: "Роскошные шатры в горах Сочи с панорамным видом на Чёрное море. Идеальное место для романтического отдыха и медитации среди природы. Каждый шатр оборудован комфортной кроватью, собственной ванной комнатой с горячей водой и террасой с видом на горы.",
    tags: ["Завтрак включён", "Бесплатная отмена"],
    rooms: [
      { name: "Шатр Deluxe", area: 35, guests: 2, price: 8500, amenities: ["Кондиционер", "Джакузи", "Мини-бар"], image: "images/alpen-glamping.jpg" },
      { name: "Шатр Family", area: 50, guests: 4, price: 12000, amenities: ["Кондиционер", "Детская площадка", "Барбекю"], image: "images/sochi-mountains.png" }
    ]
  },
  {
    id: 2,
    name: "Grand Hotel Moscow",
    type: "hotel",
    typeLabel: "Отель",
    city: "Москва",
    region: "Москва",
    rating: 4.9,
    reviews: 892,
    price: 15200,
    oldPrice: 18000,
    promotion: true,
    discountPercent: 17,
    promotion: true,
    discountPercent: 15,
    images: [
      "images/grand-hotel-moscow.jpg",
      "images/neva-river.jpg",
      "images/glamping-night.jpg"
    ],
    amenities: ["wifi", "pool", "parking", "spa", "restaurant", "gym"],
    coordinates: [55.7558, 37.6173],
    description: "Пятизвёздочный отель в историческом центре Москвы. Роскошные номера, ресторан с мишленовским шеф-поваром и спа-комплекс мирового уровня. Идеальное сочетание классической архитектуры и современного комфорта.",
    tags: ["Лучшая цена", "Завтрак включён"],
    rooms: [
      { name: "Стандарт", area: 28, guests: 2, price: 15200, amenities: ["Кондиционер", "Сейф", "Фен"], image: "images/grand-hotel-moscow.jpg" },
      { name: "Люкс", area: 55, guests: 2, price: 28000, amenities: ["Джакузи", "Гостиная", "Панорамный вид"], image: "images/neva-river.jpg" }
    ]
  },
  {
    id: 3,
    name: "Baikal Eco Lodge",
    type: "glamping",
    typeLabel: "Глемпинг",
    city: "Иркутск",
    region: "Иркутская область",
    rating: 4.7,
    reviews: 67,
    price: 6200,
    oldPrice: null,
    images: [
      "images/baikal-eco-lodge.jpg",
      "images/baikal-ice.jpg",
      "images/baikal-winter.jpg"
    ],
    amenities: ["wifi", "parking", "restaurant"],
    coordinates: [52.2870, 104.3050],
    description: "Экологичные купола на берегу Байкала. Уникальный опыт проживания с видом на самое глубокое озеро мира. Органические продукты и йога на рассвете. Идеально для тех, кто ищет гармонию с природой.",
    tags: ["Эко-отдых", "Можно с животными"],
    rooms: [
      { name: "Купол Standard", area: 25, guests: 2, price: 6200, amenities: ["Обогреватель", "Телескоп", "Чайник"], image: "images/baikal-eco-lodge.jpg" },
      { name: "Купол Panorama", area: 30, guests: 2, price: 8900, amenities: ["Панорамная крыша", "Телескоп", "Мини-бар"], image: "images/baikal-ice.jpg" }
    ]
  },
  {
    id: 4,
    name: "Neva Palace",
    type: "hotel",
    typeLabel: "Отель",
    city: "Санкт-Петербург",
    region: "Санкт-Петербург",
    rating: 4.6,
    reviews: 456,
    price: 9800,
    oldPrice: 11500,
    promotion: true,
    discountPercent: 15,
    images: [
      "images/neva-palace.jpg",
      "images/neva-river.jpg",
      "images/glamping-night.jpg"
    ],
    amenities: ["wifi", "parking", "restaurant", "gym"],
    coordinates: [59.9343, 30.3351],
    description: "Исторический отель на набережной Невы. Вид на Эрмитаж и Зимний дворец. Классический интерьер с элементами современного дизайна. Завтрак с видом на реку — незабываемое впечатление.",
    tags: ["Вид на реку", "Исторический центр"],
    rooms: [
      { name: "Классический", area: 30, guests: 2, price: 9800, amenities: ["Кондиционер", "Сейф", "Мини-бар"], image: "images/neva-palace.jpg" },
      { name: "Императорский", area: 60, guests: 2, price: 22000, amenities: ["Камин", "Гостиная", "Вид на Неву"], image: "images/neva-river.jpg" }
    ]
  },
  {
    id: 5,
    name: "Altai Spirit",
    type: "glamping",
    typeLabel: "Глемпинг",
    city: "Горно-Алтайск",
    region: "Республика Алтай",
    rating: 4.9,
    reviews: 203,
    price: 7500,
    oldPrice: 8900,
    promotion: true,
    discountPercent: 16,
    images: [
      "images/altai-spirit.jpg",
      "images/sochi-mountains.png",
      "images/glamping-night.jpg",
      "images/baikal-ice.jpg"
    ],
    amenities: ["wifi", "parking", "restaurant", "spa"],
    coordinates: [51.9580, 85.9600],
    description: "Шатры в сердце Алтайских гор. Горные реки, чистый воздух и звёздное небо. Идеально для активного отдыха и духовного восстановления. Экскурсии к водопадам и древним курганам включены.",
    tags: ["Горный воздух", "Экскурсии включены"],
    rooms: [
      { name: "Шатр River", area: 30, guests: 2, price: 7500, amenities: ["Обогреватель", "Вид на реку", "Барбекю"], image: "images/altai-spirit.jpg" },
      { name: "Шатр Mountain", area: 40, guests: 3, price: 9500, amenities: ["Панорамные окна", "Камин", "Терраса"], image: "images/sochi-mountains.png" }
    ]
  },
  {
    id: 6,
    name: "Kazan Kremlin Hotel",
    type: "hotel",
    typeLabel: "Отель",
    city: "Казань",
    region: "Татарстан",
    rating: 4.5,
    reviews: 312,
    price: 7200,
    oldPrice: null,
    images: [
      "images/kazan-kremlin.jpg",
      "images/neva-river.jpg",
      "images/glamping-night.jpg"
    ],
    amenities: ["wifi", "pool", "parking", "restaurant"],
    coordinates: [55.7963, 49.1088],
    description: "Современный отель в шаге от Казанского Кремля. Татарская гостеприимность, авторская кухня и комфортабельные номера для деловых и туристических поездок. Рядом с Кремлём и улицей Баумана.",
    tags: ["Рядом с Кремлём", "Авторская кухня"],
    rooms: [
      { name: "Бизнес", area: 28, guests: 2, price: 7200, amenities: ["Рабочий стол", "Кофемашина", "Сейф"], image: "images/kazan-kremlin.jpg" },
      { name: "Президентский", area: 70, guests: 4, price: 25000, amenities: ["Гостиная", "Кухня", "Вид на Кремль"], image: "images/neva-river.jpg" }
    ]
  },
  {
    id: 7,
    name: "Karelia Lakeside",
    type: "glamping",
    typeLabel: "Глемпинг",
    city: "Петрозаводск",
    region: "Карелия",
    rating: 4.7,
    reviews: 89,
    price: 5800,
    oldPrice: 6500,
    images: [
      "images/karelia-lakeside.jpg",
      "images/baikal-eco-lodge.jpg",
      "images/baikal-ice.jpg"
    ],
    amenities: ["wifi", "parking", "restaurant", "spa"],
    coordinates: [61.7849, 34.3469],
    description: "Уютные купола на берегу Онежского озера. Северное сияние зимой и белые ночи летом. Рыбалка, сауна и каякинг. Идеальное место для тех, кто ищет уединение и красоту северной природы.",
    tags: ["Вид на озеро", "Северное сияние"],
    rooms: [
      { name: "Купол Lake", area: 28, guests: 2, price: 5800, amenities: ["Обогреватель", "Вид на озеро", "Чайник"], image: "images/karelia-lakeside.jpg" },
      { name: "Купол Family", area: 45, guests: 4, price: 8200, amenities: ["Две спальни", "Кухня", "Терраса"], image: "images/baikal-eco-lodge.jpg" }
    ]
  },
  {
    id: 8,
    name: "Sochi Park Hotel",
    type: "hotel",
    typeLabel: "Отель",
    city: "Сочи",
    region: "Краснодарский край",
    rating: 4.4,
    reviews: 567,
    price: 8900,
    oldPrice: 10500,
    images: [
      "images/sochi-park.jpg",
      "images/sochi-panorama.jpg",
      "images/sochi-mountains.png"
    ],
    amenities: ["wifi", "pool", "parking", "spa", "restaurant", "gym"],
    coordinates: [43.6028, 39.7342],
    description: "Семейный отель рядом с Олимпийским парком. Аквапарк, детская анимация и собственный пляж. Идеально для отдыха с детьми. Все включено — от завтрака до вечернего шоу.",
    tags: ["Семейный", "Аквапарк"],
    rooms: [
      { name: "Family", area: 40, guests: 4, price: 8900, amenities: ["Детская кроватка", "Игровая зона", "Балкон"], image: "images/sochi-park.jpg" },
      { name: "Suite", area: 55, guests: 4, price: 15000, amenities: ["Гостиная", "Вид на море", "Джакузи"], image: "images/sochi-panorama.jpg" }
    ]
  },
  {
    id: 9,
    name: "Vladivostok Bay",
    type: "hotel",
    typeLabel: "Отель",
    city: "Владивосток",
    region: "Приморский край",
    rating: 4.6,
    reviews: 178,
    price: 6800,
    oldPrice: null,
    images: [
      "images/vladivostok-bay.jpg",
      "images/vladivostok-grand.jpg",
      "images/neva-river.jpg"
    ],
    amenities: ["wifi", "parking", "restaurant", "gym"],
    coordinates: [43.1155, 131.8855],
    description: "Отель на берегу Золотого Рога. Панорамные виды на мосты Владивостока и Тихий океан. Свежие морепродукты и японская кухня. Романтические ужины на террасе с видом на закат.",
    tags: ["Вид на мосты", "Морепродукты"],
    rooms: [
      { name: "Стандарт", area: 26, guests: 2, price: 6800, amenities: ["Кондиционер", "Сейф", "Фен"], image: "images/vladivostok-bay.jpg" },
      { name: "Panorama", area: 45, guests: 2, price: 12000, amenities: ["Панорамные окна", "Вид на залив", "Мини-бар"], image: "images/vladivostok-grand.jpg" }
    ]
  },
  {
    id: 10,
    name: "Tundra Domes",
    type: "glamping",
    typeLabel: "Глемпинг",
    city: "Мурманск",
    region: "Мурманская область",
    rating: 4.8,
    reviews: 45,
    price: 12000,
    oldPrice: 14500,
    promotion: true,
    discountPercent: 17,
    images: [
      "images/tundra-domes.jpg",
      "images/karelia-lakeside.jpg",
      "images/baikal-ice.jpg",
      "images/baikal-winter.jpg"
    ],
    amenities: ["wifi", "parking", "restaurant", "spa"],
    coordinates: [68.9585, 33.0827],
    description: "Стеклянные иглу для наблюдения за северным сиянием. Самый северный глемпинг России. Тёплые полы, панорамная крыша и фотограф-гид. Зимняя сказка, которую невозможно забыть.",
    tags: ["Северное сияние", "Фототур включён"],
    rooms: [
      { name: "Иглу Standard", area: 22, guests: 2, price: 12000, amenities: ["Тёплые полы", "Панорамная крыша", "Фото-зона"], image: "images/tundra-domes.jpg" },
      { name: "Иглу Premium", area: 30, guests: 2, price: 18000, amenities: ["Джакузи", "Приватная сауна", "Эксклюзивный тур"], image: "images/karelia-lakeside.jpg" }
    ]
  },
  {
    id: 11,
    name: "Golden Ring Inn",
    type: "hotel",
    typeLabel: "Отель",
    city: "Суздаль",
    region: "Владимирская область",
    rating: 4.5,
    reviews: 234,
    price: 5500,
    oldPrice: 6200,
    images: [
      "images/golden-ring-inn.png",
      "images/suzdal-church.jpg",
      "images/neva-river.jpg"
    ],
    amenities: ["wifi", "parking", "restaurant"],
    coordinates: [56.4270, 40.4430],
    description: "Традиционный русский отель в сердце Суздаля. Деревянная архитектура, русская баня и домашняя кухня. Прогулки по древнему городу, посещение монастырей и музеев.",
    tags: ["Русская баня", "Исторический центр"],
    rooms: [
      { name: "Традиционный", area: 25, guests: 2, price: 5500, amenities: ["Русская печь", "Деревянный интерьер", "Чайник"], image: "images/golden-ring-inn.png" },
      { name: "Боярский", area: 45, guests: 4, price: 9500, amenities: ["Камин", "Гостиная", "Вид на кремль"], image: "images/suzdal-church.jpg" }
    ]
  },
  {
    id: 12,
    name: "Kamchatka Wild",
    type: "glamping",
    typeLabel: "Глемпинг",
    city: "Петропавловск-Камчатский",
    region: "Камчатский край",
    rating: 4.9,
    reviews: 34,
    price: 15000,
    oldPrice: 18000,
    promotion: true,
    discountPercent: 17,
    promotion: true,
    discountPercent: 15,
    images: [
      "images/kamchatka-wild.jpg",
      "images/sochi-mountains.png",
      "images/altai-spirit.jpg"
    ],
    amenities: ["wifi", "parking", "restaurant", "spa"],
    coordinates: [53.0167, 158.6500],
    description: "Экстремальный глемпинг у подножия вулканов Камчатки. Геотермальные источники, медвежий watching и вертолётные экскурсии. Настоящий дикий край для смелых путешественников.",
    tags: ["Вулканы", "Геотермальные источники"],
    rooms: [
      { name: "Шатр Volcano", area: 30, guests: 2, price: 15000, amenities: ["Обогреватель", "Вид на вулкан", "Термос"], image: "images/kamchatka-wild.jpg" },
      { name: "Шатр Premium", area: 45, guests: 3, price: 22000, amenities: ["Приватный источник", "Гидро-массаж", "Экскурсии"], image: "images/sochi-mountains.png" }
    ]
  }
];

const cities = [
  { name: "Москва", region: "Москва", count: 245, image: "images/grand-hotel-moscow.jpg" },
  { name: "Санкт-Петербург", region: "Санкт-Петербург", count: 189, image: "images/neva-palace.jpg" },
  { name: "Сочи", region: "Краснодарский край", count: 156, image: "images/sochi-park.jpg" },
  { name: "Казань", region: "Татарстан", count: 98, image: "images/kazan-kremlin.jpg" },
  { name: "Иркутск", region: "Иркутская область", count: 67, image: "images/baikal-eco-lodge.jpg" },
  { name: "Горно-Алтайск", region: "Республика Алтай", count: 45, image: "images/altai-spirit.jpg" },
  { name: "Петрозаводск", region: "Карелия", count: 52, image: "images/karelia-lakeside.jpg" },
  { name: "Владивосток", region: "Приморский край", count: 78, image: "images/vladivostok-bay.jpg" },
  { name: "Мурманск", region: "Мурманская область", count: 23, image: "images/tundra-domes.jpg" },
  { name: "Суздаль", region: "Владимирская область", count: 34, image: "images/golden-ring-inn.png" },
  { name: "Петропавловск-Камчатский", region: "Камчатский край", count: 18, image: "images/kamchatka-wild.jpg" }
];

const reviews = [
  { name: "Анна К.", date: "15 июня 2026", rating: 5, text: "Невероятный опыт! Шатр был просторным, чистым и с потрясающим видом. Завтрак включал свежие местные продукты. Обязательно вернёмся!", property: "Alpen Glamping", propertyType: "Глемпинг", avatar: "АК", propertyImage: "images/alpen-glamping.jpg" },
  { name: "Михаил Р.", date: "10 июня 2026", rating: 5, text: "Лучший отель в Москве. Обслуживание на высшем уровне, ресторан просто волшебный. Номер Люкс превзошёл все ожидания.", property: "Grand Hotel Moscow", propertyType: "Отель", avatar: "МР", propertyImage: "images/grand-hotel-moscow.jpg" },
  { name: "Елена В.", date: "5 июня 2026", rating: 4, text: "Очень атмосферное место. Купол на берегу Байкала — это что-то невероятное. Единственный минус — немного шумно от ветра ночью.", property: "Baikal Eco Lodge", propertyType: "Глемпинг", avatar: "ЕВ", propertyImage: "images/baikal-eco-lodge.jpg" },
  { name: "Дмитрий С.", date: "1 июня 2026", rating: 5, text: "Вид из окна на Эрмитаж — бесценен. Историческая атмосфера, великолепный завтрак и внимательный персонал. Рекомендую!", property: "Neva Palace", propertyType: "Отель", avatar: "ДС", propertyImage: "images/neva-palace.jpg" },
  { name: "Ольга М.", date: "28 мая 2026", rating: 5, text: "Алтай — это магия! Шатр был очень уютным, а экскурсии организованы идеально. Особенно понравился поход к водопадам.", property: "Altai Spirit", propertyType: "Глемпинг", avatar: "ОМ", propertyImage: "images/altai-spirit.jpg" },
  { name: "Сергей П.", date: "20 мая 2026", rating: 4, text: "Отличный семейный отель. Дети в восторге от аквапарка. Номера чистые, питание разнообразное. Немного шумно в выходные.", property: "Sochi Park Hotel", propertyType: "Отель", avatar: "СП", propertyImage: "images/sochi-park.jpg" }
];

const categories = [
  { name: "Отели", icon: "🏨", count: 5420 },
  { name: "Глемпинги", icon: "⛺", count: 1280 },
  { name: "Апартаменты", icon: "🏠", count: 3450 },
  { name: "Виллы", icon: "🏛️", count: 890 },
  { name: "Хостелы", icon: "🛏️", count: 2100 }
];

const amenitiesList = [
  { id: "wifi", name: "Wi-Fi", icon: "📶" },
  { id: "pool", name: "Бассейн", icon: "🏊" },
  { id: "parking", name: "Парковка", icon: "🅿️" },
  { id: "spa", name: "SPA", icon: "💆" },
  { id: "restaurant", name: "Ресторан", icon: "🍽️" },
  { id: "gym", name: "Тренажёрный зал", icon: "💪" },
  { id: "pets", name: "Можно с животными", icon: "🐕" },
  { id: "cancel", name: "Бесплатная отмена", icon: "✓" }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { hotels, cities, reviews, categories, amenitiesList };
}
