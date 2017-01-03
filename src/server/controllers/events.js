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
      hlpr.consLog(['Event saved']);
    } else {
      hlpr.consLog(['Event error', err]);
    }
    const result = { postSuccess: true };
    hlpr.consLog([result]);
    res.send(result);
  });
};

const newDate = moment().add(-1, 'days').format();
const stringDate = newDate.toString();

exports.getEvents = (req, res) => {
  // const query = req.params.query;
  const query = { eventDate: { $gt: stringDate }, eventDeleted: false };

  Events.find(query, null, { sort: { eventDate: 1 } }, (err, events) => {
    if (!err) {
      hlpr.consLog(['getEvents', events, stringDate, req.params]);
    } else {
      hlpr.consLog(['getEvents error', err]);
    }
    res.send(events);
  });
};

exports.getEvent = (req, res) => {
  // const query = req.params.query;
  const query = { eventId: req.params.eventId };

  Events.findOne(query, (err, event) => {
    if (!err) {
      hlpr.consLog(['getEvent', event, req.params]);
    } else {
      hlpr.consLog(['getEvent error', err]);
    }
    res.send(event);
  });
};

exports.delEvent = (req, res) => {
  Events.findOne({eventId: req.body.eventId}, (err, event) => {
    if (event.eventCreator === req.user.stravaId || req.user.adminMember) {
      Events.findOneAndUpdate({ _id: event._id }, { $set: { eventDeleted: true } }, (err, deletedEvent) => {
        if (!err) {
        } else {
          hlpr.consLog(['delEvent', err]);
        }
        hlpr.consLog(['delEvent', deletedEvent.eventId]);
        res.send(deletedEvent.eventId);
      });
    } else {
      res.send('No Access');
    }
  });
};
