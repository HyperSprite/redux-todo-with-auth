const moment = require('moment');

const Events = require('../models/events');
const hlpr = require('../lib/helpers');
const geocoder = require('../lib/geocoder');

const hashtagger = (postedHashtags, result) => {
  if (!postedHashtags || postedHashtags[0] === '') return result([]);
  const tmpHashtag = postedHashtags.trim().slice();
  return result(tmpHashtag.replace(/[^a-z0-9 ,.]/gi, '').split(/[ ,.]+/).filter((tag, i, array) => {
    return i === array.indexOf(tag);
  }));
};

exports.addEvent = (req, res) => {
  geocoder.eventGeocoder(req.body, {}, (err, toSave) => {
    toSave.eventOwner = req.user.stravaId;
    hlpr.consLog(['events.addEvent', 'toSave', toSave]);
    toSave.eventFavorites = [toSave.eventOwner];
    hashtagger(toSave.eventHashtags, (cleanHashtags) => {
      toSave.eventHashtags = cleanHashtags;
      Events.create(toSave, (err, event) => {
        if (!err) {
          hlpr.consLog(['Event saved']);
          const result = { event: { postSuccess: true }, updated: event };
          hlpr.consLog([result]);
          return res.send(result);
        }
        hlpr.consLog(['Event error', err]);
        return res.status(400).send(err);
      });
    });
  });
};

exports.editEvent = (req, res) => {
  Events.findOne({ eventId: req.params.eventId }, (err, event) => {
    if (!event) return res.status(404).send(`Event: ${req.params.eventId} not found`);
    if (event.eventOwner === req.user.stravaId || req.user.adminMember) {
      geocoder.eventGeocoder(req.body, event, (err, toSave) => {
        hlpr.consLog(['callGeoCoder', err, toSave]);
        hashtagger(toSave.eventHashtags, (cleanHashtags) => {
          toSave.eventHashtags = cleanHashtags;
          const options = { new: true };
          Events.findByIdAndUpdate(event._id, toSave, options, (err, eventEdit) => {
            if (err) hlpr.consLog(['editEvent', err]);
            hlpr.consLog(['editEvent', eventEdit.eventId]);
            const result = { event: { postSuccess: true }, updated: eventEdit };
            hlpr.consLog([result]);
            res.send(result);
          });
        });
      });
    } else {
      res.status(401).send('No Access');
    }
  });
};

const newDate = moment().add(-1, 'days').format();
const stringDate = newDate.toString();

exports.getEvents = (req, res) => {
  const rQ = req.query;
  const dbQuery = {};
  let andQuery = [];
  const dbOptions = {};

  // example Event "eventGeoCoordinates": [ -122.1439698, 37.426941 ],
  // ?userLoc='-122.1439698,37.426941'
  if (Object.keys(rQ).indexOf('userLoc') !== -1) {
    dbQuery.eventGeoCoordinates = {
      $near: {
        $geometry: {
          type: 'Point',
          coordinates: rQ.userLoc.split(',').map(Number),
        },
        $maxDistance: rQ.maxDist * 1 || 321869, // 200 miles in meters
      },
    };
  }


  const querySetup = {
    // /apiv1/events?fav={stravaId}
    fav: { eventFavorites: rQ.fav },
    // /apiv1/events?series={eventSeries (contains)}
    series: { eventSeries: { $regex: rQ.series, $options: 'i' } },
    // /apiv1/events?series={eventOrganization (contains)}
    org: { eventOrganization: { $regex: rQ.org, $options: 'i' } },
  };

  Object.getOwnPropertyNames(rQ).forEach((q) => {
    if (q !== 'userLoc') {
      hlpr.consLog(['q', q, rQ[q], querySetup[q]]);
      andQuery.push(querySetup[q]);
    }
  });
  hlpr.consLog(['andQuery', andQuery]);


  if (andQuery.length > 0) {
    dbQuery.$and = andQuery;
  }
  dbQuery.eventDate = { $gt: stringDate };
  dbQuery.eventDeleted = false;

  Events.find(dbQuery, dbOptions, { sort: { eventDate: 1 } }, (err, events) => {
    if (err) {
      hlpr.consLog(['getEvents error', err]);
      return res.status(404).send([{ error: 'Error: events not found' }]);
    }
    hlpr.consLog(['getEvents', stringDate, req.params, rQ]);
    return res.send(events);
  });
};

exports.getEvent = (req, res) => {
  // const query = req.params.query;
  const query = { eventId: req.params.eventId };

  Events.findOne(query, (err, event) => {
    if (err) hlpr.consLog(['getEvent error', err]);
    hlpr.consLog(['getEvent', event, req.params]);
    const result = event;
    result.eventHashtags = event.eventHashtags.join(' ');
    res.send(result);
  });
};

exports.delEvent = (req, res) => {
  Events.findOne({ eventId: req.body.eventId }, (err, event) => {
    if (!event || err) console.log(err);
    if (event.eventOwner === req.user.stravaId || req.user.adminMember) {
      Events.findOneAndUpdate({ _id: event._id }, { $set: { eventDeleted: true } }, (err, deletedEvent) => {
        if (err) {
          hlpr.consLog(['delEvent', err]);
          return res.status(404).send('Event not found');
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
