
let dummyDB = {
 users: { 1:{ name:'', } },
 reviews: { 1:{ user:1, body:'', likes:[1,2,3] }, },
 trails: { 1:{ name:'', town:'', description:'', reviews:[1,2,3] } },
 events: { 1:{ name:'', time:'', meetup:'', user:1, attendees:[1,2,3], description:'' } },
 attendance: { 1:{ user:1, event: 1 }, 2:{ user:2, event:1 }, 3:{ user:3, event:1 } }
};

// crud helper
function parse(request, ...properties) {
  for (const property of properties)
   if ( !(property in request) )
    return { error: `missing argument: ${property}` };
  return request;
}

// All CRUD operations go below

// CRUD Operations for Event Page
export async function createEvent(request, response) {
  const args = parse(request.body, "eid", "name", "time", "meetup", "user", "description");
  if ("error" in args) {
    response.status(400).json({ error: args.error });
  } else {
    const eid = args.eid; // might change this part to have computer determine eid instead of having to manually in postman (same situation for all other CRUD operations)
    dummyDB.events[eid] = {}; // better to check if eid exists instead of clearing. Fix later
    dummyDB.events[eid].name = args.name;
    dummyDB.events[eid].time = args.time;
    dummyDB.events[eid].meetup = args.meetup;
    dummyDB.events[eid].user = parseInt(args.user);
    dummyDB.events[eid].attendees = [];
    dummyDB.events[eid].description = args.description;
    response.json(dummyDB.events[eid]);
  }
}

export async function readEvent(request, response) {
  const args = parse(request.query, "eid");
  if ("error" in args) {
    response.status(400).json({ error: args.error });
  } else {
    response.json(dummyDB.events[args.eid]);
  }
}

export async function updateEvent(request, response) {
  const args = parse(request.body, "eid", "name", "time", "meetup", "description");
  if ("error" in args) {
    response.status(400).json({ error: args.error });
  } else {
    const eid = args.eid;
    dummyDB.events[eid].name = args.name;
    dummyDB.events[eid].date = args.date;
    dummyDB.events[eid].time = args.time;
    dummyDB.events[eid].meetup = args.meetup;
    dummyDB.events[eid].description = args.description;
    response.json(dummyDB.events[eid]);
  }
}

export async function deleteEvent(request, response) {
  const args = parse(request.body, "eid");
  if ("error" in args) {
    response.status(400).json({ error: args.error });
  } else {
    const eid = args.eid;
    delete dummyDB.events[eid];
    response.json(dummyDB.events);
  }
}

// CRUD Operations for Attendance within Event Page
export async function createAttendance(request, response) {
  const args = parse(request.body, "aid", "user", "event");
  if ("error" in args) {
    response.status(400).json({ error: args.error });
  } else {
    const aid = args.aid;
    dummyDB.attendance[aid] = {}; // check if aid exist instead of clearing it
    dummyDB.attendance[aid].user = args.user;
    dummyDB.attendance[aid].event = args.event;
    response.json(dummyDB.attendance[aid]);
  }
}

export async function deleteAttendance(request, response) {
  const args = parse(request.body, "aid");
  if ("error" in args) {
    response.status(400).json({ error: args.error });
  } else {
    const aid = args.aid;
    delete dummyDB.attendance[aid];
    response.json(dummyDB.attendance);
  }
}

// example crud operation
export async function createUser(request, response) {
  const args = parse(request.query, "name", "username", "password", "any other fields");
  if ("error" in args) {
    response.status(400).json({ error: args.error });
  } else {
    // handle valid response
  }
}
