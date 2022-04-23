import * as crud from "./crud.js";

// Elements
const trail_list = document.getElementById('trail-list');
const index_list = document.getElementById('page-index');

// Parsed query data
const page_index = parseInt(new URLSearchParams(window.location.search).get('page')) || 1;
const town_name = new URLSearchParams(window.location.search).get('trail') || "";

// Server data
const trail_data = await crud.readTrailsByTownName(town_name, page_index);
const trail_table_size = await crud.readTrailsCount();

// Create a list of links that will bring the user to view individual trails
for (const trail of trail_data) {
  const link = document.createElement('a');
  link.classList.add('text-center');
  link.href=`./trailPage.html?trail=${trail.name}`;
  link.innerHTML = `<h3>${trail.name}</h3>`;
  trail_list.append(link);
}

// Create a list of page links
let num_pages = trail_table_size / 10;
for (let i = 1; i <= num_pages + 1; i++) {
  const td = document.createElement('td');
  if (i === page_index)
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