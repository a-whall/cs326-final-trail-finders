import 'dotenv/config';
import pg from 'pg';

// Get the Pool class from the pg module.
const { Pool } = pg;

export class TrailFinderDatabase {
  constructor(db_url) {
    this.dburl = db_url;
  }
  async connect() {
    // Create a new Pool. The Pool manages a set of connections to the database.
    // It will keep track of unused connections, and reuse them when new queries
    // are needed. The constructor requires a database URL to make the
    // connection. You can find the URL of your database by looking in Heroku
    // or you can run the following command in your terminal:
    //
    //  heroku pg:credentials:url -a APP_NAME
    //
    // Replace APP_NAME with the name of your app in Heroku.
    this.pool = new Pool({
      connectionString: this.dburl,
      ssl: { rejectUnauthorized: false }, // Required for Heroku connections
    });

    // Create the pool.
    this.client = await this.pool.connect();

    // Init the database.
    await this.init();
  }
  async init() {
    const queryText = `
      CREATE TABLE IF NOT EXISTS trails (
        name varchar(64) primary key,
        town varchar(64),
        description varchar(1920)
      );
      
      INSERT INTO
        trails(name, town, description)
      VALUES
        ('Robert Frost Trail', 'Amherst', 'Cool place'),
        ('Rattlesnake Gutter', 'Leverett', 'Rocks'),
        ('Mount Toby State Forest', 'Leverett', 'Waterfall')
        
      
      CREATE TABLE IF NOT EXISTS reviews (
        user varchar(32) primary key,
        trail varchar(64),
        reviewBody varchar(500)
      );
        
      INSERT INTO
        reviews(user, trail, reviewBody)
      VALUES
        ('David', 'Robert Frost Trail', 'My favorite place to hike!'),
        ('Andrew', 'Rattlesnake Gutter', 'Challenging climbing.'),
        ('Sonny', 'Mount Toby State Forest' 'Great place to bring the kids!')`;
    await this.client.query(queryText);
  }
  async createTrail(request, response) {
    console.log(JSON.stringify(request.body))
    const args = parse(request.body, "name", "town", "description");
    if ("error" in args) {
      response.status(400).json({ error: args.error });
    } else {
      // create ID or use trail name as ID?
      const queryText =
        'INSERT INTO trails (name, town, description) VALUES ($1, $2, $3) RETURNING *';
      const res = await this.client.query(queryText, [args.name, args.town, args.description]);
      return res.rows;
    }
  }
  async readTrail(request, response) {
    const args = parse(request.query, "name");
    if ("error" in args) {
      response.status(400).json({ error: args.error });
    } else {
      const queryText =
        'SELECT * FROM trails WHERE name = $1';
      const res = await this.client.query(queryText, [args.name]);
    }
  }
  async updateTrail(request, response) {
    const args = parse(request.query, "trail_id", "name", "town", "description");
    if ("error" in args) {
      response.status(400).json({ error: args.error });
    } else {
      const queryText =
        `UPDATE trails
        SET town = $2, description = $3
        WHERE name = $1`;
      const res = await this.client.query(queryText, [args.name, args.town, args.description]);
    }
  }
  async deleteTrail(request, response) {
    const args = parse(request.query, "name");
    if ("error" in args) {
      response.status(400).json({ error: args.error });
    } else {
      const queryText = 'DELETE FROM trails WHERE name = $1';
      const res = await this.client.query(queryText, [args.name]);
    }
  }

  async createReview(request, response) {
    const args = parse(request.body, "user", "trail", "reviewBody");
    if ("error" in args) {
      response.status(400).json({ error: args.error });
    } else {
      const queryText =
        'INSERT INTO reviews (user, trail, reviewBody) VALUES ($1, $2, $3) RETURNING *';
      const res = await this.client.query(queryText, [args.user, args.trail, args.reviewBody]);
      return res.rows;
    }
  }
}

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
