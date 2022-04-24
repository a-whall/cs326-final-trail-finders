import * as crud from "./crud.js"

const home = document.getElementById("home")
const trails = document.getElementById("trails")
const events = document.getElementById("events")
const username = document.getElementById("username-input")
const email = document.getElementById("email-input")
const password = document.getElementById("password-input")
const passwordVer = document.getElementById("passwordVer-input")
const upload = document.getElementById("upload")
const done = document.getElementById("done-button")

home.addEventListener('click', async() => {
    window.location.href="homepage.html";
});

trails.addEventListener('click', async() => {
    window.location.href="trailPage.html";
});

events.addEventListener('click', async() => {
    window.location.href="eventPage.html";
});

upload.addEventListener('click', async() => {
    window.location.href="homepage.html";
});

done.addEventListener('click', async() => {
    if (password.value === passwordVer.value){
        crud.createUser(username.value, email.value, password.value, /*need to figure out how to take in and send images*/);
    }
});
passwordVer.addEventListener("keyup", function (event) {
    if (password.value === passwordVer.value){
        passwordVer.style.backgroundColor = "green";
        passwordVer.style.color = "black";
    }
    else{
        passwordVer.style.backgroundColor = "red";
        passwordVer.style.color = "black";
    }
});