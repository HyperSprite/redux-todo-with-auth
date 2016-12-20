const mongoose = require('mongoose');
const findOrCreate = require('mongoose-findorcreate');

const Schema = mongoose.Schema;

const eventSchema = new Schema({
  eventTitle: String,
  eventDate: String,
  eventURL: { type: String, lower: true },
  eventDesc: String,
  eventRouteURL: { type: String, lower: true },
  eventType: String,
});

eventSchema.plugin(findOrCreate);

const ModelClass = mongoose.model('event', eventSchema);

module.exports = ModelClass;
