import * as crud from './crud.js';

const login_form = document.getElementById('login-form');
const login_btn = document.getElementById('login-button');
const logout_btn = document.getElementById('logout-button');
const account_dropdown_loggedIn = document.getElementById('account-logged-in');
const account_btn = document.getElementById('account-btn');
const account_dropdown_loggedOut = document.getElementById('account-logged-out');
const user_btn = document.getElementById('user-btn');
const welcome_container = document.getElementById('welcome-container');
const login_message = document.getElementById('login-message');

positionWelcomeMessage();

// choose which dropdown menu to show initially
const loggedIn = await crud.checkLoggedIn();
if (loggedIn.value) {
  account_dropdown_loggedOut.classList.add('d-none');
  user_btn.innerText = loggedIn.username;
} else {
  account_dropdown_loggedIn.classList.add('d-none');
}

login_btn.addEventListener('click', async(e) => {
  login_message.innerText = "";
  const login = await crud.createLogin(new FormData(login_form));
  if (login.status === 'success') {
    account_dropdown_loggedIn.classList.remove('d-none');
    account_dropdown_loggedOut.classList.add('d-none');
    user_btn.textContent = login.username;
    login_form.reset();
  } else {
    login_message.innerText = login.status;
  }
});

logout_btn.addEventListener('click', async(e) => {
  await crud.logout();
  account_dropdown_loggedIn.classList.add('d-none');
  account_dropdown_loggedOut.classList.remove('d-none');
});

window.addEventListener('resize', positionWelcomeMessage, false);

function positionWelcomeMessage() {
  const viewportWidth = window.innerWidth || document.documentElement.clientWidth;
  if (viewportWidth > 1395) {
    welcome_container.classList.add('fixed-bottom');
  } else {
    welcome_container.classList.remove('fixed-bottom');
  }
}