const mongoose = require('mongoose');
const findOrCreate = require('mongoose-findorcreate');

mongoose.Promise = global.Promise;
mongoose.plugin(require('./middleware-current-schema'));

const Schema = mongoose.Schema;

const athleteSchema = new Schema(
  {
    id: { type: Number, index: true }, // 227615,
    resource_state: Number, // 1
  });

const mapSchema = new Schema(
  {
    id: String, // a32193479,
    polyline: String, // kiteFpCBCD],
    summary_polyline: String, // {cteFjcaBkCx@gEz@,
    resource_state: Number, // 3
  });

const gearSchema = new Schema(
  {
    id: String, // g138727,
    primary: Boolean, // true,
    name: String, // Nike Air,
    distance: Number, // 88983.1,
    resource_state: Number, // 2
  });

const distBucketsSchema = new Schema(
  {
    min: Number, // 0,
    max: Number, // 115,
    time: Number, // 1735
  });

const zonesSchema = new Schema(
  {
    score: Number, // 215,
    distribution_buckets: [distBucketsSchema],
    type: String, // heartrate or power,
    resource_state: Number, // 3,
    sensor_based: Boolean, // true,
    points: Number, // 119,
    custom_zones: Boolean, // false,
    max: Number, // 196
  });

const activitiesSchema = new Schema(
  {
    activityId: { type: Number, unique: true, index: true }, // 321934,
    athlete: athleteSchema,
    map: mapSchema,
    gear: gearSchema,
    zones: [zonesSchema],
    resource_state: { type: Number, index: true }, // 3,
    external_id: String, // 2012-12-12_21-40-32-80-29011.fit,
    upload_id: Number, // 361720,
    name: { type: String, text: true }, // Evening Ride,
    description: { type: String }, // the best ride ever,
    distance: Number, // 4475.4,
    moving_time: Number, // 1303,
    elapsed_time: Number, // 1333,
    total_elevation_gain: Number, // 154.5,
    elev_high: Number, // 331.4,
    elev_low: Number, // 276.1,
    type: String, // Run,
    start_date: String, // 2012-12-13T03:43:19Z,
    start_date_local: String, // 2012-12-12T19:43:19Z,
    timezone: String, // (GMT-08:00) America/Los_Angeles,
    start_latlng: [Number], // latitude, longitude
    end_latlng: [Number], // latitude, longitude
    achievement_count: Number, // 6,
    trainer: Boolean, // false,
    commute: Boolean, // false,
    manual: Boolean, // false,
    private: Boolean, // false,
    flagged: Boolean, // false,
    workout_type: Number, // 2,
    average_speed: Number, // 3.4,
    max_speed: Number, // 4.514,
    average_cadence: Number,
    max_cadence: Number,
    average_temp: Number,
    max_temp: Number,
    calories: Number, // 390.5,
    average_watts: Number, // 163.6,
    max_watts: Number, // 754,
    weighted_average_watts: Number, // 200,
    kilojoules: Number, // 857.6,
    device_watts: Boolean, // true,
    has_heartrate: Boolean, // true,
    average_heartrate: Number, // 138.8,
    max_heartrate: Number, // 179.0,
    suffer_score: Number, // 342,
    ftp: Number,
    tssScore: Number, // 154, calculated
    geoStart: { type: [Number], index: '2dsphere' }, // type: [lng,lat]
    geoEnd: [Number], // type: [lng,lat]
    elevationStart: Number, // meters
    elevationEnd: Number, // meters
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
    streamTime: [],
    streams: [],
    authorizationError: Boolean,
    failedUpdate: Boolean,
  },
  {
    timestamps: true,
  });

activitiesSchema.plugin(findOrCreate);
activitiesSchema.index({ 'athlete.id': 1, resource_state: 1 });
activitiesSchema.index({ resource_state: 1, 'athlete.id': 1, start_date_local: 1 });

const Activities = mongoose.model('activities', activitiesSchema);

module.exports = Activities;
