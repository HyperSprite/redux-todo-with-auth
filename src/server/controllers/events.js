const moment = require('moment');
const form = require('express-form');

const Events = require('../models/events');
const hlpr = require('../lib/helpers');
const geocoder = require('../lib/geocoder');
const markdown = require('../lib/markdown');
const resources = require('../lib/resources');

const getDate = (result) => {
  const newDate = moment().add(-1, 'days').format();
  newDate.toString();
  return result(newDate);
};

const hashtagger = (postedHashtags, result) => {
  hlpr.consLog(['events.hashtagger', 'postedHashtags', postedHashtags]);
  if (!postedHashtags || postedHashtags[0] === '') return result([]); // empty
  if (Array.isArray(postedHashtags)) return result(postedHashtags); // form untuched
  const tmpHashtag = postedHashtags.trim().slice(); // form tuched
  return result(tmpHashtag.replace(/[^a-z0-9 ,.]/gi, '').split(/[ ,.]+/).filter((tag, i, array) => {
    return i === array.indexOf(tag);
  }));
};

exports.eventForm = form(
  form.field('eventHashtags').array().custom(value => value.replace(/[^a-z0-9]/gi, '')) /* eslint comma-dangle: ["error", "never"] */
);

exports.addEvent = (req, res) => {
  hlpr.consLog(['addEvent', req]);
  geocoder.eventGeocoder(req.body, {}, (err, toSave) => {
    toSave.eventOwner = req.user.stravaId;

    const inputElevation = {
      loc: `${toSave.eventGeoLongitude},${toSave.eventGeoLatitude}`,
      timestamp: toSave.eventDate,
    };
    resources.rLonLat(inputElevation, 'elevation', (geoElv) => {
      hlpr.consLog(['geoElv', geoElv]);
      toSave.eventGeoElevation = geoElv.elevation;

      resources.rLonLat(inputElevation, 'timezone', (geoTZ) => {
        hlpr.consLog(['geoTZ', geoTZ]);
        if (geoTZ.timezone) {
          toSave.eventGeoTzId = geoTZ.timezone.timeZoneId;
          toSave.eventGeoTzName = geoTZ.timezone.timeZoneName;
          toSave.eventGeoTzRawOffset = geoTZ.timezone.rawOffset;
          toSave.eventGeoTzDSTOffset = geoTZ.timezone.dstOffset;
        }
        hlpr.consLog(['events.addEvent', 'toSave', toSave]);
        markdown.rend(toSave.eventDesc, (rendHTML) => {
          toSave.eventDescHTML = rendHTML;
          toSave.eventFavorites = [toSave.eventOwner];
          toSave.eventHashtags = req.form.eventHashtags;
          Events.create(toSave, (err, event) => {
            if (!err) {
              hlpr.consLog(['Event saved']);
              const result = { event: { postSuccess: true }, updated: event };
              hlpr.consLog([result]);
              return res.send(result);
            }
            hlpr.consLog(['Event error', err]);
            return res.status(400).send({ error: 'Error adding new event' });
          });
        });
      });
    });
  });
};

exports.editEvent = (req, res) => {
  Events.findOne({ eventId: req.params.eventId }, (err, event) => {
    if (!event) return res.status(404).send(`Event: ${req.params.eventId} not found`);
    if (event.eventOwners.some(e => e === req.user.stravaId) || req.user.adminMember) {
      geocoder.eventGeocoder(req.body, event, (err, toSave) => {
        hlpr.consLog(['callGeoCoder', err, toSave]);
        const inputElevation = {
          loc: `${toSave.eventGeoLongitude},${toSave.eventGeoLatitude}`,
          timestamp: toSave.eventDate,
        };

        resources.rLonLat(inputElevation, 'elevation', (geoElv) => {
          hlpr.consLog(['geoElv', geoElv]);
          toSave.eventGeoElevation = geoElv.elevation;

          resources.rLonLat(inputElevation, 'timezone', (geoTZ) => {
            hlpr.consLog(['geoTZ', geoTZ]);
            if (geoTZ.timezone) {
              toSave.eventGeoTzId = geoTZ.timezone.timeZoneId;
              toSave.eventGeoTzName = geoTZ.timezone.timeZoneName;
              toSave.eventGeoTzRawOffset = geoTZ.timezone.rawOffset;
              toSave.eventGeoTzDSTOffset = geoTZ.timezone.dstOffset;
            }
            markdown.rend(toSave.eventDesc, (rendHTML) => {
              toSave.eventDescHTML = rendHTML;
              toSave.eventHashtags = req.form.eventHashtags;
              const options = { new: true };
              Events.findByIdAndUpdate(event._id, toSave, options, (err, eventEdit) => {
                if (err) {
                  hlpr.consLog(['editEvent', err]);
                  return res.status(400).send({ error: 'Error updating event' });
                }
                hlpr.consLog(['editEvent', eventEdit.eventId]);
                const result = { event: { postSuccess: true }, updated: eventEdit };
                hlpr.consLog([result]);
                res.send(result);
              });
            });
          });
        });
      });
    } else {
      res.status(401).send('No Access');
    }
  });
};

exports.getEvents = (req, res) => {
  const rQ = req.query;
  const dbQuery = {};
  const andQuery = [];
  const dbOptions = {};

  // example Event "eventGeoCoordinates": [ -122.1439698, 37.426941 ],
  // /apiv1/events?userLoc=-122.1439698,37.426941
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
  dbQuery.eventDate = { $gt: getDate(result => result) };
  dbQuery.eventDeleted = false;
  hlpr.consLog(['dbQuery.eventDate', dbQuery.eventDate]);

  Events.find(dbQuery, dbOptions, { sort: { eventDate: 1 } }, (err, events) => {
    if (err) {
      hlpr.consLog(['getEvents error', err]);
      return res.status(404).send([{ error: 'Error: events not found' }]);
    }
    hlpr.consLog(['getEvents', dbQuery.eventDate, req.params, rQ]);
    return res.send(events);
  });
};

exports.getEvent = (req, res) => {
  // const query = req.params.query;
  const query = { eventId: req.params.eventId };

  Events.findOne(query, (err, event) => {
    if (err) {
      hlpr.consLog(['getEvent error', err]);
      res.status(400).send({ error: 'getEvent error' });
    }
    res.send(event);
  });
};

exports.delEvent = (req, res) => {
  Events.findOne({ eventId: req.body.eventId }, (err, event) => {
    if (!event || err) console.log(err);
    if (event.eventOwners.some(e => e === req.user.stravaId) || req.user.adminMember) {
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
