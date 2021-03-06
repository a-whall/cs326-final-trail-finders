import { createEvent, uploadEventImage, readTrailNames, getUsername } from "./crud.js";

const listTrails = document.getElementById("trailListValues");
const image = document.getElementById("imageFile");

// Save username for corresponding event
const username = (await getUsername()).val;

// Make trails dropdown box
const trails = await readTrailNames();
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

// Save event data
document.getElementById("createEventButton").addEventListener("click", saveEvent);

async function saveEvent() {
  const title = document.getElementById("title").value;
  const date = document.getElementById("date").value;
  const starttime = document.getElementById("starttime").value;
  const endtime = document.getElementById("endtime").value;
  const meetup = document.getElementById("meetup").value;
  const description = document.getElementById("description").value;
  const trail = document.getElementById("trailListValues").value;

  if (image.files.length === 0 || title === '' || date === '' || starttime === '' || endtime === '' || meetup === '' || description === '' || trail === '') {
    alert('Please fill in every box before creating an event.')
  } else {
    // Check if user is logged in
    if (username) {
      const eid = await createEvent(title, date, starttime, endtime, meetup, username, description, trail);

      // Prepare image to be upload into SQL event database
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
    } else {
        alert("Please make an account first before creating your own events!")
    }
  }
  
  
}