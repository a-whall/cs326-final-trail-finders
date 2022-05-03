import * as crud from './crud.js';

const login = login_form();
const logout = logout_div();
const signIn = login.getElementById("sign-in");
const profile = document.getElementById("profile");
const trails = document.getElementById("trails");
const events = document.getElementById("events");
const create_trail = document.getElementById("create-trail");
const create_profile = document.getElementById("create-profile");
const navbar = document.getElementById('navbar');
const br = document.getElementById('break');

// insert correct navbar elements
const loggedIn = await crud.checkLoggedIn();
navbar.insertBefore(loggedIn?login:logout, br);

logout.addEventListener('click', async(e) => {
  await crud.logout();
  navbar.replaceChild(logout, login);
});

signIn.addEventListener('click', async(e) => {
  const data = await crud.createLogin(new FormData(login));
  if (data.success) {
    navbar.replaceChild(login, logout);
  }
});

profile.addEventListener('click', async() => {
  window.location.href="profile.html";
});

trails.addEventListener('click', async() => {
  window.location.href="browseTrails.html";
});

events.addEventListener('click', async() => {
  window.location.href="browseEvents.html";
});

create_trail.addEventListener('click', async() => {
  window.location.href="createTrailPage.html";
});

create_profile.addEventListener('click', async() => {
  window.location.href="createProfile.html";
});

logout.addEventListener('click', async(e) => {
  await crud.logout();
});

function login_form() {
  const form = document.createElement('form');
  form.innerHTML =
  `<label>Username: </label>
  <input name="username" type="text" class="form-control form-control-lg" placeholder="User Name">
  <label>Password: </label>
  <input name="password" type="password" class="form-control form-control-lg" placeholder="Password">
  <button type="button" id="sign-in" class="btn"><i class="fa-solid fa-user"></i> Sign In</button>`;
  const button = document.createElement('button');
  button.type = 'button';
  button.class = 'btn';
  button.innerHTML = '<i class="fa-solid fa-user"></i> Sign In';

  // const label1 = document.createElement('label');
  // label1.innerHTML = 'Username';
  // const input1 = document.createElement('input');
  // input1.name = 'username';
  // input1.type = 'text';
  // input1.classList.add('form-control', 'form-control-lg');
  // input1.placeholder = 'User Name';
  // const label2 = document.createElement('label');
  // label2.innerHTML = 'Password';
  // const input2 = document.createElement('input');
  // input2.name = input2.type = 'password';
  // input2.classList.add('form-control', 'form-control-lg');
  // input2.placeholder = 'Password';
  // const button = document.createElement('button');
  // button.id = 'sign-in';
  // button.classList.add('btn');
  // button.type = 'button';
  // const i = document.createElement('i');
  // i.classList.add('fa-solid','fa-user');
  // i.innerHTML = 'Sign In';
  // button.append(i);
  // form.append(label1, input1, label2, input2, button);
  return form;
}


function logout_div() {
  const div = document.createElement('div');
  const signInStatus = document.createElement('label');
  signInStatus.innerHTML = 'You Are Signed In!    :';
  const logout = document.createElement('button');
  logout.type = "button";
  logout.id = "log-out";
  logout.class = "btn";
  logout.innerHTML = '<i class="fa-solid fa-user"></i> Log Out';
  div.append(signInStatus, logout);
  return div;
}