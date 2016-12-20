const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;
const findOrCreate = require('mongoose-findorcreate');

const Schema = mongoose.Schema;

const eventSchema = new Schema ({
  eventTitle: String,
  eventDate: String,
  eventURL: String,
  eventDesc: 
});
