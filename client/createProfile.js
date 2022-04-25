import * as crud from "./crud.js"

const home = document.getElementById("home");
const trails = document.getElementById("trails");
const events = document.getElementById("events");
const username = document.getElementById("username-input");
const email = document.getElementById("email-input");
const password = document.getElementById("password-input");
const passwordVer = document.getElementById("passwordVer-input");
const uploadImage = document.getElementById("uploadImage");
const done = document.getElementById("done-button");
const file_input = document.getElementById('image-file');


home.addEventListener('click', async() => {
    window.location.href="homepage.html";
});

trails.addEventListener('click', async() => {
    window.location.href="trailPage.html";
});

events.addEventListener('click', async() => {
    window.location.href="eventPage.html";
});

done.addEventListener('click', async() => {
    if (password.value === passwordVer.value){
        const form_data = new FormData();
        for(const file of file_input.files) {
            form_data.append(file.name, file);
        }
        await crud.uploadUserImage(username.value ,form_data);
        await crud.createUser(username.value, email.value, password.value);
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