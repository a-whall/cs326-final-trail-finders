
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