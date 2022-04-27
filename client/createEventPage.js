import { createEvent } from "./crud.js";


document.getElementById("createEventButton").addEventListener("click", saveEvent);

// Include uploading image to database later
async function saveEvent() {
    const image = document.getElementById("imageFile").files;
    const title = document.getElementById("title").value;
    const time = document.getElementById("time").value;
    const meetup = document.getElementById("meetup").value;
    const host = document.getElementById("host").value;
    const description = document.getElementById("description").value;
    const trail = document.getElementById("trail").value;

    await createEvent(title, time, meetup, host, description, trail);

    const form_data = new FormData();
    form_data.append(image.name, image);
    // await uploadEventImage()

    // window.location.href = "./browseEvents.html";
}