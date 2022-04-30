import { createEvent, uploadEventImage } from "./crud.js";


document.getElementById("createEventButton").addEventListener("click", saveEvent);

// Include uploading image to database later
async function saveEvent() {
    const image = document.getElementById("imageFile");
    const title = document.getElementById("title").value;
    const time = document.getElementById("time").value;
    const meetup = document.getElementById("meetup").value;
    const host = document.getElementById("host").value;
    const description = document.getElementById("description").value;
    const trail = document.getElementById("trail").value;

    const eid = await createEvent(title, time, meetup, host, description, trail);
    console.log(eid);

    if (eid) {
        const form_data = new FormData();
        for (const file of image.files) {
          form_data.append(file.name, file);
        }
        await uploadEventImage(eid, form_data);
    }
    // window.location.href = "./browseEvents.html";
}