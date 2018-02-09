const strava = require('strava-v3');
const schedule = require('node-schedule');

const User = require('../models/user');
const activitiesCtrlr = require('./activities');
const routeplansCtrlr = require('./routeplans');
const authCtrlr = require('./authentication');
const hlpr = require('../lib/helpers');

exports.getActivities = (req, res) => {
  strava.activities.get({ id: req.user.stravaId, access_token: req.user.access_token }, (err, data) => {
    if (err || !data) res.status(401).send({ error: 'Error or no data found' });
    if (data.message === 'Authorization Error') authCtrlr.stravaSignOut(req, res);
    hlpr.consLog(['getActivity', data]);
    res.send(data);
  });
};

// http://localhost:3080/apiv1/strava/user-activities
exports.getUserActivities = (req, res) => {
  hlpr.consLog(['strava.getUserActivities start']);
  activitiesCtrlr.getRecentActivities(Object.assign(req, { pageCount: 1 }), res);
};

// TODO this is just starting but have tested it and it works to pull data.
exports.getRoute = (req, res) => {
  strava.routes.get({ id: req.params.id, access_token: req.user.access_token }, (err, data) => {
    if (err || !data) res.status(401).send({ error: 'Error or no data found' });
    if (data.message === 'Authorization Error') authCtrlr.stravaSignOut(req, res);
    hlpr.consLog(['getRoute', data]);
    res.send(data);
  });
};

exports.getUserRouteplans = (req, res) => {
  hlpr.consLog(['strava.getUserRouteplans start']);
  const tmpReq = req;
  tmpReq.pageCount = 1;
  routeplansCtrlr.getRecentRouteplans(tmpReq, res);
};

exports.getUser = (req, res) => {
  strava.athlete.get({ id: req.user.stravaId, access_token: req.user.access_token }, (err, data) => {
    if (err || !data) res.status(401).send({ error: 'Error or no data found' });
    if (data.message === 'Authorization Error') authCtrlr.stravaSignOut(req, res);
    // controllers/authentication.writeUser(userData, user, resultUser)
    authCtrlr.writeUser({ athlete: data }, req.user, (resultUser) => {
      hlpr.consLog(['getUser ................', { athlete: resultUser }, req.user.stravaId]);
      res.json({ user: resultUser });
    });
  });
};

exports.getFriends = (req, res) => {
  strava.athlete.listFriends({ id: req.user.stravaId, access_token: req.user.access_token }, (err, data) => {
    const result = data.map(d => d.id);
    res.json(result)
  });
};

exports.nightlyUpdate = () => {
  User.find({}, (err, foundUsers) => {
    foundUsers.forEach((fUser) => {
      strava.athlete.get({ id: fUser.stravaId, access_token: fUser.access_token }, (err, athlete) => {
        hlpr.consLog(['nightlyUpdate athlete', athlete.id]);

        if (err || !athlete) {
          hlpr.consLog(['error: Error or no data found']);
          const logObj = {
            stravaId: fUser.stravaId,
            logType: 'admin',
            level: 2,
            error: err,
            message: 'Controllers/Strava: exports.nightlyUpdate',
            page: 'nightlyUpdate',
          };
          hlpr.logOut(logObj);
          return null;
        }
        if (athlete.message === 'Authorization Error') {
          hlpr.consLog([athlete, fUser.stravaId, fUser.access_token]);
          const logObj = {
            stravaId: fUser.stravaId,
            logType: 'admin',
            level: 1,
            error: err,
            message: 'Controllers/Strava: exports.nightlyUpdate Authorization Error',
            page: 'nightlyUpdate',
          };
          authCtrlr.updateAuthorizationError(fUser.stravaId);
          hlpr.logOut(logObj);
          return null;
        }
        authCtrlr.writeUser({ athlete: athlete }, fUser, (resUser) => {
          hlpr.consLog(['nightlyUpdate writeUser done', resUser.stravaId]);
          const tmpRt = {
            pageCount: 1,
            routeplans: [],
            cronjob: true,
            user: fUser,
          };
          routeplansCtrlr.getAllRouteplans(tmpRt, (result) => {
            hlpr.consLog(['nightlyUpdate getAllRouteplans \n ___ triggered result.length', result.length]);
          });
          if (resUser.clubMember === true) {
            const tmpAct = {
              pageCount: 1,
              activities: [],
              cronjob: true,
              user: fUser,
            };
            activitiesCtrlr.getAllActivities(tmpAct, (result) => {
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


const runOnStartup = () => {
  console.log('strava.runOnStartup');
  exports.nightlyUpdate();
};
runOnStartup();
