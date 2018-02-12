const mongoose = require('mongoose');
const findOrCreate = require('mongoose-findorcreate');

mongoose.Promise = global.Promise;
mongoose.plugin(require('./middleware-current-schema'));

const Schema = mongoose.Schema;

const userCommonSchema = new Schema(
  {
    stravaId: { type: Number, index: true, sparse: true },
    routeplans: { type: [Number], index: true, spares: true }, // [321934],
    friends: { type: [Number], index: true, spares: true },
  },
  {
    timestamps: true,
  });

userCommonSchema.plugin(findOrCreate);

const UserCommon = mongoose.model('usercommon', userCommonSchema);

module.exports = UserCommon;
