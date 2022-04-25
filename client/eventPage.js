import { readEvent, deleteEvent } from "./crud.js";

const event_title_header = document.getElementById('eventTitle');
const description_area = document.getElementById('description');
const timeInfo_div = document.getElementById('timeInfo');
const meetupInfo_div = document.getElementById('meetupInfo');
const hostInfo_div = document.getElementById('hostInfo');
const eventImage_div = document.getElementById('eventImage');

// Retrieve data
const eid = 1;
// const eventData = await readEvent(eid);
// Code to retrieve username: const userData = await readUser();

// Dummy data
const imageURL = "https://upload.wikimedia.org/wikipedia/commons/2/2b/IMG_3811-On-the-Norwottuck-bridge.jpg";
const eventName = "The Notch Event!";
const time = "1pm";
const meetup = "Amherst";
const host = "Joe";
const description = "Come meet with us!";
const trailName = "The Notch";

// Allow users to view trail through this button
document.getElementById("findTrail").addEventListener('click', () => {
  window.location.href = `./trailPage.html?trail=${trailName}`;
});

// Enable delete event button if event was made from user
document.getElementById("deleteEvent").addEventListener('click', async () => {
  if (eventData.username === user_info.username) {
    await deleteEvent(eid);
    window.location.href = "./browseEvents.html";
  }
  else {
    alert("Only the user that made this event can delete it.");
  }
});

add_event_info(imageURL, eventName, time, meetup, host, description);

function add_event_info(imageURL, eventName, timeName, meetup, host, description) {
  // Add event title
  event_title_header.innerHTML = eventName;
  
  // Add image
  const image_img = document.createElement('img');
  image_img.src = imageURL;
  eventImage_div.append(image_img);

  // Add time
  const time_div = document.createElement('div');
  time_div.classList.add('row');
  const time_label = document.createElement('label');
  time_label.innerHTML = timeName;
  time_div.append(time_label);
  timeInfo_div.append(time_div);

  // Add meetup location
  const meetup_div = document.createElement('div');
  meetup_div.classList.add('row');
  const meetup_label = document.createElement('label');
  meetup_label.innerHTML = meetup;
  meetup_div.append(meetup_label);
  meetupInfo_div.append(meetup_div);

  // Add host
  const host_div = document.createElement('div');
  host_div.classList.add('row');
  const host_label = document.createElement('label');
  host_label.innerHTML = host;
  host_div.append(host_label);
  hostInfo_div.append(host_div);

  // Add description
  const description_div = document.createElement('div');
  description_div.classList.add('row');
  const description_label = document.createElement('label');
  description_label.id = 'description-label';
  description_label.innerHTML = description;
  description_div.append(description_label);
  description_area.append(description_div);
}