# Config file setup

A config file needs to be created for local development. If a config file exist, it will be loaded and all values placed on the 'process.env', if no file exists, such as on a Heroku dyno, place the settings in the config vars on the Dyno's Settings page.

All entries are strings, even numbers, because Node will import them as strings anyway. If they need to be numbers, that conversion needs to be done where it is used.

### LOGGING options

The current logging option is shown at start up at the command line and sent via txt.

#### File default ```{ LOGGING: 'verbose' }```

* none: no logging whatsoever
* minimal: logging for level 0 and 1 - only Critical errors
* normal: logging for level 4 and lower - something went wrong, for production. Default for prod
* verbose: logging for level 7 and lower - almost everything, lacks most success logs. Default dev.
* everything or true: log everything - troubleshooting
};

Logging can be set in dev mode by starting dev with the logging setting needed.

```$ LOGGING=everything npm run dev```



Sample file named ```config.js``` in the ```/web/src/server/``` dir
```js
// This file should not be checked in, see gitignore
const hlpr = require('./lib/helpers');

const config = {
  mongoconnect: {
    dev: 'mongodb://localhost/araceathlete-dev',
    prod: 'mongodb://localhost/araceathlete-dev',
  },
  // need values
  AUTH_SECRET: '<YOUR_AUTH_STRING_HERE>',  // Needed for bcrypt
  GOOGLE_MAPS: '<server google api key>', // server only
  REACT_APP_GOOGLE_MAPS_WEB: '<exposed google api key>', // user exposed/url restricted to registered domain
  OPEN_WEATHER_MAP: '<some_api_key>',
  NEXMO_VIRTUAL_NUMBER: '<virtual number from Nexmo>',
  NEXMO_SECRET: '<secret from Nexmo>',
  NEXMO_KEY: '<key from Nexmo>',
  ADMIN_TXT_NUMBER: '<Your Mobile Number>',
  STRAVA_ROUTES_ACCESS_TOKEN: '', // Strava access token for routes.
  STRAVA_CLIENT_ID: '<YOUR_KEY>', // Strava API Key holders ID
  STRAVA_CLIENT_SECRET: '<YOUR_STRAVA_SECRET>',
  STRAVA_CLUB: '<number>', //  Regular Users club
  STRAVA_MOD_CLUB: '<number>',  // Admin Users club (can edit and delete others items)
  STRAVA_VERIFY_TOKEN: '<some long string>', // this is self generated
  // can be left as is
  CERT: 'false', // string - For production certs example, Heroku CERT = true
  CURRENT_SCHEMA: '4.1', // for testing schema updates
  LOGGING: 'verbose', // see config.md for notes
  ACTIVITY_STREAM_CACHE: 20160, // two weeks in minutes: adjust for tuning
  ACTIVITY_UPDATE_INTERVAL: 3, // three minutes: adjust for tuning
  PORT: 3080,
  ROOT_URL: 'http://localhost:3080',
  SITE_PUBLIC: 'public', // static resources
  SITE_URL: '',
  STRAVA_REDIRECT_URI: 'auth/strava', // for Strava Auth
};

const localMongoURI = !hlpr.isProd() ?
  config.mongoconnect.dev :
  config.mongoconnect.prod;

  exports.loadConfig = () => {
    process.env.AUTH_SECRET = process.env.AUTH_SECRET || config.AUTH_SECRET;
    process.env.CERT = process.env.CERT || config.CERT;
    process.env.GOOGLE_MAPS = process.env.GOOGLE_MAPS || config.GOOGLE_MAPS;
    process.env.REACT_APP_GOOGLE_MAPS_WEB = process.env.REACT_APP_GOOGLE_MAPS_WEB || config.GOOGLE_MAPS;
    process.env.MONGODB_URI = process.env.MONGODB_URI || localMongoURI;
    process.env.LOGGING = process.env.LOGGING || config.LOGGING;
    process.env.OPEN_WEATHER_MAP = process.env.OPEN_WEATHER_MAP || config.OPEN_WEATHER_MAP;
    process.env.ACTIVITY_STREAM_CACHE = process.env.ACTIVITY_STREAM_CACHE || config.ACTIVITY_STREAM_CACHE;
    process.env.ACTIVITY_UPDATE_INTERVAL = process.env.ACTIVITY_UPDATE_INTERVAL || config.ACTIVITY_UPDATE_INTERVAL;
    process.env.PORT = process.env.PORT || config.PORT;
    process.env.ROOT_URL = process.env.ROOT_URL || config.ROOT_URL;
    process.env.ADMIN_TXT_NUMBER = process.env.ADMIN_TXT_NUMBER || config.ADMIN_TXT_NUMBER;
    process.env.NEXMO_VIRTUAL_NUMBER = process.env.NEXMO_VIRTUAL_NUMBER || config.NEXMO_VIRTUAL_NUMBER;
    process.env.NEXMO_KEY = process.env.NEXMO_KEY || config.NEXMO_KEY;
    process.env.NEXMO_SECRET = process.env.NEXMO_SECRET || config.NEXMO_SECRET;
    process.env.SITE_PUBLIC = process.env.SITE_PUBLIC || config.SITE_PUBLIC;
    process.env.SITE_URL = process.env.SITE_URL || config.SITE_URL;
    process.env.STRAVA_ROUTES_ACCESS_TOKEN = process.env.STRAVA_ROUTES_ACCESS_TOKEN || config.STRAVA_ROUTES_ACCESS_TOKEN;
    process.env.STRAVA_CLIENT_ID = process.env.STRAVA_CLIENT_ID || config.STRAVA_CLIENT_ID;
    process.env.STRAVA_CLIENT_SECRET = process.env.STRAVA_CLIENT_SECRET || config.STRAVA_CLIENT_SECRET;
    process.env.STRAVA_CLUB = process.env.STRAVA_CLUB || config.STRAVA_CLUB;
    process.env.STRAVA_MOD_CLUB = process.env.STRAVA_MOD_CLUB || config.STRAVA_MOD_CLUB;
    process.env.STRAVA_REDIRECT_URI = process.env.STRAVA_REDIRECT_URI || config.STRAVA_REDIRECT_URI;
    process.env.STRAVA_VERIFY_TOKEN = process.env.STRAVA_VERIFY_TOKEN || config.STRAVA_VERIFY_TOKEN;
  };

```
