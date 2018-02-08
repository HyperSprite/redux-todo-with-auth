const mongoose = require('mongoose');

const pckg = require('../../../package.json');

const currentVersion = pckg.version.slice(0, 3) * 1;

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
  currentSchema: { type: Number, default: currentVersion },
},
  {
    timestamps: true,
  });

loggingSchema.index({ stravaId: 1 });

const Logging = mongoose.model('log', loggingSchema);

module.exports = Logging;
