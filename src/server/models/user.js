const mongoose = require('mongoose');
const findOrCreate = require('mongoose-findorcreate');
const bcrypt = require('bcrypt-nodejs');

const ObjectId = mongoose.Schema.Types.ObjectId;
const Schema = mongoose.Schema;

const tssGoalSchema = new Schema({
  week_of: String, // time string "2012-12-13T03:43:19Z"
  tssGoal: Number, // User enters number.
  weekFTP: Number, // get this number from User FTP when created,
  trainingLog: String, // how did this week go?
},
  {
    timestamps: true,
  });

const eventGoalSchema = new Schema({
  eventId: ObjectId,
  importance: String, // a race, b race, c race,
  calendarLink: String, // URL to personal calendar
  notes: String,
},
  {
    timestamps: true,
  });

const weightHitorySchema = Schema({
  weight: Number,
  date: String,
},
  {
    timestamps: true,
  });

const ftpHistorySchema = Schema({
  ftp: Number,
  date: String,
},
  {
    timestamps: true,
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
  adminMember: Boolean,
  clubMember: Boolean,
  week_start_day: Number, // 0 - Sun, 1 - Mon...
  ftpHistory: [ftpHistorySchema],
  weightHitory: [weightHitorySchema],
  tssGoals: [tssGoalSchema],
  eventGoals: [eventGoalSchema],
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

const Users = mongoose.model('user', userSchema);

module.exports = Users;