const pckg = require('../../../package.json');

const currentVersion = pckg.version.slice(0, 3) * 1;

module.exports = exports = function updateCurrentVersion(schema) {
  schema.add({ currentSchema: { type: Number, index: true } });

  schema.pre('save', function (next) {
    this.currentSchema = currentVersion;
    next();
  });

  schema.pre('update', function () {
    this.update({}, { $set: { currentSchema: currentVersion } });
  });

  schema.pre('findOneAndUpdate', function () {
    this.findOneAndUpdate({}, { $set: { currentSchema: currentVersion } });
  });
};
