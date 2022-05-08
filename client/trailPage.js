import * as crud from "./crud.js"

// This module will run whenever someone views a trail page to send a read request for a specific trail.

const trailName_h1 = document.getElementById('trail-title');
const townName_div = document.getElementById('townName');
const description_div = document.getElementById('trail-description');
const image_carousel = document.getElementById('imageDepo');
const reviews_container = document.getElementById('reviewContainer');
const submit_review_button = document.getElementById("submitReviewButton");
const reviewBody = document.getElementById("review-body");
const starCount = document.getElementById("star-count-input")
const add_event_button = document.getElementById('addEvent');
const find_event_button = document.getElementById('findEvent');
const upload_button = document.getElementById('upload');
const files_input = document.getElementById('image-file');
const sortByRecent_button = document.getElementById('sort-recent');
const sortByLikes_button = document.getElementById('sort-likes');
const sortByStars_button = document.getElementById('sort-stars');

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
if (images.length === 0) {
  image_carousel.append( carousel_item('https://github.com/a-whall/cs326-final-trail-finders/blob/main/client/assets/image-unavailable.jpg?raw=true', active) )
}

// read reviews and check if current user already liked review
const review_data = await crud.readReviewByTrail(trailName);
const userwholiked = (await crud.getUsername()).val;
review_data.reverse(); // sort by most recent (opposite order of database)
for (const review_content of review_data) {
  const reviewLiked = (await crud.readReviewLike(review_content.username, review_content.trailname, userwholiked)).length === 0 ? false : true;
  reviews_container.append( review(review_content, reviewLiked) );
}
if (review_data.length === 0) {
  reviews_container.append(no_reviews_banner());
}


//============= Event Listeners =================================================================

submit_review_button.addEventListener('click', async(e) => {
  const data = await crud.createReview(trailName, reviewBody.value, starCount.value);
  if (data.success) {
    reviews_container.append(review(data));
    const no_reviews = document.getElementById('no-reviews');
    if (no_reviews) {
      reviews_container.removeChild(no_reviews);
    }
  } else {
    alert(`error: ${data.status}`)
  }
});

// Add links to event pages
add_event_button.addEventListener('click', e => window.location.href = "./createEventPage.html");
find_event_button.addEventListener('click', e => window.location.href = "./browseEvents.html");

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
  } else {
    alert('Upload succeeded! Refresh the page to find your new image.');
  }
});

sortByRecent_button.addEventListener('click', (e) => updateReviewContainer(review_data));
sortByLikes_button.addEventListener('click', (e) => updateReviewContainer(sortedBy('likecount')));
sortByStars_button.addEventListener('click', (e) => updateReviewContainer(sortedBy('starcount')));

//========== Review Sort Functions ===================================================

function updateReviewContainer(reviewObj_array) {
  for (const r of [...document.getElementsByClassName('review')])
    reviews_container.removeChild(r); // remove current reviews
  for (const review_content of reviewObj_array)
    reviews_container.append( review(review_content) ); // insert new review dom elements
}

function sortedBy(attribute) {
  return [...review_data].sort((r1,r2) => r2[attribute] - r1[attribute]);
}

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
  label.textContent = content;
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
  const flexdiv = document.createElement('div');
  flexdiv.classList.add('d-flex');
  if (is_active) div.classList.add('active');
  const img = document.createElement('img');
  img.src = source;
  img.classList.add('align-middle','d-block','w-100')
  flexdiv.append(img);
  div.append(flexdiv);
  return div;
}

/**
 * Construct and return an element to show when no reviews are available
 * @returns a dom element to be appended to the review container
 */
function no_reviews_banner() {
  const h3 = document.createElement('h3');
  h3.id = 'no-reviews';
  h3.innerHTML = '<br>Be the first to leave a review!';
  h3.classList.add('text-center')
  return h3;
}

/**
 * Construct and return a review DOM element.
 * @param {Object} content a review object that contains all the data of a review.
 * @returns a dom element to be appended to the reviewContainer.
 */
function review(content, reviewLiked) {
  // Helper function to create star icons
  function icon(...iconClassList) {
    const iconLabel = document.createElement('label');
    iconLabel.classList.add(...iconClassList);
    return iconLabel;
  }

  // A row within reviewContainer. This div encapsulates a single review.
  const row = document.createElement('div');
  row.classList.add('review','row','my-5');

  // The header holds the star rating of the review and the name on the review.
  const rowHeader = document.createElement('div');
  rowHeader.classList.add('row');

  for (let i = 0; i < content.starcount; ++i)
    rowHeader.append( icon('col-1','bi','bi-star-fill') );
  for (let i = 0; i < 5-content.starcount; ++i)
    rowHeader.append( icon('col-1','bi','bi-star') );

  const nameDiv = document.createElement('div');
  nameDiv.innerHTML = '<b>' + content.username + '</b>';
  nameDiv.classList.add('col-7', 'text-end');
  rowHeader.append(nameDiv);

  // The body holds the actual text of a review.
  const rowBody = document.createElement('div');
  rowBody.classList.add('row');
  const rowBodyText = document.createElement('label');
  rowBodyText.innerHTML = content.body;
  rowBody.append(rowBodyText);

  // The footer holds the like count.
  const rowFooter = document.createElement('div');
  rowFooter.classList.add('row');

  const likesDiv = document.createElement('div');
  if(userwholiked && reviewLiked) {  // Fill in 'thumbs up' if user already liked a review
    likesDiv.classList.add('col','text-end','bi','bi-hand-thumbs-up-fill');
  } else {
    likesDiv.classList.add('col','text-end','bi','bi-hand-thumbs-up');
  }
  likesDiv.textContent = ' ' + content.likecount;
  likesDiv.addEventListener('click', eventListener(likesDiv, content));

  rowFooter.append(likesDiv);

  row.append(rowHeader, rowBody, rowFooter);

  // Return the new review so that it can be appended.
  return row;
}

// returns an event listener to make like animate when clicked
function eventListener(div, reviewObj) {
  return async function (event) {
    const user = reviewObj.username;
    const trailname = reviewObj.trailname;
    const userwholiked = (await crud.getUsername()).val;
    if (div.classList.contains('bi-hand-thumbs-up')) {
      if (await crud.createReviewLike(user, trailname, userwholiked)) { // Save info on review_likes table
        await crud.updateReviewLikeCount("1", user, trailname); // Increment reviews table's likecount column
        reviewObj.likecount += 1;
        div.classList.remove('bi-hand-thumbs-up');
        div.classList.add('bi-hand-thumbs-up-fill');
      } else {
        alert("Please login before liking a review");
      }
    } else {
      if (await crud.deleteReviewLike(user, trailname, userwholiked)) { // Delete info on review_likes table
        await crud.updateReviewLikeCount("-1", user, trailname);  // Decrement reviews table's likecount column
        reviewObj.likecount -= 1;
        div.classList.remove('bi-hand-thumbs-up-fill');
        div.classList.add('bi-hand-thumbs-up');
      } else {
        alert("Please login before unlinking a review");
      }
    }
    div.textContent = ' ' + reviewObj.likecount;
  }
}