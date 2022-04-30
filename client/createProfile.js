import * as crud from "./crud.js"

const home = document.getElementById("home");
const trails = document.getElementById("trails");
const events = document.getElementById("events");
const username = document.getElementById("username-input");
const password = document.getElementById("password-input");
const passwordVer = document.getElementById("passwordVer-input");
const done = document.getElementById("done-button");


home.addEventListener('click', async() => {
    window.location.href="homepage.html";
});

trails.addEventListener('click', async() => {
    window.location.href="browseTrails.html";
});

events.addEventListener('click', async() => {
    window.location.href="browseEvents.html";
});

done.addEventListener('click', async() => {
    if (password.value === passwordVer.value){
        await crud.createUser(username.value, password.value);
        alert("Success! Go to home page and sign in!");
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