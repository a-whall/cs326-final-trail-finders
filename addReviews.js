/**
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
    stars: 1,
    text: loremIpsum,
    profileName: "Another User",
    tags: [],
    likeCount: 0
  }
];


// Helper function to create and init class list intended for star icons
function icon(...iconClassList) {
  const star = document.createElement('label'); // maybe label is not the right element type
  star.classList.add(...iconClassList);
  return star;
}


// Dynamically add reviews
function addReview(grid_element, review) {

  // A row within reviewContainer. This div encapsulates a single review.
  const row = document.createElement('div');
  row.classList.add('row', 'mb-5');

  // The header holds the star rating of the review and the name on the review.
  const rowHeader = document.createElement('div');
  rowHeader.classList.add('row');

  for (let i = 0; i < review.stars; ++i)
    rowHeader.appendChild( icon('col-1','bi','bi-star-fill') );
  for (let i = 0; i < 5-review.stars; ++i)
    rowHeader.appendChild( icon('col-1','bi','bi-star') );

  const nameDiv = document.createElement('div');
  nameDiv.textContent = review.profileName;
  nameDiv.classList.add('col-7', 'text-end');
  rowHeader.appendChild(nameDiv);

  // The body holds the actual text of a review.
  const rowBody = document.createElement('label');
  rowBody.classList.add('row');
  rowBody.textContent = review.text;

  // The footer holds the like count.
  const rowFooter = document.createElement('div');
  rowFooter.classList.add('row');

  const likesDiv = document.createElement('div');
  likesDiv.classList.add('col', 'text-end', 'bi', 'bi-hand-thumbs-up');
  likesDiv.textContent = ' ' + review.likeCount;
  rowFooter.appendChild(likesDiv);

  row.append(rowHeader, rowBody, rowFooter);

  // append the complete review row structure to the reviewContainer DOM element
  grid_element.appendChild(row);
}

const reviewGrid = document.getElementById('reviewContainer');

addReview(reviewGrid, dummyReviewObjects[0]);
addReview(reviewGrid, dummyReviewObjects[1]);