// Rename this file to config.js and randomize the secret string
const hlpr = require('./lib/helpers');

const config = {
  mongoconnect: {
    dev: 'mongodb://localhost/araceathlete-dev',
    prod: 'mongodb://localhost/araceathlete-dev',
  },
  AUTH_SECRET: 'YOUR_AUTH_STRING_HERE',  // Needed for bcrypt
  CERT: 'false', // string - For production certs example, Heroku CERT = true
  LOGGING: 'true', // string - turns on hlpr.consLog can be used in prod if needed.
  GOOGLE_MAPS: 'some_api_key', // server only
  REACT_APP_GOOGLE_MAPS_WEB: 'some_api_key', // user exposed/url restricted to registered domain
  OPEN_WEATHER_MAP: 'some_api_key',
  PORT: 3080,
  ROOT_URL: 'http://localhost:3080',
  SITE_PUBLIC: 'public', // static resources
  SITE_URL: '',
  STRAVA_CLIENT_ID: 'YOUR_KEY', // Strava API Key holders ID
  STRAVA_CLIENT_SECRET: 'YOUR_STRAVA_SECRET',
  STRAVA_CLUB: 'number', //  Regular Users club
  STRAVA_MOD_CLUB: 'number',  // Admin Users club (can edit and delete others items)
  STRAVA_REDIRECT_URI: 'auth/strava', // for Strava Auth
};

const localMongoURI = !hlpr.isProd() ?
  config.mongoconnect.dev :
  config.mongoconnect.prod;

exports.loadConfig = () => {
  process.env.AUTH_SECRET = process.env.AUTH_SECRET || config.AUTH_SECRET;
  process.env.CERT = process.env.CERT || config.CERT;
  process.env.MONGODB_URI = process.env.MONGODB_URI || localMongoURI;
  process.env.LOGGING = process.env.LOGGING || config.LOGGING;
  process.env.PORT = process.env.PORT || config.PORT;
  process.env.ROOT_URL = process.env.ROOT_URL || config.ROOT_URL;
  process.env.SITE_PUBLIC = process.env.SITE_PUBLIC || config.SITE_PUBLIC;
  process.env.SITE_URL = process.env.SITE_URL || config.SITE_URL;
  process.env.STRAVA_ACCESS_TOKEN = process.env.STRAVA_ACCESS_TOKEN || undefined;
  process.env.STRAVA_CLIENT_ID = process.env.STRAVA_CLIENT_ID || config.STRAVA_CLIENT_ID;
  process.env.STRAVA_CLIENT_SECRET = process.env.STRAVA_CLIENT_SECRET || config.STRAVA_CLIENT_SECRET;
  process.env.STRAVA_CLUB = process.env.STRAVA_CLUB || config.STRAVA_CLUB;
  process.env.STRAVA_MOD_CLUB = process.env.STRAVA_MOD_CLUB || config.STRAVA_MOD_CLUB;
  process.env.STRAVA_REDIRECT_URI = process.env.STRAVA_REDIRECT_URI || config.STRAVA_REDIRECT_URI;
};
