import { updateEvent, deleteEvent } from "./crud.js";
document.getElementById("update").addEventListener("click", saveUpdatedEvent);
document.getElementById("delete").addEventListener("click", removeEvent);

async function saveUpdatedEvent() {
    const name = document.getElementById("name");
    const time = document.getElementById("time");
    const meetup = document.getElementById("meetup");
    const description = document.getElementById("description");

    await updateEvent(name.innerHTML, time.innerHTML, meetup.innerHTML, description.innerHTML);
}

async function removeEvent() {
    const eid = 0;
    const data = await deleteEvent(eid);
}