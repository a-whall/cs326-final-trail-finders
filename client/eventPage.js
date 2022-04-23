import * as crud from "./crud.js"

const event_title_header = document.getElementById('eventTitle');
const description_area = document.getElementById('description');
const timeInfo_div = document.getElementById('timeInfo');
const meetupInfo_div = document.getElementById('meetupInfo');
const hostInfo_div = document.getElementById('hostInfo');
const eventImage_div = document.getElementById('eventImage');
const eventName = new URLSearchParams(window.location.search).get('event');

// if (eventName === null) console.assert(false, "event query is required");

// const server_data = await crud.readEvent(eventName);

// TODO: check for bad data
// console.log(server_data);

event_title_header.innerHTML = "The Notch";

add_event_info("https://upload.wikimedia.org/wikipedia/commons/2/2b/IMG_3811-On-the-Norwottuck-bridge.jpg", 
                "1pm", "Amherst", "Joe", "Come meet with us!");

// get a handle to the description text label
const editable_description = document.getElementById('description_label');

function add_event_info(imageURL, timeName, meetup, host, description) {
  const image_img = document.createElement('img');
  image_img.src = imageURL;
  eventImage_div.append(image_img);

  const time_div = document.createElement('div');
  time_div.classList.add('row');
  const time_label = document.createElement('label');
  time_label.innerHTML = timeName;
  time_div.append(time_label);
  timeInfo_div.append(time_div);

  const meetup_div = document.createElement('div');
  meetup_div.classList.add('row');
  const meetup_label = document.createElement('label');
  meetup_label.innerHTML = meetup;
  meetup_div.append(meetup_label);
  meetupInfo_div.append(meetup_div);

  const host_div = document.createElement('div');
  host_div.classList.add('row');
  const host_label = document.createElement('label');
  host_label.innerHTML = host;
  host_div.append(host_label);
  hostInfo_div.append(host_div);

  const description_div = document.createElement('div');
  description_div.classList.add('row');
  const description_label = document.createElement('label');
  description_label.id = 'description-label';
  description_label.innerHTML = description;
  description_div.append(description_label);
  description_area.append(description_div);
}