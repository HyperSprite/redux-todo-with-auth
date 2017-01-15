const jwt = require('jwt-simple');
const strava = require('strava-v3');
const moment = require('moment');

const User = require('../models/user');
const config = require('../config');
const hlpr = require('../lib/helpers');

const dateNow = moment().format();

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  const newJWT = jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
  hlpr.consLog(['tokenForUser', newJWT]);
  return newJWT;
}

exports.signinError = (err, req, res, next) => {
  hlpr.consLog(['signin', `AUTH ERROR: Signin - Bad Email or Password @ ${req.ip}`]);
  return res.status(422).send({ error: 'Signin failed: Bad Email or Password.' });
};

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

    let admin = false;
    admin = tokenPayload.athlete.clubs.some((c) => {
      return c.id === process.env.STRAVA_MOD_CLUB * 1;
    });

    let club = false;
    club = tokenPayload.athlete.clubs.some((c) => {
      return c.id === process.env.STRAVA_CLUB * 1;
    });

    User.findOneAndUpdate({ stravaId: req.user.stravaId }, {
      $set: {
        athlete_type: tokenPayload.athlete.athlete_type,
        email: tokenPayload.athlete.email,
        access_token: tokenPayload.access_token,
        firstname: tokenPayload.athlete.firstname,
        lastname: tokenPayload.athlete.lastname,
        profile_medium: tokenPayload.athlete.profile_medium,
        profile: tokenPayload.athlete.profile,
        loc_city: tokenPayload.athlete.city,
        loc_state: tokenPayload.athlete.state,
        loc_country: tokenPayload.athlete.country,
        sex: tokenPayload.athlete.sex,
        premium: tokenPayload.athlete.premium,
        created_at: tokenPayload.athlete.created_at,
        updated_at: tokenPayload.athlete.updated_at,
        date_preference: tokenPayload.athlete.date_preference,
        measurement_preference: tokenPayload.athlete.measurement_preference,
        adminMember: admin,
        clubMember: club,
        ftpHistory: { ftp: tokenPayload.athlete.ftp, date: dateNow },
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
  User.findOne({ stravaId: req.user.stravaId }, { password: 0 }, (err, user) => {
    if (err) { return next(err); }
    if (user) {
      hlpr.consLog(['auth-user', 'AUTH USER: User found', user.email]);
      return res.json({ user: user });
    }
  });
};
