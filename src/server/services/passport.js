const passport = require('passport');
const LocalStrategy = require('passport-local');
const StravaStrategy = require('passport-strava-oauth2').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const path = require('path');

const User = require('../models/user');
const hlpr = require('../lib/helpers');

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
  callbackURL: `${process.env.SITE_URL}/${process.env.STRAVA_REDIRECT_URI}`,
},
(accessToken, refreshToken, profile, done) => {
  User.findOrCreate({ stravaId: profile.id }, (err, user) => {
    hlpr.consLog(['passport.stravaLogin', 'err', err, 'user', user, 'accessToken', accessToken, 'profile', profile]);
    return done(err, user);
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
      hlpr.consLog(['passport.jwtLogin err', err]);
      return done(err, false);
    }
    hlpr.consLog(['passport.jwtLogin user', user]);
    return user ? done(null, user) : done(null, false);
  });
});

passport.use(jwtLogin);
passport.use(localLogin);
passport.use(stravaLogin);
