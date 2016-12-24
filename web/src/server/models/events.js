const mongoose = require('mongoose');
const findOrCreate = require('mongoose-findorcreate');

const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const eventSchema = new Schema({
  eventTitle: String,
  eventCreator: ObjectId,
  eventDate: String,
  eventLocCity: String,
  eventLocState: String,
  eventLocCountry: String,
  eventStartElevation: Number,
  eventURL: { type: String, lower: true },
  eventDesc: String,
  eventRouteURL: { type: String, lower: true },
  eventType: String, // run ride, gravel, trail, etc.
});

eventSchema.plugin(findOrCreate);

const Events = mongoose.model('events', eventSchema);

module.exports = Events;
