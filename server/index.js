import express from 'express';
import upload from 'express-fileupload';
import logger from 'morgan';
import expressSession from 'express-session';
import passport from 'passport';
import passportLocal from 'passport-local';
import 'dotenv/config';
import { TrailFinderDatabase } from "./database.js";

const { Strategy } = passportLocal;

class TrailFinderServer {
  constructor(dburl) {
    this.dburl = dburl;
    this.app = express();
    this.app.use(logger('dev'));
    this.app.use(upload());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.static('./client'));
    this.app.use(expressSession({ secret: process.env.SECRET || 'SECRET', resave: false, saveUninitialized: false }));
    this.app.use(passport.initialize());
    this.app.use(passport.session());
    passport.use(this.loginStrategy());
    passport.serializeUser((user, done) => done(null, user));
    passport.deserializeUser((uid, done) => done(null, uid));
    return this;
  }

  async initRoutes() {
    this.app.get('/', function(req,res) { res.redirect('/homepage.html'); });
    this.app.post('/trail', this.checkLoggedIn, this.db.createTrail.bind(this.db));
    this.app.post('/trail/image', this.db.createTrailImage.bind(this.db));
    this.app.get('/trail/image', this.db.readTrailImages.bind(this.db));
    this.app.get('/trail', this.db.readTrail.bind(this.db));
    this.app.get('/trail/browse', this.db.readTrails.bind(this.db));
    this.app.get('/trail/count', this.db.readTrailCount.bind(this.db));
    this.app.post('/review', this.checkLoggedIn, this.db.createReview.bind(this.db));
    this.app.post('/review/like', this.checkLoggedIn, this.db.createReviewLike.bind(this.db));
    this.app.get('/review/like', this.db.readReviewLike.bind(this.db));
    this.app.delete('/review/like', this.checkLoggedIn, this.db.deleteReviewLike.bind(this.db));
    this.app.get('/review', this.db.readReview.bind(this.db));
    this.app.put('/review/likecount', this.db.updateReviewLikeCount.bind(this.db));
    this.app.post('/event', this.checkLoggedIn, this.db.createEvent.bind(this.db));
    this.app.post('/event/image', this.db.createEventImage.bind(this.db));
    this.app.get('/event/listTrails', this.db.readTrailNames.bind(this.db));
    this.app.get('/event', this.db.readEvent.bind(this.db));
    this.app.get('/event/browse', this.db.selectEventsSort.bind(this.db));
    this.app.delete('/event/delete', this.checkLoggedIn, this.db.deleteEvent.bind(this.db));
    this.app.get('/user', this.db.readUser.bind(this.db));
    this.app.get('/usercheck', this.db.readUser.bind(this.db));
    this.app.put('/user', this.checkLoggedIn, this.db.updateUser.bind(this.db));
    this.app.delete('/user', this.checkLoggedIn, this.db.deleteUser.bind(this.db));
    this.app.post('/login', this.authenticate);
    this.app.post('/logout', this.logout);
    this.app.post('/register', this.db.insertUser.bind(this.db));
    this.app.get('/username', (req, res) => res.status(200).json({ val: req.user }));
    this.app.get('/loggedIn', (req, response) => response.status(200).json({ value: req.isAuthenticated(), username: req.user }));
  }

  async initDb() {
    this.db = new TrailFinderDatabase(this.dburl);
    await this.db.connect();
  }

  async start() {
    await this.initDb();
    await this.initRoutes();
    const port = process.env.PORT || 3000;
    this.app.listen(port,_=> console.log(`Server started on port ${port}!`));
  }

  loginStrategy() {
    return new Strategy(async (username, password, done) => {
      const userExists = await this.db.checkUser(username);
      if (!userExists) {
        return done(null, false, { message: 'Incorrect username or password' });
      }
      const validUserProfile = await this.db.attemptLogin(username, password);
      if (!validUserProfile) {
        await new Promise((r) => setTimeout(r, 1000)); // one second delay
        return done(null, false, { message: 'Incorrect username or password' });
      }
      return done(null, username);
    });
  }

  authenticate(request, response, next) {
    passport.authenticate('local', function (error, user, info) {
      if (error) return next(error); // auto-generate 500 error
      if (!user) {
        response.status(200).json({ status: info.message });
        return next(error);
      }
      // call our login strategy
      request.login(user, function (error) {
        if (error) return next(error);
        return response.status(200).json({ status: 'success', username: request.user });
      })
    })(request, response, next); // invoke passport.authenticate
  }

  // Custom middleware to check if the user is authenticated
  checkLoggedIn(request, response, next) {
    if (request.isAuthenticated()) {
      next(); // If authenticated, run the next route.
    } else {
      console.log('     access to route denied');
      response.status(200).json({ status: 'must be logged in to perform this action' });
    }
  }

  logout(request, response) {
    request.logout();
    response.status(200).json({ status: 'success'});
  }
}

new TrailFinderServer(process.env.DATABASE_URL).start();