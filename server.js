import express from 'express';
import logger from 'morgan';
import { TrailFinderDatabase } from "./database.js";

class TrailFinderServer {
  constructor(dburl) {
    this.dburl = dburl;
    this.app = express();
    this.app.use(logger('dev'));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use('/', express.static('client'));
    return this;
  }

  async initRoutes() {
    this.app.post('/trail', this.db.createTrail);
    this.app.get('/trail', this.db.readTrail);
    this.app.get('/trail/browse', this.db.readTrails);
  }

  async initDb() {
    this.db = new TrailFinderDatabase(this.dburl);
    // await this.db.connect();
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