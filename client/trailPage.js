import * as crud from "./crud.js"

// This module will run whenever someone views a trail page to send a read request for a specific trail.

const trail_title_header = document.getElementById('trailTitle');
const description_area = document.getElementById('description');
const townName_div = document.getElementById('townName');
const image_carousel = document.getElementById('imageDepo');
const reviews_container = document.getElementById('reviewContainer');
const submit_reviews = document.getElementById("submitReviewButton");
const reviewBody = document.getElementById("review-body");
const starCount = document.getElementById("star-count-input")
const add_event_button = document.getElementById('addEvent');
const find_event_button = document.getElementById('findEvent');

const trailName = new URLSearchParams(window.location.search).get('trail');

if (trailName === null) console.assert(false, "trail query is required");

const server_data = await crud.readTrail(trailName);

// TODO: check for bad data
console.log(server_data);

trail_title_header.innerHTML = server_data.name;

add_trail_info(server_data.town, server_data.description);

//add_trail_pictures(server_data.imageURLs);

read_reviews();

add_event_button.addEventListener('click', e => {
  window.location.href = "./createEventPage.html";
});

find_event_button.addEventListener('click', e => {
  window.location.href = "./eventPage.html"
});

// get a handle to the description text label
const editable_description = document.getElementById('description_label');


function add_trail_info(townName, description) {
  const town_div = document.createElement('div');
  town_div.classList.add('row');
  const town_label = document.createElement('label');
  town_label.innerHTML = townName;
  town_div.append(town_label);
  townName_div.append(town_div);

  const description_div = document.createElement('div');
  description_div.classList.add('row');
  const description_label = document.createElement('label');
  description_label.id = 'description-label';
  description_label.innerHTML = description;
  description_div.append(description_label);
  description_area.append(description_div);
}


function add_trail_pictures(urls) {
  let first = true;
  for (const url of urls) {
    const carousel_item = document.createElement('div');
    carousel_item.classList.add('carousel-item');
    if (first) {
      first = false;
      carousel_item.classList.add('active');
    }
    const img = document.createElement('img');
    img.src = url;
    img.classList.add('d-block','w-100');
    carousel_item.append(img);
    image_carousel.append(carousel_item);
  }
}


async function read_reviews() {
  const data = await crud.readReviewByTrail(trailName);
  data.forEach(rev => reviews_container.append(review(rev)));
}


// Helper function to create and init class list intended for star icons
function icon(...iconClassList) {
  const iconLabel = document.createElement('label'); // maybe label is not the right element type
  iconLabel.classList.add(...iconClassList);
  return iconLabel;
}


/**
 * Construct and return a review DOM element.
 * @param {Object} content a review object that contains all the data of a review.
 * @returns a dom element to be appended to the reviewContainer.
 */
function review(content) {
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

submit_reviews.addEventListener('click', async() => {
  const data = await crud.createReview("user", trailName, reviewBody.value, starCount.value);
  console.log(data);
  reviews_container.append(review(data));
});