// Rename this file to config.js and randomize the secret string
const hlpr = require('./lib/helpers');

const config = {
  STRAVA_CLIENT_ID: '', // from strava
  STRAVA_CLIENT_SECRET: '', // from strava
  STRAVA_REDIRECT_URI: 'auth/strava',
  STRAVA_MOD_CLUB: , //number
  STRAVA_CLUB: , //number
  ROOT_URL: 'http://localhost:3080',
  SITE_URL: '',
  SITE_PUBLIC: 'public',
  PORT: 3080,
  AUTH_SECRET: 'SOME_LONG_STRING',
  mongoconnect: {
    dev: 'mongodb://localhost/araceathlete-dev',
    prod: 'mongodb://localhost/araceathlete-dev', // for local test of prod build
  },
};

const localMongoURI = !hlpr.isProd() ?
  config.mongoconnect.dev :
  config.mongoconnect.prod;

exports.loadConfig = () => {
  process.env.STRAVA_ACCESS_TOKEN = process.env.STRAVA_ACCESS_TOKEN || undefined;
  process.env.STRAVA_CLIENT_ID = process.env.STRAVA_CLIENT_ID || config.STRAVA_CLIENT_ID;
  process.env.STRAVA_CLIENT_SECRET = process.env.STRAVA_CLIENT_SECRET || config.STRAVA_CLIENT_SECRET;
  process.env.STRAVA_REDIRECT_URI = process.env.STRAVA_REDIRECT_URI || config.STRAVA_REDIRECT_URI;
  process.env.STRAVA_MOD_CLUB = process.env.STRAVA_MOD_CLUB || config.STRAVA_MOD_CLUB;
  process.env.STRAVA_CLUB = process.env.STRAVA_CLUB || config.STRAVA_CLUB;
  process.env.SITE_URL = process.env.SITE_URL || config.SITE_URL;
  process.env.AUTH_SECRET = process.env.AUTH_SECRET || config.AUTH_SECRET;
  process.env.ROOT_URL = process.env.ROOT_URL || config.ROOT_URL;
  process.env.SITE_PUBLIC = process.env.SITE_PUBLIC || config.SITE_PUBLIC;
  process.env.PORT = process.env.PORT || config.PORT;
  process.env.MONGODB_URI = process.env.MONGODB_URI || localMongoURI;
};
