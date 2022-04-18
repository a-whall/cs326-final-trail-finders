

const home = document.getElementById("home");
const profile = document.getElementById("profile");
const trails = document.getElementById("trails");
const events = document.getElementById("events");
const create_trail = document.getElementById("create-trail");
const create_profile = document.getElementById("create-profile");

home.addEventListener('click', async() => {
    window.location.href="homepage.html";
});

profile.addEventListener('click', async() => {
    window.location.href="profile_page.html";
});

trails.addEventListener('click', async() => {
    window.location.href="trailPage.html";
});

events.addEventListener('click', async() => {
    window.location.href="eventPage.html";
});

create_trail.addEventListener('click', async() => {
    window.location.href="createTrailPage.html";
});

create_profile.addEventListener('click', async() => {
    window.location.href="profile.html";
});