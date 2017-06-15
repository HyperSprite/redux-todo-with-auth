const router = require('express').Router();
const passport = require('passport');

const passportService = require('./../services/passport');

exports.requireAuth = passport.authenticate('jwt', { session: false });

exports.requireAdmin = (req, res, next) => {
  if (req.user.adminMember !== true) {
    res.status(403).send({ error: `Error: Not authorized for ${req.path}` });
    console.log(`User: ${req.user.stravaId} - Error: Not authorized for ${req.path}`)
  } else {
    next();
  }
};
