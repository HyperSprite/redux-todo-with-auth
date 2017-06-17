const strava = require('strava-v3');
const schedule = require('node-schedule');

const User = require('../models/user');
const activ = require('./activities');
const auth = require('./authentication');
const hlpr = require('../lib/helpers');

exports.getActivities = (req, res) => {
  strava.activities.get({ id: req.user.stravaId, access_token: req.user.access_token }, (err, data) => {
    if (err || !data) res.status(401).send({ error: 'Error or no data found' });
    if (data.message === 'Authorization Error') auth.stravaSignOut(req, res);
    hlpr.consLog(['getActivity', data]);
    res.send(data);
  });
};

// TODO this is just starting but have tested it and it works to pull data.
exports.getRoute = (req, res) => {
  strava.routes.get({ id: req.user.stravaId, access_token: req.user.access_token }, (err, data) => {
    if (err || !data) res.status(401).send({ error: 'Error or no data found' });
    if (data.message === 'Authorization Error') auth.stravaSignOut(req, res);
    hlpr.consLog(['getRoute', data]);
    res.send(data);
  });
};

exports.getUser = (req, res) => {
  strava.athlete.get({ id: req.user.stravaId, access_token: req.user.access_token }, (err, data) => {
    if (err || !data) res.status(401).send({ error: 'Error or no data found' });
    if (data.message === 'Authorization Error') auth.stravaSignOut(req, res);
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
  activ.getRecentActivities(tmpReq, res);
};

exports.nightlyUpdate = () => {
  hlpr.consLog(['nightlyUpdate']);
  User.find({}, (err, foundUsers) => {
    foundUsers.forEach((fUser) => {
      hlpr.consLog(['nightlyUpdate', fUser.stravaId, fUser.access_token]);
      strava.athlete.get({ id: fUser.stravaId, access_token: fUser.access_token }, (err, athlete) => {
        hlpr.consLog(['nightlyUpdate athlete', athlete.id]);

        if (err || !athlete) {
          hlpr.consLog(['error: Error or no data found']);
          return null;
        }
        if (athlete.message === 'Authorization Error') {
          hlpr.consLog([athlete, fUser.stravaId, fUser.access_token]);
          return null;
        }

        hlpr.consLog(['nightlyUpdate.athlete', athlete.id]);
        auth.writeUser({ athlete: athlete }, fUser, (resUser) => {
          hlpr.consLog(['nightlyUpdate writeUser done', resUser.stravaId]);
          if (resUser.clubMember === true) {
            const tmpReq = {};
            tmpReq.pageCount = 1;
            tmpReq.activities = [];
            tmpReq.cronjob = true;
            tmpReq.user = fUser;
            activ.getAllActivities(tmpReq, (result) => {
              hlpr.consLog(['nightlyUpdate getAllActivities', result.activities.length]);
            });
          } else {
            hlpr.consLog(['nightlyUpdate getAllActivities not a club member', resUser.stravaId]);
          }
        });
      });
    });
  });
};

// *    *    *    *    *    *
// ┬    ┬    ┬    ┬    ┬    ┬
// │    │    │    │    │    |
// │    │    │    │    │    └ day of week (0 - 7) (0 or 7 is Sun)
// │    │    │    │    └───── month (1 - 12)
// │    │    │    └────────── day of month (1 - 31)
// │    │    └─────────────── hour (0 - 23)
// │    └──────────────────── minute (0 - 59)
// └───────────────────────── second (0 - 59, OPTIONAL) * not using this.

// Cron jobs for updating users stats and collecting new activities if the user has not visited.
exports.dailyUserUpdate = schedule.scheduleJob('00 20 * * *', () => {
  hlpr.consLog(['dailyUserUpdate has started']);
  exports.nightlyUpdate();
});
