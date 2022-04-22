import * as crud from "./crud.js";

// Temporary list of trails that will direct the user to a specific trail
const trail_list = document.getElementById('trail-list');

const pageIndex = parseInt(new URLSearchParams(window.location.search).get('page')) || 1;

const townName = new URLSearchParams(window.location.search).get('trail') || "";

const server_data = await crud.readTrailsByTownName(townName, pageIndex);
console.log(server_data)
// get the length of the data returned to see how many page links to put at the bottom

// Create a list of links that will bring the user to view individual trails
for (const trail of server_data) {
  const link = document.createElement('a');
  link.classList.add('text-center');
  link.href=`./trailPage.html?trail=${trail.name}`;
  link.innerHTML = `<h3>${trail.name}</h3>`;
  trail_list.append(link);
}