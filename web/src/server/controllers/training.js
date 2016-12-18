
const strava = require('strava-v3');

const User = require('../models/user');
const config = require('../config');
const hlpr = require('../lib/helpers');


exports.stravaSignin = (req, res, next) => {
  hlpr.consLog([
    'authentication.stravaSignin',
    'req.user:',
    req.user,
    'req.query:',
    req.query,
  ]);
  strava.oauth.getToken(req.query.code, (err, tokenPayload) => {
    hlpr.consLog([
      'authentication.getToken',
      `strava req.query.code: ${req.query.code}`,
      'strava tokenPayload: ',
      tokenPayload,
      'getToken err: ',
      err,
    ]);
    User.findOneAndUpdate({ stravaId: req.user.stravaId }, {
      $set: { access_token: tokenPayload.access_token,
        tokenPayload.athlete,
        // email: tokenPayload.athlete.email,
        // access_token: tokenPayload.access_token,
        // firstname: tokenPayload.athlete.firstname,
        // lastname: tokenPayload.athlete.lastname,
        // profile_medium: tokenPayload.athlete.profile_medium,
        // profile: tokenPayload.athlete.profile,
        // city: tokenPayload.athlete.city,
        // country: tokenPayload.athlete.country,
        // sex: tokenPayload.athlete.sex,
        // premium: tokenPayload.athlete.premium,
        // created_at: tokenPayload.athlete.created_at,
        // updated_at: tokenPayload.athlete.updated_at,
        // date_preference: tokenPayload.athlete.date_preference,
        // measurement_preference: tokenPayload.athlete.measurement_preference,
      },
    }, { new: true }, (err, user) => {
      hlpr.consLog(['User', err, user]);
      strava.athlete.get({ access_token: user.access_token }, (err, payload) => {
        if (!err) {
          hlpr.consLog(['strava query code:', req.query.code, 'strava payload:', payload]);
        } else {
          hlpr.consLog(['strava query code:', req.query.code, 'strava err:', err]);
        }
      });
    });
  });
  const result = `
      <script>
        localStorage.setItem('token', '${tokenForUser(req.user)}');
        window.location='/';
      </script>`;

  res.send(result);
};

exports.user = (req, res, next) => {
  User.findOne({ $or: [{ email: req.user.email }, { stravaId: req.user.stravaId }] }, (err, user) => {
    if (err) { return next(err); }
    if (user) {
      hlpr.consLog(['auth-user', 'AUTH USER: User found', user.email]);
      return res.json({ user: user });
    }
  });
};
