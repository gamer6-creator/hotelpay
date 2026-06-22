// ===== SUPPORT CHAT WIDGET =====
(function() {
  // Create chat widget
  const chatWidget = document.createElement('div');
  chatWidget.id = 'support-chat-widget';
  chatWidget.innerHTML = `
    <div id="chat-button" onclick="toggleChat()">
      <span>💬</span>
    </div>
    <div id="chat-window">
      <div id="chat-header">
        <span>🎧 Поддержка HotelPay</span>
        <button onclick="toggleChat()">✕</button>
      </div>
      <div id="chat-messages">
        <div class="chat-message admin">
          <div class="chat-avatar">👤</div>
          <div class="chat-bubble">
            <div class="chat-name">Администратор</div>
            <div class="chat-text">Здравствуйте! Чем могу помочь?</div>
            <div class="chat-time">${new Date().toLocaleTimeString('ru-RU', {hour: '2-digit', minute:'2-digit'})}</div>
          </div>
        </div>
      </div>
      <div id="chat-input-area">
        <input type="text" id="chat-input" placeholder="Введите сообщение..." onkeypress="if(event.key==='Enter')sendMessage()">
        <button onclick="sendMessage()">➤</button>
      </div>
    </div>
  `;
  document.body.appendChild(chatWidget);

  // Add styles
  const chatStyles = document.createElement('style');
  chatStyles.textContent = `
    #support-chat-widget {
      position: fixed;
      bottom: 24px;
      right: 24px;
      z-index: 9999;
      font-family: 'Segoe UI', system-ui, sans-serif;
    }
    #chat-button {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background: linear-gradient(135deg, var(--primary), var(--accent));
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
      cursor: pointer;
      box-shadow: 0 4px 20px rgba(217, 70, 239, 0.4);
      transition: all 0.3s ease;
      border: none;
    }
    #chat-button:hover {
      transform: scale(1.1);
      box-shadow: 0 6px 30px rgba(217, 70, 239, 0.6);
    }
    #chat-window {
      position: absolute;
      bottom: 80px;
      right: 0;
      width: 360px;
      height: 480px;
      background: var(--bg-card);
      border-radius: 16px;
      border: 1px solid rgba(168, 85, 247, 0.2);
      box-shadow: 0 12px 40px rgba(107, 33, 168, 0.4);
      display: none;
      flex-direction: column;
      overflow: hidden;
    }
    #chat-window.active {
      display: flex;
      animation: fadeInUp 0.3s ease;
    }
    #chat-header {
      padding: 16px 20px;
      background: linear-gradient(135deg, var(--primary), var(--accent));
      color: white;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-weight: 700;
    }
    #chat-header button {
      background: none;
      border: none;
      color: white;
      font-size: 1.2rem;
      cursor: pointer;
      padding: 4px;
    }
    #chat-messages {
      flex: 1;
      overflow-y: auto;
      padding: 16px;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .chat-message {
      display: flex;
      gap: 10px;
      align-items: flex-start;
    }
    .chat-message.user {
      flex-direction: row-reverse;
    }
    .chat-avatar {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background: linear-gradient(135deg, var(--primary), var(--accent));
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1rem;
      flex-shrink: 0;
    }
    .chat-message.user .chat-avatar {
      background: linear-gradient(135deg, #22c55e, #16a34a);
    }
    .chat-bubble {
      max-width: 260px;
      padding: 12px 16px;
      border-radius: 16px;
      background: rgba(168, 85, 247, 0.1);
      border: 1px solid rgba(168, 85, 247, 0.2);
    }
    .chat-message.user .chat-bubble {
      background: linear-gradient(135deg, var(--primary), var(--accent));
      color: white;
      border: none;
    }
    .chat-name {
      font-size: 0.75rem;
      font-weight: 600;
      color: var(--accent);
      margin-bottom: 4px;
    }
    .chat-message.user .chat-name {
      color: rgba(255,255,255,0.8);
    }
    .chat-text {
      font-size: 0.9rem;
      line-height: 1.5;
      color: var(--text);
    }
    .chat-message.user .chat-text {
      color: white;
    }
    .chat-time {
      font-size: 0.7rem;
      color: var(--text-muted);
      margin-top: 4px;
      text-align: right;
    }
    .chat-message.user .chat-time {
      color: rgba(255,255,255,0.7);
    }
    #chat-input-area {
      padding: 12px 16px;
      border-top: 1px solid rgba(168, 85, 247, 0.1);
      display: flex;
      gap: 8px;
    }
    #chat-input {
      flex: 1;
      padding: 12px 16px;
      border: 1px solid rgba(168, 85, 247, 0.2);
      border-radius: 24px;
      background: var(--bg);
      color: var(--text);
      font-size: 0.9rem;
      outline: none;
    }
    #chat-input:focus {
      border-color: var(--accent);
    }
    #chat-input-area button {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: linear-gradient(135deg, var(--primary), var(--accent));
      color: white;
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s ease;
    }
    #chat-input-area button:hover {
      transform: scale(1.1);
    }
    @media (max-width: 768px) {
      #chat-window {
        width: calc(100vw - 48px);
        height: 400px;
        right: -12px;
      }
    }
  `;
  document.head.appendChild(chatStyles);
})();

function toggleChat() {
  const chatWindow = document.getElementById('chat-window');
  if (chatWindow) {
    chatWindow.classList.toggle('active');
  }
}

function sendMessage() {
  const input = document.getElementById('chat-input');
  const messages = document.getElementById('chat-messages');
  if (!input || !messages || !input.value.trim()) return;

  const text = input.value.trim();
  const time = new Date().toLocaleTimeString('ru-RU', {hour: '2-digit', minute:'2-digit'});

  // Add user message
  messages.innerHTML += `
    <div class="chat-message user">
      <div class="chat-avatar">👤</div>
      <div class="chat-bubble">
        <div class="chat-name">Вы</div>
        <div class="chat-text">${escapeHtml(text)}</div>
        <div class="chat-time">${time}</div>
      </div>
    </div>
  `;

  input.value = '';
  messages.scrollTop = messages.scrollHeight;

  // Simulate admin response
  setTimeout(() => {
    const responses = [
      'Спасибо за обращение! Наш специалист ответит вам в ближайшее время.',
      'Понял вас! Уточните, пожалуйста, детали вашего вопроса.',
      'Мы работаем над вашим запросом. Обычно ответ занимает 2-3 минуты.',
      'Для ускорения решения, укажите номер бронирования или email.',
      'Благодарим за терпение! Оператор скоро подключится.'
    ];
    const response = responses[Math.floor(Math.random() * responses.length)];
    const responseTime = new Date().toLocaleTimeString('ru-RU', {hour: '2-digit', minute:'2-digit'});

    messages.innerHTML += `
      <div class="chat-message admin">
        <div class="chat-avatar">👤</div>
        <div class="chat-bubble">
          <div class="chat-name">Администратор</div>
          <div class="chat-text">${response}</div>
          <div class="chat-time">${responseTime}</div>
        </div>
      </div>
    `;
    messages.scrollTop = messages.scrollHeight;
  }, 1500 + Math.random() * 2000);
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}
