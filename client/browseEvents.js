import { readAllEvents,deleteEvent } from "./crud.js";

const listEventParent = document.getElementById("listEvents");

const data = await readAllEvents();

data.forEach(element => {
    add_event_info(`data:${element.filetype};base64,${element.image}`, element.eid, element.title, element.time, element.meetup, element.username, element.description);
});

// Upload events to page
function add_event_info(imageData, eid, eventTitle, time, meetup, host, description) {
    // Properly create 'eventBox'
    const row1 = document.createElement("div");
    row1.classList.add("row");
    listEventParent.appendChild(row1);

    const eventBox = document.createElement("div");
    eventBox.classList.add("col-sm-10");
    eventBox.id = "eventBox";
    row1.appendChild(eventBox);

    const row2 = document.createElement("div");
    row2.classList.add("row");
    eventBox.appendChild(row2);

    const col1 = document.createElement("div");
    col1.classList.add("col-sm-4");
    row2.appendChild(col1);

    // Add image
    const img = document.createElement("img");
    img.classList.add("images");
    img.src = imageData;
    col1.appendChild(img);

    // Start inputting event info
    const col2 = document.createElement("div");
    col2.classList.add("col-sm-8");
    row2.appendChild(col2);

    // Input event Title
    const pEventTitle = document.createElement("p");
    pEventTitle.classList.add("eventTitle");
    col2.appendChild(pEventTitle);

    const link = document.createElement("a")
    link.id = "name";
    link.innerHTML = eventTitle;
    link.href = `./eventPage.html?eid=${eid}`;
    pEventTitle.appendChild(link);

    // Input time
    const p2 = document.createElement("p");
    col2.appendChild(p2);

    const calenderIcon = document.createElement("i");
    calenderIcon.classList = "fa fa-calendar";
    p2.appendChild(calenderIcon);

    const timeSpan = document.createElement("span");
    timeSpan.id = "time";
    timeSpan.innerHTML = " " + time;
    p2.appendChild(timeSpan);

    // Input meet-up
    const p3 = document.createElement("p");
    col2.appendChild(p3);

    const meetUpIcon = document.createElement("i");
    meetUpIcon.classList = "fa fa-map-marker";
    p3.appendChild(meetUpIcon);

    const meetUpSpan = document.createElement("span");
    meetUpSpan.id = "meetup";
    meetUpSpan.innerHTML = " Meet-Up: " + meetup;
    p3.appendChild(meetUpSpan);

    // Input Host
    const p4 = document.createElement("p");
    col2.appendChild(p4);

    const hostIcon = document.createElement("i");
    hostIcon.classList = "fa fa-user-circle";
    p4.appendChild(hostIcon);

    const hostSpan = document.createElement("span");
    hostSpan.id = "host";
    hostSpan.innerHTML = " Host: " + host;
    p4.appendChild(hostSpan);

    // Input Description
    const p5 = document.createElement("p");
    col2.appendChild(p5);

    const descriptionIcon = document.createElement("i");
    descriptionIcon.classList = "fa fa-align-justify";
    p5.appendChild(descriptionIcon);

    const descriptionSpan = document.createElement("span");
    descriptionSpan.id = "description";
    descriptionSpan.innerHTML = " " + description;
    p5.appendChild(descriptionSpan);

}

// DELETE LATER: Functions to save and remove event
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