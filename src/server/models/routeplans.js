const mongoose = require('mongoose');
const findOrCreate = require('mongoose-findorcreate');

mongoose.plugin(require('./middleware-current-schema'));

const Schema = mongoose.Schema;

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
    description: { type: String }, // the best ride ever,
    distance: Number, // 4475.4,
    elevation_gain: Number, // 154.5,
    map: {
      _id: false,
      id: String, // a32193479,
      polyline: String, // kiteFpCBCD],
      summary_polyline: String, // {cteFjcaBkCx@gEz@,
      resource_state: Number, // 3
    },
    name: { type: String, text: true }, // Evening Ride,
    private: Boolean, // false,
    resource_state: { type: Number, index: true }, // 3,
    sub_type: Number,
    timestamp: Number,
    created_at: String,
    updated_at: String,
    type: Number,
    segments: [
      {
        _id: false,
        id: { type: Number, index: true },
        resource_state: Number,
        name: String,
      },
    ],
    directions: [directionSchema],
    coordinatesStart: [Number, Number], // lat, lng
    coordinatesEnd: [Number, Number], // lat, lng
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
    TZId: String,
    TZName: String,
    TZrawOffset: Number,
    TZdstOffset: Number,
  },
  {
    timestamps: true,
  });

routeplanSchema.plugin(findOrCreate);

const Routeplan = mongoose.model('routeplan', routeplanSchema);

module.exports = Routeplan;

// this shoud be called Route but the word 'route' is so
// overdone already, I'm calling this something else.
