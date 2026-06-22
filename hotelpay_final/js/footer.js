// ===== FOOTER FUNCTIONALITY =====

// Footer modal data (same as in index.html)
const footerModalData = {
  about: {
    title: 'О компании HotelPay',
    subtitle: 'Современная платформа для бронирования по всей России',
    content: `
      <p>HotelPay — это технологичная платформа для бронирования отелей, глемпингов и других объектов размещения по всей России. Мы объединяем более 10 000 объектов в одном удобном сервисе.</p>
      <h3>Наша миссия</h3>
      <p>Сделать путешествия по России доступными, удобными и незабываемыми. Мы верим, что каждый заслуживает идеального отдыха, и стремимся предоставить лучший сервис для его организации.</p>
      <h3>Цифры</h3>
      <ul>
        <li>Более 10 000 объектов размещения</li>
        <li>500 000+ довольных гостей</li>
        <li>Средний рейтинг 4.9</li>
        <li>Поддержка 24/7</li>
        <li>Более 50 городов России</li>
      </ul>
      <h3>Наши ценности</h3>
      <ul>
        <li><strong>Честность</strong> — прозрачные цены без скрытых комиссий</li>
        <li><strong>Качество</strong> — только проверенные объекты с реальными отзывами</li>
        <li><strong>Инновации</strong> — современные технологии для вашего комфорта</li>
        <li><strong>Забота</strong> — поддержка на каждом этапе путешествия</li>
      </ul>
    `
  },
  career: {
    title: 'Карьера в HotelPay',
    subtitle: 'Присоединяйтесь к команде профессионалов',
    content: `
      <p>Мы всегда в поиске талантливых людей, которые разделяют нашу страсть к путешествиям и технологиям.</p>
      <h3>Открытые вакансии</h3>
      <ul>
        <li><strong>Frontend-разработчик</strong> — React, Vue, современный CSS</li>
        <li><strong>Backend-разработчик</strong> — Node.js, Python, микросервисы</li>
        <li><strong>Product Manager</strong> — опыт в travel-tech от 2 лет</li>
        <li><strong>UX/UI Designer</strong> — портфолио, Figma</li>
        <li><strong>Customer Support</strong> — удалённо, гибкий график</li>
        <li><strong>Marketing Specialist</strong> — digital-маркетинг, SMM</li>
      </ul>
      <h3>Почему HotelPay?</h3>
      <ul>
        <li>Удалённый или гибридный формат работы</li>
        <li>Конкурентная зарплата и бонусы</li>
        <li>ДМС и спортивная абонемент</li>
        <li>Обучение и конференции за счёт компании</li>
        <li>Корпоративные путешествия по России</li>
      </ul>
      <p>Отправьте резюме на <a href="mailto:career@hotelpay.ru">career@hotelpay.ru</a></p>
    `
  },
  blog: {
    title: 'Блог HotelPay',
    subtitle: 'Путешествия, советы и вдохновение',
    content: `
      <h3>🔥 Популярные статьи</h3>
      <ul>
        <li><strong>Топ-10 глемпингов России 2026</strong> — лучшие места для комфортного отдыха на природе</li>
        <li><strong>Байкал зимой:</strong> что нужно знать перед поездкой</li>
        <li><strong>Камчатка за 7 дней:</strong> идеальный маршрут</li>
        <li><strong>Сочи vs Красная Поляна:</strong> где лучше остановиться</li>
        <li><strong>Золотое кольцо:</strong> автотур выходного дня</li>
      </ul>
      <h3>📝 Советы путешественникам</h3>
      <ul>
        <li>Как выбрать идеальный отель: 5 главных критериев</li>
        <li>Бронирование заранее vs спонтанные поездки: плюсы и минусы</li>
        <li>Что брать с собой в глемпинг: полный чек-лист</li>
        <li>Как экономить на проживании без потери комфорта</li>
      </ul>
      <h3>📸 Фотоотчёты</h3>
      <p>Ежемесячные подборки лучших фотографий от наших гостей. Делитесь своими впечатлениями с хэштегом #HotelPayTravel</p>
    `
  },
  help: {
    title: 'Центр помощи',
    subtitle: 'Ответы на часто задаваемые вопросы',
    content: `
      <h3>❓ Частые вопросы</h3>
      <h3>Как забронировать номер?</h3>
      <p>Выберите город, даты заезда и выезда, количество гостей — и нажмите «Найти». Выберите подходящий объект и следуйте инструкциям на экране.</p>

      <h3>Как отменить бронирование?</h3>
      <p>Бесплатная отмена доступна за 24 часа до заезда. Войдите в личный кабинет, перейдите в «Мои бронирования» и нажмите «Отменить».</p>

      <h3>Что такое гарантия лучшей цены?</h3>
      <p>Если вы найдёте тот же номер дешевле на другом сайте, мы вернём разницу и дадим скидку 10% на следующее бронирование.</p>

      <h3>Как использовать промокод?</h3>
      <p>Введите промокод на странице «Акции» или при оформлении бронирования. Скидка применится автоматически.</p>

      <h3>📞 Связь с нами</h3>
      <ul>
        <li>Телефон: 8 (800) 555-35-35 (бесплатно по России)</li>
        <li>Email: <a href="mailto:support@hotelpay.ru">support@hotelpay.ru</a></li>
        <li>Telegram: @HotelPaySupport</li>
        <li>Чат на сайте: круглосуточно</li>
      </ul>
      <p>Время ответа: в среднем 2 минуты в чате, до 4 часов по email.</p>
    `
  },
  terms: {
    title: 'Условия бронирования',
    subtitle: 'Правила использования платформы HotelPay',
    content: `
      <h3>1. Общие положения</h3>
      <p>Настоящие условия регулируют отношения между пользователем и платформой HotelPay при бронировании объектов размещения.</p>

      <h3>2. Порядок бронирования</h3>
      <ul>
        <li>Бронирование считается подтверждённым после оплаты и получения ваучера на email</li>
        <li>Заезд осуществляется по паспорту гостя, указанному при бронировании</li>
        <li>Время заезда — с 14:00, выезда — до 12:00 (могут отличаться у конкретного объекта)</li>
      </ul>

      <h3>3. Отмена и изменения</h3>
      <ul>
        <li>Бесплатная отмена за 24 часа до заезда</li>
        <li>При поздней отмене удерживается стоимость первой ночи</li>
        <li>Неприбытие (no-show) — списание полной стоимости бронирования</li>
        <li>Изменение дат возможно при наличии свободных номеров</li>
      </ul>

      <h3>4. Оплата</h3>
      <p>Принимаются банковские карты Visa, Mastercard, МИР, а также оплата через СБП и электронные кошельки. Все платежи защищены по стандарту PCI DSS.</p>

      <h3>5. Ответственность сторон</h3>
      <p>HotelPay выступает агентом между гостем и объектом размещения. Вопросы качества обслуживания решаются напрямую с администрацией отеля при содействии нашей службы поддержки.</p>
    `
  },
  privacy: {
    title: 'Политика конфиденциальности',
    subtitle: 'Как мы защищаем ваши данные',
    content: `
      <h3>1. Собираемые данные</h3>
      <p>Мы собираем только необходимую информацию: имя, контактные данные, данные паспорта (для заселения), историю бронирований.</p>

      <h3>2. Цели использования</h3>
      <ul>
        <li>Оформление и подтверждение бронирований</li>
        <li>Отправка уведомлений о статусе бронирования</li>
        <li>Персонализация рекомендаций</li>
        <li>Улучшение качества сервиса</li>
      </ul>

      <h3>3. Защита данных</h3>
      <ul>
        <li>Все данные передаются по зашифрованному соединению (SSL/TLS)</li>
        <li>Хранение на серверах в РФ, соответствие 152-ФЗ</li>
        <li>Регулярные аудиты безопасности</li>
        <li>Доступ к данным только уполномоченным сотрудникам</li>
      </ul>

      <h3>4. Передача третьим лицам</h3>
      <p>Данные передаются только объектам размещения для осуществления бронирования и уполномоченным платёжным системам. Мы не продаём данные рекламодателям.</p>

      <h3>5. Права пользователя</h3>
      <p>Вы имеете право на доступ, исправление, удаление своих данных, а также на отзыв согласия на обработку. Для этого напишите на <a href="mailto:privacy@hotelpay.ru">privacy@hotelpay.ru</a>.</p>
    `
  },
  contacts: {
    title: 'Контакты',
    subtitle: 'Мы всегда на связи',
    content: `
      <h3>📞 Телефон</h3>
      <p>8 (800) 555-35-35 — бесплатно по России<br>
      Режим работы: круглосуточно</p>

      <h3>✉️ Email</h3>
      <ul>
        <li>Общие вопросы: <a href="mailto:info@hotelpay.ru">info@hotelpay.ru</a></li>
        <li>Поддержка: <a href="mailto:support@hotelpay.ru">support@hotelpay.ru</a></li>
        <li>Партнёрам: <a href="mailto:partners@hotelpay.ru">partners@hotelpay.ru</a></li>
        <li>Жалобы и предложения: <a href="mailto:feedback@hotelpay.ru">feedback@hotelpay.ru</a></li>
      </ul>

      <h3>💬 Мессенджеры</h3>
      <ul>
        <li>Telegram: @HotelPaySupport</li>
        <li>WhatsApp: +7 (999) 123-45-67</li>
        <li>Viber: HotelPay</li>
      </ul>

      <h3>🏢 Офис</h3>
      <p>г. Москва, ул. Примерная, д. 42, офис 101<br>
      Пн-Пт: 10:00 — 19:00</p>

      <h3>📱 Социальные сети</h3>
      <p>VK, Telegram-канал — следите за акциями и новостями!</p>
    `
  }
};

function openFooterModal(type) {
  const data = footerModalData[type];
  if (!data) return;

  let modal = document.getElementById('footer-modal-overlay');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'footer-modal-overlay';
    modal.className = 'modal-overlay';
    modal.innerHTML = `
      <div class="footer-modal" onclick="event.stopPropagation()">
        <button class="footer-modal__close" onclick="closeFooterModal()">✕</button>
        <h2 class="footer-modal__title" id="footer-modal-title"></h2>
        <p class="footer-modal__subtitle" id="footer-modal-subtitle"></p>
        <div class="footer-modal__content" id="footer-modal-content"></div>
      </div>
    `;
    document.body.appendChild(modal);

    // Add styles if not present
    if (!document.getElementById('footer-modal-styles')) {
      const styles = document.createElement('style');
      styles.id = 'footer-modal-styles';
      styles.textContent = `
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(15, 10, 26, 0.9);
          z-index: 2000;
          display: none;
          align-items: center;
          justify-content: center;
          padding: 24px;
          backdrop-filter: blur(10px);
        }
        .modal-overlay.active {
          display: flex;
          animation: fadeIn 0.3s ease;
        }
        .footer-modal {
          background: var(--bg-card);
          border-radius: 24px;
          padding: 40px;
          max-width: 560px;
          width: 100%;
          max-height: 80vh;
          overflow-y: auto;
          animation: fadeInUp 0.4s ease;
          border: 1px solid rgba(168, 85, 247, 0.2);
          box-shadow: 0 0 40px rgba(217, 70, 239, 0.2);
          position: relative;
        }
        .footer-modal__close {
          position: absolute;
          top: 16px;
          right: 16px;
          width: 36px;
          height: 36px;
          background: rgba(168, 85, 247, 0.1);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-light);
          font-size: 1.2rem;
          transition: all 0.3s ease;
          border: none;
          cursor: pointer;
        }
        .footer-modal__close:hover {
          background: rgba(168, 85, 247, 0.3);
          color: var(--accent);
          transform: rotate(90deg);
        }
        .footer-modal__title {
          font-size: 1.5rem;
          font-weight: 800;
          margin-bottom: 8px;
          color: var(--text);
          padding-right: 40px;
        }
        .footer-modal__subtitle {
          color: var(--text-light);
          font-size: 0.95rem;
          margin-bottom: 24px;
        }
        .footer-modal__content {
          color: var(--text-light);
          line-height: 1.8;
          font-size: 0.95rem;
        }
        .footer-modal__content h3 {
          color: var(--text);
          font-size: 1.1rem;
          font-weight: 700;
          margin: 20px 0 8px;
        }
        .footer-modal__content p {
          margin-bottom: 12px;
        }
        .footer-modal__content ul {
          margin: 8px 0 16px 20px;
        }
        .footer-modal__content li {
          margin-bottom: 6px;
        }
        .footer-modal__content a {
          color: var(--accent);
          text-decoration: underline;
        }
        .footer-modal__content a:hover {
          color: var(--primary-light);
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `;
      document.head.appendChild(styles);
    }
  }

  document.getElementById('footer-modal-title').textContent = data.title;
  document.getElementById('footer-modal-subtitle').textContent = data.subtitle;
  document.getElementById('footer-modal-content').innerHTML = data.content;
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeFooterModal() {
  const modal = document.getElementById('footer-modal-overlay');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// Close on overlay click
document.addEventListener('click', function(e) {
  if (e.target.id === 'footer-modal-overlay') {
    closeFooterModal();
  }
});

// Close on Escape key
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    closeFooterModal();
  }
});
