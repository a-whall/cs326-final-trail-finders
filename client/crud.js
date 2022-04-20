
export async function createTrail(name, town, description) {
  const response = await fetch('/trail', { method: 'POST',
    headers: { 'Content-Type':'application/json' },
    body: JSON.stringify({ name:name, town:town, description:description })
  });
  console.log(JSON.stringify(await response.json()))
}

export async function readTrail(name) {
  const response = await fetch('/trail', { method: 'GET',
    query: { name: name }
  });
}

export async function updateTrail(name, town, description) {
  const response = await fetch('/trail', { method: 'PUT',
    body: { name: name, town: town, description: description}
  });
}

export async function deleteTrail(name) {
  const response = await fetch('/trail', { method: 'DELETE',
    query: { name: name }
  })
}

export async function createReview(user, trail, reviewBody) {
  const response = await fetch('/review', { method: 'POST',
    headers: { 'Content-Type':'application/json' },
    body: JSON.stringify({ user:user, trail:trail, reviewBody:reviewBody })
  });
  const data = await response.json()
  return data;
}

export async function readReviewByTrail(trail) {
  const response = await fetch('/review', { method: 'GET',
    query: { trail: trail }
  });
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