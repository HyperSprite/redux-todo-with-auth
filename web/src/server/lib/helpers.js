const { performance } = require('perf_hooks'); // eslint-disable-line
const m = require('moment');
const mtz = require('moment-timezone');
const dateFNS = require('date-fns');

const Logs = require('../models/logging');
// Helper functions

const logObj = {
  file: 'lib/helpers',
  logType: 'lib',
  level: 10,
};

const logLevel = {
  everything: 10, // bug testing
  true: 9,        // important
  verbose: 7,     // not for production
  normal: 4,      // important
  minimal: 1,     // critical
  none: -1,
};

exports.isProd = () => {
  if (process.env.NODE_ENV === 'production') {
    return 'production';
  }
};

exports.getDate = (result) => {
  const newDate = m().utc().format();
  newDate.toString();
  return result(newDate);
};

exports.getDateLocal = (locale, format, result) => exports.getDate((date) => {
  const newDate = format ? m(date).tz(locale).format(format) : m(date).tz(locale);
  return result(newDate);
});

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
  if (logLevel[process.env.LOGGING] * 1 > 6) {
    [].slice.call(arr).forEach((arg) => {
      console.log(`${exports.getDate(r => r)} - ${arg}`);
    });
    console.log('');
  }
};

exports.perfNowStart = (label) => {
  if (logLevel[process.env.LOGGING] * 1 > 6) {  // verbose logLevel
    const perfNSName = `perfNS${label}`;
    process.env[perfNSName] = performance.now();
  }
};

exports.perfNowEnd = (label) => {
  const perfNSName = `perfNS${label}`;
  if (logLevel[process.env.LOGGING] * 1 > 6) { // verbose logLevel
    const perfNowEnd = performance.now();
    const result = Math.floor(perfNowEnd - process.env[perfNSName]);
    const output = `${perfNSName} ran for ${result}`;
    exports.logOut(Object.assign({}, logObj, {
      func: `${logObj.file}.perfNowEnd`,
      logSubType: 'timers',
      message: `perfNowEnd >>>>>>> ${output}`,
    }));
    process.env[perfNSName] = null;
  }
};

// const logObj = {
//   stravaId: req.user.stravaId,
//   func: 'Controllers/Activity: findActivityAndUpdate'
//   logType: 'activity',
//   logSubType: 'failure',
//   level: 3, // 0 & 1 = critical, 2~4  = important, 5~9 low
//   error: err,
//   message: `Controllers/Authentication: exports.user`,
//   page: req.originalUrl,
// };

const loggit = (enhncdLogObj) => {
  Logs.create(Object.assign(enhncdLogObj, { date: exports.getDate(gD => gD) }), (err, logging) => {
    exports.consLog([err, logging]);
  });
};

exports.LogObj = function LogObj(func, logType, logSubType, level, error, page, message, stravaId) {
  this.stravaId = stravaId;
  this.func = func;
  this.logType = logType;
  this.logSubType = logSubType;
  this.level = level;
  this.error = error;
  this.message = message;
  this.page = page;
};

exports.logOut = (incLogObj) => {
  if (logLevel[process.env.LOGGING] !== '') {
    if (incLogObj.level <= logLevel[process.env.LOGGING] * 1) {

      loggit(Object.assign({}, incLogObj));
    }
  }
};

// hlpr.logOutArgs(func, logType, logSubType, level, error, page, message, stravaId);
// hlpr.logOutArgs(`${logObj.file}.functionName`, logObj.logType, 'admin', 9, err, req.originalUrl, message, req.user.stravaId);
exports.logOutArgs = (func, logType, logSubType, level, error, page, message, stravaId) => {
  const newLog = new exports.LogObj(func, logType, logSubType, level, error, page, message, stravaId);
  exports.logOut(newLog);
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
