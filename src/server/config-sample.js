// Rename this file to config.js and randomize the secret string

module.exports = {
  secret: 'some-secret-string-that-should-not-be-commited',
  public: 'public',
  mongoconnect: {
    dev: 'mongodb://localhost:araceathlete-dev/araceathlete-dev',
    prod: 'mongodb://localhost:araceathlete-prod/araceathlete-prod',
  },
};
