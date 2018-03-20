const qs = require('qs');
const requestify = require('requestify'); // ? or axios...
const hlpr = require('../lib/helpers');

const Activities = require('./activities');
const Users = require('./authentication');

const logObj = {
  file: 'controllers/webhooks',
  logType: 'controller',
  level: 10,
};

exports.stravaSubscriber = (req, res) => {
  const subURL = 'https://api.strava.com/api/v3/push_subscriptions'
  const clId = `client_id=${process.env.STRAVA_CLIENT_ID}`;
  const clSec = `client_secret=${process.env.STRAVA_CLIENT_SECRET}`;
  const objTyp = 'object_type=activity';
  const aspTyp = 'aspect_type=create';
  const cbURL = `callback_url=${process.env.ROOT_URL}/apiv1/webhook/inbound`;
  const vrfTkn = `verify_token=${process.env.VERIFY_TOKEN}`;

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
    hlpr.logOutArgs(`${logObj.file}.stravaGetReceiver`, logObj.logType, 'success', 4, null, null, 'stravaGetReceiver subscribing success');
    return res.send({ 'hub.challenge': q['hub.challenge'] });
  }
  hlpr.logOutArgs(`${logObj.file}.stravaGetReceiver 403`, logObj.logType, 'failure', 1, null, null, `stravaGetReceiver subscribing failure ${q}`);
  return res.status(403).send({ error: 'Faild to verify token' });
};

/**
* will receive POST body
*
* req.body = {
*   "subscription_id": "1",
*   "owner_id": 13408,
*   "object_id": 12312312312,
*   "object_type": "activity",
*   "aspect_type": "create",
*   "event_time": 1297286541
* };
*/
exports.stravaPostReceiver = (req, res) => {
  const b = req.body;
  if (b.object_type === 'activity') {
    Users.getUser(b.owner_id, (user) => {
      const options = {
        id: user.stravaId,
        access_token: user.access_token,
        user,
      };
      Activities.getActivityDetails(b.object_id, options, (done) => {
        hlpr.logOutArgs(`${logObj.file}.stravaPostReceiver`, logObj.logType, 'success', 4, null, null, `Starting Activities.getActivityDetails ${b}`);
        return done;
      });
    });
  }
  res.send(req.body);
};