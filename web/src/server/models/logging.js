const mongoose = require('mongoose');

mongoose.plugin(require('./middleware-current-schema'));

const Schema = mongoose.Schema;

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
