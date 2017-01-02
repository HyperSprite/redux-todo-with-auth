const strava = require('strava-v3');
const moment = require('moment');

const User = require('../models/user');
const Events = require('../models/events');
const config = require('../config');
const hlpr = require('../lib/helpers');

exports.addEvent = (req, res) => {
  const toSave = req.body;

  toSave.eventCreator = req.user.stravaId;

  hlpr.consLog([
    'events.addEvent',
    'toSave',
    toSave,
  ]);

  Events.create(toSave, (err, event) => {
    if (!err) {
      hlpr.consLog(['Event saved', event]);
    } else {
      hlpr.consLog(['Event error', err]);
    }
    res.send(event);
  });
};

const newDate = moment().add(-1, 'days').format();
const stringDate = newDate.toString();

exports.getEvents = (req, res) => {
  // const query = req.params.query;
  const query = { eventDate: { $gt: stringDate } };

  Events.find(query, null, { sort: { eventDate: 1 } }, (err, events) => {
    if (!err) {
      hlpr.consLog(['getEvents', events, stringDate, req.params]);
    } else {
      hlpr.consLog(['getEvents error', err]);
    }
    res.send(events);
  });
};
