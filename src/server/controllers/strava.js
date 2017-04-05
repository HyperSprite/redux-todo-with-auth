const strava = require('strava-v3');
const moment = require('moment');
const schedule = require('node-schedule');

const User = require('../models/user');
const Events = require('../models/events');
const auth = require('./authentication');
const hlpr = require('../lib/helpers');

// TODO this is just starting but have tested it and it works to pull data.
exports.getRoute = (req, res) => {
  strava.routes.get({ id: req.user.stravaId, access_token: req.user.access_token }, (err, data) => {
    if (err || !data) res.status(401).send({ error: 'Error or no data found' });
    hlpr.consLog(['getRoute', data]);
    res.send(data);
  });
};

exports.getUser = (req, res) => {
  strava.athlete.get({ id: req.user.stravaId, access_token: req.user.access_token }, (err, data) => {
    if (err || !data) res.status(401).send({ error: 'Error or no data found' });
    // controllers/authentication.writeUser(userData, user, resultUser)
    auth.writeUser({ athlete: data }, req.user, (resultUser) => {
      hlpr.consLog(['getUser ................', { athlete: resultUser }, req.user.stravaId]);
      res.json({ user: resultUser });
    });
  });
};


// Cron jobs for updating users stats each day.
exports.dailyUserUpdate = schedule.scheduleJob('00 06 * * *', () => {
  hlpr.consLog(['dailyUserUpdate has started', new Date()]);
  User.find({ clubMember: true }, (err, foundUsers) => {
    foundUsers.forEach((fUser) => {
      strava.athlete.get({ id: fUser.stravaId, access_token: fUser.access_token }, (err, athlete) => {
        if (!err && athlete) {
          auth.pushMetrics(athlete, fUser, ['ftp', 'weight'], (resUser) => {
            hlpr.consLog(['dailyUserUpdate', resUser.stravaId]);
          });
        }
      });
    });
  });
});