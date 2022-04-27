import * as crud from "./crud.js"

// This module will run whenever someone views a trail page to send a read request for a specific trail.

const trailName_h1 = document.getElementById('trailTitle');
const townName_div = document.getElementById('townName');
const description_div = document.getElementById('description');
const image_carousel = document.getElementById('imageDepo');
const reviews_container = document.getElementById('reviewContainer');
const submit_review_button = document.getElementById("submitReviewButton");
const reviewBody = document.getElementById("review-body");
const starCount = document.getElementById("star-count-input")
const add_event_button = document.getElementById('addEvent');
const find_event_button = document.getElementById('findEvent');
const upload_button = document.getElementById('upload');
const files_input = document.getElementById('image-file');

// get trail name from the page url
const trailName = new URLSearchParams(window.location.search).get('trail');
console.assert(trailName !== null, "trail query is required");

// read trail info
const trail_data = await crud.readTrail(trailName);
trailName_h1.innerHTML = trail_data.name;
townName_div.append( info(trail_data.town) );
description_div.append( info(trail_data.description) );

// read images
const images = await crud.readTrailImages(trailName);
let active = true;
for (const image of images) {
  image_carousel.append( carousel_item(`data:${image.filetype};base64,${image.image}`, active) );
  active = false;
}

// read reviews
const data = await crud.readReviewByTrail(trailName);
data.forEach(rev => reviews_container.append(review(rev)));


//============= Event Listeners =================================================================

submit_review_button.addEventListener('click', async(e) => {
  const data = await crud.createReview("user", trailName, reviewBody.value, starCount.value);
  console.log(data);
  reviews_container.append(review(data));
});

// Add links to event pages
add_event_button.addEventListener('click', e => window.location.href = "./createEventPage.html");
find_event_button.addEventListener('click', e => window.location.href = "./eventPage.html");

// Upload image logic
upload_button.addEventListener('click', async(e) => {
  if (files_input.files.length === 0) {
    alert('No files have been selected.');
    return;
  }
  const form_data = new FormData();
  for (const file of files_input.files) {
    if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
      alert('File type must be JPG or PNG, upload cancelled.');
      return;
    }
    form_data.append(file.name, file);
  }
  const upload_success = await crud.uploadTrailImage(trailName, form_data);
  if (!upload_success) {
    alert('Upload failed.');
    return;
  }
  window.location.reload();
});

//========== Dom element constructors ================================================

/**
 * Construct and return a trail info dom element
 * @param {string} content the info with which to fill in the div
 * @returns a dom element to be appended to a trail info section div
 */
function info(content) {
  const div = document.createElement('div');
  div.classList.add('row');
  const label = document.createElement('label');
  label.innerHTML = content;
  div.append(label);
  return div;
}

/**
 * Construct and return an image item for the bootstrap image carousel
 * @param {string} source the image data as a string
 * @param {boolean} is_active whether the image should be made visible
 * @returns a dom element to be appended to the image carousel
 */
function carousel_item(source, is_active) {
  const div = document.createElement('div');
  div.classList.add('carousel-item');
  if (is_active) div.classList.add('active');
  const img = document.createElement('img');
  img.src = source;
  img.classList.add('d-block','w-100');
  div.append(img);
  return div;
}

/**
 * Construct and return a review DOM element.
 * @param {Object} content a review object that contains all the data of a review.
 * @returns a dom element to be appended to the reviewContainer.
 */
function review(content) {
  // Helper function to create star icons
  function icon(...iconClassList) {
    const iconLabel = document.createElement('label');
    iconLabel.classList.add(...iconClassList);
    return iconLabel;
  }
  
  // A row within reviewContainer. This div encapsulates a single review.
  const row = document.createElement('div');
  row.classList.add('row','mb-5');

  // The header holds the star rating of the review and the name on the review.
  const rowHeader = document.createElement('div');
  rowHeader.classList.add('row');

  for (let i = 0; i < content.starCount; ++i)
    rowHeader.append( icon('col-1','bi','bi-star-fill') );
  for (let i = 0; i < 5-content.starCount; ++i)
    rowHeader.append( icon('col-1','bi','bi-star') );

  const nameDiv = document.createElement('div');
  nameDiv.innerHTML = '<b>' + content.user + '</b>';
  nameDiv.classList.add('col-7', 'text-end');
  rowHeader.append(nameDiv);

  // The body holds the actual text of a review.
  const rowBody = document.createElement('div');
  rowBody.classList.add('row');
  const rowBodyText = document.createElement('label');
  rowBodyText.innerHTML = content.reviewBody;
  rowBody.append(rowBodyText);

  // The footer holds the like count.
  const rowFooter = document.createElement('div');
  rowFooter.classList.add('row');

  const likesDiv = document.createElement('div');
  likesDiv.classList.add('col','text-end','bi','bi-hand-thumbs-up');
  likesDiv.textContent = ' ' + content.likeCount;
  likesDiv.addEventListener('click', eventListener(likesDiv, content));

  rowFooter.append(likesDiv);

  row.append(rowHeader, rowBody, rowFooter);

  // Return the new review so that it can be appended.
  return row;
}

// returns an event listener to make like animate when clicked
function eventListener(div, reviewObj) {
  return function (event) {
    if (div.classList.contains('bi-hand-thumbs-up')) {
      reviewObj.likeCount += 1;
      div.classList.remove('bi-hand-thumbs-up');
      div.classList.add('bi-hand-thumbs-up-fill');
    } else {
      reviewObj.likeCount -= 1;
      div.classList.remove('bi-hand-thumbs-up-fill');
      div.classList.add('bi-hand-thumbs-up');
    }
    div.textContent = ' ' + reviewObj.likeCount;
  }
}