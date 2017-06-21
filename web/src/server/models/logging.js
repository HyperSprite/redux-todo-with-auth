const mongoose = require('mongoose');

const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

const loggingSchema = new Schema({
  stravaId: Number,
  logType: String,
  level: Number,
  error: String,
  message: String,
  page: String,
  date: String,
},
  {
    timestamps: true,
  });

loggingSchema.index({ stravaId: 1 });

const Logging = mongoose.model('log', loggingSchema);

module.exports = Logging;
