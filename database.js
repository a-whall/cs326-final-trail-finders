
let dummyDB = {
 users: { 1:{ name:'', } },
 reviews: { 1:{ user:1, body:'', likes:[1,2,3] }, },
 trails: { 1:{ name:'', town:'', description:'', reviews:[1,2,3] } },
 events: { 1:{ }}
};

// crud helper
function parse(request, ...properties) {
  for (const property of properties)
   if ( !(property in request) )
    return { error: `missing argument: ${property}` };
  return request;
}

// All CRUD operations go below