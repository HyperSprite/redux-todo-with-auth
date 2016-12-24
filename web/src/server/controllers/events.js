const strava = require('strava-v3');

const User = require('../models/user');
const Events = require('../models/events');
const config = require('../config');
const hlpr = require('../lib/helpers');

exports.addEvent = (req, res) => {
  hlpr.consLog([
    'events.addEvent',
    'req.user:',
    req.user,
    'req.body:',
    req.body,
  ]);

  // Events.create({
  //   stravaId: req.user.stravaId }, (err, event) => {
  //     if (err) next(err);
  //   }
  //   {
  //     $set: {
  //       email: tokenPayload.athlete.email,
  //       access_token: tokenPayload.access_token,
  //       firstname: tokenPayload.athlete.firstname,
  //       lastname: tokenPayload.athlete.lastname,
  //       profile_medium: tokenPayload.athlete.profile_medium,
  //       profile: tokenPayload.athlete.profile,
  //       loc_city: tokenPayload.athlete.city,
  //       loc_state: tokenPayload.athlete.state,
  //       loc_country: tokenPayload.athlete.country,
  //       sex: tokenPayload.athlete.sex,
  //       premium: tokenPayload.athlete.premium,
  //       created_at: tokenPayload.athlete.created_at,
  //       updated_at: tokenPayload.athlete.updated_at,
  //       date_preference: tokenPayload.athlete.date_preference,
  //       measurement_preference: tokenPayload.athlete.measurement_preference,
  //     },
  //   }, { new: true }, (err, user) => {
  //     hlpr.consLog(['User', err, user]);
  //     strava.athlete.get({ access_token: user.access_token }, (err, payload) => {
  //       if (!err) {
  //         hlpr.consLog(['strava query code:', req.query.code, 'strava payload:', payload]);
  //       } else {
  //         hlpr.consLog(['strava query code:', req.query.code, 'strava err:', err]);
  //       }
  //     });
  //   });
  // });

  const result = 'req.params';

  res.send(result);
};

exports.user = (req, res) => {
  User.findOne({ stravaId: req.user.stravaId },{ password: 0 }, (err, user) => {
    if (err) { return next(err); }
    if (user) {
      hlpr.consLog(['auth-user', 'AUTH USER: User found', user.email]);
      return res.json({ user: user });
    }
  });
};
