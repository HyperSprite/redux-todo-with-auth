// Rename this file to config.js and randomize the secret string

module.exports = {
  secret: 'some-secret-string-that-should-not-be-commited',
  public: 'public',
  mongoconnect: {
    dev: 'mongodb://localhost:araceathlete-dev/araceathlete-dev',
    prod: 'mongodb://localhost:araceathlete-prod/araceathlete-prod',
  },
  stravaOauth2: {
    clientID: 'STRAVA_CLIENT_ID',
    clientSecret: 'STRAVA_CLIENT_SECRET',
    code: 'STRAVA_CLIENT_CODE',
    callbackURL: 'http://127.0.0.1:3080/auth/strava/callback',
  },
};
