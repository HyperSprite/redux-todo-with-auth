const mongoose = require('mongoose');
const findOrCreate = require('mongoose-findorcreate');

mongoose.Promise = global.Promise;
mongoose.plugin(require('./middleware-current-schema'));

const Schema = mongoose.Schema;

const fitnessDaySchema = new Schema({
  ss: Number, // 0,
  dst: Number, // 35872.2,
  time: Number, // 8602,
  elev: Number, // 271.6,
  cal: Number, // 1273.5,
  kj: Number, // 1142.2,
  tss: Number, // 0,
  date: String, // "2013-05-04",
  names: [
    {
      name: String, // "MTB Norred to Harry",
      activityId: Number, // 52343924
    },
  ],
  count: Number, // 2,
  fitnessTSS: Number, // 0,
  fatigueTSS: Number, // 0,
  fitnessSS: Number, // 0,
  fatigueSS: Number, // 0
});

const userCommonSchema = new Schema(
  {
    stravaId: { type: Number, index: true, sparse: true },
    fitness: [fitnessDaySchema],
    routeplans: { type: [Number], index: true, spares: true }, // [321934],
    friends: { type: [Number], index: true, spares: true },
  },
  {
    timestamps: true,
  });

userCommonSchema.plugin(findOrCreate);

const UserCommon = mongoose.model('usercommon', userCommonSchema);

module.exports = UserCommon;
