const strava = require('strava-v3');
const schedule = require('node-schedule');

const socketSrvr = require('../sockets');
const User = require('../models/user');
const ctrlActivities = require('./activities');
const ctrlRouteplans = require('./routeplans');
const authCtrlr = require('./authentication');
const hlpr = require('../lib/helpers');

const logObj = {
  file: 'controllers/strava',
  stravaId: null,
  logType: 'controller',
  level: 10,
};

function promiseCallback(func, ...args) {
  return new Promise((resolve, reject) => {
    args.push((err, res) => {
      if (err) reject(err);
      else resolve(res);
    });
    func.apply(args);
  });
}

exports.getActivities = (req, res) => {
  strava.activities.get({ id: req.user.stravaId, access_token: req.user.access_token }, (err, data) => {
    if (err || !data) res.status(401).send({ error: 'Error or no data found' });
    if (data && data.message === 'Authorization Error') {
      authCtrlr.handleRefresh(exports.getActivities, req, res);
    }
    hlpr.logOutArgs(`${logObj.file}.getActivities`, logObj.logType, 'info', 9, err, req.originalUrl, `status ${data.message}`, req.user.stravaId);
    res.send(data);
  });
};

// http://localhost:3080/apiv1/strava/user-activities
exports.getUserActivities = (req, res) => {
  hlpr.logOutArgs(`${logObj.file}.getUserActivities`, logObj.logType, 'info', 9, null, req.originalUrl, 'status pageCount: 1', req.user.stravaId);
  ctrlActivities.getRecentActivities(Object.assign(req, { pageCount: 1 }), res);
};

// TODO this is just starting but have tested it and it works to pull data.
exports.getRoute = (req, res) => {
  strava.routes.get({ id: req.params.id, access_token: req.user.access_token }, (err, data) => {
    if (err || !data) {
      hlpr.logOutArgs(`${logObj.file}.getRoute`, logObj.logType, 'failure', 3, err, req.originalUrl, `status 401 ${data.message} ${data.id}`, req.user.stravaId);
      res.status(401).send({ error: 'Error or no data found' });
    }
    if (data && data.message === 'Authorization Error') {
      authCtrlr.handleRefresh(exports.getRoute, req, res);
    }
    hlpr.logOutArgs(`${logObj.file}.getRoute`, logObj.logType, 'info', 9, err, req.originalUrl, `status ${data.message} ${data.id}`, req.user.stravaId);
    res.send(data);
  });
};

exports.getUserRouteplans = (req, res) => {
  hlpr.consLog(['strava.getUserRouteplans start']);
  const tmpReq = req;
  tmpReq.pageCount = 1;
  ctrlRouteplans.getRecentRouteplans(tmpReq, res);
};

exports.getUser = (req, res) => {
  strava.athlete.get({ id: req.user.stravaId, access_token: req.user.access_token }, (err, data) => {
    if (err || !data) {
      hlpr.logOutArgs(`${logObj.file}.getUser err`, logObj.logType, 'failure', 3, err, req.originalUrl, `status 401 ${data.message} ${data.id}`, req.user.stravaId);
      res.status(401).send({ error: 'Error or no data found' });
    }
    if (data && data.message === 'Authorization Error') {
      authCtrlr.handleRefresh(exports.getUser, req, res);
    }
    // controllers/authentication.writeUser(userData, user, resultUser)
    authCtrlr.writeUser({ athlete: data }, req.user, (resultUser) => {
      hlpr.logOutArgs(`${logObj.file}.getUser`, logObj.logType, 'info', 9, err, req.originalUrl, `status ${resultUser.id}`, req.user.stravaId);

      if (resultUser.clubMember === true) {
        const tmpAct = {
          pageCount: 1,
          activities: [],
          cronjob: true,
          user: resultUser,
        };
        ctrlActivities.getAllActivities(tmpAct, (result) => {
          hlpr.logOutArgs(`${logObj.file}.getUser getAllActivities club member`, logObj.logType, 'info', 9, err, 'cron_no_page', `status triggered activities count ${result}`, resultUser.stravaId);
        });
      }

      res.json({ user: resultUser });
    });
  });
};

exports.deauthUser = async (user) => {
  let result;
  try {
    result = await promiseCallback(strava.oauth.deauthorize, { access_token: user.access_token });
    hlpr.logOutArgs(`${logObj.file}.getUser getAllActivities club member`, logObj.logType, 'info', 9, 'none', 'cron_no_page', `status triggered activities count ${result}`, user.stravaId);
    return result;
  } catch (err) {
    result = { message: 'remove user failed', err };
    hlpr.logOutArgs(`${logObj.file}.getUser getAllActivities club member`, logObj.logType, 'info', 4, err, 'cron_no_page', `status triggered activities count ${result}`, user.stravaId);
    return result;
  }
};

exports.getFriends = (req, res) => {
  strava.athlete.listFriends({
    id: req.user.stravaId,
    access_token: req.user.access_token,
  }, (err, data) => {
    if (data && data.message === 'Authorization Error') {
      authCtrlr.handleRefresh(exports.getFriends, req, res);
    }
    const result = data.map(d => d.id);
    res.json(result);
  });
};

function getNightlyUser(fUser){
  strava.athlete.get({ id: fUser.stravaId, access_token: fUser.access_token }, (err, athlete) => {
    if (err || !athlete) {
      hlpr.logOutArgs(`${logObj.file}.nightlyUpdate err`, logObj.logType, 'failure', 2, err, 'cron_no_page', 'status error or no athlete', fUser.stravaId);
      hlpr.consLog(['error: Error or no data found']);
      return null;
    }
    hlpr.consLog(['nightlyUpdate athlete', athlete.id]);
    if (athlete && athlete.message === 'Authorization Error') {
      authCtrlr.handleRefresh(getNightlyUser, { user: fUser });
    }
    authCtrlr.writeUser({ athlete: athlete }, fUser, (resUser) => {
      hlpr.consLog(['nightlyUpdate writeUser done', resUser.stravaId]);
      const tmpRt = {
        pageCount: 1,
        routeplans: [],
        cronjob: true,
        user: fUser,
      };
      ctrlRouteplans.getAllRouteplans(tmpRt, (result) => {
        hlpr.logOutArgs(`${logObj.file}.nightlyUpdate getAllRouteplans`, logObj.logType, 'info', 9, err, 'cron_no_page', `status triggered routeplan count ${result.length}`, fUser.stravaId);
      });
      if (resUser.clubMember === true) {
        const tmpAct = {
          pageCount: 1,
          activities: [],
          cronjob: true,
          user: fUser,
        };
        ctrlActivities.getAllActivities(tmpAct, (result) => {
          hlpr.logOutArgs(`${logObj.file}.nightlyUpdate getAllActivities club member`, logObj.logType, 'info', 9, err, 'cron_no_page', `status triggered activities count ${result}`, fUser.stravaId);
        });
      } else {
        hlpr.logOutArgs(`${logObj.file}.nightlyUpdate getAllActivities non club member`, logObj.logType, 'info', 9, err, 'cron_no_page', 'status triggered activities non clubmember', fUser.stravaId);
      }
    });
  });
}

exports.nightlyUpdate = () => {
  User.find({ access_token: { $ne: '' } }, (err, foundUsers) => {
    foundUsers.forEach((fUser) => {
      getNightlyUser(fUser);
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
  hlpr.logOutArgs(`${logObj.file}.dailyUserUpdate`, logObj.logType, 'system', 9, null, 'cron_no_page', 'User update started', null);
  exports.nightlyUpdate();
});


const runOnStartup = () => {
  hlpr.logOutArgs(`${logObj.file}.runOnStartup`, logObj.logType, 'system', 1, null, 'cron_no_page', 'Starting up', null);
  exports.nightlyUpdate();
  // console.log('socketRoomList', socketSrvr.socketRoomList());
};
runOnStartup();
