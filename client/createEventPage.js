import { createEvent } from "./crud.js";
document.getElementById("createEventButton").addEventListener("click", saveEvent);

async function saveEvent() {
    const name = document.getElementById("name").value;
    const time = document.getElementById("time").value;
    const meetup = document.getElementById("meetup").value;
    const description = document.getElementById("description").value;
    await createEvent(name, time, meetup, description);
    window.location.href = "./eventPage.html";
}