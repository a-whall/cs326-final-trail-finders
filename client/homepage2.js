import * as crud from './crud.js';

const login_form = document.getElementById('login-form');
const login_btn = document.getElementById('login-button');
const logout_btn = document.getElementById('logout-button');
const account_dropdown_loggedIn = document.getElementById('account-logged-in');
const account_dropdown_loggedOut = document.getElementById('account-logged-out');
const welcome_container = document.getElementById('welcome-container');

const loggedIn = false;

if (loggedIn) {
  account_dropdown_loggedOut.classList.add('d-none');
} else {
  account_dropdown_loggedIn.classList.add('d-none');
}

login_btn.addEventListener('click', async(e) => {
  // const data = await crud.createLogin(new FormData(login_form));
  if (true) {
    account_dropdown_loggedOut.classList.add('d-none');
    account_dropdown_loggedIn.classList.remove('d-none');
  }
});

logout_btn.addEventListener('click', async(e) => {
  // await crud.logout();
  account_dropdown_loggedIn.classList.add('d-none');
  account_dropdown_loggedOut.classList.remove('d-none');
});

window.addEventListener('resize', function () {
  const viewportWidth = window.innerWidth || document.documentElement.clientWidth;
  if (viewportWidth > 1130) {
    welcome_container.classList.add('fixed-bottom');
  } else {
    welcome_container.classList.remove('fixed-bottom');
  }
}, false);