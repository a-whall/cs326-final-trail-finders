import * as crud from "./crud.js"

const home = document.getElementById("home");
const trails = document.getElementById("trails");
const events = document.getElementById("events");
const password = document.getElementById("password-input");
const passwordVer = document.getElementById("passwordVer-input");
const submit = document.getElementById("update-password-submit");
const uploadImage = document.getElementById("uploadImage");
const upload = document.getElementById("upload-button");
const file_input = document.getElementById('image-file');
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

upload.addEventListener('click', async() => {
    const form_data = new FormData();
    for(const file of file_input.files) {
        form_data.append(file.name, file);
    }
    await crud.uploadUserImage(username.value ,form_data);
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
    crud.updateUser();//need to add input to function
});

delete_profile.addEventListener("click", async() => {
    crud.deleteUser(); //need to get username
})