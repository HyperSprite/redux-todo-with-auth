const qs = require('qs');
const hlpr = require('../lib/helpers');

const Activities = require('./activities');
const User = require('../models/user');

const logObj = {
  file: 'controllers/webhooks',
  logType: 'controller',
  level: 10,
};

/**
* will receive GET query string
*
* ?hub.mode=subscribe
* &hub.challenge=15f7d1a91c1f40f8a748fd134752feb3
* &hub.verify_token=STRAVA
*/
exports.stravaGetReceiver = (req, res) => {
  const q = qs.parse(req.query);
  if (q['hub.verify_token'] === process.env.STRAVA_VERIFY_TOKEN) {
    hlpr.logOutArgs(`${logObj.file}.stravaGetReceiver`, logObj.logType, 'success', 1, null, null, `stravaGetReceiver subscribing success ${JSON.stringify(q)}`);
    return res.send({ 'hub.challenge': q['hub.challenge'] });
  }
  hlpr.logOutArgs(`${logObj.file}.stravaGetReceiver 403`, logObj.logType, 'failure', 1, null, null, `stravaGetReceiver subscribing failure ${JSON.stringify(q)}`);
  return res.status(403).send({ error: 'Faild to verify token' });
};

/**
* will receive POST body
*
req.body = {
  "aspect_type": "update", // Always "create," "update," or "delete."
  "event_time": 1516126040,
  "object_id": 1360128428,
  "object_type": "activity",
  "owner_id": 134815,
  "subscription_id": 120475,
  "updates": { // Empty for delete and create events.
    "title": "Messy",
    "type": "",
    "private": false, // Always true or false
  }
}
*/

const postProcessor = (input, done) => {
  if (input.object_type === 'activity') {
    User.findOne({ stravaId: input.owner_id * 1 }, (err, user) => {
      if (err || !user) {
        hlpr.logOutArgs(`${logObj.file}.stravaPostReceiver`, logObj.logType, 'error', 4, null, null, 'No User');
        return done;
      }
      if (user.stravaId && user.clubMember) {
        const options = {
          id: user.stravaId,
          activityId: input.object_id,
          access_token: user.access_token,
          user,
        };
        const activity = { activityId: input.object_id };
        const toDelete = {
          activityId: input.object_id,
          'athlete.id': user.stravaId,
        };
        switch (input.aspect_type) {
          case 'create':
            return Activities.getActivityDetails(activity, options, (cDone) => {
              hlpr.logOutArgs(`${logObj.file}.stravaPostReceiver`, logObj.logType, 'success', 8, null, null, `Starting Activities.getActivityDetails ${input}`);
              return cDone;
            });
          case 'update':
            return Activities.getActivityUpdate(activity, options, (cDone) => {
              hlpr.logOutArgs(`${logObj.file}.stravaPostReceiver`, logObj.logType, 'success', 8, null, null, `Starting Activities.getActivityDetails ${input}`);
              return cDone;
            });
          case 'delete':
            return Activities.removeActivity(toDelete, rDone => rDone);
          default:
            hlpr.logOutArgs(`${logObj.file}.stravaPostReceiver`, logObj.logType, 'error', 4, null, null, 'Missed Cases');
        }
      } else {
        hlpr.logOutArgs(`${logObj.file}.stravaPostReceiver`, logObj.logType, 'error', 8, null, null, `Not a user or not clubMember ${user.stravaId}`);
      }
    });
    hlpr.logOutArgs(`${logObj.file}.stravaPostReceiver`, logObj.logType, 'error', 6, null, null, `Not an activity for user ${input.owner_id}`);
  }
  return done;
};

exports.stravaPostReceiver = (req, res) => {
  postProcessor(req.body, logThis => logThis);
  res.sendStatus(200);
};
