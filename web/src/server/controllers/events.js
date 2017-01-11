const moment = require('moment');

const Events = require('../models/events');
const hlpr = require('../lib/helpers');

exports.addEvent = (req, res) => {
  const toSave = req.body;

  toSave.eventOwner = req.user.stravaId;

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
    const result = { event: { postSuccess: true }, updated: event };
    hlpr.consLog([result]);
    res.send(result);
  });
};

exports.editEvent = (req, res) => {
  Events.findOne({ eventId: req.params.eventId }, (err, event) => {
    if (!event) res.status(404).send(`Event: ${req.params.eventId} not found`);
    if (event.eventOwner === req.user.stravaId || req.user.adminMember) {
      const options = { new: true };
      const action = req.body;
      Events.findByIdAndUpdate(event._id, action, options, (err, eventEdit) => {
        if (err) hlpr.consLog(['editEvent', err]);
        hlpr.consLog(['editEvent', eventEdit.eventId]);
        const result = { event: { postSuccess: true }, updated: eventEdit };
        hlpr.consLog([result]);
        res.send(result);
      });
    } else {
      res.status(401).send('No Access');
    }
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
    if (err) hlpr.consLog(['getEvent error', err]);
    hlpr.consLog(['getEvent', event, req.params]);
    res.send(event);
  });
};

exports.delEvent = (req, res) => {
  Events.findOne({ eventId: req.body.eventId }, (err, event) => {
    if (!event || err) console.log(err);
    if (event.eventOwner === req.user.stravaId || req.user.adminMember) {
      Events.findOneAndUpdate({ _id: event._id }, { $set: { eventDeleted: true } }, (err, deletedEvent) => {
        if (err) {
          hlpr.consLog(['delEvent', err]);
          res.status(404).send('Event not found');
        }
        hlpr.consLog(['delEvent', deletedEvent.eventId]);
        res.send(deletedEvent.eventId);
      });
    } else {
      res.status(401).send('No Access');
    }
  });
};

exports.favEvent = (req, res) => {
  Events.findOne({ eventId: req.params.eventId }, (err, event) => {
    hlpr.consLog([{ eventId: req.params.eventId }, req.user.stravaId]);
    if (err || !event) {
      hlpr.consLog(['favEvent err', err]);
      res.status(404).send({ favEventUpdated: 'Event not found' });
    }
    const options = { new: true };
    const action = (event.eventFavorites.indexOf(req.user.stravaId) === -1) ? (
      { $push: { eventFavorites: req.user.stravaId } }
    ) : (
      { $pull: { eventFavorites: req.user.stravaId } }
    );
    Events.findByIdAndUpdate(event._id, action, options, (err, upEvent) => {
      if (err) hlpr.consLog(['favEvent err', err]);
      hlpr.consLog(['favEvent', { favEventUpdated: upEvent.eventFavorites }]);
      res.send({ eventId: upEvent.eventId, eventFavorites: upEvent.eventFavorites });
    });
  });
};
