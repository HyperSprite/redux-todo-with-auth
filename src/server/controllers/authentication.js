const jwt = require('jwt-simple');
const strava = require('strava-v3');
const moment = require('moment');

const User = require('../models/user');
const hlpr = require('../lib/helpers');
const geocoder = require('../lib/geocoder');

const getDate = (result) => {
  const newDate = moment().utc().format();
  newDate.toString();
  return result(newDate);
};

function tokenForUser(user, cb) {
  const timestamp = getDate(result => result);
  const newJWT = jwt.encode({ sub: user.id, iat: timestamp }, process.env.AUTH_SECRET);
  hlpr.consLog(['auth.tokenForUser', newJWT, 'userId', user.id]);
  return cb(newJWT);
}

exports.signinError = (err, req, res, next) => {
  hlpr.consLog(['auth.signinError', `AUTH ERROR: Signin - Bad Email or Password @ ${req.ip}`, err]);
  return res.status(422).send({ error: 'Signin failed: Bad Email or Password.' });
};

exports.stravaSignin = (req, res, next) => {
  hlpr.consLog([
    'auth.stravaSignin',
    'req.user:',
    req.user,
    'req.query:',
    req.query,
  ]);

  strava.oauth.getToken(req.query.code, (err, tokenPayload) => {
    hlpr.consLog([
      'auth.getToken',
      `strava req.query.code: ${req.query.code}`,
    ]);

    let admin = false;
    admin = tokenPayload.athlete.clubs.some((c) => {
      return c.id === process.env.STRAVA_MOD_CLUB * 1;
    });

    let club = false;
    club = tokenPayload.athlete.clubs.some((c) => {
      return c.id === process.env.STRAVA_CLUB * 1;
    });
    const athlete = tokenPayload.athlete;
    athlete.access_token = tokenPayload.access_token;
    athlete.loc_city = tokenPayload.athlete.city;
    athlete.loc_state = tokenPayload.athlete.state;
    athlete.loc_country = tokenPayload.athlete.country;
    athlete.adminMember = admin;
    athlete.clubMember = club;

    geocoder.userGeocoder(athlete, req.user, (err, toSave) => {
      hlpr.consLog(['auth.callGeoCoder', 'req.user', req.user, err, toSave]);
      const options = { new: true };
      User.findByIdAndUpdate(req.user._id, toSave, options, (err, editUser) => {
        if (athlete.ftp) {
          const ftpHistory = { ftp: athlete.ftp, date: getDate(result => result) };
          if (req.user.ftpHistory.length === 0) {
            User.findByIdAndUpdate(req.user._id, { $push: { ftpHistory: ftpHistory } }, { safe: true, upsert: true }, (err, ftpUpdate) => {
              if (err) hlpr.consLog(['auth.User.ftpHistory', err, editUser]);
            });
          } else if (req.user.ftpHistory.length > 0 && athlete.ftp !== req.user.ftpHistory[req.user.ftpHistory.length - 1].ftp) {
            User.findByIdAndUpdate(req.user._id, { $push: { ftpHistory: ftpHistory } }, { safe: true, upsert: true }, (err, ftpUpdate) => {
              if (err) hlpr.consLog(['auth.User.ftpHistory', err, editUser]);
            });
          }
        }
        // hlpr.consLog(['auth.User.fOAU', err, editUser]);
        const result = `
          <script>
            localStorage.setItem('token', '${tokenForUser(req.user, tkn => tkn)}');
            window.location='/events';
          </script>`;
        res.send(result);
      });
    });
  });
};

exports.user = (req, res, next) => {
  User.findOne({ stravaId: req.user.stravaId }, { password: 0 }, (err, user) => {
    if (err) { return next(err); }
    if (user) {
      hlpr.consLog(['auth.user', 'AUTH USER: User found', user]);
      return res.json({ user: user });
    }
  });
};
