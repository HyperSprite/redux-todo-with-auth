// Rename this file to config.js and randomize the secret string

module.exports = {
  secret: 'some-secret-string-that-should-not-be-commited',
  rootURL: '', // Used for server
  siteURL: 'http://localhost:3080', // Used for client auth callback
  port: 3080,
  public: 'public',
  mongoconnect: {
    dev: 'mongodb://localhost:araceathlete-dev/araceathlete-dev',
    prod: 'mongodb://localhost:araceathlete-prod/araceathlete-prod',
  },
  stravaLogin: {
    clientID: 'STRAVA_CLIENT_ID',
    clientSecret: 'STRAVA_CLIENT_SECRET',
    code: 'STRAVA_CLIENT_CODE',
  },
};
