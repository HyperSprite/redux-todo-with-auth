const moment = require('moment');
const NodeGeocoder = require('node-geocoder');

const Events = require('../models/events');
const hlpr = require('../lib/helpers');

// GEOCODER --------------------------------------------------------------------
const geoOptions = {
  provider: 'google',
  apiKey: process.env.GEOCODER_API_KEY, // see Config file
  formatter: null,
};

const geocoder = NodeGeocoder(geoOptions);

// callGeoCoder shuffles in the Geocode info from Google
// for new events, (req.body, {}, cb)
// for edit events, (req.body, event from db, cb)
const callGeoCoder = (toSave, event, res) => {
  const result = toSave;
  const geoQuery = `${toSave.eventLocStreet || event.eventLocStreet || ''},
  ${toSave.eventLocCity || event.eventLocCity || ''},
  ${toSave.eventLocState || event.eventLocState || ''},
  ${toSave.eventLocCountry || event.eventLocCountry || ''},
  ${toSave.eventLocZip || event.eventLocZip || ''},`;
  hlpr.consLog([geoQuery]);

  geocoder.geocode(geoQuery, (err, geoRes) => {
    if (geoRes.length === 0 || err) return res(err, toSave);
    hlpr.consLog(['callGeoCoder', 'geoRes', geoRes, 'err', err]);
    if (geoRes[0] && geoRes[0].extra.confidence >= 0.9) {
      result.eventGeoFormattedAddress = geoRes[0].formattedAddress;
      result.eventLocCity = geoRes[0].city;
      result.eventLocState = geoRes[0].administrativeLevels.level1long;
      result.eventLocCountry = geoRes[0].country;
      result.eventLocZip = geoRes[0].zipcode;
    }
    result.eventGeoLatitude = geoRes[0].latitude;
    result.eventGeoLongitude = geoRes[0].longitude;
    result.eventGeoLevel1Long = geoRes[0].administrativeLevels.level1long;
    result.eventGeoLevel2Long = geoRes[0].administrativeLevels.level2long;
    result.eventGeoStreetNumber = geoRes[0].streetNumber;
    result.eventGeoStreetName = geoRes[0].streetName;
    result.eventGeoCity = geoRes[0].city;
    result.eventGeoCountry = geoRes[0].country;
    result.eventGeoCountryCode = geoRes[0].countryCode;
    result.eventGeoZipCode = geoRes[0].zipcode;
    result.eventGeoProvider = geoRes[0].provider;
    return res(err, result);
  });
};

// GEOCODER --------------------------------------------------------------------

exports.addEvent = (req, res) => {
  callGeoCoder(req.body, {}, (err, toSave) => {
    toSave.eventOwner = req.user.stravaId;
    hlpr.consLog(['events.addEvent', 'toSave', toSave]);
    toSave.eventFavorites = [toSave.eventOwner];
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
};

exports.editEvent = (req, res) => {
  Events.findOne({ eventId: req.params.eventId }, (err, event) => {
    if (!event) return res.status(404).send(`Event: ${req.params.eventId} not found`);
    if (event.eventOwner === req.user.stravaId || req.user.adminMember) {
      callGeoCoder(req.body, event, (err, toSave) => {
        hlpr.consLog(['callGeoCoder', err, toSave]);
        const options = { new: true };
        Events.findByIdAndUpdate(event._id, toSave, options, (err, eventEdit) => {
          if (err) hlpr.consLog(['editEvent', err]);
          hlpr.consLog(['editEvent', eventEdit.eventId]);
          const result = { event: { postSuccess: true }, updated: eventEdit };
          hlpr.consLog([result]);
          res.send(result);
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
  // const query = req.params.query;
  const query = { eventDate: { $gt: stringDate }, eventDeleted: false };

  Events.find(query, null, { sort: { eventDate: 1 } }, (err, events) => {
    if (!err) {
      // hlpr.consLog(['getEvents', events, stringDate, req.params]);
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
