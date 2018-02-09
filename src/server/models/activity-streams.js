const mongoose = require('mongoose');
const findOrCreate = require('mongoose-findorcreate');

const Schema = mongoose.Schema;

const activitiesStreamSchema = new Schema(
  {
    activityId: { type: Number, unique: true, index: true }, // 321934,
    streams: [],
  },
  {
    timestamps: true,
  });

activitiesStreamSchema.plugin(findOrCreate);
activitiesStreamSchema.index({ updatedAt: 1 });

const ActivityStreams = mongoose.model('activityStreams', activitiesStreamSchema);

module.exports = ActivityStreams;
