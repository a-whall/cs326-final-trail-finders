
let dummyDB = {
 users: { 1:{ name:'', } },
 reviews: { 1:{ user:1, revbody:'', likes:[1,2,3] }, },
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



 // CRUD operations for reviews
 export async function createReview(request, response) {
   const args = parse(request.body, "uid", "tid", "revbody");
   if ("error" in args) {
     response.status(400).json({ error: args.error });
   } else {
     const rid = args.uid+"XX"+args.tid; //figured we could make the rid a combo of the user and the trail,
     dummyDB.reviews[rid] = {};          // that way we can easily link a review to either by removing the "XX" from the string
     dummyDB.reviews[rid].uid = args.uid;
     dummyDB.reviews[rid].tid = args.tid;
     dummyDB.reviews[rid].revbody = args.revbody;
     dummyDB.reviews[rid].likes = []
     response.json(dummyDB.reviews[rid]);
   }
 }
 
 export async function readReview(request, response) {
   const args = parse(request.query, "rid");
   if ("error" in args) {
     response.status(400).json({ error: args.error });
   } else {
     response.json(dummyDB.reviews[args.rid]);
   }
 }
 
 export async function updateReview(request, response) {
   const args = parse(request.body, "rid", "uid", "tid", "revbody", "like");
   const rid = args.rid;
   const idx = rid.indexOf('xx');
   const resId = rid.substring(0,idx);
   if ("error" in args) {
     response.status(400).json({ error: args.error });
   } 
   else {
     if (resId !== args.uid){
      dummyDB.reviews[rid].revbody = args.revbody;
     }
     dummyDB.reviews[rid].likes.push(args.uid);
     response.json(dummyDB.reviews[rid]);
   }
 }
 
 export async function deleteReview(request, response) {
   const args = parse(request.body, "rid", "uid");
   const rid = args.rid;
   const idx = rid.indexOf('xx');
   const resId = rid.substring(0,idx);
   if ("error" in args) {
     response.status(400).json({ error: args.error });
   } 
   else if (resId !== args.uid){
    response.status(400).json({ error: "cannot delete other users' reviews" });
   }
   else {
     delete dummyDB.reviews[rid];
     response.json(dummyDB.reviews);
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
