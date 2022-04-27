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
        ('Sonny', 'Mount Toby State Forest' 'Great place to bring the kids!')
        
        CREATE TABLE IF NOT EXISTS events (
          eid SERIAL PRIMARY KEY,
          title varchar(64),
          time varchar(64),
          meetup varchar(64),
          username varchar(32),
          description varchar(1920),
          trail varchar(64)
        );
        
        INSERT INTO
	        events(title, time, meetup, username, description, trail)
        VALUES
          ('Norwottuck Rail Trail Event!', '04/06/2022, 4pm to 7pm', 'Amherst Town', 'Amanda', 'Lets bike!', 'Norwottuck Rail Trail'),
          ('The Notch Event!', '04/07/2022, 4pm to 7pm', 'Northhampton', 'Joe', 'Walk trail', 'The Notch');`;
    await this.client.query(queryText);
  }
  async createTrail(request, response) {
    const args = parse(request.body, "name", "town", "description");
    if ("error" in args) {
      response.status(400).json({ error: args.error });
    } else {
      // create ID or use trail name as ID?
      // const queryText = 'INSERT INTO trails (name, town, description) VALUES ($1, $2, $3) RETURNING *';
      // const res = await this.client.query(queryText, [args.name, args.town, args.description]);
      // return res.rows;
      response.status(200).json({ status:"success" });
    }
  }
  async readTrail(request, response) {
    const args = parse(request.query, "name");
    if ("error" in args) {
      response.status(400).json({ error: args.error });
    } else {
      // const queryText = 'SELECT * FROM trails WHERE name = $1';
      // const res = await this.client.query(queryText, [args.name]);
      response.status(200).json({ name: args.name, town: "Amherst", description: "This is a placeholder description of a trail until we get the database working.", imageURLs: ["https://photos.alltrails.com/eyJidWNrZXQiOiJhc3NldHMuYWxsdHJhaWxzLmNvbSIsImtleSI6InVwbG9hZHMvcGhvdG8vaW1hZ2UvMjc1NTQ1MTIvMmEyODczMmU3OGMzMmQ1MjA4ODVjMWJlZDEyMGNmODYuanBnIiwiZWRpdHMiOnsidG9Gb3JtYXQiOiJqcGVnIiwicmVzaXplIjp7IndpZHRoIjo1MDAsImhlaWdodCI6NTAwLCJmaXQiOiJpbnNpZGUifSwicm90YXRlIjpudWxsLCJqcGVnIjp7InRyZWxsaXNRdWFudGlzYXRpb24iOnRydWUsIm92ZXJzaG9vdERlcmluZ2luZyI6dHJ1ZSwib3B0aW1pc2VTY2FucyI6dHJ1ZSwicXVhbnRpc2F0aW9uVGFibGUiOjN9fX0=","https://photos.alltrails.com/eyJidWNrZXQiOiJhc3NldHMuYWxsdHJhaWxzLmNvbSIsImtleSI6InVwbG9hZHMvcGhvdG8vaW1hZ2UvNDE4NzIxMjUvYzgzYWI2ZjVlMWQxNmI5OWQ5MDcyMzk5MjQyZGQwY2IuanBnIiwiZWRpdHMiOnsidG9Gb3JtYXQiOiJqcGVnIiwicmVzaXplIjp7IndpZHRoIjoyMDQ4LCJoZWlnaHQiOjIwNDgsImZpdCI6Imluc2lkZSJ9LCJyb3RhdGUiOm51bGwsImpwZWciOnsidHJlbGxpc1F1YW50aXNhdGlvbiI6dHJ1ZSwib3ZlcnNob290RGVyaW5naW5nIjp0cnVlLCJvcHRpbWlzZVNjYW5zIjp0cnVlLCJxdWFudGlzYXRpb25UYWJsZSI6M319fQ==","https://photos.alltrails.com/eyJidWNrZXQiOiJhc3NldHMuYWxsdHJhaWxzLmNvbSIsImtleSI6InVwbG9hZHMvcGhvdG8vaW1hZ2UvMjEwMjY5NzMvNDJkZWE3NjM1NWE2OThlMWJlODYyZDUzYmUzNmQ5ZWEuanBnIiwiZWRpdHMiOnsidG9Gb3JtYXQiOiJqcGVnIiwicmVzaXplIjp7IndpZHRoIjo1MDAsImhlaWdodCI6NTAwLCJmaXQiOiJpbnNpZGUifSwicm90YXRlIjpudWxsLCJqcGVnIjp7InRyZWxsaXNRdWFudGlzYXRpb24iOnRydWUsIm92ZXJzaG9vdERlcmluZ2luZyI6dHJ1ZSwib3B0aW1pc2VTY2FucyI6dHJ1ZSwicXVhbnRpc2F0aW9uVGFibGUiOjN9fX0="]})
    }
  }
  async readTrails(request, response) {
    const args = parse(request.query, "town", "offset");
    if ("error" in args) {
      response.status(400).json({ error: args.error });
    } else {
      // const queryText = `SELECT * FROM trails LIMIT 10 OFFSET $1`;
      // const res = await this.client.query(queryText, [args.offset * 10]);
      response.status(200).json(["The Notch", "Amethyst Brook Conservation Area", "Rattlesnake Gutter", "Mount Toby State Forest", "Norwottuch Rail Trail", "Mill River Conservation Area", "Skinner State Park"]);
    }
  }
  async createReview(request, response) {
    const args = parse(request.body, "user", "trail", "reviewBody", "starCount");
    if ("error" in args) {
      response.status(400).json({ error: args.error });
    } else {
      // const queryText = 'DELETE FROM trails WHERE name = $1';
      // const res = await this.client.query(queryText, [args.name]);
      response.status(200).json({user: args.user, trail: args.trail, reviewBody: args.reviewBody, starCount: args.starCount, likeCount: 0 })
    }
  }
  async readReview(request, response) {
    const args = parse(request.query, "trail");
    if ("error" in args) {
      response.status(400).json({ error: args.error });
    } else {
      const loremIpsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
      const dummyReviewObjects = [{starCount: 4, reviewBody: loremIpsum, user: "Some User", likeCount: 7 },{starCount: 5,reviewBody: loremIpsum,user: "Another User",likeCount: 2},{starCount: 3,reviewBody: loremIpsum,user: "One Last User",likeCount: 0}];
      response.status(200).json(dummyReviewObjects);
    }
  }
  async updateReview(request, response) {
    const args = parse(request.body, "rid", "uid", "tid", "revbody", "like");
    const rid = args.rid;
    const idx = rid.indexOf('xx');
    const resId = rid.substring(0,idx);
    if ("error" in args) {
      response.status(400).json({ error: args.error });
    } 
    else {
      response.status.json({ status: "success" });
    }
  }
  async deleteReview(request, response) {
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
      response.status.json({ status: "success" });
    }
  }
  async createEvent(request, response) {
    const args = parse(request.body, "title", "time", "meetup", "username", "description", "trail");
    console.log(args);
    console.log('test');
    const eid = 2;
    if ("error" in args) {
      response.status(400).json({ error: args.error });
    } else {
      const queryText =
        `INSERT INTO
        events(title, time, meetup, username, description, trail)
      VALUES
        ('Norwottuck Rail Trail Event!', '04/06/2022, 4pm to 7pm', 'Amherst Town', 'Amanda', 'Lets bike!', 'Norwottuck Rail Trail'),`;
      // const res = await this.client.query(queryText, [args.title, args.time, args.meetup, args.username, args.description, args.trail]);
      return res.rows;
      response.status(200).json({ eid: 0, title: args.title, time: args.time, meetup: args.meetup, username: args.username, description: args.description });
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
      response.status(200).json(res.rows);
    }
  }
  async readAllEvents(request, response) {
    const queryText =
      'SELECT * FROM events';
    const res = await this.client.query(queryText);
    response.status(200).json(res.rows);
  }
  async updateEvent(request, response) {  // uid might not be needed up updateevent, as event should correspond to same host/uid
    const args = parse(request.body, "eid", "name", "time", "meetup", "uid", "description");
    if ("error" in args) {
      response.status(400).json({ error: args.error });
    } else {
      // const queryText =
        // `UPDATE events
        // SET name = $2, time = $3, meetup = $4, uid = $5, description = $6
        // WHERE eid = $1`;
      // const res = await this.client.query(queryText, [args.eid, args.name, args.time, args.meetup, args.uid, args.description]);
      response.status(200).json({ eid: args.eid, name: args.name, time: args.time, meetup: args.meetup, uid: args.uid, description: args.description });
    }
  }
  async deleteEvent(request, response) {
    const args = parse(request.query, "eid");
    if ("error" in args) {
      response.status(400).json({ error: args.error });
    } else {
      // const queryText = 'DELETE FROM events WHERE eid = $1';
      // const res = await this.client.query(queryText, [args.eid]);
      response.status(200);
    }
  }
}


// API helper
function parse(request, ...properties) {
  for (const property of properties)
   if ( !(property in request) )
    return { error: `missing argument: ${property}` };
  return request;
}
