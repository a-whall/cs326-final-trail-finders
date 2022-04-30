//import * as auth from '../authentication.js'

const username = document.getElementById("username-input");
const password = document.getElementById("password-input");
const signIn = document.getElementById("sign-in");
const profile = document.getElementById("profile");
const trails = document.getElementById("trails");
const events = document.getElementById("events");
const create_trail = document.getElementById("create-trail");
const create_profile = document.getElementById("create-profile");
const login = document.getElementById("login");


signIn.addEventListener('click', async(e) => {
  // let form_data = new FormData();
  // form_data.append('username', username.value);
  // form_data.append('password', password.value);
  // let data = await crud.attemptLogin(form_data);
  // console.log(data);
});

profile.addEventListener('click', async() => {
    window.location.href="profile.html";
});

trails.addEventListener('click', async() => {
    window.location.href="browseTrails.html";
});

events.addEventListener('click', async() => {
    window.location.href="eventPage.html";
});

create_trail.addEventListener('click', async() => {
    window.location.href="createTrailPage.html";
});

create_profile.addEventListener('click', async() => {
    window.location.href="createProfile.html";
});