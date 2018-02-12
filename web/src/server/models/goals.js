const mongoose = require('mongoose');
const findOrCreate = require('mongoose-findorcreate');
const serialize = require('serialize-javascript');
const uuidv4 = require('uuid/v4');

mongoose.Promise = global.Promise;
mongoose.plugin(require('./middleware-current-schema'));

const Schema = mongoose.Schema;

const ObjectId = mongoose.Schema.Types.ObjectId;

const goalNotesSchema = new Schema(
  {
    goalNoteId: { type: String, default: `id-${uuidv4()}` },
    goalNoteContent: String,
    goalNoteCreated: String,
    goalNoteUpdated: String,
    goalNotePrivate: { type: Boolean, default: false },
    goalNoteDeleted: { type: Boolean, default: false },
  },
);


const goalSchema = new Schema(
  {
    goalId: { type: String, default: `id-${uuidv4()}` },
    goalEventId: String,
    goalOwner: Number, // stravaId of user that creates goal
    goalTitle: String,
    goalMotivation: String, // Why are you doing this?
    goalStartTrainingDate: String, // default to creation date?
    goalRank: { type: String, enum: ['', 'A', 'B', 'C'], default: '' }, // a race, b race, c race,
    goalCalendarLink: String, // URL to personal calendar
    goalPrivate: { type: Boolean, default: false },
    goalDeleted: { type: Boolean, default: false },
    goalNotes: [goalNotesSchema],
  },
  {
    timestamps: true,
  });

// saving this for later
// goalSchema.pre('save', function goalSchemaPre(next) {
//   const goal = this;
//   goal.goalTitle = goal.goalTitle;
//   next();
// });

goalSchema.plugin(findOrCreate);

const goals = mongoose.model('goals', goalSchema);

module.exports = goals;
