import * as crud from './crud.js';

const file_input = document.getElementById('image-file');
const name_input = document.getElementById('name-input');
const town_input = document.getElementById('town-input');
const description_input = document.getElementById('description-input');
const done_button = document.getElementById('done-button');

done_button.addEventListener('click', async(e) => {
  const form_data = new FormData();
  for(const file of file_input.files) {
    form_data.append(file.name, file);
  }
  
  await crud.uploadTrailImage('trailname',form_data);
  //window.location.href = "./trailPage.html?trail="+name_input.value;
});

// function base64_encode(file) {
//   const img_str = fs.readFileSync(file, { encoding: 'base64' });
//   console.log(img_str.length)
// }

// base64_encode('C:\cs326\cs326-final-trail-finders\client\assets\Valley_Trail_Finder_Logo.JPG')