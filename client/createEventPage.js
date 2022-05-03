import { createEvent, uploadEventImage, readTrailNames, getUserLogin } from "./crud.js";

// Create trails dropdown list
const trails = await readTrailNames();
const listTrails = document.getElementById("trailListValues");
const image = document.getElementById("imageFile");
const title = document.getElementById("title").value;
const time = document.getElementById("time").value;
const meetup = document.getElementById("meetup").value;
const host = document.getElementById("host").value;
const description = document.getElementById("description").value;
const trail = document.getElementById("trailListValues").value;

// Make trails dropdown box
trails.forEach(element => {
  const option = document.createElement("option");
  option.value = element.name;
  option.innerHTML = element.name;
  listTrails.appendChild(option);
});

// When an image is chosen, upload a preview of it to the page
image.onchange = event => {
  const [file] = image.files;
  if (file) {
    imagePreview.src = URL.createObjectURL(file);
  }
};

// Record the user and save for events later
console.log("testing");
const username = await getUserLogin().val;
console.log(username);

// Save event data
document.getElementById("createEventButton").addEventListener("click", saveEvent);

async function saveEvent() {
  const eid = await createEvent(title, time, meetup, host, description, trail);
  if (eid) {
      const form_data = new FormData();
      for (const file of image.files) {
        form_data.append(file.name, file);
      }
      if (await uploadEventImage(eid, form_data)) {
        alert("Event has been made.");
        window.location.href = "./browseEvents.html";
      }
  }
}