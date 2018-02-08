const qs = require('qs');
const hlpr = require('../lib/helpers');

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
    const logObj = {
      stravaId: null,
      logType: 'webhooks',
      level: 3, // 1 = high, 2 = med, 3 = low
      message: 'Controllers/Webhooks: stravaGetReceiver subscribing',
    };
    hlpr.logOut(logObj);
    return res.send({ 'hub.challenge': q['hub.challenge'] });
  }
  return res.status(404).send({ error: 'Faild to verify token' });
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
  console.log(req.body);
  res.send(req.body);
};
