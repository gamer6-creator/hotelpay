// ===== AUTH SYSTEM =====

const AUTH_KEY = 'hotelpay_user';
const RETURN_URL_KEY = 'hotelpay_return_url';

// Check if user is logged in
function isLoggedIn() {
  const user = localStorage.getItem(AUTH_KEY);
  return !!user;
}

// Get current user data
function getCurrentUser() {
  const user = localStorage.getItem(AUTH_KEY);
  return user ? JSON.parse(user) : null;
}

// Require auth for action - redirect to login if not authenticated
function requireAuth(returnUrl) {
  if (!isLoggedIn()) {
    if (returnUrl) {
      localStorage.setItem(RETURN_URL_KEY, returnUrl);
    }
    window.location.href = 'login.html';
    return false;
  }
  return true;
}

// Require auth for favorites - redirect to REGISTER page if not authenticated
function requireAuthForFavorites(returnUrl) {
  if (!isLoggedIn()) {
    if (returnUrl) {
      localStorage.setItem(RETURN_URL_KEY, returnUrl);
    }
    // Redirect to login page with register tab active
    window.location.href = 'login.html?tab=register';
    return false;
  }
  return true;
}

// Handle login form submission
function handleLogin() {
  const email = document.getElementById('login-email')?.value.trim();
  const password = document.getElementById('login-password')?.value;

  if (!email || !password) {
    showAuthError('Введите email и пароль');
    return;
  }

  const users = JSON.parse(localStorage.getItem('hotelpay_users') || '[]');
  const user = users.find(u => u.email === email && u.password === password);

  if (!user) {
    showAuthError('Неверный email или пароль');
    return;
  }

  localStorage.setItem(AUTH_KEY, JSON.stringify({
    email: user.email,
    firstname: user.firstname,
    lastname: user.lastname,
    phone: user.phone,
    fullName: user.firstname + ' ' + user.lastname
  }));

  const returnUrl = localStorage.getItem(RETURN_URL_KEY);
  if (returnUrl) {
    localStorage.removeItem(RETURN_URL_KEY);
    window.location.href = returnUrl;
  } else {
    window.location.href = 'index.html';
  }
}

// Handle registration form submission
function handleRegister() {
  const firstname = document.getElementById('reg-firstname')?.value.trim();
  const lastname = document.getElementById('reg-lastname')?.value.trim();
  const email = document.getElementById('reg-email')?.value.trim();
  const phone = document.getElementById('reg-phone')?.value.trim();
  const password = document.getElementById('reg-password')?.value;
  const password2 = document.getElementById('reg-password2')?.value;
  const terms = document.getElementById('reg-terms')?.checked;

  if (!firstname || !lastname || !email || !phone || !password) {
    showAuthError('Заполните все обязательные поля');
    return;
  }

  if (password.length < 8) {
    showAuthError('Пароль должен быть не менее 8 символов');
    return;
  }

  if (password !== password2) {
    showAuthError('Пароли не совпадают');
    return;
  }

  if (!terms) {
    showAuthError('Примите условия использования');
    return;
  }

  const users = JSON.parse(localStorage.getItem('hotelpay_users') || '[]');
  if (users.find(u => u.email === email)) {
    showAuthError('Пользователь с таким email уже существует');
    return;
  }

  const newUser = {
    firstname: firstname,
    lastname: lastname,
    email: email,
    phone: phone,
    password: password,
    createdAt: new Date().toISOString()
  };
  users.push(newUser);
  localStorage.setItem('hotelpay_users', JSON.stringify(users));

  localStorage.setItem(AUTH_KEY, JSON.stringify({
    email: newUser.email,
    firstname: newUser.firstname,
    lastname: newUser.lastname,
    phone: newUser.phone,
    fullName: newUser.firstname + ' ' + newUser.lastname
  }));

  showAuthSuccess('Регистрация успешна! Перенаправление...');

  setTimeout(function() {
    const returnUrl = localStorage.getItem(RETURN_URL_KEY);
    if (returnUrl) {
      localStorage.removeItem(RETURN_URL_KEY);
      window.location.href = returnUrl;
    } else {
      window.location.href = 'index.html';
    }
  }, 1500);
}

// Logout user
function logout() {
  localStorage.removeItem(AUTH_KEY);
  localStorage.removeItem(RETURN_URL_KEY);
  window.location.href = 'index.html';
}

// Check auth for favorites
function checkAuthForFavorites() {
  if (!isLoggedIn()) {
    requireAuth('profile.html#favorites');
  } else {
    window.location.href = 'profile.html#favorites';
  }
}

// UI Helpers
function showAuthError(message) {
  const existing = document.querySelector('.auth-error');
  if (existing) existing.remove();

  const container = document.querySelector('.auth-form');
  if (!container) return;

  const errorDiv = document.createElement('div');
  errorDiv.className = 'auth-error visible';
  errorDiv.textContent = message;
  container.insertBefore(errorDiv, container.firstChild);
}

function showAuthSuccess(message) {
  const existing = document.querySelector('.auth-success');
  if (existing) existing.remove();

  const container = document.querySelector('.auth-form');
  if (!container) return;

  const successDiv = document.createElement('div');
  successDiv.className = 'auth-success visible';
  successDiv.textContent = message;
  container.insertBefore(successDiv, container.firstChild);
}

// Switch between login and register tabs
function switchAuthTab(tab) {
  const loginForm = document.getElementById('form-login');
  const registerForm = document.getElementById('form-register');
  const loginTab = document.getElementById('tab-login');
  const registerTab = document.getElementById('tab-register');

  if (!loginForm || !registerForm) return;

  if (tab === 'login') {
    loginForm.style.display = 'block';
    registerForm.style.display = 'none';
    if (loginTab) loginTab.classList.add('active');
    if (registerTab) registerTab.classList.remove('active');
  } else {
    loginForm.style.display = 'none';
    registerForm.style.display = 'block';
    if (loginTab) loginTab.classList.remove('active');
    if (registerTab) registerTab.classList.add('active');
  }
}

// Update UI based on auth state
function updateAuthUI() {
  const user = getCurrentUser();
  var authBtn = document.getElementById('header-auth-btn') || document.getElementById('auth-btn');
  var mobileAuthLink = document.getElementById('mobile-auth-link');

  if (user) {
    if (authBtn) {
      authBtn.textContent = user.firstname || 'Профиль';
      authBtn.href = 'profile.html';
      authBtn.classList.remove('header__btn--primary');
      authBtn.style.background = 'linear-gradient(135deg, var(--primary), var(--accent))';
      authBtn.style.color = 'white';
      authBtn.style.padding = '10px 24px';
      authBtn.style.borderRadius = 'var(--radius)';
    }
    if (mobileAuthLink) {
      mobileAuthLink.textContent = 'Профиль';
      mobileAuthLink.href = 'profile.html';
    }
  } else {
    if (authBtn) {
      authBtn.textContent = 'Войти';
      authBtn.href = 'login.html';
    }
    if (mobileAuthLink) {
      mobileAuthLink.textContent = 'Войти';
      mobileAuthLink.href = 'login.html';
    }
  }
}

// Init auth on page load
document.addEventListener('DOMContentLoaded', function() {
  updateAuthUI();
});
