const mongoose = require('mongoose');
const findOrCreate = require('mongoose-findorcreate');

const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

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
