const csv = require('fast-csv');
const addDays = require('date-fns/add_days');
const subDays = require('date-fns/sub_days');
const format = require('date-fns/format');
const startOfWeek = require('date-fns/start_of_week');
const subWeeks = require('date-fns/sub_weeks');
const getTime = require('date-fns/get_time');
const eachDay = require('date-fns/each_day');
const isAfter = require('date-fns/is_after');
const justFns = require('just-fns');
const qs = require('qs');
const strava = require('strava-v3');
const url = require('url');
const _ = require('lodash');


const Activities = require('../models/activities');
const ActivityStreams = require('../models/activity-streams');
const User = require('../models/user');
const auth = require('./authentication');
const socketSrvr = require('../sockets');
const enhancePolylineLocation = require('../lib/enhance-polyline-location');
const stopwords = require('../lib/stopwords');
const hlpr = require('../lib/helpers');
const pckg = require('../../../package.json');

const currentVersion = pckg.version.slice(0, 3) * 1;
/**
* utility
*/
function weeksForward(weekStart, weeks) {
  const weekEnd = format(addDays(weekStart, (weeks * 7)), 'YYYY-MM-DD');
  return weekEnd;
}

function weeksBack(weekStart, weeks) {
  const weekEnd = format(subDays(weekStart, (weeks * 7)), 'YYYY-MM-DD');
  return weekEnd;
}

const logObj = {
  file: 'controllers/activities',
  logType: 'controller',
  level: 10,
};

// This is a recursive fucntion that returns 200 (or input.perPage) resource_state: 2 activities
// per pass (strava limit per request). It will keep going until is returns
// all activities for a user. Input.pageCount is used to track pagination.
// If an activity ID does not exist, it will be created, otherwise, no change.
exports.getAllActivities = (input, result) => {
  const options = {
    id: input.user.stravaId,
    access_token: input.user.access_token,
    per_page: input.perPage || 200,
    page: input.pageCount,
  };
  console.log('>>>>>> getAllActivities', input);
  if (input.arrLength === 0) {
    return result(input);
  }
  strava.athlete.listActivities(options, (err, acts) => {
    if (acts.message === 'Authorization Error' || err && err.message === 'Authorization Error') {
      hlpr.consLog(['getAllActivities Authorization Error', input.user.stravaId, input.cronjob]);
      return auth.handleRefresh(exports.getAllActivities, req, res);
    }
    if (err) {
      hlpr.consLog(['strava.getAllActivities err', err]);
      return err;
    }
    if (!acts || !acts.length) {
      input.arrLength = 0;
      hlpr.consLog(['strava.getAllActivities arrLength = 0 or !acts']);
      return result(input);
    }
    hlpr.consLog(['getAllActivities input.pageCount acts.length', input.pageCount, acts.length]);
    input.pageCount++;
    acts.forEach((act) => {
      const tmpAct = act;
      tmpAct.activityId = tmpAct.id; // activities are returned as "id"
      Activities.findOrCreate({ activityId: tmpAct.activityId }, tmpAct, (err, dbActivity, created) => {
        // By using findOrCreate here, we are only adding new if they do not yet exist.
        // This can also be useful if an activity is updated in strava and needs to be re-fetched
        if (created) {
          input.activities.push(dbActivity);
        } else {
          input.lastActivity = dbActivity;
        }
      });
    });
    return exports.getAllActivities(input, result);
  });
};

const getStreams = (activityId, accessToken, done) => {
  if (!activityId || !accessToken) {
    hlpr.logOutArgs(`${logObj.file}.getStreams !activityId || !accessToken`, logObj.logType, 'activities', 2, 'err', 'no_page', '!activityId || !accessToken', null);
    return done([]);
  }
  hlpr.logOutArgs(`${logObj.file}.getStreams next`, logObj.logType, 'activities', 9, 'err', 'no_page', `In getStreams for activityId: ${activityId}`, null);
  /*
  * Streams to attempt to return from Strava
  */
  const streamTypes = [
    'altitude',
    'cadence',
    'distance',
    'grade_smooth',
    'heartrate',
    'latlng',
    'moving',
    'temp',
    'time',
    'watts',
    'velocity_smooth',
  ];
  strava.streams.activity({ id: activityId, access_token: accessToken, types: streamTypes }, (err, streams, rateLimit) => {
    hlpr.consLog(['getStreams rateLimit', JSON.stringify(rateLimit)]);
    if (err) {
      hlpr.logOutArgs(`${logObj.file}.getStreams got streams err`, logObj.logType, 'activities', 3, err, 'no_page', `err for ${activityId} streams: ${streams && streams.message}`, null);
      return done([]);
    } else if (_.isArray(streams)) {
      const newStreams = Object.assign({}, { streams }, { activityId });
      ActivityStreams.findOrCreate({ activityId }, newStreams, (err, streamDB) => {
        hlpr.logOutArgs(`${logObj.file}.getStreams ActivityStreams.findOrCreate success`, logObj.logType, 'activities', 8, 'err', 'no_page', `${activityId} streams: ${streams.map(s => s.type)}`, null);
        return done(streams);
      });
    } else {
      hlpr.logOutArgs(`${logObj.file}.getStreams ActivityStreams.findOrCreate err`, logObj.logType, 'activities', 5, err, 'no_page', `${activityId} streams: null`, null);
      return done([]);
    }
  });
};

/**
* getStreamTimeAverages returns the average times for X seconds
*/
const getStreamTimeAverages = (streamsArr, done) => {
  const streamTime = [];
  if (_.isArray(streamsArr) && streamsArr.length) {
    /*
    * Streams to convert to Time Averages
    */
    const streamTimeAverages = [
      'cadence',
      'heartrate',
      'watts',
      'altitude',
    ];

    streamTimeAverages.forEach((sTA) => {
      const stream = streamsArr.filter(s => s.type === sTA);
      if (stream.length) {
        streamTime.push(
          { [sTA]: {
            [`${sTA}1`]: justFns.hiConsAvg(stream[0].data, 1),
            [`${sTA}15`]: justFns.hiConsAvg(stream[0].data, 15),
            [`${sTA}60`]: justFns.hiConsAvg(stream[0].data, 60),
            [`${sTA}300`]: justFns.hiConsAvg(stream[0].data, 300),
            [`${sTA}1200`]: justFns.hiConsAvg(stream[0].data, 1200),
            [`${sTA}1800`]: justFns.hiConsAvg(stream[0].data, 1800),
            [`${sTA}3600`]: justFns.hiConsAvg(stream[0].data, 3600),
            [`${sTA}All`]: justFns.hiConsAvg(stream[0].data, stream[0].data.length),
          } },
        );
      }
    });
    return done(streamTime);
  }
  return done([]);
};

const getListZones = (activityId, accessToken, done) => {
  if (!activityId || !accessToken) {
    hlpr.logOut(Object.assign({}, logObj, {
      func: `${logObj.file}.getListZones`,
      logSubType: 'err',
      level: 1,
      message: `!activityId || !accessToken for ${activityId}`,
    }));
    return done([]);
  }
  strava.activities.listZones({ id: activityId, access_token: accessToken }, (err, listZonesArr, rateLimit) => {
    // hlpr.consLog(['getListZones rateLimit', rateLimit]);
    if (_.isArray(listZonesArr)) {
      return done(listZonesArr);
    }
    hlpr.logOut(Object.assign({}, logObj, {
      func: `${logObj.file}.getListZones`,
      logSubType: 'err',
      level: 1,
      error: err,
      message: `activity ${activityId} Not an Array listZonesArr ${listZonesArr}`,
    }));
    return done([]);
  });
};

const findActivityAndUpdate = (activityId, data, options, done) => {
  const newOptions = options;
  newOptions.new = true;
  const extendedData = Object.assign({}, data, { resource_state: 3 });
  Activities.findOneAndUpdate({ activityId: newOptions.activityId }, extendedData, newOptions, (err, fullActivity) => {
    if (fullActivity) {
      hlpr.logOutArgs(`${logObj.file}.findActivityAndUpdate Activities.findOneAndUpdate`, logObj.logType, 'success', 6, err, 'no_page', 'Success fullActivity', options.user.stravaId);
      return done(fullActivity);
    }
    if (err) {
      hlpr.logOutArgs(`${logObj.file}.findActivityAndUpdate Activities.findOneAndUpdate`, logObj.logType, 'error', 3, err, 'no_page', 'Error getting fullActivity', options.user.stravaId);
      return done([]);
    }
    Activities.findOrCreate({ activityId: options.activityId }, data, options, (err, newActivity) => {
      hlpr.logOutArgs(`${logObj.file}.findActivityAndUpdate Activities.findOrCreate`, logObj.logType, 'success', 6, err, 'no_page', `Success for new activity for: ${options.activityId}`, options.user.stravaId);
      return done(newActivity);
    });
  });
};

/**
* activity: required, strava activity
* opts: required with the following form:
* {
*   id: user.stravaId,
*   access_token: user.access_token,
*   user: user,
* }
*/
exports.getActivityDetails = (opts, cb) => {
  strava.activities.get({
    id: opts.activityId,
    access_token: opts.access_token,
  }, (err, data, rateLimit) => {
    hlpr.consLog(['getActivityDetails rateLimit', JSON.stringify(rateLimit)]);
    if (data && data.message === 'Authorization Error' || err) {
      return auth.handleRefresh(exports.getActivityDetails, opts, cb);
    }
    if (!data) {
      hlpr.logOut(Object.assign({}, logObj, {
        func: `${logObj.file}.getActivityDetails`,
        logSubType: 'failure',
        level: 1,
        error: err,
        message: `failedUpdate for ${opts.activityId} message: 'No data' errors: ${err.errors}`,
      }));
      return findActivityAndUpdate(opts.activityId, { failedUpdate: true }, opts, fullActivity => cb(fullActivity));
    } else if (data.elapsed_time === 0) {
      hlpr.logOut(Object.assign({}, logObj, {
        func: `${logObj.file}.getActivityDetails`,
        logSubType: 'failure',
        level: 6,
        error: err,
        message: `data.elapsed_time === 0 for ${opts.activityId}`,
      }));
      return findActivityAndUpdate(opts.activityId, data, opts, fullActivity => cb(fullActivity));
    }

    // const getPolyline = (map) => {
    //   if (map) {
    //     return map.summary_polyline || map.polyline || null;
    //   }
    //   return null;
    // };
    const geoData = {};
    if (!data.VirtualRide && data.end_latlng && data.start_latlng) {
      geoData.geoStart = [data.start_latlng[1], data.start_latlng[0]];
      geoData.geoEnd = [data.end_latlng[1], data.end_latlng[0]];
    }

    // enhancePolylineLocation(getPolyline(data.map), true, (geoData) => {
      getStreams(opts.activityId, opts.access_token, (strmArr) => {
        getStreamTimeAverages(strmArr, (strmTmArr) => {
          const enhancedData = Object.assign(
            {},
            data, // raw Strava data
            geoData,
            { streamData: !!strmArr.length },
            { streamTime: strmTmArr },
            { currentSchema: currentVersion } //eslint-disable-line
          );

          const mssg = `Controllers/Activity.getActivityDetails Enhancing Data activityId ${opts.activityId}
            data: ${JSON.stringify(data.id)},
            streamData: ${!!strmArr.length},
            streamTime: ${JSON.stringify([strmTmArr[0], strmTmArr[1], strmTmArr[3]])},
            currentVersion = ${currentVersion}`;

          hlpr.logOut(Object.assign({}, logObj, {
            func: `${logObj.file}.getActivityDetails`,
            logSubType: 'info',
            level: 8,
            error: err,
            message: mssg,
          }));

          if (opts.user.premium) {
            getListZones(opts.activityId, opts.access_token, (listZonesArr) => {
              enhancedData.zones = listZonesArr;

              if (enhancedData.weighted_average_watts && opts.user.ftpHistory.length) {
                let indx = opts.user.ftpHistory.length - 1;
                let ftp = opts.user.ftpHistory[indx].ftp;
                while (isAfter(opts.user.ftpHistory[indx].date, enhancedData.start_date) && indx > 0) {
                  ftp = opts.user.ftpHistory[indx - 1].ftp;
                  indx -= 1;
                }
                enhancedData.ftp = ftp;
                enhancedData.tssScore = justFns.calcTssScore(enhancedData.elapsed_time, enhancedData.weighted_average_watts, ftp);
              }
              hlpr.logOut(Object.assign({}, logObj, {
                func: `${logObj.file}.getActivityDetails pushActivities premium`,
                logSubType: 'info',
                level: 10,
                error: err,
                message: `activityId: ${opts.activityId} resource_state: ${enhancedData.resource_state}`,
              }));
              return findActivityAndUpdate(opts.activityId, enhancedData, opts, fullActivity => cb(fullActivity));
            });
          } else {
            hlpr.logOut(Object.assign({}, logObj, {
              func: `${logObj.file}.getActivityDetails pushActivities not premium`,
              logSubType: 'info',
              level: 10,
              error: err,
              message: `activityId: ${opts.activityId} resource_state: ${enhancedData.resource_state}`,
            }));
            return findActivityAndUpdate(opts.activityId, enhancedData, opts, fullActivity => cb(fullActivity));
          }
        });
      });
    // });
  });
};

exports.getActivityUpdate = (opts, cb) => {
  strava.activities.get({
    id: opts.activityId,
    access_token: opts.access_token,
  }, (err, data) => {
    if (data && data.message === 'Authorization Error' || err) {
      return auth.handleRefresh(exports.getActivityUpdate, req, res);
    }
    if (err || !data || data.errors) {
      hlpr.logOut(Object.assign({}, logObj, {
        func: `${logObj.file}.getActivityUpdate`,
        logSubType: 'failure',
        level: 1,
        error: err,
        message: `failedUpdate for ${opts.activityId} message: ${data ? data.message : 'No data'} errors: ${data.errors}`,
      }));
      findActivityAndUpdate(opts.activityId, { failedUpdate: true }, opts, fullActivity => cb(fullActivity));
    } else {
      hlpr.logOut(Object.assign({}, logObj, {
        func: `${logObj.file}.getActivityUpdate pushActivities not premium`,
        logSubType: 'info',
        level: 10,
        error: err,
        message: `activityId: ${opts.activityId} resource_state: ${data.resource_state}`,
      }));
      findActivityAndUpdate(opts.activityId, data, opts, (fullActivity) => {
        socketSrvr.ifConnected(opts.id, 'ACTIVITY_REFRESHED', fullActivity);
        cb(fullActivity);
      });
    }
  });
};


exports.getRecentActivities = (req, res) => {
  const { pageCount, perPage, user } = req;
  const options = {
    id: user.stravaId,
    access_token: user.access_token,
    per_page: perPage || 7,
    page: pageCount,
    user: user,
  };
  strava.athlete.listActivities({ id: user.stravaId, access_token: user.access_token }, (err, acts) => {
    exports.processingStatusOneSocket(user.stravaId);

    if (acts && acts.message === 'Authorization Error' || err) {
      return auth.handleRefresh(exports.getRecentActivities, req, res);
    }
    if (_.isArray(acts)) {
      const counter = [];
      console.log('listActivities !created', counter);
      if (acts.length === 0) {
        return exports.getWeeklyStats(req, res);
      }
      acts.forEach((act) => {
        Activities.findOrCreate({ activityId: act.id }, act, (err, dbActivity, created) => {
          if (err) {
            hlpr.logOutArgs(`${logObj.file}.getRecentActivities acts.forEach Activities.findOrCreate err`, logObj.logType, 'error', 3, err, req.originalUrl, `Result is err ${JSON.stringify(err)}`, req.user.stravaId);
            return { error: err };
          }
          if (!created) {
            console.log('listActivities !created', counter);
            counter.push(dbActivity.activityId);
            hlpr.logOutArgs(`${logObj.file}.getRecentActivities acts.forEach Activities.findOrCreate !created`, logObj.logType, '!created', 7, err, req.originalUrl, dbActivity.activityId, req.user.stravaId);
            if (counter.length === acts.length) {
              return exports.getWeeklyStats(req, res);
            }
          } else {
            console.log('listActivities', counter);
            options.activityId = dbActivity.activityId;
            const theseOptions = Object.assign({}, options, { activity: dbActivity.activityId });
            exports.getActivityDetails(dbActivity, theseOptions, (done) => {
              hlpr.logOutArgs(`${logObj.file}.getRecentActivities acts.forEach Activities.findOrCreate !created`, logObj.logType, 'created', 7, err, req.originalUrl, done.activityId, req.user.stravaId);
              counter.push(done.activityId);
              if (counter.length === acts.length) {
                return exports.getWeeklyStats(req, res);
              }
            });
          }
        });
      });
    } else {
      const message = 'Unable to update your activities at this time. Strava may be down or some other error has occurred. Here is what we already have';
      hlpr.logOutArgs(`${logObj.file}.getRecentActivities strava.athlete.listActivities err`, logObj.logType, 'error', 3, err, req.originalUrl, `Result is err ${JSON.stringify(err)} or !isArray`, req.user.stravaId);
      return exports.getWeeklyStats(Object.assign({}, req, { serverMessage: { error: message } }), res);
    }
  });
};

/**
*
*  This function runs every three minutes to process 22 activities to ensure
*  the daily rate never exceeds 30000 requests, works out to under 300 requests
*  per day. Use ACTIVITY_UPDATE_INTERVAL to adjust.
*
*  It searches for resource_state: 2 (indexed) then pulls more detailed Strava data
*  and Zone info.
*
*  The activityStreamsCache is cleared every X minutes of ACTIVITY_STREAM_CACHE
*  the default is two weeks or 20160 minutes
*/
const minutes = process.env.ACTIVITY_UPDATE_INTERVAL * 1 || 1; // 3 min failsafe
const theInterval = min => min * 60 * 1000;

exports.getExtendedActivityStats = () => {
  const limitCount = 7;
  const newDate = new Date();
  const activityStreamsCache = process.env.ACTIVITY_STREAM_CACHE * 1 || 20160;  // miuntes
  const backDate = new Date(newDate.getTime() - theInterval(activityStreamsCache));
  hlpr.logOutArgs(`${logObj.file}.getExtendedActivityStats start`, logObj.logType, 'info', 9, null, 'no_page', `Get ${limitCount} activities every ${minutes} minutes with backDate ${backDate}`, null);
  const cacheQuery = { updatedAt: { $lt: backDate } };
  ActivityStreams.find(cacheQuery).deleteMany().exec((err, removed) => {
    if (removed.n) {
      hlpr.logOutArgs(`${logObj.file}.getExtendedActivityStats activityStreamsCache`, logObj.logType, 'info', 5, err, 'no_page', `removed ${removed.n}`, null);
    }
  });

  exports.processingStatusAllSockets();

  const toUpdate = {
    $and: [
      { authorizationError: { $exists: false } },
      { $or: [
        { resource_state: 2 },
        // { currentSchema: { $lt: process.env.CURRENT_SCHEMA * 1 } },
        { currentSchema: { $exists: false } },
      ] },
    ],
  };

  Activities.find(toUpdate).limit(limitCount).sort({ start_date: -1 }).exec((err, activities) => {
    if (err) {
      hlpr.logOutArgs(`${logObj.file}.getExtendedActivityStats Activities.find err`, logObj.logType, 'err', 3, err, 'no_page', `Error finding activities query opts: ${JSON.stringify(toUpdate)}`, null);
      return err;
    }
    hlpr.logOutArgs(`${logObj.file}.getExtendedActivityStats Activities.find info`, logObj.logType, 'info', 10, err, 'no_page', `activities: ${JSON.stringify(activities, null, 2)}`, null);
    activities.forEach((dbActivity) => {
      User.findOne({ stravaId: dbActivity.athlete.id }, { access_token: 1, premium: 1, ftpHistory: 1, stravaId: 1, _id: 0 }, (err, user) => {
        if (user && !err) {
          const message = `activityId: ${dbActivity.activityId}, athleteId: ${dbActivity.athlete.id}, id: ${user.stravaId}, access_token: ${user.access_token}`;
          hlpr.logOutArgs(`${logObj.file}.getExtendedActivityStats User.findOne info`, logObj.logType, 'info', 5, err, 'no_page', message, null);
          const options = {
            id: user.stravaId,
            activityId: dbActivity.activityId,
            access_token: user.access_token,
            user: user,
            cronjob: true,
          };
          exports.getActivityDetails(dbActivity, options, done => done);
        } else {
          Activities.findOneAndUpdate({ activityId: dbActivity.activityId }, { authorizationError: true }, { new: true }, (err, authError) => {
            hlpr.logOutArgs(`${logObj.file}.getExtendedActivityStats User.findOne failure`, logObj.logType, 'failure', 1, err, 'no_page', `No User ${authError.activityId}`, null);
          });
        }
      });
    });
  });
};

const runOnStartup = () => {
  hlpr.logOutArgs(`${logObj.file}.runOnStartup info`, logObj.logType, 'info', 5, null, 'no_page', 'Starting up!', null);
  // exports.getExtendedActivityStats();
};
runOnStartup();

const runGetExtendedActivityStats = setInterval(() => {  // eslint-disable-line
  exports.getExtendedActivityStats();
}, theInterval(minutes));

/**
* db maintenace
*/
const updateDB = () => {
  const limitCount = 30;
  const toUpdate = { $and: [
    // { currentSchema: { $lt: process.env.CURRENT_SCHEMA * 1 } },
    // { currentSchema: { $exists: false } },
  ] };
  Activities.find(toUpdate).limit(limitCount).exec((err, activities) => {
    if (err) {
      hlpr.consLog(['updateDB err activities', err]);
      return err;
    }

    activities.forEach((dbActivity) => {
      const activityId = dbActivity.activityId;
      const insertable = {
        activityId: dbActivity.activityId,
        streams: dbActivity.streams,
      };
      hlpr.consLog(['updateDB dbActivity.activityId', insertable.activityId]);
      Activities.findOneAndUpdate({ activityId }, { $set: { streams: undefined } }, { new: true }, (err, noStream) => {
        hlpr.logOutArgs(`${logObj.file}.updateDB Activities.findOneAndUpdate info`, logObj.logType, 'info', 5, err, 'no_page', `Activity: ${activityId}: No Stream ${noStream.currentSchema}`, null);
      });
    });
  });
};

// const runUpdateDB = setInterval(() => { updateDB(); }, theInterval(minutes));

// Get one week worth of activities
// {
//     "athlete.id": 12345678, // Number
//     "start_date_local": {
//         "$gt": "2017-05-01", // String
//         "$lt": "2017-05-08"  // String
//     }
// }
// sort: {"start_date_local": 1} // oldest first
//


const getOneWeek = async (startDate, stravaId) => {
  let data = [];
  const query = {
    'athlete.id': stravaId,
    resource_state: 3,
    start_date_local: {
      $gt: startDate,
      $lt: weeksForward(startDate, 1),
    },
  };
  const sort = { start_date_local: 1 };
  // hlpr.consLog(['getWeekOfActivities', stravaId, startDate, query, sort]);
  try {
    const week = await Activities.find(query).sort(sort).exec();
    data = week;
  } catch (err) {
    err => (['Error']);
  }
  return data;
};

const metricsTypes = ['tss', 'ss', 'dst', 'time', 'elev', 'cal', 'kj'];

const metricToField = {
  tss: 'tssScore',
  ss: 'suffer_score',
  dst: 'distance',
  time: 'moving_time',
  elev: 'total_elevation_gain',
  cal: 'calories',
  kj: 'kilojoules',
};

class OneMetric {
  constructor(day = 0, total = 0) {
    this.day = day;
    this.total = total;
  }
}

class OneDay {
  constructor(date = '', day = '') {
    this.date = date;
    this.day = day;
    this.names = [];
  }
}

// date is the date in string "2017-05-02" format
function dayObjBuilder(date, datePref) {
  const resDay = new OneDay(hlpr.lib.dateFormat(date, datePref), date.slice(-2));
  metricsTypes.forEach(mType => resDay[mType] = new OneMetric());
  return resDay;
}

// localhost:3080/apiv1/activities/weekly-stats/100 (returns -40 weeks)
// localhost:3080/apiv1/activities/weekly-stats (no number returns current week)
function weeklyStats(week, activities, datePref) {
  // make simple weekly totals object track totals.
  const weeklyTotals = dayObjBuilder(week, datePref);
  // const weekArr = ["2017-05-01", "2017-05-02", "2017-05-03", "2017-05-04"..."];
  const weekArr = hlpr.lib.weekArray(week);
  const dayTotals = weekArr.map(day => dayObjBuilder(day, datePref));
  // go through each day and add activities.

  for (let i = 0; i < weekArr.length; i++) {
    if (weekArr[i] <= format(new Date(), 'YYYY-MM-DD')) {
      metricsTypes.forEach((mT) => {
        dayTotals[i][mT].total = weeklyTotals[mT].day;
      });
    }

    activities.forEach((act) => {
      if (weekArr[i] === act.start_date_local.slice(0, 10)) {
        dayTotals[i].names.push({ name: act.name, activityId: act.activityId });
        metricsTypes.forEach((mT) => {
          dayTotals[i][mT].day += isNaN(act[metricToField[mT]]) ? 0 : act[metricToField[mT]];
        });

        weeklyTotals.names.push({ name: act.name, activityId: act.activityId });
        metricsTypes.forEach((mT) => {
          weeklyTotals[mT].day += isNaN(act[metricToField[mT]]) ? 0 : act[metricToField[mT]];
        });
      }
    });
  }

  metricsTypes.forEach((mT) => {
    weeklyTotals[mT].total = weeklyTotals[mT].day;
  });
  return { weeklyTotals, dayTotals };
}

exports.getWeeklyStats = async (req, res) => {
  // setup date for users local time
  const d = new Date();
  const userLocalTime = getTime(d) + req.user.userGeoTzRawOffset + req.user.userGeoTzRawOffset;
  // 0 === get this week, weeksPast are weeks from this week, they also match array index in redux.
  const weeksPast = req.params.weeksPast * 1 || 0;
  const startDate = format(subWeeks(startOfWeek(userLocalTime, { weekStartsOn: 1 }), weeksPast), 'YYYY-MM-DD');
  const result = {
    index: weeksPast,
    startDate,
    serverMessage: req.serverMessage,
  };
  console.log('getWeeklyStats', startDate);
  try {
    result.week = await getOneWeek(startDate, req.user.stravaId);
    result.stats = await weeklyStats(startDate, result.week, req.user.date_preference);
  } catch (error) {
    hlpr.logOutArgs(`${logObj.file}.getWeeklyStats error`, logObj.logType, 'error', 3, error, req.originalUrl, `Error ${error}`, req.user.stravaId);
  }
  hlpr.logOutArgs(`${logObj.file}.getWeeklyStats info`, logObj.logType, 'info', 9, null, req.originalUrl, 'Sending result', req.user.stravaId);
  res.send(result);
};

/**
* TODO setup activity refresh front end
* This only modifies user changable attributes like activity name and gear
* Does not update stats, allowing it to return faster
*/
exports.refreshActivity = (req, res) => {

  const q = {
    activityId: req.params.id * 1,
    'athlete.id': req.user.stravaId,
  };
  hlpr.logOutArgs(`${logObj.file}.refreshActivity info`, logObj.logType, 'info', 9, null, req.originalUrl, `Refresh Activity activityid: ${q.activityId}, athlete: ${q.athlete}`, req.user.stravaId);

  strava.activities.get({ id: q.activityId, access_token: req.user.access_token }, (err, data) => {
    if (data && data.message === 'Authorization Error' || err) {
      return auth.handleRefresh(exports.refreshActivity, req, res);
    }
    if (!data) {
      hlpr.logOutArgs(`${logObj.file}.refreshActivity strava.activities.get 404`, logObj.logType, 'error', 5, err, req.originalUrl, `Refresh Activity activityid: ${q.activityId}, athlete: ${q.athlete}`, req.user.stravaId);
      return res.status(404).send({ error: true, message: 'Activity not found on Strava' });
    }
    Activities.findOneAndUpdate(q, data, { new: true }, (err, activity) => {
      hlpr.consLog([activity]);
      if (err || !activity) {
        hlpr.logOutArgs(`${logObj.file}.refreshActivity Activities.findOneAndUpdate err`, logObj.logType, 'error', 5, err, req.originalUrl, `Refresh Activity activityid: ${q.activityId}, athlete: ${q.athlete}`, req.user.stravaId);
        return res.status(404).send({ error: true, message: 'Activity not found' });
      }
      hlpr.logOutArgs(`${logObj.file}.refreshActivity Activities.findOneAndUpdate info`, logObj.logType, 'info', 9, err, req.originalUrl, `Refresh Activity activityid: ${q.activityId}, athlete: ${q.athlete}`, req.user.stravaId);
      return res.send([activity]);
    });
  });
};

// TODO setup activity reset front end
// activities set to "2" are not returned from the DB to the user
// They are "fresh", this sets existing "3"s back to "2", then we
// update the activity with the latest info, unless it has been deleted
// from strava, then it never gets updated. At that point, we should
// set the status to "4" so it is not returned but also not cheked.
exports.resetActivity = (req, res) => {
  const query = {
    activityId: req.body.activityId,
    'athlete.id': req.user.stravaId,
  };
  const data = {
    $set: { resource_state: 2 },
  };
  Activities.findOneAndUpdate(query, data, { new: true }, (err, activity) => {
    hlpr.consLog([query, activity]);
    if (err || !activity) {
      hlpr.logOutArgs(`${logObj.file}.refreshActivity Activities.findOneAndUpdate err`, logObj.logType, 'error', 5, err, req.originalUrl, `Refresh Activity activityid: ${q.activityId}, athlete: ${q.athlete}`, req.user.stravaId);
      res.status(404).send({ resetActivity: 'Activity not found' });
    }
    res.send({ activityId: activity.activityId, resetActivity: activity.resource_state });
  });
};

/**
Expects the following:
input = {
  activityId: req.body.activityId,
  'athlete.id': req.user.stravaId,
};
*/

exports.removeActivity = (input, output) => {
  Activities.deleteOne(input, (err) => {
    if (err) {
      hlpr.logOutArgs(`${logObj.file}.removeActivity err`, logObj.logType, 'error', 5, err, 'no_page', `Remove Activity activityid: ${JSON.stringify(input)}`);
      return output({
        status: 400,
        message: {
          type: 'MESSAGE_FOR_USER', payload: 'Activity not found or not removed',
        },
      });
    }
    hlpr.logOutArgs(`${logObj.file}.removeActivity info`, logObj.logType, 'info', 9, err, 'no_page', `Remove Activity activityid: ${JSON.stringify(input)}`);
    return output({
      status: 200,
      message: [{ activityId: input.activityId, deleted: true }],
    });
  });
};

exports.deleteActivity = (req, res) => {
  const q = {
    activityId: req.body.activityId,
    'athlete.id': req.user.stravaId,
  };
  exports.removeActivity(q, (ready) => {
    res.status(ready.status).send(ready.message);
  });
};

exports.resourceState = async (input) => {
  let result;
  const aggQuery = [
    { $match: { 'athlete.id': input } },
    { $group: {
      _id: { $concat: ['state', { $substr: ['$resource_state', 0, 1] }] },
      count: { $sum: 1 },
    } },
  ];
  try {
    result = await Activities.aggregate(aggQuery);
  } catch (err) {
    hlpr.logOutArgs(`${logObj.file}.resourceState err`, logObj.logType, 'err', 4, err, 'no_page', err, input);
    return { err };
  }
  const output = result.reduce((acc, tRE) => {
    acc[tRE._id] = tRE.count; // eslint-disable-line
    return acc;
  }, {});
  return { stravaId: input, activStatus: output };
};

/**
processingStatus return
resource_state: 2 is a lightweight activity, can be downloaded 200 at a time.
resource_state: 3 is a full activity, can only be downloaded one at a time.
{
    "stravaId": 12345,
    "activStatus": {
        "state3": 426,
        "state2": 1
    }
}
*/
exports.processingStatus = async (req, res) => {
  const user = req.user.stravaId;
  let result;
  try {
    result = await exports.resourceState(user);
  } catch (err) {
    return res.status(500).send({ error: 'failed request' });
  }
  return res.send(result);
};

// exports.activityStatus = ()
// exports.resourceState(req.user.stravaId)
// socketSrvr.ifConnected(req.user.stravaId, 'ACTIVITY_STATUS', { drawer: true });



exports.processingStatusAllSockets = async () => {
  try {
    const users = await User.find({}, { _id: 0, stravaId: 1 });
    users.map(async (user) => {
      const oneStatus = await exports.resourceState(user.stravaId);
      if (oneStatus.activStatus && oneStatus.activStatus.state2) {
        console.log('processingStatusAllSockets', oneStatus.activStatus)
        socketSrvr.ifConnected(user.stravaId, 'ACTIVITY_STATUS', oneStatus);
      }
    });
  } catch (err) {
    hlpr.logOutArgs(`${logObj.file}.processingStatusAllSockets err`, 'sockets', 'error', 5, err, 'no_page', 'ACTIVITY_STATUS', null);
  }
  return null;
};

// localhost:3080/apiv1/admin/activities/processing-status/12345
exports.processingStatusOneSocket = async (stravaId) => {
  try {
    const oneStatus = await exports.resourceState(stravaId);
    console.log('processingStatusOneSocket', oneStatus)
    socketSrvr.ifConnected(stravaId, 'ACTIVITY_STATUS', oneStatus);
  } catch (err) {
    hlpr.logOutArgs(`${logObj.file}.processingStatusOneSocket err`, 'sockets', 'error', 5, err, 'no_page', 'ACTIVITY_STATUS', stravaId);
  }
};

// TODO work this into query
// make a trie function for stopwords,
// load the array on startup into a trie for faster resolution,
// then check words against that
const queryVar = (str) => {
  const q = str.replace(/\r\n/g, '').replace(/^\s+|\s+$/, '').replace(/[^a-z\s]+/gi, '').replace(/\s+$/, '');

  const parts = q.split(/\s/);
  const terms = [];
  parts.forEach((part) => {
    if (stopwords.indexOf(part) === -1) {
      terms.push(part);
    }
  });
  const query = { $and: [] };
  terms.forEach((term) => {
    const queryFrag = { title: { $regex: term, $options: 'i' } };
    query.$and.push(queryFrag);
  });
  return query;
};
// also consider using $or operator and then ranking the return
// for instance a search useing $or: "rockwell relay race"
// would return all results that contain any of those words
// if we can average the results and then sort based on rank...
// const partsMap = parts.map(part => $cond: [{ $eq: [$field, part] }, 1, 0] )
// const $project: {
  // result: {
    // $add: partsMap(parts),
  // },
// }

exports.toggleClubNotice = async (req, res) => {
  let result;
  try {
    result = await User.findOneAndUpdate(
      { stravaId: req.user.stravaId }, { clubNotice: req.body.clubNotice }, { new: true }
    );
  } catch (err) {
    hlpr.logOutArgs(`${logObj.file}.toggleClubNotice err`, logObj.logType, 'error', 5, err, req.originalUrl, 'Something went wrong toggeling the Club Notice', req.user.stravaId);
    return res.status(500).send({ Error: 'Failed to update' });
  }
  hlpr.logOutArgs(`${logObj.file}.toggleClubNotice info`, logObj.logType, 'info', 9, null, req.originalUrl, 'Club Notice Toggled', req.user.stravaId);
  return res.send({ clubNotice: result.clubNotice });
};
// No longer useing this version
// localhost:3080/apiv1/activities/one-week/100 (returns -40 weeks)
// localhost:3080/apiv1/activities/one-week (no number returns current week)
exports.getWeekOfActivities = (req, res) => {
  const weeksPast = req.params.weeksPast * 1 || 0;
  const startDate = req.params.startDate || format(subWeeks(startOfWeek(new Date(), { weekStartsOn: 1 }), weeksPast), 'YYYY-MM-DD');
  const query = {
    'athlete.id': req.user.stravaId,
    resource_state: 3,
    start_date_local: {
      $gt: startDate,
      $lt: weeksForward(startDate, 1),
    },
  };
  const sort = { start_date_local: 1 };

  Activities.find(query).sort(sort).exec((err, week) => {
    if (err) res.send({ [weeksPast]: [{ error: 'no data' }] });
    res.send({ [startDate]: week });
  });
};

// using for in instead of forEach
// for (const item in q) {
//   const itemArr = item.split('-');
//   if (qsValue[itemArr[0]] && sortOptions[itemArr[1]]) {
//     query.search.push({ [sortOptions[itemArr[1]]]: { [qsValue[itemArr[0]]]: q[item] } })
//   }
// }
