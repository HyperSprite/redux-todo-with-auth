const mongoose = require('mongoose');
const findOrCreate = require('mongoose-findorcreate');
const bcrypt = require('bcrypt-nodejs');

const pckg = require('../../../package.json');

const currentVersion = pckg.version.slice(0, 3) * 1;

const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

const tssGoalSchema = new Schema({
  week_of: String, // time string "2012-12-13T03:43:19Z"
  tssGoal: Number, // User enters number.
  weekFTP: Number, // get this number from User FTP when created,
  trainingLog: String, // how did this week go?
});

const weightHistorySchema = Schema({
  weight: Number,
  date: String,
});

const ftpHistorySchema = Schema({
  ftp: Number,
  date: String,
});

const bikeSchema = Schema({
  id: String, // "b105763",
  primary: Boolean, // false,
  name: String, // "Cannondale TT",
  distance: Number, // 476612.9,
  resource_state: Number, // 2
});

const shoeSchema = Schema({
  id: String, // "g1",
  primary: Boolean, // true,
  name: String, // "Running Shoes",
  distance: Number, // 67492.9,
  resource_state: Number, // 2
});

const clubSchema = Schema({
  id: Number,
  resource_state: Number, // indicates level of detail
  name: String,
  profile_medium: String, // URL to a 60x60 pixel profile picture
  profile: String, // URL to a 124x124 pixel profile picture
  cover_photo: String, // URL to a ~1185x580 pixel cover photo
  cover_photo_small: String, // URL to a ~360x176 pixel cover photo
  sport_type: String, // cycling, running, triathlon, other
  city: String,
  state: String,
  country: String,
  private: Boolean,
  member_count: Number,
  featured: Boolean,
  verified: Boolean,
  url: String, // vanity: club URL slug
});

const minmaxZonesSchema = Schema({
  min: Number,
  max: Number,
},{ _id : false });

const heartrateZonesSchema = Schema({
  custom_zones: Boolean,
  zones: [minmaxZonesSchema],
},{ _id : false });

const powerZonesSchema = Schema({
  custom_zones: Boolean,
  zones: [minmaxZonesSchema],
},{ _id : false });

const userSchema = new Schema({
  email: { type: String, lowercase: true },
  password: String,
  stravaId: Number,
  access_token: String,
  resource_state: Number,
  firstname: String,
  lastname: String,
  profile_medium: String,
  profile: String,
  loc_city: String,  // from Strava
  loc_state: String,  // from Strava
  loc_country: String,  // from Strava
  sex: String,
  premium: Boolean,
  created_at: String,
  updated_at: String,
  athlete_type: Number,
  date_preference: String,
  measurement_preference: String, // ‘feet’ or ‘meters’
  adminMember: Boolean,
  clubMember: Boolean,
  clubNotice: Boolean,
  week_start_day: Number, // 0 - Sun, 1 - Mon...
  activitiesCollected: Boolean,
  bikes: [bikeSchema],
  shoes: [shoeSchema],
  clubs: [clubSchema],
  heartrate: [heartrateZonesSchema],
  power: [powerZonesSchema],
  // custom user data
  userLocStreet: String,  // from user input
  userLocCity: String,  // from user input
  userLocState: String,  // from user input
  userLocCountry: String,  // from user input
  userLocZip: String,  // from user input
  userGeoFormattedAddress: String,
  userGeoCoordinates: { type: [Number], index: '2dsphere' }, // type: [lon,lat]
  userGeoLongitude: Number,
  userGeoLatitude: Number,
  userGeoLevel1Long: String,
  userGeoLevel2Long: String,
  userGeoStreetNumber: String,
  userGeoStreetName: String,
  userGeoCity: String,
  userGeoCountry: String,
  userGeoCountryCode: String,
  userGeoZipCode: String,
  userGeoProvider: String,
  userGeoTzId: String, // e.g. "America/Los_Angeles"
  userGeoTzName: String, // e.g. "Pacific Daylight Time"
  userGeoTzRawOffset: Number, // in milliseconds (3600 per hour) e.g. -28800,
  userGeoTzDSTOffset: Number, // in milliseconds (3600 per hour)
  userGeoElevation: Number, // in meters
  userLocationPref: { type: String, enum: ['Strava', 'Manual', 'Magic'], default: 'Strava' },
  ftpHistory: [ftpHistorySchema],
  weightHistory: [weightHistorySchema],
  tssGoals: [tssGoalSchema],
  friends: [Number],
  routeplans: [Number],
  currentSchema: { type: Number, default: currentVersion },
},
  {
    timestamps: true,
  });

userSchema.pre('save', function userSchemaPre(next) {
  const user = this;

  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, null, (err, hash) => {
      if (err) return next(err);

      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function userSchemaCompPasswords(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) return callback(err);

    callback(null, isMatch);
  });
};

userSchema.plugin(findOrCreate);

userSchema.index({ stravaId: 1, access_token: 1, premium: 1, firstname: 1, lastname: 1 });

const Users = mongoose.model('user', userSchema);

module.exports = Users;
