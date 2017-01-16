const strava = require('strava-v3');
const moment = require('moment');

const User = require('../models/user');
const Events = require('../models/events');
const hlpr = require('../lib/helpers');


// TODO this is just starting but have tested it and it works to pull data.
exports.getRoute = (req, res) => {
  hlpr.consLog(['getRoute', req.params.id, req.headers.stravatoken]);
    // strava.routes.get({ id: req.params.id, access_token: req.headers.stravatoken }, (err, data) => {
      // res.send(data)
    // });
    res.send('success');
  };
