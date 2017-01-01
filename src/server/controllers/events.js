const strava = require('strava-v3');

const User = require('../models/user');
const Events = require('../models/events');
const config = require('../config');
const hlpr = require('../lib/helpers');

exports.addEvent = (req, res) => {
  const toSave = req.body;

  toSave.eventCreator = req.user.stravaId;

  hlpr.consLog([
    'events.addEvent',
    'req.user:',
    req.user,
    'req.body:',
    req.body,
    'toSave',
    toSave,
  ]);

  Events.create( toSave, (err, event) => {
    hlpr.consLog(['event', err, event]);
    if (!err) {
      hlpr.consLog(['Event saved', event]);
    } else {
      hlpr.consLog(['Event error', err]);
    }
    res.send(event);
  });
};

exports.user = (req, res) => {
  User.findOne({ stravaId: req.user.stravaId },{ password: 0 }, (err, user) => {
    if (err) { return next(err); }
    if (user) {
      hlpr.consLog(['auth-user', 'AUTH USER: User found', user.email]);
      return res.json({ user: user });
    }
  });
};
