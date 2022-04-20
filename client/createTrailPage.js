
import * as crud from './crud.js';

const name_input = document.getElementById('name-input');
const town_input = document.getElementById('town-input');
const description_input = document.getElementById('description-input');
const done_button = document.getElementById('done-button');

done_button.addEventListener('click', async(e) => {
  await crud.createTrail(
    name_input.value,
    town_input.value,
    description_input.value
  );
  // TODO: take user to the newly created page
  window.location.href="profile-page.html";

});
