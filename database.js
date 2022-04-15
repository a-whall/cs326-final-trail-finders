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
        ('Mount Toby State Forest', 'Leverett', 'Waterfall')`;
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
}

// Deal with attendance database later
export class EventPageDatabase {
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
      CREATE TABLE IF NOT EXISTS events (
        eid int primary key,
        name varchar(64),
        time varchar(64),
        meetup varchar(64),
        uid int,
        description varchar(1920)
      );
      
      INSERT INTO
        events(eid, name, time, meetup, uid, description)
      VALUES
        (1, 'Norwottuck Rail Trail', '04/06/2022, 4pm to 7pm', 'Amherst Town', 1, 'Let's bike!'),
        (2, 'The Notch', '04/07/2022, 4pm to 7pm', 'Northhampton', 2, 'Walk trail')`;
    await this.client.query(queryText);
  }
  async createEvent(request, response) {
    console.log(JSON.stringify(request.body))
    const args = parse(request.body, "eid", "name", "time", "meetup", "uid", "description");
    if ("error" in args) {
      response.status(400).json({ error: args.error });
    } else {
      const queryText =
        'INSERT INTO events (eid, name, time, meetup, uid, description) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
      const res = await this.client.query(queryText, [args.eid, args.name, args.time, args.meetup, args.uid, args.description]);
      return res.rows;
    }
  }
  async readEvent(request, response) {
    const args = parse(request.query, "eid");
    if ("error" in args) {
      response.status(400).json({ error: args.error });
    } else {
      const queryText =
        'SELECT * FROM events WHERE eid = $1';
      const res = await this.client.query(queryText, [args.eid]);
    }
  }
  async updateEvent(request, response) {  // uid might not be needed up updateevent, as event should correspond to same host/uid
    const args = parse(request.body, "eid", "name", "time", "meetup", "uid", "description");
    if ("error" in args) {
      response.status(400).json({ error: args.error });
    } else {
      const queryText =
        `UPDATE events
        SET name = $2, time = $3, meetup = $4, uid = $5, description = $6
        WHERE eid = $1`;
      const res = await this.client.query(queryText, [args.eid, args.name, args.time, args.meetup, args.uid, args.description]);
    }
  }
  async deleteEvent(request, response) {
    const args = parse(request.query, "eid");
    if ("error" in args) {
      response.status(400).json({ error: args.error });
    } else {
      const queryText = 'DELETE FROM events WHERE eid = $1';
      const res = await this.client.query(queryText, [args.eid]);
    }
  }
}

let dummyDB = {
 users: { 1:{ name:'', } },
 reviews: { 1:{ user:1, body:'', likes:[1,2,3] }, },
 trails: { 1:{ name:'', town:'', description:'', reviews:[1,2,3] } },
 events: { 1:{ name:'', time:'', meetup:'', user:1, description:'' } }
};

// crud helper
function parse(request, ...properties) {
  for (const property of properties)
   if ( !(property in request) )
    return { error: `missing argument: ${property}` };
  return request;
}

// All CRUD operations go below

// example crud operation
export async function createUser(request, response) {
  const args = parse(request.query, "name", "username", "password", "any other fields");
  if ("error" in args) {
    response.status(400).json({ error: args.error });
  } else {
    // handle valid response
  }
}
