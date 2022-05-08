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
  }

  async createTrail(request, response) {
    const args = parse(request.body, "name", "town", "description");
    if ("error" in args) {
      response.status(400).json({ error: args.error });
    } else {
      const queryText = 'INSERT INTO trails (name, town, description) VALUES ($1, $2, $3) RETURNING *';
      try {
        await this.client.query(queryText, [args.name, args.town, args.description]);
        response.status(200).json({ status:"success" });
      } catch(error) {
        console.log(error);
        response.status(200).json({ status: 'database error occured' });
      }
    }
  }

  async createTrailImage(request, response) {
    const args = parse(request.query, "name");
    if ("error" in args) {
      response.status(400).json({ error: args.error });
    } else if (!request.files) {
      response.status(400).json({ error: "must send files to upload" });
    } else {
      const queryText = 'INSERT INTO trail_images (name, filetype, image) VALUES ($1, $2, $3)';
      try {
        for (const [name,file] of Object.entries(request.files)) {
          await this.client.query(queryText, [args.name, file.mimetype, file.data.toString('base64')]);
        }
        response.status(200).json({ status: "success" });
      } catch(error) {
        console.log(error);
        response.status(200).json({ status: 'database error occurred'});
      }
    }
  }

  async readTrailImages(request, response) {
    const args = parse(request.query, "name");
    if ("error" in args) {
      response.status(400).json({ error: args.error });
    } else {
      const queryText = 'SELECT * FROM trail_images WHERE name = $1';
      try {
        const res = await this.client.query(queryText, [args.name]);
        response.status(200).json(res.rows.length > 0 ? res.rows : []);
      } catch (error) {
        console.log(error);
        response.status(500).json({ status: 'database error occurred' });
      }
    }
  }

  async readTrail(request, response) {
    const args = parse(request.query, "name");
    if ("error" in args) {
      response.status(400).json({ error: args.error });
    } else {
      const queryText = 'SELECT * FROM trails WHERE name = $1';
      try {
        const result = await this.client.query(queryText, [args.name]);
        response.status(200).json(result.rows.length > 0 ? result.rows[0] : { status: "trail does not exist" });
      } catch (error) {
        console.log(error);
        response.status(500).json({ status: 'database error occurred' });
      }
    }
  }

  async readTrailNames(request, response) {
    const queryText = 'SELECT name FROM trails';
    try {
      const res = await this.client.query(queryText);
      response.status(200).json(res.rows);
    } catch (error) {
      console.log(error);
      response.status(500).json({ status: 'database error occurred' });
    }
  }

  async readTrails(request, response) {
    const args = parse(request.query, "town", "offset");
    if ("error" in args) {
      response.status(400).json({ error: args.error });
    } else {
      const queryText = `SELECT * FROM trails LIMIT 10 OFFSET $1`;
      try {
        const res = await this.client.query(queryText, [args.offset * 10]);
        response.status(200).json(res.rows);
      } catch (error) {
        console.log(error);
        response.status(500).json({ status: 'database error occurred' });
      }
    }
  }

  async readTrailCount(request, response) {
    const res = await this.client.query('SELECT COUNT(name) AS num_trails FROM trails');
    response.status(200).json(parseInt(res.rows[0].num_trails));
  }

  // Review Functions
  async createReview(request, response) {
    const args = parse(request.body, "trail", "body", "starcount");
    if ("error" in args) {
      response.status(400).json({ error: args.error });
    } else {
      const queryText = 'INSERT INTO reviews (username, trailname, body, starcount, likecount) VALUES ($1, $2, $3, $4, $5)';
      try {
        await this.client.query(queryText, [request.user, args.trail, args.body, args.starcount, 0]);
        response.status(200).json({ success: true, username: request.user, trailname: args.trail, body: args.body, starcount: args.starcount, likecount: 0 });
      } catch (err) {
        console.log(err);
        response.status(500).json({ status: "a database error occurred" });
      }
    }
  }

  async createReviewLike(request, response) {
    const args = parse(request.body, "poster", "trailname", "userwholiked");
    if ("error" in args) {
      response.status(400).json({ error: args.error });
    } else {
      const queryText = 'INSERT INTO review_likes (poster, trailname, userwholiked) VALUES ($1, $2, $3)';
      try {
        await this.client.query(queryText, [args.poster, args.trailname, args.userwholiked]);
        response.status(200).json({ status: 'success' });
      } catch (error) {
        console.log(error);
        response.status(500).json({ status: 'database error occurred' });
      }
    }
  }

  async readReviewLike(request, response) {
    const args = parse(request.query, "poster", "trailname", "userwholiked");
    if ("error" in args) {
      response.status(400).json({ error: args.error });
    } else {
      const queryText = 'SELECT * FROM review_likes WHERE poster = $1 AND trailname = $2 AND userwholiked = $3';
      try {
        const result = await this.client.query(queryText, [args.poster, args.trailname, args.userwholiked]);
        response.status(200).json(result.rows);
      } catch(err) {
        console.log(err);
        response.status(500).json({ status: "a database error occurred" });
      }
    }
  }

  async deleteReviewLike(request, response) {
    const args = parse(request.body, "poster", "trailname", "userwholiked");
    if ("error" in args) {
      response.status(400).json({ error: args.error });
    } else {
      const queryText =
      `DELETE FROM review_likes WHERE poster = $1 AND trailname = $2 AND userwholiked = $3`;
      try {
        await this.client.query(queryText, [args.poster, args.trailname, args.userwholiked]);
        response.status(200).json({ status: "success" });
      } catch (error) {
        console.log(error);
        response.status(500).json({ status: 'database error occurred' });
      }
    }
  }

  async readReview(request, response) {
    const args = parse(request.query, "trail");
    if ("error" in args) {
      response.status(400).json({ error: args.error });
    } else {
      const queryText = 'SELECT * FROM reviews WHERE trailname = $1';
      try {
        const result = await this.client.query(queryText, [args.trail]);
        response.status(200).json(result.rows);
      } catch(err) {
        console.log(err);
        response.status(500).json({ status: 'database error occurred' });
      }
    }
  }

  async updateReviewLikeCount(request, response) {
    const args = parse(request.body, "change", "user", "trail");
    console.log(args);
    if ('error' in args) {
      response.status(400).json({ error: args.error });
    } else {
      try {
        const queryText = 
        `UPDATE reviews SET likecount = likecount + $1 WHERE (username = $2 AND trailname = $3);`;
        const res = await this.client.query(queryText, [args.change, args.user, args.trail]);
        response.status(200).json({ status: "success" })
      } catch(err) {
        console.log(err);
        response.status(500).json({ status: "a database error occurred" });
      }
    }
  }

  // Event Functions
  async createEvent(request, response) {
    const args = parse(request.body, "title", "date", "starttime", "endtime", "meetup", "username", "description", "trail");
    if ("error" in args) {
      response.status(400).json({ error: args.error });
    } else {
      const queryText = 'INSERT INTO events (eid, title, date, starttime, endtime, meetup, username, description, trail) VALUES (DEFAULT, $1, $2, $3, $4, $5, $6, $7, $8) RETURNING eid';
      try {
        const res = await this.client.query(queryText, [args.title, args.date, args.starttime, args.endtime, args.meetup, args.username, args.description, args.trail]);
        return response.status(200).json(res.rows[0].eid);
      } catch (error) {
        console.log(error);
        response.status(500).json({ status: 'database error occurred' });
      }
    }
  }
  async createEventImage(request, response) {
    const args = parse(request.query, "eid");
    if ("error" in args) {
      response.status(400).json({ error: args.error });
    } else if (!request.files) {
      response.status(400).json({ error: "must send files to upload" });
    } else {
      const queryText = 'UPDATE events SET filetype = $1, image = $2 WHERE eid = $3';
      try {
        for (const [name, file] of Object.entries(request.files)) {
          await this.client.query(queryText, [file.mimetype, file.data.toString('base64'), args.eid]);
        }
        response.status(200).json({ status: "success" });
      } catch (error) {
        console.log(error);
        response.status(500).json({ status: 'database error occurred' });
      }
    }
  }

  async readEvent(request, response) {
    const args = parse(request.query, "eid");
    console.log(args);
    if ("error" in args) {
      response.status(400).json({ error: args.error });
    } else {
      const queryText = 'SELECT * FROM events WHERE eid = $1';
      try {
        const res = await this.client.query(queryText, [args.eid]);
        response.status(200).json(res.rows[0]);
      } catch (error) {
        console.log(error);
        response.status(500).json({ status: 'database error occurred' });
      }
    }
  }

  async selectEventsSort(request, response) {
    const args = parse(request.query, "sort");
    if ("error" in args) {
      response.status(400).json({ error: args.error });
    } else {
      const queryText = `SELECT * FROM events ORDER BY ${args.sort} ASC`;
      try {
        const res = await this.client.query(queryText);
        response.status(200).json(res.rows);
      } catch (error) {
        console.log(error);
        response.status(500).json({ status: 'database error occurred' });
      }
    }
  }

  async deleteEvent(request, response) {
    const args = parse(request.query, "eid");
    if ("error" in args) {
      response.status(400).json({ error: args.error });
    } else {
      const queryText = 'DELETE FROM events WHERE eid = $1 RETURNING *';
      try {
        await this.client.query(queryText, [args.eid]);
        response.status(200).json({ status: "success" });
      } catch (error) {
        console.log(error);
        response.status(500).json({ status: 'database error occurred' });
      }
    }
  }

  async insertUser(request, response) {
    const args = parse(request.body, 'username', 'password');
    if ('error' in args) {
      response.status(400).json({ error: args.error });
    } else {
      const userExists = await this.checkUser(args.username);
      if (userExists) {
        response.status(200).json({ status: 'username already exists' });
      } else {
        try {
          const queryText = 'INSERT INTO user_info (username, password) VALUES ($1, $2)';
          await this.client.query(queryText, [args.username, args.password]);
          response.status(200).json({ status: `Success! ${args.username} is now a registered account. You may now log in from the home page.` });
        } catch (error) {
          console.log(error);
          response.status(200).json({ status: 'databse error occured' });
        }
      }
    }
  }

  async updateUser(request, response) {
    const args = parse(request.body, 'oldPassword', 'newPassword');
    if ('error' in args) {
      response.status(400).json({ error: args.error });
    } else {
      const queryText = 'UPDATE user_info SET password = $3 WHERE username = $1 AND password = $2';
      try {
        await this.client.query(queryText, [request.user, args.oldPassword, args.newPassword]);
        response.status(200).json({ status: 'Password has been updated.' });
      } catch (error) {
        console.log(error);
        response.status(200).json({ status: 'Password update failed.'});
      }
    }
  }

  async deleteUser(request, response) {
    const queryText = 'DELETE FROM user_info WHERE username = $1';
    const res = await this.client.query(queryText, [request.user]);
    response.status(200).json({ status: "success" });
  }

  async readUser(request, response) {
    console.log(request.query)
    const args = parse(request.query, "username");
    if ("error" in args) {
      response.status(400).json({ error: args.error });
    } else {
      const queryText = 'SELECT * from user_info where username = $1';
      const res = await this.client.query(queryText, [args.username]);
      response.status(200).json((res.rows.length > 0)? {status: 'SUCCESS'} : {status: 'USERNAME DOES NOT EXIST'});
    }
  }

  async checkUser(username) {
    const queryText = 'SELECT * FROM user_info WHERE username = $1';
    const result = await this.client.query(queryText, [username]);
    return result.rows.length > 0;
  }

  async attemptLogin(username, password) {
    const queryText = 'SELECT * FROM user_info WHERE username = $1 AND password = $2';
    const result = await this.client.query(queryText, [username, password]);
    return result.rows.length > 0;
  }
}


// API helper
function parse(request, ...properties) {
  for (const property of properties)
   if ( !(property in request) )
    return { error: `missing argument: ${property}` };
  return request;
}