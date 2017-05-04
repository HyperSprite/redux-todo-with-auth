const strava = require('strava-v3');
const schedule = require('node-schedule');

const User = require('../models/user');
const activ = require('./activities');
const auth = require('./authentication');
const hlpr = require('../lib/helpers');

exports.getActivities = (req, res) => {
  strava.activities.get({ id: req.user.stravaId, access_token: req.user.access_token }, (err, data) => {
    if (err || !data) res.status(401).send({ error: 'Error or no data found' });
    hlpr.consLog(['getActivity', data]);
    res.send(data);
  });
};

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

exports.getUserActivities = (req, res) => {
  hlpr.consLog(['strava.getUserActivities start']);
  const tmpReq = req;
  tmpReq.pageCount = 1;
  tmpReq.activities = [];
  activ.getAllActivities(tmpReq, (result) => {
    hlpr.consLog(['getUserActivities', result.activities]);
    res.send({ activityCount: result.activities.length });
  });
};

// Cron jobs for updating users stats and collecting new activities if the user has not visited.
exports.dailyUserUpdate = schedule.scheduleJob('00 06 * * *', () => {
  hlpr.consLog(['dailyUserUpdate has started', new Date()]);
  User.find({ clubMember: true }, (err, foundUsers) => {
    foundUsers.forEach((fUser) => {
      strava.athlete.get({ id: fUser.stravaId, access_token: fUser.access_token }, (err, athlete) => {
        if (!err && athlete) {
          auth.pushMetrics(athlete, fUser, ['ftp', 'weight'], (resUser) => {
            hlpr.consLog(['dailyUserUpdate', resUser.stravaId]);
          });
          const tmpReq = {};
          tmpReq.cronjob = true;
          tmpReq.user = fUser;
          activ.getAllActivities(tmpReq, (result) => {
            hlpr.consLog(['getUserActivities', result.activities.length]);
          });
        }
      });
    });
  });
});
