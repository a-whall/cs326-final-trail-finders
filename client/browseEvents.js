import { updateEvent, deleteEvent } from "./crud.js";

const listEventParent = document.getElementById("listEvents");

// Dummy data
const imageURL1 = "https://upload.wikimedia.org/wikipedia/commons/2/2b/IMG_3811-On-the-Norwottuck-bridge.jpg";
const description1 = "Hello! I am a UMass student who is planning to bike at the Norwottuck Trail. For those who are interested, please meet at Amherst Town. The biking trail ends at Northhampton.";
const imageURL2 = "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/10/b3/5f/ff/horse-caves.jpg?w=2000&h=-1&s=1";
const description2 = "I am planning to walk The Notch Trail. Anyone is invited."

add_event_info(imageURL1, "Norwottuck Rail Trail", "04/06/2022, 4pm to 7pm", "Amherst Town", "Amanda Jones", description1);
add_event_info(imageURL2, "The Notch", "04/07/2022, 4pm to 7pm", "Northhampton", "Joe Cirus", description2);

// Upload events to page
function add_event_info(imageURL, eventTitle, time, meetup, host, description) {
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
    img.src = imageURL;
    col1.appendChild(img);

    // Start inputting event info
    const col2 = document.createElement("div");
    col2.classList.add("col-sm-8");
    row2.appendChild(col2);

    // Input event Title
    const pEventTitle = document.createElement("p");
    pEventTitle.classList.add("eventTitle");
    col2.appendChild(pEventTitle);

    const span1 = document.createElement("span")
    span1.id = "name";
    span1.innerHTML = eventTitle;
    pEventTitle.appendChild(span1);

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

// Functions to save and remove event
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