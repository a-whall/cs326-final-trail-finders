import 'dotenv/config';
import pg from 'pg';

const { Pool } = pg; // Get the Pool class from the pg module.

export class TrailFinderDatabase {

  constructor(db_url) {
    this.dburl = db_url;
  }

  async connect() {
    this.pool = new Pool({
      connectionString: this.dburl,
      ssl: { rejectUnauthorized: false }, // Required for Heroku connections
    });
    this.client = await this.pool.connect();
    //await this.init();
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

  async createTrailImage(request,response) {
    if (request.files) {
      console.log(request.files)
    }
    response.status(200).end();
  }

  async readTrail(request, response) {
    const args = parse(request.query, "name");
    if ("error" in args) {
      response.status(400).json({ error: args.error });
    } else {
      const queryText = 'SELECT * FROM trails WHERE name = $1';
      const res = await this.client.query(queryText, [args.name]);
      if (res.rows.length > 0) {
        response.status(200).json(res.rows[0] /*imageURLs: ["https://photos.alltrails.com/eyJidWNrZXQiOiJhc3NldHMuYWxsdHJhaWxzLmNvbSIsImtleSI6InVwbG9hZHMvcGhvdG8vaW1hZ2UvMjc1NTQ1MTIvMmEyODczMmU3OGMzMmQ1MjA4ODVjMWJlZDEyMGNmODYuanBnIiwiZWRpdHMiOnsidG9Gb3JtYXQiOiJqcGVnIiwicmVzaXplIjp7IndpZHRoIjo1MDAsImhlaWdodCI6NTAwLCJmaXQiOiJpbnNpZGUifSwicm90YXRlIjpudWxsLCJqcGVnIjp7InRyZWxsaXNRdWFudGlzYXRpb24iOnRydWUsIm92ZXJzaG9vdERlcmluZ2luZyI6dHJ1ZSwib3B0aW1pc2VTY2FucyI6dHJ1ZSwicXVhbnRpc2F0aW9uVGFibGUiOjN9fX0=","https://photos.alltrails.com/eyJidWNrZXQiOiJhc3NldHMuYWxsdHJhaWxzLmNvbSIsImtleSI6InVwbG9hZHMvcGhvdG8vaW1hZ2UvNDE4NzIxMjUvYzgzYWI2ZjVlMWQxNmI5OWQ5MDcyMzk5MjQyZGQwY2IuanBnIiwiZWRpdHMiOnsidG9Gb3JtYXQiOiJqcGVnIiwicmVzaXplIjp7IndpZHRoIjoyMDQ4LCJoZWlnaHQiOjIwNDgsImZpdCI6Imluc2lkZSJ9LCJyb3RhdGUiOm51bGwsImpwZWciOnsidHJlbGxpc1F1YW50aXNhdGlvbiI6dHJ1ZSwib3ZlcnNob290RGVyaW5naW5nIjp0cnVlLCJvcHRpbWlzZVNjYW5zIjp0cnVlLCJxdWFudGlzYXRpb25UYWJsZSI6M319fQ==","https://photos.alltrails.com/eyJidWNrZXQiOiJhc3NldHMuYWxsdHJhaWxzLmNvbSIsImtleSI6InVwbG9hZHMvcGhvdG8vaW1hZ2UvMjEwMjY5NzMvNDJkZWE3NjM1NWE2OThlMWJlODYyZDUzYmUzNmQ5ZWEuanBnIiwiZWRpdHMiOnsidG9Gb3JtYXQiOiJqcGVnIiwicmVzaXplIjp7IndpZHRoIjo1MDAsImhlaWdodCI6NTAwLCJmaXQiOiJpbnNpZGUifSwicm90YXRlIjpudWxsLCJqcGVnIjp7InRyZWxsaXNRdWFudGlzYXRpb24iOnRydWUsIm92ZXJzaG9vdERlcmluZ2luZyI6dHJ1ZSwib3B0aW1pc2VTY2FucyI6dHJ1ZSwicXVhbnRpc2F0aW9uVGFibGUiOjN9fX0="]*/)
      } else {
        response.status(404).json({ status: "trail does not exist" });
      }
      console.log(res.rows)
    }
  }

  async readTrails(request, response) {
    const args = parse(request.query, "town", "offset");
    if ("error" in args) {
      response.status(400).json({ error: args.error });
    } else {
      const queryText = `SELECT * FROM trails LIMIT 10 OFFSET $1`;
      const res = await this.client.query(queryText, [args.offset * 10]);
      response.status(200).json(res.rows);
    }
  }

  async readTrailCount(request, response) {
    const res = await this.client.query('SELECT COUNT(name) AS num_trails FROM trails');
    response.status(200).json(parseInt(res.rows[0].num_trails));
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
    const args = parse(request.body, "eid", "name", "time", "meetup", "uid", "description");
    if ("error" in args) {
      response.status(400).json({ error: args.error });
    } else {
      // const queryText =
        // 'INSERT INTO events (eid, name, time, meetup, uid, description) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
      // const res = await this.client.query(queryText, [args.eid, args.name, args.time, args.meetup, args.uid, args.description]);
      // return res.rows;
      response.status(200).json({ eid: args.eid, name: args.name, time: args.time, meetup: args.meetup, uid: args.uid, description: args.description });
    }
  }

  async readEvent(request, response) {
    const args = parse(request.query, "eid");
    if ("error" in args) {
      response.status(400).json({ error: args.error });
    } else {
      // const queryText =
        // 'SELECT * FROM events WHERE eid = $1';
      // const res = await this.client.query(queryText, [args.eid]);
      response.status(200).json({ eid: args.eid});
    }
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
      response.status(200).json({ eid: args.eid });
      //const queryText =
        //'INSERT INTO reviews (user, trail, reviewBody) VALUES ($1, $2, $3) RETURNING *';
      //const res = await this.client.query(queryText, [args.user, args.trail, args.reviewBody]);
      //return res.rows;
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
