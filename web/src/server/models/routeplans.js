const mongoose = require('mongoose');
const findOrCreate = require('mongoose-findorcreate');

const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

const mapSchema = new Schema(
  {
    id: String, // a32193479,
    polyline: String, // kiteFpCBCD],
    summary_polyline: String, // {cteFjcaBkCx@gEz@,
    resource_state: Number, // 3
  });

const segmentSchema = new Schema(
  {
    id: Number,
    resource_state: Number,
    name: String,
  });

const directionSchema = new Schema(
  {
    distance: Number,
    action: Number,
    name: String,
  });

const routeplanSchema = new Schema(
  {
    routeplanId: { type: Number, unique: true, index: true }, // 321934,
    stravaId: { type: [Number], index: true, sparse: true },
    description: { type: String, text: true }, // the best ride ever,
    distance: Number, // 4475.4,
    elevation_gain: Number, // 154.5,
    map: mapSchema,
    name: { type: String, text: true }, // Evening Ride,
    private: Boolean, // false,
    resource_state: { type: Number, index: true }, // 3,
    starred: Boolean,
    sub_type: Number,
    timestamp: Number,
    created_at: String,
    updated_at: String,
    type: Number,
    estimated_moving_time: Number,
    segments: [segmentSchema],
    directions: [directionSchema],
    coordinatesStart: [Number, Number], // lat, lng
    coordinatesEnd: [Number, Number], // lat, lng
    elevationStart: Number, // meters
    elevationEnd: Number, // meters
    TZId: String,
    TZName: String,
    TZrawOffset: Number,
    TZdstOffset: Number,
  },
  {
    timestamps: true,
  });

routeplanSchema.plugin(findOrCreate);

// workaround: see https://github.com/Automattic/mongoose/issues/3824
routeplanSchema.index({ name: 'text', description: 'text' });

const Routeplan = mongoose.model('routeplan', routeplanSchema);

module.exports = Routeplan;

// this shoud be called Route but the word 'route' is so
// overdone already, I'm calling this something else.
