const mongoose = require('mongoose');
const findOrCreate = require('mongoose-findorcreate');
const serialize = require('serialize-javascript');

const hlpr = require('../lib/helpers');

const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const eventRoutesSchema = new Schema(
  {
    eventRouteURL: { type: String, lower: true },
  });

const eventSchema = new Schema(
  {
    eventId: String,
    eventTitle: String,
    eventCreator: String,
    eventDate: String,
    eventLocCity: String,
    eventLocState: String,
    eventLocCountry: String,
    eventStartElevation: Number,
    eventURL: { type: String, lower: true },
    eventDesc: String,
    eventType: String, // run ride, gravel, trail, etc.
    eventDeleted: { type: Boolean, default: false },
    eventRoutes: [eventRoutesSchema],
  },
  {
    timestamps: true,
  });

// saving this for later
// eventSchema.pre('save', function eventSchemaPre(next) {
//   const event = this;
//   event.eventTitle = event.eventTitle;
//   event.eventCreator = event.eventCreator;
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
