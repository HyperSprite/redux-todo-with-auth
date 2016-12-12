const passport = require('passport');
const LocalStrategy = require('passport-local');
const StravaStrategy = require('passport-strava-oauth2').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const User = require('../models/user');
const config = require('../config');
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

const stravaOauth2 = new StravaStrategy({
  clientID: config.stravaOauth2.clientID,
  clientSecret: config.stravaOauth2.clientSecret,
  callbackURL: config.stravaOauth2.callbackURL,
},
(accessToken, refreshToken, profile, done) => {
  User.findOrCreate({ stravaId: profile.id }, (err, user) => done(err, user));
});

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.secret,
};

// { sub: user.id, iat: timestamp } from authentication.js is the payload here
const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
  User.findById(payload.sub, (err, user) => {
    if (err) { return done(err, false); }
    return user ? done(null, user) : done(null, false);
  });
});

passport.use(jwtLogin);
passport.use(localLogin);
passport.use(stravaOauth2);
