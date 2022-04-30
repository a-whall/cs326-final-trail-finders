import * as crud from './crud.js';

const signIn = document.getElementById("sign-in");
const profile = document.getElementById("profile");
const trails = document.getElementById("trails");
const events = document.getElementById("events");
const create_trail = document.getElementById("create-trail");
const create_profile = document.getElementById("create-profile");
const login = document.getElementById("login");
const log_out = document.getElementById("log-out");

const checkStatus = await crud.checkLoggedIn();
if (checkStatus.value){
    hideLogin();
    // const log_out = document.getElementById("log-out");
    // log_out.addEventListener('click', async(e) => {
    //     const data = await crud.logout();
    // });
}

function hideLogin(){
    login.style.display = (login.style.display === "none")? "block": "none";
    const signInStatus = document.createElement('label');
    signInStatus.innerHTML = 'You Are Signed In!    :';
    login.parentNode.replaceChild(signInStatus, login);
    const logout = document.createElement('button');
    logout.type = "button";
    logout.id = "log-out";
    logout.class = "btn";
    logout.innerHTML = '<i class="fa-solid fa-user"></i> Log Out';
    signInStatus.appendChild(logout);
}

log_out.addEventListener('click', async(e) => {
    const data = await crud.logout();
});

signIn.addEventListener('click', async(e) => {
  const data = await crud.createLogin(new FormData(login));
  console.log(data);
  if (data.status === 'success'){
    hideLogin();
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