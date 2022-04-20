import * as crud from "./crud.js";

// Temporary list of trails that will direct the user to a specific trail
const trail_list = document.getElementById('trail-list');
const server_data = await crud.readTrailsByTownName("", 0);

// Create a list of links that will bring the user to view individual trails
for (const trailName of server_data) {
  const link = document.createElement('a');
  link.classList.add('text-center');
  link.href=`./trailPage.html?trail=${trailName}`;
  link.innerHTML = `<h3>${trailName}</h3>`;
  trail_list.append(link);
}