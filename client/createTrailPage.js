import * as crud from './crud.js';

const file_input = document.getElementById('image-file');
const name_input = document.getElementById('name-input');
const town_input = document.getElementById('town-input');
const description_input = document.getElementById('description-input');
const done_button = document.getElementById('done-button');

done_button.addEventListener('click', async(e) => {
  const trail_created = await crud.createTrail(name_input.value, town_input.value, description_input.value);
  if (trail_created) {
    const form_data = new FormData();
    for (const file of file_input.files) {
      form_data.append(file.name, file);
    }
    await crud.uploadTrailImage(name_input.value, form_data);
  }
  window.location.href = `./trailPage.html?trail=${name_input.value}`;
});