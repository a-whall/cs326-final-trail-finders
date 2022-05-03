import { readEvent, deleteEvent, checkLogin } from "./crud.js";

const event_title_header = document.getElementById('eventTitle');
const description_area = document.getElementById('description');
const timeInfo_div = document.getElementById('timeInfo');
const meetupInfo_div = document.getElementById('meetupInfo');
const hostInfo_div = document.getElementById('hostInfo');

// Retrieve data
const eid = new URLSearchParams(window.location.search).get('eid');
const eventData = await readEvent(eid);

// Dummy data
const title = eventData.title;
const time = eventData.time;
const meetup = eventData.meetup;
const host = eventData.username;
const description = eventData.description;
const trailName = eventData.trail;

add_event_info(`data:${eventData.filetype};base64,${eventData.image}`, title, time, meetup, host, description);

// Allow users to view trail through this button
document.getElementById("findTrail").addEventListener('click', () => {
  window.location.href = `./trailPage.html?trail=${trailName}`;
});

// Enable delete event button if event was made from user
document.getElementById("deleteEvent").addEventListener('click', async () => {
  if (!(await getUserLogin().val)) {
    alert("Please make an account first before deleting events!")
  }
  
  if (await deleteEvent(eid)) {
    alert("Event has been deleted.");
    window.location.href = "./browseEvents.html";
  }
});

function add_event_info(imageData, eventName, timeName, meetup, host, description) {
  // Add event title
  event_title_header.innerHTML = eventName;
  
  // Add image
  const image_img = document.getElementById('eventImage');
  image_img.src = imageData;

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