const passport = require('passport');
const refresh = require('passport-oauth2-refresh');
const LocalStrategy = require('passport-local');
const StravaStrategy = require('passport-strava-oauth2').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const path = require('path');

const User = require('../models/user');
const hlpr = require('../lib/helpers');
const txt = require('./nexmo');

const localOptions = { usernameField: 'email' };

const localLogin = new LocalStrategy(localOptions, (email, password, done) => {
  User.findOne({ email: email }, (err, user) => {
    if (err) { return done(err); }
    if (!user) { return done(null, false); }

    user.comparePassword(password, (err, isMatch) => {
      if (err) { return done(err); }
      if (!isMatch) { return done(null, false); }
      return done(null, user);
    });
  });
});

const stravaLogin = new StravaStrategy({
  clientID: process.env.STRAVA_CLIENT_ID,
  clientSecret: process.env.STRAVA_CLIENT_SECRET,
  callbackURL: `/${process.env.STRAVA_REDIRECT_URI}`,
  scope: `read_all,activity:read_all,profile:read_all`,
},
(accessToken, refreshToken, profile, done) => {
  const tmpAthlete = {
    stravaId: profile.id,
    access_token: accessToken, // was profile.token
    refresh_token: refreshToken,
  };
  User.findOrCreate({ stravaId: tmpAthlete.stravaId }, tmpAthlete, (err, user, created) => {
    if (created) {
      const message = `ARaceathlete new user ${user.firstname} ${user.lastname}, https://www.strava.com/athletes/${user.stravaId}, clubMember: ${user.clubMember}`;
      txt.sendText(process.env.ADMIN_TXT_NUMBER, message);
      hlpr.logOutArgs('services/passport.stravaLogin', 'auth', 'sussess', 5, err, null, message, user.stravaId);
    }
    // this if handles if the user removes access then changes mind and gets a new token
    if (tmpAthlete.access_token !== user.access_token) {
      User.findOneAndUpdate(
        { stravaId: tmpAthlete.stravaId },
        {
          access_token: tmpAthlete.access_token,
          refresh_token: tmpAthlete.refresh_token,
        },
        { new: true },
        (err, updatedUser) => done(err, updatedUser));
    } else {
      return done(err, user);
    }
  });
});

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: process.env.AUTH_SECRET,
};

// { sub: user.id, iat: timestamp } from authentication.js is the payload here
const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
  User.findById(payload.sub, (err, user) => {
    if (err) {
      return done(err, false);
    }
    return user ? done(null, user) : done(null, false);
  });
});

passport.use(jwtLogin);
// passport.use(localLogin);  // not using any localLogin
passport.use(stravaLogin);
refresh.use(stravaLogin);
