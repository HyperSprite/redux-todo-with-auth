const jwt = require('jwt-simple');
const strava = require('strava-v3');
const moment = require('moment');

const User = require('../models/user');
const hlpr = require('../lib/helpers');
const geocoder = require('../lib/geocoder');
const resources = require('../lib/resources');

const getDate = (result) => {
  const newDate = moment().utc().format();
  newDate.toString();
  return result(newDate);
};

// push ftp or weight into user
// (athlete, editUser, ['ftp', 'weight'], resUser) => {
exports.pushMetrics = (athlete, editUser, metricType, resUser) => {
  let returnValue = editUser;
  metricType.forEach((mT) => {
    hlpr.consLog(['....................', 'auth.pushMetrics[mT] start', mT, athlete[mT]]);
    if (athlete[mT]) {
      const mTItem = { [mT]: athlete[mT], date: getDate(result => result) };
      const mTArray = `${mT}History`;
      const pushItem = { $push: { [mTArray]: mTItem } };
      const options = { safe: true, upsert: true, new: true };
      if (!editUser[mTArray] || editUser[mTArray].length === 0  || editUser[mTArray].length > 0 && athlete.ftp !== editUser[mTArray][editUser[mTArray].length - 1].ftp) {
        User.findByIdAndUpdate(editUser._id, pushItem, options, (err, metricResults) => {
          if (err) {
            hlpr.consLog(['....................', `Error: auth.pushMetrics[mT] 0`, err, pushItem, mTArray, metricResults]);
            returnValue = metricResults;
          }
          hlpr.consLog(['....................', `auth.pushMetrics[mT] 0`, mTArray, metricResults]);
          returnValue = metricResults;
        });
      } else {
        returnValue = returnValue;
      }
    }
  });
  return resUser(returnValue);
};

// write user to the database

exports.writeUser = (userData, user, resultUser) => {

  let admin = false;
  admin = userData.athlete.clubs.some((c) => {
    return c.id === process.env.STRAVA_MOD_CLUB * 1;
  });

  let club = false;
  club = userData.athlete.clubs.some((c) => {
    return c.id === process.env.STRAVA_CLUB * 1;
  });
  const athlete = userData.athlete;
  if (userData.access_token) {
    athlete.access_token = userData.access_token;
  }
  athlete.loc_city = userData.athlete.city;
  athlete.loc_state = userData.athlete.state;
  athlete.loc_country = userData.athlete.country;
  athlete.adminMember = admin;
  athlete.clubMember = club;

  geocoder.userGeocoder(athlete, user, (err, toSave) => {
    hlpr.consLog(['....................', 'auth.writeUser.callGeoCoder', 'user', user, err, toSave]);
    // get user elevation and timezone
    const inputElevation = {
      loc: `${toSave.userGeoLongitude},${toSave.userGeoLatitude}`,
      timestamp: user.updatedAt,
    };
    hlpr.consLog(['....................', 'auth.writeUser.inputElevation', inputElevation]);
    resources.rLonLat(inputElevation, 'elevation', (geoElv) => {
      hlpr.consLog(['....................', 'geoElv', geoElv]);
      toSave.userGeoElevation = geoElv.elevation;

      resources.rLonLat(inputElevation, 'timezone', (geoTZ) => {
        hlpr.consLog(['....................', 'auth.writeUser.geoTZ', geoTZ]);
        if (geoTZ.timezone) {
          toSave.userGeoTzId = geoTZ.timezone.timeZoneId;
          toSave.userGeoTzName = geoTZ.timezone.timeZoneName;
          toSave.userGeoTzRawOffset = geoTZ.timezone.rawOffset;
          toSave.userGeoTzDSTOffset = geoTZ.timezone.dstOffset;
        }
        const options = { new: true };
        User.findByIdAndUpdate(user._id, toSave, options, (err, editUser) => {
          if (err || !editUser) {
            hlpr.consLog(['....................', 'Error: auth.writeUser.findByIdAndUpdate', err, editUser, user._id]);
            return resultUser({ error: 'Error updating user' });
          }
          exports.pushMetrics(athlete, editUser, ['ftp', 'weight'], (resUser) => {
            hlpr.consLog(['....................', 'auth.writeUser resultUser', editUser]);
            return resultUser(resUser);
          });
        });
      });
    });
  });
};

function tokenForUser(user, cb) {
  const timestamp = getDate(result => result);
  const newJWT = jwt.encode({ sub: user.id, iat: timestamp }, process.env.AUTH_SECRET);
  hlpr.consLog(['auth.tokenForUser', newJWT, 'userId', user.id]);
  return cb(newJWT);
}

exports.signinError = (err, req, res) => {
  hlpr.consLog(['auth.signinError', `AUTH ERROR: Signin - Bad Email or Password @ ${req.ip}`, err]);
  return res.status(422).send({ error: 'Signin failed: Bad Email or Password.' });
};

exports.stravaSignin = (req, res) => {
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

    exports.writeUser(tokenPayload, req.user, (resultUser) => {
      hlpr.consLog(['auth.User.fOAU', err, resultUser]);
      const result = `
        <script>
          localStorage.setItem('token', '${tokenForUser(req.user, tkn => tkn)}');
          window.location='/events';
        </script>`;
      res.send(result);
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
