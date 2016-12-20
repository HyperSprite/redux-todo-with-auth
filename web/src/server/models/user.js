const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;
const findOrCreate = require('mongoose-findorcreate');
const bcrypt = require('bcrypt-nodejs');

const Schema = mongoose.Schema;

const tssGoalSchema = new Schema({
  week_of: String, // time string "2012-12-13T03:43:19Z"
  tssGoal: Number, // User enters number.
  weekFTP: Number, // get this number from User FTP when created,
  trainingLog: String, // how did this week go?
});

const eventGoalSchema = new Schema({
  eventId: ObjectId,
  importance: String, // a race, b race, c race,
  calendarLink: String, // URL to personal calendar
  notes: String,
});

const weightHitorySchema = Schema({
  weight: Number,
  date: String,
});

const ftpHistorySchema = Schema({
  ftp: Number,
  date: String,
});

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
  loc_city: String,
  loc_state: String,
  loc_country: String,
  sex: String,
  premium: Boolean,
  created_at: String,
  updated_at: String,
  athlete_type: Number,
  date_preference: String,
  measurement_preference: String,
  week_start_day: Number, // 0 - Sun, 1 - Mon...
  ftpHistory: ftpHistorySchema,
  weightHitory: weightHitorySchema,
  tssGoals: tssGoalSchema,
  eventGoals: eventGoalSchema,
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

const ModelClass = mongoose.model('user', userSchema);

module.exports = ModelClass;
