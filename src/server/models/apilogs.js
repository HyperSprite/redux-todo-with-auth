const mongoose = require('mongoose');
const findOrCreate = require('mongoose-findorcreate');

mongoose.Promise = global.Promise;
mongoose.plugin(require('./middleware-current-schema'));

const Schema = mongoose.Schema;

const apiLogSchema = new Schema({
  logType: String,
  logSubType: String,
  shortTermUsage: Number,
  longTermUsage: Number,
  dateTime: String, // 2018-02-13:13:00 / 15 / 30 / 45
  remainingBalance: Number,
  messagePrice: Number,
  to: String,
  status: String,
  network: String,
},
  {
    timestamps: true,
  },
);

apiLogSchema.plugin(findOrCreate);

apiLogSchema.index({ logType: 1, dateTime: 1 }, { unique: true });

const APILog = mongoose.model('apilog', apiLogSchema);

module.exports = APILog;
