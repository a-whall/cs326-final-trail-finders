/************************* authentication stuff *************************************/
import express from 'express';
import logger from 'morgan';
import passport from 'passport';
import passportLocal from 'passport-local';
import 'dotenv/config';
import expressSession from 'express-session';
import auth from './auth.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

import { TrailFinderDatabase } from "./database.js";



const { Strategy } = passportLocal;

// Passport Configuration
// Create a new LocalStrategy object to handle authentication using username and
// password credentials from the client. The LocalStrategy object is used to
// authenticate a user using a username and password.
const strategy = new Strategy(async (username, password, done) => {
  if (!users.findUser(username)) {
    // no such user
    return done(null, false, { message: 'Wrong username' });
  }
  if (!users.validatePassword(username, password)) {
    // invalid password
    // should disable logins after N messages
    // delay return to rate-limit brute-force attacks
    await new Promise((r) => setTimeout(r, 2000)); // two second delay
    return done(null, false, { message: 'Wrong password' });
  }
  // success!
  // should create a user object here, associated with a unique identifier
  return done(null, username);
});

// Configure passport to use the LocalStrategy object.
// The LocalStrategy object is used to authenticate a user using a username and
// password. There are other strategies available, but this is the simplest.
passport.use(strategy);

// Convert user object to a unique identifier.
passport.serializeUser((user, done) => {
  done(null, user);
});

// Convert a unique identifier to a user object.
passport.deserializeUser((uid, done) => {
  done(null, uid);
});

export default {
  configure: (app) => {
    app.use(passport.initialize());
    app.use(passport.session());
  },

  authenticate: (domain, where) => {
    return passport.authenticate(domain, where);
  },
};

/********************************************/

// We will use __dirname later on to send files back to the client.
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(dirname(__filename));

// Create the Express app
const app = express();
const port = process.env.PORT || 3000;

// Session configuration
const sessionConfig = {
  // set this encryption key in Heroku config (never in GitHub)!
  secret: process.env.SECRET || 'SECRET',
  resave: false,
  saveUninitialized: false,
};

// Setup the session middleware
app.use(expressSession(sessionConfig));
// Allow JSON inputs
app.use(express.json());
// Allow URLencoded data
app.use(express.urlencoded({ extended: true }));
// Allow static file serving
app.use(express.static('client'));
// Configure our authentication strategy
auth.configure(app);

// Our own middleware to check if the user is authenticated
function checkLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    // If we are authenticated, run the next route.
    next();
  } else {
    // Otherwise, redirect to the login page.
    res.redirect('/login');
  }
}

app.get('/', checkLoggedIn, (req, res) => {
  res.send('hello world');
});

// Handle the URL /login (just output the login.html file).
app.get('/login', (req, res) =>
  res.sendFile('client/login.html', { root: __dirname })
);

// Handle post data from the login.html form.
app.post(
  '/login',
  auth.authenticate('local', {
    // use username/password authentication
    successRedirect: '/private', // when we login, go to /private
    failureRedirect: '/login', // otherwise, back to login
  })
);

// Handle logging out (takes us back to the login page).
app.get('/logout', (req, res) => {
  req.logout(); // Logs us out!
  res.redirect('/login'); // back to login
});

// Like login, but add a new user and password IFF one doesn't exist already.
// If we successfully add a new user, go to /login, else, back to /register.
// Use req.body to access data (as in, req.body['username']).
// Use res.redirect to change URLs.
app.post('/register', (req, res) => {
  const { username, password } = req.body;
  if (users.addUser(username, password)) {
    res.redirect('/login');
  } else {
    res.redirect('/register');
  }
});

// Register URL
app.get('/register', (req, res) =>
  res.sendFile('client/register.html', { root: __dirname })
);

// Private data
app.get(
  '/private',
  checkLoggedIn, // If we are logged in (notice the comma!)...
  (req, res) => {
    // Go to the user's page.
    res.redirect('/private/' + req.user);
  }
);

// A dummy page for the user.
app.get(
  '/private/:userID/',
  checkLoggedIn, // We also protect this route: authenticated...
  (req, res) => {
    // Verify this is the right user.
    if (req.params.userID === req.user) {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.write('<H1>HELLO ' + req.params.userID + '</H1>');
      res.write('<br/><a href="/logout">click here to logout</a>');
      res.end();
    } else {
      res.redirect('/private/');
    }
  }
);

app.get('*', (req, res) => {
  res.send('Error');
});

app.listen(port, () => {
  console.log(`App now listening at http://localhost:${port}`);
});

/******************************************************/

class Users {
  constructor() {
    // we use an in-memory "database"; this isn't persistent but is easy
    // default user
    this.users = { emery: 'compsci326' };
  }

  // Returns true iff the user exists.
  findUser(username) {
    if (!this.users[username]) {
      return false;
    } else {
      return true;
    }
  }

  // Returns true iff the password is the one we have stored (in plaintext = bad
  // but easy).
  validatePassword(name, pwd) {
    if (!this.findUser(name)) {
      return false;
    }
    if (this.users[name] !== pwd) {
      return false;
    }
    return true;
  }

  // Add a user to the "database".
  addUser(name, pwd) {
    if (this.findUser(name)) {
      return false;
    }
    this.users[name] = pwd;
    return true;
  }
}

export default new Users();