import express from 'express';
import upload from 'express-fileupload';
import logger from 'morgan';


import { TrailFinderDatabase } from "./database.js";

class TrailFinderServer {
  constructor(dburl) {
    this.dburl = dburl;
    this.app = express();
    this.app.use(logger('dev'));
    this.app.use(upload());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use('/', express.static('client'));
    return this;
  }

  async initRoutes() {
    this.app.get('/', function(req,res) { res.redirect('/homepage.html'); });
    this.app.post('/trail', this.db.createTrail.bind(this.db));
    this.app.post('/trail/image', this.db.createTrailImage.bind(this.db));
    this.app.get('/trail/image', this.db.readTrailImages.bind(this.db));
    this.app.get('/trail', this.db.readTrail.bind(this.db));
    this.app.get('/trail/browse', this.db.readTrails.bind(this.db));
    this.app.get('/trail/count', this.db.readTrailCount.bind(this.db));
    this.app.post('/review', this.db.createReview.bind(this.db));
    this.app.get('/review', this.db.readReview.bind(this.db));
    this.app.delete('/review', this.db.deleteReview.bind(this.db));
    this.app.put('/review', this.db.updateReview.bind(this.db));
    this.app.post('/event', this.db.createEvent.bind(this.db));
    this.app.post('/event/image', this.db.createEventImage.bind(this.db));
    this.app.get('/event', this.db.readEvent.bind(this.db));
    this.app.get('/event/browse', this.db.readAllEvents.bind(this.db));
    this.app.put('/event', this.db.updateEvent.bind(this.db));
    this.app.delete('/event/delete', this.db.deleteEvent.bind(this.db));
    this.app.post('/user', this.db.createUser.bind(this.db));
    this.app.get('/user', this.db.readUser.bind(this.db));
    this.app.put('/user', this.db.updateUser.bind(this.db));
    this.app.delete('/user', this.db.deleteUser.bind(this.db));
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

new TrailFinderServer(process.env.DATABASE_URL).start();

