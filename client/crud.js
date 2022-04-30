

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

export async function createEvent(title, time, meetup, host, description, trail) {
  console.log(title);
  console.log(time);
  console.log(meetup);
  console.log(description);
  console.log(trail);
  console.log('test4');
  const response = await fetch('/event', {
    method: 'POST',
    headers: { 'Content-Type':'application/json' },
    body: JSON.stringify({ title:title, time:time, meetup:meetup, username:host, description:description, trail:trail })
  });
  return await response.json().status === "success";
}

export async function uploadEventImage(eid, form_data) {
  const response = await fetch(`/event/image`, {
    method: 'POST',
    body: form_data
  });
  return (await response.json()).status === "success";
}

export async function readEvent(eid) {
  console.log(eid);
  const response = await fetch(`/event?eid=${eid}`, {
    method: 'READ',
    headers: { 'Content-Type':'application/json' },
    query: JSON.stringify({ eid:eid })
  });
  return await response.json();
}

export async function readAllEvents() {
  const response = await fetch('/event/browse', {
    method: 'READ',
  });
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
  console.log(eid);
  const response = await fetch(`/event?eid=${eid}`, {
    method: 'DELETE',
    headers: { 'Content-Type':'application/json' },
    query: JSON.stringify({ eid:eid })
  });
  return await response.json().status === "success";
}

export async function createUser(username, password) {
  const response = await fetch('/user', { method: 'POST',
    headers: { 'Content-Type':'application/json' },
    body: JSON.stringify({ username:username, password:password })
  });
  const data = await response.json();
  return data;
}

export async function deleteUser(username, password) {
  const response = await fetch('/user', { method: 'DELETE',
    headers: { 'Content-Type':'application/json' },
    body: JSON.stringify({ username:username, password:password })
  });
  const data = await response.json();
  console.log(data)
  return data;
}

export async function updateUser(username, oldPassword, newPassword) {
  console.log(username)
  console.log(oldPassword)
  console.log(newPassword)
  const response = await fetch('/user', { method: 'PUT',
    headers: { 'Content-Type':'application/json' },
    body: JSON.stringify({ username: username, oldPassword: oldPassword, newPassword: newPassword })
  });
  const data = await response.json()
  return data;
}

export async function readUser(username, password) {
  const response = await fetch('/user', { method: 'GET',
    headers: { 'Content-Type':'application/json' },
    body: JSON.stringify({ username:username, password:password })
  });
  const data = await response.json()
  return data.status === 'SUCCESS';
}

export async function checkUser(username) {
  const response = await fetch('/usercheck', { method: 'GET',
    headers: { 'Content-Type':'application/json' },
    body: JSON.stringify({ username:username })
  });
  const data = await response.json()
  return data.status === "SUCCESS";
}

export async function attemptLogin(form_data) {
  const response = await fetch('/login', { method: 'POST', body: form_data });
  const data = await response.json()
  return data;
}

