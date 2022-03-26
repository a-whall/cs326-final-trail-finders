/**
 * This file contains code to dynamically add reviews to the DOM
 *
 * TODO:
 * - find a better way to add icons as a review header
 */

const loremIpsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

const dummyReviewObjects = [
  {
    stars: 4,
    text: loremIpsum,
    profileName: "Some User",
    tags: [],
    likeCount: 7 
  },
  {
    stars: 5,
    text: loremIpsum,
    profileName: "Another User",
    tags: [],
    likeCount: 2
  },
  {
    stars: 3,
    text: loremIpsum,
    profileName: "One Last User",
    tags: [],
    likeCount: 0
  }
];

document.getElementById('reviewContainer').append(
  review(dummyReviewObjects[0]), review(dummyReviewObjects[1]), review(dummyReviewObjects[2]));

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

  for (let i = 0; i < content.stars; ++i)
    rowHeader.append( icon('col-1','bi','bi-star-fill') );
  for (let i = 0; i < 5-content.stars; ++i)
    rowHeader.append( icon('col-1','bi','bi-star') );

  const nameDiv = document.createElement('div');
  nameDiv.innerHTML = '<b>' + content.profileName + '</b>';
  nameDiv.classList.add('col-7', 'text-end');
  rowHeader.append(nameDiv);

  // The body holds the actual text of a review.
  const rowBody = document.createElement('div');
  rowBody.classList.add('row');
  const rowBodyText = document.createElement('label');
  rowBodyText.innerHTML = content.text;
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