// Function to validate email address format
function validateEmail(email) {
  const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return re.test(String(email).toLowerCase());
}


// Menu toggle
const menu = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
menu.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// Sidebar links
const sidebarLinks = document.querySelectorAll('.nav-links a');
const sidebar = document.querySelector('.nav-links');
sidebarLinks.forEach(link => {
  link.addEventListener('click',  () => {
    sidebar.classList.remove('active');
  });
});

// Modal Logic
const StartedBtn = document.getElementById('StartedBtn');
const registerModal = document.getElementById('register-section');
const loginModal = document.getElementById('login-section');
const home = document.getElementById('home');
const toLogin = document.getElementById('toLogin');
const toRegistration = document.getElementById('toRegistration');
const registerSubmit = document.getElementById('registerSubmit');
const loginSubmit = document.getElementById('loginSubmit');
const registerRoleSelect = document.getElementById('registerRole');
const loginRoleSelect = document.getElementById('loginRole');
const registerNav = document.getElementById('registerNav'); // Get the register link from navbar
const loginNav = document.getElementById('loginNav'); // Get the login link from navbar


// Functions for modals
function showModal(modal) {
  modal.classList.add('show');
  modal.style.display = 'flex';
  home.classList.add('blurred');
  document.body.style.overflow = 'hidden';
}

function hideModal(modal) {
  modal.classList.remove('show');
  modal.style.display = 'none';
  home.classList.remove('blurred');
  document.body.style.overflow = 'auto';
}

registerNav.addEventListener('click', (e) => {
  e.preventDefault();
  registerModal.style.display = 'flex'; 
});

loginNav.addEventListener('click', (e) => {
  e.preventDefault();
  loginModal.style.display = 'flex'; 
});

// Event Listeners
StartedBtn.addEventListener('click', (e) => {
  e.preventDefault();
  registerModal.style.display = 'flex';
});

toLogin.addEventListener('click', (e) => {
  e.preventDefault();
  registerModal.style.display = 'none';
  loginModal.style.display = 'flex';
});

toRegistration.addEventListener('click', (e) => {
  e.preventDefault();
  loginModal.style.display = 'none';
  registerModal.style.display = 'flex';
});


// Close modals when clicking outside of them
window.addEventListener('click', (e) => {
  if (registerModal && e.target === registerModal) {
    hideModal(registerModal);
  }
  if (loginModal && e.target === loginModal) {
    hideModal(loginModal);
  }
});
