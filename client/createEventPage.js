import { createEvent } from "./crud.js";
document.getElementById("createEventButton").addEventListener("click", saveEvent);

// Include uploading image to database later
async function saveEvent() {
    const title = document.getElementById("title").value;
    const time = document.getElementById("time").value;
    const meetup = document.getElementById("meetup").value;
    const host = document.getElementById("host").value;
    const description = document.getElementById("description").value;
    await createEvent(title, time, meetup, host, description);
    // window.location.href = "./browseEvents.html";
}