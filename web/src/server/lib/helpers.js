const moment = require('moment');
const dateFNS = require('date-fns');

const Logs = require('../models/logging');
// Helper functions

exports.isProd = () => {
  if (process.env.NODE_ENV === 'production') {
    return 'production';
  }
};

exports.getDate = (result) => {
  const newDate = moment().utc().format();
  newDate.toString();
  return result(newDate);
};

// Date String helper
exports.correctedTZDate = (stringDate) => {
  const d = new Date(stringDate);
  return `${d.getUTCHours()}:${d.getUTCMinutes()}`;
};

// If LOGGING = true
// This takes an array for argumetns
// For every element of the array,
// a console.log message is generated.
exports.consLog = (arr) => {
  if (process.env.LOGGING === 'true') {
    [].slice.call(arr).forEach((arg) => {
      console.log(exports.getDate(r => r), arg);
    });
  }
};

// const logObj = {
//   stravaId: req.user.stravaId,
//   logType: 'auth',
//   level: 3, // 1 = high, 2 = med, 3 = low
//   error: err,
//   message: `Controler/Authentication: exports.user`,
//   page: req.originalUrl,
// };
exports.logOut = (logObj) => {
  const log = logObj;
  log.date = exports.getDate(gD => gD);
  Logs.create(log, (err, logging) => {
    exports.consLog([logging]);
  });
};


exports.lib = {
  round: (val, place) => Number(Math.round(val + `e${place}`) + `e-${place}`),
  secondsToTime: seconds => dateFNS.format(dateFNS.addSeconds(dateFNS.startOfDay(new Date()), seconds), 'H:mm'),
  kgToPounds: kg => kg * 2.20462,
  kgToPoundsRound: (kg, p = 0) => exports.lib.round(kg * 2.20462, p),
  metersToFeet: m => m * 3.28084,
  metersToFeetRound: (m, p = 0) => exports.lib.round(m * 3.28084, p),
  metersToMiles: m => m * 0.00062137121212121,
  metersToMilesRound: (m, p = 0) => exports.lib.round(m * 0.00062137121212121, p),
  metersToKm: m => m * 1000,
  metersToKmRound: (m, p = 0) => exports.lib.round(m * 1000, p),

  // Only one type of date format on Strava as far as I can tell
  // Have not found a setting to change date pref
  // if I find more, will add them to this object
  dateFormating: (datePref) => {
    const dateFormats = {
      'D%m/%d/%Y': 'MM-DD-YYYY',
    };
    return dateFormats[`D${datePref}`];
  },

  dateFormat: (date, datePref) => dateFNS.format(date, exports.lib.dateFormating(datePref)),

  getLastInArray: (arr, arrType) => {
    let item;
    if (arr && arr.length > 0 && arr[arr.length - 1][arrType] != null) {
      item = arr[arr.length - 1][arrType];
    }
    return item;
  },

  oneWeek: (weekStart) => {
    const weekEnd = dateFNS.format(dateFNS.addDays(weekStart, 6), 'YYYY-MM-DD');
    return weekEnd;
  },

  weekArray: week => dateFNS.eachDay(week, exports.lib.oneWeek(week)).map(eDay => dateFNS.format(eDay, 'YYYY-MM-DD')),
};
