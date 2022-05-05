import * as crud from "./crud.js"

const register_form = document.getElementById('register-form');
const password1_input = document.getElementById('password-1');
const password2_input = document.getElementById('password-2');
const register_button = document.getElementById('register-button');
const register_message = document.getElementById('register-message');

register_button.addEventListener('click', async (e) => {
  register_message.innerText = '';
  if (password1_input.value !== password2_input.value) {
    register_message.innerText = 'passwords must match';
  } else {
    const register = await crud.createUser(new FormData(register_form));
    if (register.status.includes('Success')) {
      register_message.classList.remove('error-text');
      register_message.innerText = register.status;
      register_button.disabled = true;
    } else {
      register_message.innerText = register.status;
    }
  }
});