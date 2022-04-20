

/**
 * Sends a POST request to create a new trail on the database
 * @param {string} name trail name to be displayed at the top of a trail page
 * @param {string} town town name to be listed above description on the trail page
 * @param {string} description paragraph or two describing the trail to be displayed on the trail page
 * @returns a 
 */
export async function createTrail(name, town, description) {
  console.log(name)
  console.log(town)
  console.log(description)
  const response = await fetch('/trail', {
    method: 'POST',
    headers: { 'Content-Type':'application/json' },
    body: JSON.stringify({ name:name, town:town, description:description })
  });
  return await response.json().status === "success";
}

/**
 * Sends a request to read a specific trail identified by the trails name
 * @param {string} name identifier
 * @returns the entire data available for the trail (name, town, description, images [urls for now])
 */
export async function readTrail(name) {
  const response = await fetch('/trail?name='+name);
  return await response.json();
}

/**
 * Sends a request to read some trails
 * @param {string} town the name of the town to reduce the search (optional)
 * @param {number} page used to determine an offset by which to query the database (each page will show 10 links or something)
 * @returns an array of trail names that can be used as links on the browseTrails.html
 */
export async function readTrailsByTownName(town, page) {
  const response = await fetch(`/trail/browse?town=${town}&offset=${page}`);
  return await response.json();
}

export async function createReview(user, trail, reviewBody, starCount) {
  const response = await fetch('/review', { method: 'POST',
    headers: { 'Content-Type':'application/json' },
    body: JSON.stringify({ user:user, trail:trail, reviewBody:reviewBody, starCount: starCount })
  });
  const data = await response.json()
  return data;
}

export async function readReviewByTrail(trail) {
  const response = await fetch(`/review?trail=${trail}`);
  const data = await response.json()
  return data;
}

export async function readReviewByUser(user) {
  const response = await fetch('/review', { method: 'GET',
    query: { user: user }
  });
  const data = await response.json()
  return data;
}

export async function updateReview(user, trail ) {
  const response = await fetch('/review', { method: 'PUT',
    body: { user: user, trail: trail }
  });
  const data = await response.json()
  return data;
}

export async function deleteReview(user, trail) {
  const response = await fetch('/review', { method: 'DELETE',
    query: { user: user, trail: trail }
  });
  const data = await response.json()
  return data;
}

export async function createEvent(name, time, meetup, description) {
  console.log(name);
  console.log(time);
  console.log(meetup);
  console.log(description);
  const response = await fetch('/event', {
    method: 'POST',
    headers: { 'Content-Type':'application/json' },
    body: JSON.stringify({ eid:1, name:name, time:time, meetup:meetup, uid:1, description:description })
  });
  return await response.json().status === "success";
}