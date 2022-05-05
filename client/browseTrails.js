import * as crud from "./crud.js";

// Elements
const trail_list = document.getElementById('trail-list');
const index_list = document.getElementById('page-index');

// Parsed query data
const pageIndex = parseInt(new URLSearchParams(window.location.search).get('page')) || 1;
const townName = new URLSearchParams(window.location.search).get('trail') || "";

// Server data
const trailData = await crud.readTrailsByTownName(townName, pageIndex);
const trailTableSize = await crud.readTrailsCount();

// Create a list of links that will bring the user to view individual trails
for (const trail of trailData) {
  trail_list.append(searchResult(trail));
}

// Create a list of page links
let numPages = trailTableSize / 10;
for (let i = 1; i <= numPages + 1; i++) {
  const td = document.createElement('td');
  if (i === pageIndex)
    td.innerHTML = i;
  else {
    const link = document.createElement('a');
    link.href = `./browseTrails.html?page=${i}`;
    link.classList.add("td-none");
    link.innerHTML = i;
    td.append(link);
  }
  index_list.append(td);
}

/**
 * Construct a dom element for displaying a single search result
 * @param {object} trail an object with a name, town, and description
 * @returns a row div element to append to a bootstrap grid
 */
function searchResult(trail) {
  const div = document.createElement('div');
  div.classList.add('row','my-3','px-5','justify-content-center');
  const col = document.createElement('div');
  col.classList.add('col-8','pl-4');
  const p = document.createElement('p');
  p.classList.add('description-preview');
  p.innerText = trail.description;
  const link = document.createElement('a');
  link.classList.add('text-nowrap');
  link.href = `./trailPage.html?trail=${trail.name}`;
  link.innerHTML = `<h3>${trail.name}</h3>`;
  col.append(link, p);
  div.append(col);
  return div;
}