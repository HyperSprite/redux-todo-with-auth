const jwt = require('jwt-simple');
const strava = require('strava-v3');
const moment = require('moment');

const User = require('../models/user');
const rts = require('./routeplans');
const hlpr = require('../lib/helpers');
const geocoder = require('../lib/geocoder');
const resources = require('../lib/resources');

const getDate = (result) => {
  const newDate = moment().utc().format();
  newDate.toString();
  return result(newDate);
};

// push ftp or weight into user
// exports.pushMetrics(athlete, editUser, ['ftp', 'weight'], resUser) => {
// athlete is what is returned from strava
// editUser is from db
// TODO this is updating but not returning the latest user to redux.
exports.pushMetrics = (athlete, editUser, metricType, resUser) => {
  let returnValue = editUser;
  if (!athlete || !editUser) {
    return resUser(returnValue);
  }
  metricType.forEach((mT) => {
    hlpr.consLog(['....................', 'auth.pushMetrics[mT] start', mT, athlete[mT]]);
    if (athlete[mT]) {
      const mTItem = { [mT]: athlete[mT], date: getDate(result => result) };
      const mTArray = `${mT}History`;
      const pushItem = { $push: { [mTArray]: mTItem } };
      const options = { safe: true, upsert: true, new: true };
      hlpr.consLog(['....................', 'auth.pushMetrics[mT] Mid', editUser[mTArray], editUser[mTArray].length]);
      if (!editUser[mTArray] || editUser[mTArray].length === 0 || athlete[mT] !== editUser[mTArray][editUser[mTArray].length - 1][mT]) {
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
// userData is direct from Strava (use id, not stravaId)
// user is from the database (use stravaId)

exports.writeUser = (userData, user, resultUser) => {
// setting up app permissions
  let admin = false;
  let club = false;

  if (userData.athlete.clubs && userData.athlete.clubs.length !== 0) {
    admin = userData.athlete.clubs.some((c) => {
      return c.id === process.env.STRAVA_MOD_CLUB * 1;
    });
    club = userData.athlete.clubs.some((c) => {
      return c.id === process.env.STRAVA_CLUB * 1;
    });
  } else {
    hlpr.consLog(['writeUser clubs fail', userData.athlete.id]);
  }

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
    // hlpr.consLog(['....................', 'auth.writeUser.callGeoCoder', 'user', user.stravaId, err]);
    // get user elevation and timezone
    const inputElevation = {
      loc: `${toSave.userGeoLongitude},${toSave.userGeoLatitude}`,
      timestamp: user.updatedAt,
    };
    // hlpr.consLog(['....................', 'auth.writeUser.inputElevation', inputElevation]);
    resources.rLonLat(inputElevation, 'elevation', (geoElv) => {
      // hlpr.consLog(['....................', 'geoElv', geoElv]);
      toSave.userGeoElevation = geoElv.elevation;

      resources.rLonLat(inputElevation, 'timezone', (geoTZ) => {
        hlpr.consLog(['....................', 'auth.writeUser.geoTZ', geoTZ]);
        if (geoTZ.timezone) {
          toSave.userGeoTzId = geoTZ.timezone.timeZoneId;
          toSave.userGeoTzName = geoTZ.timezone.timeZoneName;
          toSave.userGeoTzRawOffset = geoTZ.timezone.rawOffset;
          toSave.userGeoTzDSTOffset = geoTZ.timezone.dstOffset;
        }

        const tmpRt = {
          pageCount: 1,
          routeplans: [],
          cronjob: true,
          user: user,
        };

        

          // toSave.friends = strava.athlete.listFriends({ id: user.stravaId, access_token: user.access_token }, (err, data) => {
          //   const friendsResult = data.map(d => d.id);

          const options = { new: true };
          User.findByIdAndUpdate(user._id, toSave, options, (err, editUser) => {
            if (err || !editUser) {
              hlpr.consLog(['....................', 'Error: auth.writeUser.findByIdAndUpdate', err, user._id]);
              return resultUser({ error: 'Error updating user' });
            }
            exports.pushMetrics(athlete, editUser, ['weight', 'ftp'], (resUser) => {
              hlpr.consLog(['....................', 'auth.writeUser resultUser', editUser.stravaId]);
              return resultUser(resUser);
            });
          });
        // });
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
  const stravaArgs = {
    id: req.user.stravaId,
    access_token: req.user.access_token
  }
  strava.athlete.get(stravaArgs, (err, athlete) => {
    if (err || !athlete) return res.status(401).send({ error: 'Error or no data found' });
    if (athlete.message === 'Authorization Error') exports.stravaSignOut(req, res);
    exports.writeUser({ athlete: athlete }, req.user, (resultUser) => {
      hlpr.consLog(['getUser ................', { athlete: resultUser }, req.user.stravaId]);
      const result = `
        <script>
          localStorage.setItem('token', '${tokenForUser(req.user, tkn => tkn)}');
          window.location='/';
        </script>`;
      res.send(result);
    });
  });
};

exports.stravaSignOut = (req, res) => {
  hlpr.consLog(['stravaSignOut', req.user.stravaId]);
  res.send({ signout: true, types: 'UNAUTH_USER' });
};

exports.user = (req, res, next) => {
  User.findOne({ stravaId: req.user.stravaId }, (err, user) => {
    const logObj = {
      stravaId: req.user.stravaId,
      logType: 'auth',
      level: 3,
      error: err,
      message: 'Controllers/Authentication: exports.user',
      page: req.originalUrl,
    };
    hlpr.logOut(logObj);
    if (err || !user) { return next(err); }
    res.json({ user: user });
  });
};

exports.toggleClubNotice = async (req, res) => {
  hlpr.consLog(['toggleClubNotice', req.body.clubNotice]);
  let result;
  try {
    result = await User.findOneAndUpdate(
      { stravaId: req.user.stravaId }, { clubNotice: req.body.clubNotice }, { new: true }
    );
  } catch (err) {
    hlpr.consLog(['toggleClubNotice', err]);
    return res.status(500).send({ Error: 'Failed to update' });
  }
  return res.send({ clubNotice: result.clubNotice });
};
