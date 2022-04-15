import express from 'express';
import logger from 'morgan';
import { TrailFinderDatabase, EventPageDatabase } from "./database.js";

class TrailFinderServer {
  constructor(dburl) {
    this.dburl = dburl;
    this.app = express();
    this.app.use(logger('dev'));
    this.app.use('/', express.static('client'));
    return this;
  }

  async initRoutes() {
    this.app.post('/trail', this.db.createTrail);
  }

  async initDb() {
    this.db = new TrailFinderDatabase(this.dburl);
    await this.db.connect();
  }

  async start() {
    await this.initDb();
    await this.initRoutes();
    const port = process.env.PORT || 3000;
    this.app.listen(port, () => {
      console.log(`Server started on port ${port}!`);
    });
  }
}

class EventPageServer {
  constructor(dburl) {
    this.dburl = dburl;
    this.app = express();
    this.app.use(logger('dev'));
    this.app.use('/', express.static('client'));
    return this;
  }

  async initRoutes() {
    this.app.post('/event', this.db.createEvent);
  }

  async initDb() {
    this.db = new EventPageDatabase(this.dburl);
    await this.db.connect();
  }

  async start() {
    await this.initDb();
    await this.initRoutes();
    const port = process.env.PORT || 3000;
    this.app.listen(port, () => {
      console.log(`Server started on port ${port}!`);
    });
  }
}

new TrailFinderServer(process.env.DATABASE_URL).start();

new EventPageServer(process.env.DATABASE_URL).start();