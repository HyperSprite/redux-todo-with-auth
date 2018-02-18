const mongoose = require('mongoose');
const findOrCreate = require('mongoose-findorcreate');

mongoose.Promise = global.Promise;
mongoose.plugin(require('./middleware-current-schema'));

const Schema = mongoose.Schema;

const activitiesStreamSchema = new Schema(
  {
    activityId: { type: Number, unique: true, index: true }, // 321934,
    streams: [],
    elevatoinPath: [
      {
        _id: false,
        elevation: Number,
        location: {
          lat: Number,
          lng: Number,
        },
      },
    ],
  },
  {
    timestamps: true,
  });

activitiesStreamSchema.plugin(findOrCreate);
activitiesStreamSchema.index({ updatedAt: 1 });

const ActivityStreams = mongoose.model('activityStreams', activitiesStreamSchema);

module.exports = ActivityStreams;
