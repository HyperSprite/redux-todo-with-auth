// Rename this file to config.js and randomize the secret string

module.exports = {
  secret: 'some-secret-string-that-should-not-be-committed',
  rootURL: '', // Used for server
  siteURL: 'http://localhost:3080', // Used for client auth callback
  port: 3080,
  public: 'public',
  mongoconnect: {
    dev: 'mongodb://localhost:araceathlete-dev/araceathlete-dev',
    prod: 'mongodb://localhost:araceathlete-prod/araceathlete-prod',
  },
  stravaLogin: {
    clientID: 'YOUR_STRAVA_CLIENT_ID',
    clientSecret: 'YOUR_STRAVA_CLIENT_SECRET',
    code: 'YOUR_STRAVA_CLIENT_CODE',
    redirectURI: 'auth/strava',
  },
  stravaModClub: {
    id: 9999999999, // DANGER: Strava club ID that will have Mod access
  },
  stravaClub: {
    id: 1234567890,  // Strava Club ID that can create events
  },
};
