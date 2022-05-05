
//======================= Trails ============================================================================================

/**
 * Sends a POST request to create a new trail on the database
 * @param {string} name trail name to be displayed at the top of a trail page
 * @param {string} town town name to be listed above description on the trail page
 * @param {string} description paragraph or two describing the trail to be displayed on the trail page
 * @returns a 
 */
export async function createTrail(name, town, description) {
  const response = await fetch('/trail', {
    method: 'POST',
    headers: { 'Content-Type':'application/json' },
    body: JSON.stringify({ name:name, town:town, description:description })
  });
  return (await response.json()).status === "success";
}

export async function uploadTrailImage(trail, form_data) {
  const response = await fetch(`/trail/image?name=${trail}`, {
    method: 'POST',
    body: form_data
  });
  return (await response.json()).status === "success";
}

export async function readTrailImages(trail) {
  const response = await fetch(`/trail/image?name=${trail}`);
  return await response.json();
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
  const response = await fetch(`/trail/browse?town=${town}&offset=${page-1}`);
  return await response.json();
}

export async function readTrailsCount() {
  const response = await fetch('/trail/count');
  return await response.json();
}

//================= Reviews =================================================================================================

export async function createReview(trail, reviewBody, starCount) {
  const response = await fetch('/review', {
    method: 'POST',
    headers: { 'Content-Type':'application/json' },
    body: JSON.stringify({ trail: trail, body: reviewBody, starcount: starCount })
  });
  return await response.json();
}

export async function readReviewByTrail(trail) {
  const response = await fetch(`/review?trail=${trail}`);
  return await response.json();
}

export async function readReviewByUser(user) {
  const response = await fetch(`/review?user=${user}`);
  return await response.json();
}

export async function updateReview(user, trail ) {
  const response = await fetch('/review', {
    method: 'PUT',
    body: { user: user, trail: trail }
  });
  return await response.json();
}

export async function deleteReview(user, trail) {
  const response = await fetch('/review', {
    method: 'DELETE',
    query: { user: user, trail: trail }
  });
  return await response.json();
}


//==================== Events ===============================================================================================

export async function getUsername() {
  const response = await fetch(`/username`);
  return await response.json();
}

export async function createEvent(title, time, meetup, username, description, trail) {
  const response = await fetch('/event', {
    method: 'POST',
    headers: { 'Content-Type':'application/json' },
    body: JSON.stringify({ title:title, time:time, meetup:meetup, username:username, description:description, trail:trail })
  });
  return await response.json();
}

export async function uploadEventImage(eid, form_data) {
  const response = await fetch(`/event/image?eid=${eid}`, {
    method: 'POST',
    body: form_data
  });
  return (await response.json()).status === "success";
}

export async function readTrailNames() {
  const response = await fetch('/event/listTrails');
  return await response.json();
}

export async function readEvent(eid) {
  const response = await fetch(`/event?eid=${eid}`);
  return await response.json();
}

export async function readAllEvents() {
  const response = await fetch('/event/browse');
  return await response.json();
}

export async function updateEvent(name, time, meetup, description) {
  console.log(name);
  console.log(time);
  console.log(meetup);
  console.log(description);
  const response = await fetch('/event', {
    method: 'PUT',
    headers: { 'Content-Type':'application/json' },
    body: JSON.stringify({ eid:0, name:name, time:time, meetup:meetup, uid:0, description:description })
  });
  return await response.json().status === "success";
}

export async function deleteEvent(eid) {
  const response = await fetch(`/event/delete?eid=${eid}`, {
    method: 'DELETE',
  });
  return (await response.json()).status === "success";
}


//======================== User =============================================================================================

export async function createUser(formData) {
  const response = await fetch('/register', { method: 'POST', body: formData });
  return await response.json();
}

export async function deleteUser(username, password) {
  const response = await fetch('/user', { method: 'DELETE'});
  const data = await response.json();
  console.log(data)
  return data;
}

export async function updateUser(oldPassword, newPassword) {
  const response = await fetch('/user', {
    method: 'PUT',
    headers: { 'Content-Type':'application/json' },
    body: JSON.stringify({ oldPassword: oldPassword, newPassword: newPassword })
  });
  return await response.json();
}

export async function readUser(username) {
  const response = await fetch(`/user?username=${username}`);
  const data = await response.json()
  return data.status === 'SUCCESS';
}

export async function createLogin(formData) {
  const response = await fetch('/login', {
    method: 'POST',
    body: formData
  });
  return await response.json();
}

export async function checkLoggedIn() {
  const response = await fetch('/loggedIn', { method: 'GET' });
  return await response.json();
}

export async function logout() {
  const response = await fetch('/logout', {
    method: 'POST'
  });
  return await response.json();
}