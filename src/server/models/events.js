const mongoose = require('mongoose');
const findOrCreate = require('mongoose-findorcreate');
const serialize = require('serialize-javascript');
const uuidv4 = require('uuid/v4');

const hlpr = require('../lib/helpers');

const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const eventRoutesSchema = new Schema(
  {
    eventRouteId: { type: String, default: `id-${uuidv4()}` },
    eventRouteURL: Number, // route/id
    // from Strava routes/:route_id
    eventRouteName: String, // name
    eventType: Number, // type
    evenSubType: Number, // sub_type
    eventRouteAthlete: Number, // athlete.id
    eventRouteDescription: String, // description
    eventRouteDistacne: Number, // distance
    eventRouteElevationGain: Number, // elevation_gain
    eventRouteTimestamp: Number, // timestamp
  });

const eventSchema = new Schema(
  {
    eventId: { type: String, default: `id-${uuidv4()}` },
    eventTitle: String,
    eventOwner: Number, // stravaId of user that creates event
    eventDate: String,
    eventOrg: String, // event organizer
    eventSeries: String, // event series
    eventLocCity: String,
    eventLocState: String,
    eventLocCountry: String,
    eventStartElevation: Number, // in meters
    eventURL: { type: String, lower: true },
    eventDesc: String,
    eventAthleteType: Number, // 0-Cycling, 1-Running (match to strava/athlete_type)
    eventType: String, // depreciated, moved to routes
    eventDeleted: { type: Boolean, default: false },
    eventRoutes: [eventRoutesSchema],
    eventFavorites: [Number],
  },
  {
    timestamps: true,
  });

// saving this for later
// eventSchema.pre('save', function eventSchemaPre(next) {
//   const event = this;
//   event.eventTitle = event.eventTitle;
//   event.eventOwner = event.eventOwner;
//   event.eventDate = event.eventDate;
//   event.eventLocCity = event.eventLocCity;
//   event.eventLocState = event.eventLocState;
//   event.eventLocCountry = event.eventLocCountry;
//   event.eventStartElevation = event.eventStartElevation;
//   event.eventURL = event.eventURL;
//   event.eventDesc = event.eventDesc;
//   event.eventRouteURL = event.eventRouteURL;
//   event.eventType = event.eventType;
//   next();
// });

eventSchema.plugin(findOrCreate);

const Events = mongoose.model('events', eventSchema);

module.exports = Events;
