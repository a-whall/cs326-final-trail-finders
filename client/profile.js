import * as crud from "./crud.js"

const home = document.getElementById("home");
const trails = document.getElementById("trails");
const events = document.getElementById("events");
const username = document.getElementById("username");
const oldPassword = document.getElementById("oldPassword-input");
const password = document.getElementById("password-input");
const passwordVer = document.getElementById("passwordVer-input");
const submit = document.getElementById("update-password-submit");
const delete_profile = document.getElementById("delete");


home.addEventListener('click', async() => {
    window.location.href="homepage.html";
});

trails.addEventListener('click', async() => {
    window.location.href="browseTrails.html";
});

events.addEventListener('click', async() => {
    window.location.href="eventPage.html";
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

submit.addEventListener("click", async() =>{
    crud.updateUser(username.value, oldPassword.value, password.value);
});

delete_profile.addEventListener("click", async() => {
    crud.deleteUser(username.value, oldPassword.value);
})