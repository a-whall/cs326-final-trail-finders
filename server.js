import express from 'express';
import upload from 'express-fileupload';
import logger from 'morgan';
//import 'dotenv/config';
import expressSession from 'express-session';
import auth from './authentication.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { TrailFinderDatabase } from "./database.js";




class TrailFinderServer {
  constructor(dburl) {
    this.dburl = dburl;
    this.app = express();
    this.app.use(logger('dev'));
    this.app.use(upload());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.static('client'));
    this.app.use(expressSession({ secret: process.env.SECRET || 'SECRET', resave: false, saveUninitialized: false}));
    auth.configure(this.app);
    // We will use __dirname later on to send files back to the client.
    // const __filename = fileURLToPath(import.meta.url);
    // const __dirname = dirname(dirname(__filename));
    return this;
  }

  async initRoutes() {
    this.app.get('/', function(req,res) { res.redirect('/homepage.html'); });
    this.app.post('/trail', this.db.createTrail.bind(this.db));
    this.app.post('/trail/image', this.db.createTrailImage.bind(this.db));
    this.app.get('/trail', this.db.readTrail.bind(this.db));
    this.app.get('/trail/browse', this.db.readTrails.bind(this.db));
    this.app.get('/trail/count', this.db.readTrailCount.bind(this.db));
    this.app.post('/review', this.checkLoggedIn, this.db.createReview.bind(this.db));
    this.app.get('/review', this.db.readReview.bind(this.db));
    this.app.delete('/review', this.db.deleteReview.bind(this.db));
    this.app.put('/review', this.db.updateReview.bind(this.db));
    this.app.post('/event', this.db.createEvent.bind(this.db));
    this.app.get('/event', this.db.readEvent.bind(this.db));
    this.app.put('/event', this.db.updateEvent.bind(this.db));
    this.app.delete('/event', this.db.deleteEvent.bind(this.db));
    this.app.post('/user', this.db.createUser.bind(this.db));
    this.app.get('/user', this.db.readUser.bind(this.db));
    this.app.get('/usercheck', this.db.readUser.bind(this.db));
    this.app.put('/user', this.db.updateUser.bind(this.db));
    this.app.delete('/user', this.db.deleteUser.bind(this.db));
    this.app.post('/login', auth.authenticate('local', {
      // use username/password authentication
      successRedirect: '/private', // when we login, go to /private
      failureRedirect: '/', // otherwise, back to login
    }));
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
  // Our own middleware to check if the user is authenticated
  checkLoggedIn(request, response, next) {
    if (request.isAuthenticated()) {
      next(); // If we are authenticated, run the next route.
    } else {
      console.log('access to route denied')
      response.status(401).json({ status: 'must be logged in to perform this action' }); // Otherwise, redirect to the login page.
    }
  }
}

new TrailFinderServer(process.env.DATABASE_URL).start();



// app.get('/', checkLoggedIn, (req, res) => {
//   //res.send('hello world');
// });

// // Handle the URL /login (just output the login.html file).
// app.get('/homepage', (req, res) =>
//   res.sendFile('client/homepage.html', { root: __dirname })
// );

// // Handle post data from the login.html form.
// app.post(
//   '/login',
//   auth.authenticate('local', {
//     // use username/password authentication
//     successRedirect: '/private', // when we login, go to /private
//     failureRedirect: '/', // otherwise, back to login
//   })
// );

// // Handle logging out (takes us back to the login page).
// app.get('/logout', (req, res) => {
//   req.logout(); // Logs us out!
//   res.redirect('/'); // back to login
// });

// // Like login, but add a new user and password IFF one doesn't exist already.
// // If we successfully add a new user, go to /login, else, back to /register.
// // Use req.body to access data (as in, req.body['username']).
// // Use res.redirect to change URLs.
// app.post('/createProfile', (req, res) => {
//   const { username, password } = req.body;
//   if (users.addUser(username, password)) {
//     res.redirect('/');
//   } else {
//     res.redirect('/register');
//   }
// });

// // Register URL
// app.get('/register', (req, res) =>
//   res.sendFile('client/createProfile.html', { root: __dirname })
// );

// // Private data
// app.get(
//   '/private',
//   checkLoggedIn, // If we are logged in (notice the comma!)...
//   (req, res) => {
//     // Go to the user's page.
//     res.redirect('/private/' + req.user);
//   }
// );

// // A dummy page for the user.
// app.get(
//   '/private/:userID/',
//   checkLoggedIn, // We also protect this route: authenticated...
//   (req, res) => {
//     // Verify this is the right user.
//     if (req.params.userID === req.user) {
//       res.writeHead(200, { 'Content-Type': 'text/html' });
//       res.write('<H1>HELLO ' + req.params.userID + '</H1>');
//       res.write('<br/><a href="/logout">click here to logout</a>');
//       res.end();
//     } else {
//       res.redirect('/private/');
//     }
//   }
// );

// app.get('*', (req, res) => {
//   res.send('Error');
// });
