import passport from 'passport';
import passportLocal from 'passport-local';
import 'dotenv/config';
import * as crud from './client/crud.js'

const { Strategy } = passportLocal;

const localStrategy = new Strategy(async (username, password, done) => {
  let userExists = await crud.checkUser(username);
  if (!userExists) {
    return done(null, false, { message: 'Invalid username' });
  }
  let validUserProfile = await crud.readUser(username, password);
  if (!validUserProfile) {
    await new Promise((r) => setTimeout(r, 2000)); // two second delay
    return done(null, false, { message: 'Wrong password' });
  }
  return done(null, username);
});

passport.use(localStrategy);
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((uid, done) => done(null, uid));

export default {
  configure: (app) => {
    app.use(passport.initialize());
    app.use(passport.session());
  },
  authenticate: (domain, where) => passport.authenticate(domain, where)
};