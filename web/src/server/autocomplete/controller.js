const Activities = require('../models/activities');
const Events = require('../models/events');
const Logging = require('../models/logging');
const Routeplans = require('../models/routeplans');
const User = require('../models/user');
const UserCommon = require('../models/user-common');


/**
* Autocomplete:
*   The following are gatekeepers for autocomplete
*   converts incoming param handler to scehma name.
*/
const dictHander = {
  events: Events,
};
/**
* converts incoming param key to scehma key.
*/
const dictKey = {
  events: {
    title: 'eventTitle',
    hashtags: 'eventHashtags',
    organizer: 'eventOrg',
    series: 'eventSeries',
  },
};
/**
* localhost:3080/apiv1/autocomplete/distinct/events/hashtags
*/
exports.handleDistinct = (req, res) => {
  const p = req.params;
  const Model = dictHander[p.handler] || null;
  const Key = (dictKey[p.handler] && dictKey[p.handler][p.key]) || null;

  if (typeof Model !== 'function' || typeof Key !== 'string') {
    return res.status(404).send('HTTP Error 404: Not Found');
  }

  const query = Model.distinct(Key, { [Key]: { $nin: ['', null] } });
  return query.exec((err, data) => {
    if (err) {
      return res.status(404).send({ Error: 'data not found' });
    }
    return res.send(data);
  });
};
