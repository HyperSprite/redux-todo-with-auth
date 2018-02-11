const { performance } = require('perf_hooks'); // eslint-disable-line
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

exports.perfNowStart = (label) => {
  if (process.env.LOGGING === 'true') {
    const perfNSName = `perfNS${label}`;
    process.env[perfNSName] = performance.now();
    console.log(`\n ${perfNSName} \n`);
  }
};

exports.perfNowEnd = (label) => {
  const perfNSName = `perfNS${label}`;
  if (process.env.LOGGING === 'true' && process.env[perfNSName]) {
    const perfNowEnd = performance.now();
    const result = Math.floor(perfNowEnd - process.env[perfNSName]);
    const output = `${perfNSName} ran for ${result}`;
    console.log(`\n perfNowEnd >>>>>>> ${output} \n`);
    process.env[perfNSName] = null;
  }
};

// const logObj = {
//   stravaId: req.user.stravaId,
//   func: 'Controllers/Activity: findActivityAndUpdate'
//   logType: 'activity',
//   logSubType: 'failure',
//   level: 3, // 1 = high, 2 = med, 3 = low
//   error: err,
//   message: `Controllers/Authentication: exports.user`,
//   page: req.originalUrl,
// };

exports.logOut = (logObj) => {
  Logs.create(Object.assign(logObj, { date: exports.getDate(gD => gD) }), (err, logging) => {
    if (process.env.LOGGING !== 'true') {
      if (logObj.level < 4) {
        exports.consLog([logging]);
      }
    } else {
      exports.consLog([logging]);
    }
  });
};

// const wattsOverFTP = waw / ftp;
// const wattsByHour = ftp * 3600;

exports.lib = {
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
