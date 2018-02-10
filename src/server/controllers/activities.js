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
const auth = require('./authentication');
const User = require('../models/user');
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
  stravaId: null,
  logType: 'activity',
  level: 3, // 1 = high, 2 = med, 3 = low
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

  if (input.arrLength === 0) {
    hlpr.consLog(['strava.getAllActivities arrLength === 0']);
    return result(input);
  }
  strava.athlete.listActivities(options, (err, acts) => {
    if (err) {
      hlpr.consLog(['strava.getAllActivities err', err]);
      return err;
    }
    if (!input.cronjob && acts.message === 'Authorization Error') {
      hlpr.consLog(['getAllActivities Authorization Error', input.user.stravaId, input.cronjob]);
      auth.stravaSignOut(input, result);
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
    return done([]);
  }
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
    hlpr.consLog(['getStreams rateLimit', rateLimit]);
    if (err || !_.isArray(streams)) {
      hlpr.logOut(Object.assign(logObj, {
        level: 2,
        error: err,
        message: `Controllers/Activity: getStreams err for ${activityId}`,
      }));
      return done([]);
    }
    const newStreams = Object.assign({}, { streams }, { activityId });
    ActivityStreams.findOrCreate({ activityId }, newStreams, (err, streamDB) => {
      hlpr.consLog(['streams', activityId, streams.map(s => s.type)]);
      return done(streamDB.streams);
    });
  });
};

/**
* getStreamTimeAverages returns the average times for X seconds
*/
const getStreamTimeAverages = (streamsArr, done) => {
  const streamTime = [];
  if (!streamsArr || !streamsArr.length) {
    return done([]);
  }
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
};

const getListZones = (activityId, accessToken, done) => {
  if (!activityId || !accessToken) {
    return done([]);
  }
  strava.activities.listZones({ id: activityId, access_token: accessToken }, (err, listZonesArr, rateLimit) => {
    hlpr.consLog(['getListZones rateLimit', rateLimit]);
    if (err) {
      hlpr.logOut(Object.assign(logObj, {
        level: 1,
        error: err,
        message: `Controllers/Activity: getListZones err for ${activityId}`,
      }));
      return done([]);
    }
    return done(listZonesArr);
  });
};

const findActivityAndUpdate = (activityId, data, options, done) => {
  Activities.findOneAndUpdate({ activityId }, data, options, (err, fullActivity) => {
    if (err) {
      hlpr.logOut(Object.assign(logObj, {
        level: 2,
        error: err,
        message: `Controllers/Activity: findActivityAndUpdate err for ${activityId}`,
      }));
      return done([]);
    }
    if (!fullActivity) {
      hlpr.logOut(Object.assign(logObj, {
        level: 1,
        error: err,
        message: `Controllers/Activity: findActivityAndUpdate !fullActivity for ${activityId}`,
      }));
      return done(fullActivity);
    }
    hlpr.consLog(['findActivityAndUpdate return', fullActivity.activityId]);
    return done(fullActivity);
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
const getActivityDetails = (activity, opts, cb) => {
  const perfLabel = `getActivityDetails${activity.activityId}`;
  hlpr.perfNowStart(perfLabel);
  strava.activities.get({ id: activity.activityId, access_token: opts.access_token }, (err, data, rateLimit) => {
    hlpr.consLog(['getActivityDetails rateLimit', rateLimit]);
    if (err || !data) {
      if (err) {
        hlpr.logOut(Object.assign(logObj, {
          level: 1,
          error: err,
          message: `Controllers/Activity: getActivityDetails failedUpdate for ${activity.activityId}`,
        }));
        findActivityAndUpdate(activity.activityId, { failedUpdate: true }, opts, (fullActivity) => {
          return cb(fullActivity);
        });
      }
    }
    const polyline = data.map && (data.map.summary_polyline || data.map.polyline);
    enhancePolylineLocation(polyline, true, (geoData) => {
      getStreams(activity.activityId, opts.access_token, (strmArr) => {
        getStreamTimeAverages(strmArr, (strmTmArr) => {
          const enhancedData = Object.assign(
            {},
            data,
            geoData,
            { streamData: !!strmArr.length },
            { streamTime: strmTmArr },
            { currentSchema: currentVersion } //eslint-disable-line
          );

          if (opts.user.premium) {
            getListZones(activity.activityId, opts.access_token, (listZonesArr) => {
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
              hlpr.consLog(['getActivityDetails pushActivities listZones premium', enhancedData.id, enhancedData.resource_state, enhancedData.tssScore]);

              findActivityAndUpdate(enhancedData.id, enhancedData, opts, fullActivity => cb(fullActivity));
            });
          } else {
            hlpr.consLog(['getActivityDetails pushActivities listZones not premium', enhancedData.id, enhancedData.resource_state, enhancedData.tssScore]);

            findActivityAndUpdate(enhancedData.id, enhancedData, opts, fullActivity => cb(fullActivity));
          }
          hlpr.perfNowEnd(perfLabel);
        });
      });
    });
  });
};

exports.getRecentActivities = (req, res) => {
  const perfLabel = `getRecentActivities${req.user.stravaId}`;
  hlpr.perfNowStart(perfLabel);
  const options = {
    id: req.user.stravaId,
    access_token: req.user.access_token,
    per_page: req.perPage || 21,
    page: req.pageCount,
    user: req.user,
  };

  strava.athlete.listActivities(options, (err, acts) => {
    if (acts.message === 'Authorization Error') {
      hlpr.consLog(['listActivities Authorization Error', req.user.stravaId]);
      return auth.stravaSignOut(req, res);
    }
    const counter = [];
    acts.forEach((act, index) => {
      Activities.findOrCreate({ activityId: act.id }, act, (err, dbActivity, created) => {
        if (err) return { error: err };
        if (!created) {
          counter.push(dbActivity.activityId);
          if (counter.length === acts.length) {
            hlpr.perfNowEnd(perfLabel);
            exports.getWeeklyStats(req, res);
          }
        } else {
          getActivityDetails(dbActivity, options, (done) => {
            counter.push(done.activityId);
            if (counter.length === acts.length) {
              hlpr.perfNowEnd(perfLabel);
              exports.getWeeklyStats(req, res);
            }
          });
        }
      });
    });
  });
};

/**
*
*  This function runs every three minutes to process 22 activities to ensure
*  the daily rate never exceeds 30000 requests, works out to under 300 requests
*  per day. Use ACTIVITY_UPDATE_INTERVAL to adjust.
*
*  It seraches for resource_state: 2 (indexed) then pulls more detailed Strava data
*  and Zone info.
*
*  The activityStreamsCache is cleared every X minutes of ACTIVITY_STREAM_CACHE
*  the default is two weeks or 20160 minutes
*/
const minutes = process.env.ACTIVITY_UPDATE_INTERVAL * 1 || 3; // 3 min failsafe
const theInterval = min => min * 60 * 1000;

exports.getExtendedActivityStats = () => {
  const newDate = new Date();
  const activityStreamsCache = process.env.ACTIVITY_STREAM_CACHE * 1 || 20160;  // miuntes
  const backDate = new Date(newDate.getTime() - theInterval(activityStreamsCache));
  hlpr.consLog([`>>>>>>>>>>>>>>>>>>>>>>>> getExtendedActivityStats ${minutes} ${newDate}`]);
  const cacheQuery = { updatedAt: { $lt: backDate } };
  ActivityStreams.find(cacheQuery).remove().exec((err, removed) => {
    if (removed.n) {
      hlpr.logOut(Object.assign(logObj, {
        level: 4,
        error: err,
        message: `Controllers/Activity: activityStreamsCache removed ${removed.n}`,
      }));
    }
  });

  const limitCount = 22;
  const toUpdate = {
    $and: [
      { authorizationError: { $ne: true } },
      { $or: [
        { resource_state: 2 },
        { currentSchema: { $lt: process.env.CURRENT_SCHEMA * 1 } },
        { currentSchema: { $exists: false } },
      ] },
    ],
  };

  Activities.find(toUpdate).limit(limitCount).sort({ start_date: -1 }).exec((err, activities) => {
    if (err) {
      hlpr.consLog(['getExtendedActivityStats err activities', err]);
      return err;
    }
    activities.forEach((dbActivity) => {
      hlpr.consLog(['getExtendedActivityStats activityId - currentSchema', dbActivity.activityId, dbActivity.currentSchema]);
      User.findOne({ stravaId: dbActivity.athlete.id }, { access_token: 1, premium: 1, ftpHistory: 1, stravaId: 1, _id: 0 }, (err, user) => {
        if (user && !err) {
          hlpr.consLog([]);
          hlpr.logOut(Object.assign(logObj, {
            level: 5,
            error: err,
            message: `getExtendedActivityStats token dbActivity.athlete.id ${dbActivity.athlete.id}, id: ${user.stravaId}, access_token: ${user.access_token}`,
          }));
          const options = {
            id: user.stravaId,
            access_token: user.access_token,
            user: user,
            cronjob: true,
          };
          getActivityDetails(dbActivity, options, done => done);
        } else {
          Activities.findOneAndUpdate({ activityId: dbActivity.activityId }, { authorizationError: true }, { new: true }, (err, authError) => {
            hlpr.logOut(Object.assign(logObj, {
              level: 1,
              error: err,
              message: `Controllers/Activity: getExtendedActivityStats No User ${authError.activityId}`,
            }));
          });
        }
      });
    });
  });
};

const runOnStartup = () => {
  exports.getExtendedActivityStats();
};
runOnStartup();

const runGetExtendedActivityStats = setInterval(() => {  // eslint-disable-line
  exports.getExtendedActivityStats();
}, theInterval(minutes));

/**
* db maintenace
*/
const updateDB = () => {
  console.log('updateDB', new Date());
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
        console.log(' dbActivity.streams.length noStream', activityId, noStream.currentSchema);
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
  };
  try {
    result.week = await getOneWeek(startDate, req.user.stravaId);
    result.stats = await weeklyStats(startDate, result.week, req.user.date_preference);
  } catch (error) {
    hlpr.consLog(['getWeeklyStats error', error]);
  }
  hlpr.consLog(['getWeeklyStats sending result']);
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
  hlpr.consLog(['refreshActivity', q.activityId, q.athlete]);

  strava.activities.get({ id: q.activityId, access_token: req.user.access_token }, (err, data) => {
    if (err || !data) {
      hlpr.consLog(['getActivityDetails strava.activities.get', err]);
      return res.status(404).send({ error: true, message: 'Activity not found on Strava' });
    }
    hlpr.consLog(['refreshActivity', data]);
    Activities.findOneAndUpdate(q, data, { new: true }, (err, activity) => {
      hlpr.consLog([activity]);
      if (err || !activity) {
        hlpr.consLog(['refreshActivity err', err]);
        return res.status(404).send({ error: true, message: 'Activity not found' });
      }
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
      hlpr.consLog(['favEvent err', err]);
      res.status(404).send({ resetActivity: 'Activity not found' });
    }
    res.send({ activityId: activity.activityId, resetActivity: activity.resource_state });
  });
};

exports.deleteActivity = (req, res) => {
  const query = {
    activityId: req.body.activityId,
    'athlete.id': req.user.stravaId,
  };
  Activities.remove(query, (err) => {
    hlpr.consLog(['remove', query]);
    if (err) {
      hlpr.consLog(['favEvent err', err]);
      res.status(404).send({ type: 'MESSAGE_FOR_USER', payload: 'Activity not found or not removed' });
    }
    res.send([{ activityId: query.activityId, deleted: true }]);
  });
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


/**
* Search Activities: ----------------------------------------------------------
* -----------------------------------------------------------------------------
*/

/**
* No query string returns all
* localhost:3080/apiv1/activities/search-activities
* adding various options*
* localhost:3080/apiv1/activities/search-activities?textsearch=ange&filter_trainer=1&wildcard=true&sortBy=maxHR-des
*/
exports.searchActivities = async (req, res) => {
  const aggregate = [];
  const qString = url.parse(req.url).query;
  const q = qs.parse(req.query);
  let sortObj;

  const srchOpts = {
    textsearch: q.textsearch || '',
    limit: q.limit * 1 || 12,
    page: q.page * 1 || 1,
    wildcard: q.wildcard || '',
  };

  /**
  * To add a new sort option, add the query field as the key
  * and the db field as the property to 'sortOptions'
  * Then add the query field as the value and nice display name to
  * 'sortStrings' array
  * sortStrings array is sent to the client for the Filter Select population
  * durring Select population client side, '-asc' and '-des' are added to the
  * values.
  *
  * Also used for filter range but adds '-max' and '-min' on the client.
  */
  const sortOptions = {
    date: 'start_date_local',
    distance: 'distance',
    movingTime: 'moving_time',
    elevation: 'total_elevation_gain',
    ftp: 'ftp',
    tssScore: 'tssScore',
    sufferScore: 'suffer_score',
    kilojoules: 'kilojoules',
    calories: 'calories',
    averageHeartrate: 'average_heartrate',
    averageWatts: 'average_watts',
    weightedAverageWatts: 'weighted_average_watts',
    maxSpeed: 'max_speed',
    maxHeartrate: 'max_heartrate',
    maxWatts: 'max_watts',
  };

  const sortStrings = [
    { value: 'date', option: 'Date' },
    { value: 'distance', option: 'Distance' },
    { value: 'movingTime', option: 'Moving Time' },
    { value: 'elevation', option: 'Total Ascent' },
    { value: 'ftp', option: 'FTP' },
    { value: 'tssScore', option: 'TSS Score' },
    { value: 'sufferScore', option: 'Suffer Score' },
    { value: 'kilojoules', option: 'Kilojoules' },
    { value: 'calories', option: 'Calories' },
    { value: 'averageHeartrate', option: 'Average Heartrate' },
    { value: 'averageWatts', option: 'Average Watts' },
    { value: 'weightedAverageWatts', option: 'Weighted Average Watts' },
    { value: 'maxSpeed', option: 'Max Speed' },
    { value: 'maxHeartrate', option: 'Max Heartrate' },
    { value: 'maxWatts', option: 'Max Watts' },
  ];

  /**
  * Initial query for athlete and fully formed activites.
  * With no other options, returns all activites for athlete.
  */
  const query = {
    search: [{ 'athlete.id': req.user.stravaId }, { resource_state: 3 }],
  };

  let geoData;

  // localhost:3080/apiv1/activities/search-activities?lng=-122.1439698&lon=37.426941
  if (q.lng && q.lat) {
    const coords = [q.lng * 1, q.lat * 1];
    console.log('coords', coords);
    const maxDist = q.maxDist * 1 || 321869; // 200 miles
    geoData = {
      $geoNear: {
        near: {
          type: 'Point',
          coordinates: coords },
        distanceField: 'distance',
        maxDistance: maxDist, // 200 miles in meters
        spherical: true,
      },
    };
  } else {
    // Default sort
    sortObj = { start_date_local: -1 };
  }

  /**
  * qsValues is a lookup to convert submitted strings to usable values
  */
  const qsValue = {
    des: -1,
    asc: 1,
    true: true,
    false: false,
    max: '$lt',
    min: '$gt',
  };

  /**
  * Filters  ------------------------------------------------------------------
  */

  /**
  * filterIEE (Inclusive, Exclusive, Excluded) options
  * undefined is Inclusive
  * true is Exclusive
  * false is Excluded
  * filterIEE sent to client
  */
  const filterIEE = [
    { contentName: 'commute', contentLabel: 'Commute', value: q.filter_commute || '' },
    { contentName: 'trainer', contentLabel: 'Trainer', value: q.filter_trainer || '' },
  ];

  filterIEE.forEach((fIEE) => {
    switch (fIEE.value) {
      case '1':
        query.search.push({ [fIEE.contentName]: true });
        break;
      case '2':
        query.search.push({ [fIEE.contentName]: false });
        break;
      default:
    }
  });

  /**
  * TODO filterRange ( $gt x, $lt y filters)
  *
  * Uses sortOptions for matches and client side field lables and values
  * Walks through whole 'q' and looks for matches with min or max and sortOptions
  * Adds to search.query array
  * Date is special because it's not a number.
  * Client side we will need to use the proper metric/imperial and date input
  *
  * url string: min-tssScore=100&max-tssScore=120&min-date=2017-05-03T16:17:31Z&max-date=2017-06-01
  */

  // form 'value'-min' 'value'-max
  Object.keys(q).forEach((item) => {
    const itemArr = item.split('-');

    if (qsValue[itemArr[0]] && sortOptions[itemArr[1]]) {
      if (itemArr[1] === 'date') {
        const tmpDate = format(q[item], 'YYYY-MM-DD');
        hlpr.consLog(['>>>', { [sortOptions[itemArr[1]]]: { [qsValue[itemArr[0]]]: tmpDate } }]);
        query.search.push({ [sortOptions[itemArr[1]]]: { [qsValue[itemArr[0]]]: tmpDate } });
      } else {
        hlpr.consLog(['>>>', { [sortOptions[itemArr[1]]]: { [qsValue[itemArr[0]]]: q[item] } }]);
        query.search.push({ [sortOptions[itemArr[1]]]: { [qsValue[itemArr[0]]]: q[item] * 1 } });
      }
    }
  });

  /**
  * This builds a $group object based on sortStrings
  * Used for both activCalcAll and activCalcFilter
  */
  const aggregateGroup = sortStrings.reduce((acc, sS) => {
    if (sS.value !== 'date') {
      acc[`${sS.value}Avg`] = { $avg: `$${sortOptions[sS.value]}` };
      acc[`${sS.value}Sum`] = { $sum: `$${sortOptions[sS.value]}` };
    }
    acc[`${sS.value}Max`] = { $max: `$${sortOptions[sS.value]}` };
    acc[`${sS.value}Min`] = { $min: `$${sortOptions[sS.value]}` };
    return acc;
  }, {
    _id: '$athlete.id',
    count: { $sum: 1 },
  });

  /**
  * Sorts --------------------------------------------------------------------
  *
  * query value will be like: 'sort=movingTime-des'
  * slit this and check they match the qsValue and sortOptions objects
  * if they don't they are ignored and defaults to $sort: { date: -1 }
  */
  if (q.sortBy) {
    const tmpSrt = q.sortBy.split('-');
    if (qsValue[tmpSrt[1]] && sortOptions[tmpSrt[0]]) {
      sortObj = { [sortOptions[tmpSrt[0]]]: qsValue[tmpSrt[1]] };
    }
  }

  /**
  * Text or Fuzzy search
  * wildcard: true uses regex, else text index
  *  fast but returns stemmed words, will not return partial matches
  *  also works with -not words
  */
  if (srchOpts.wildcard && srchOpts.textsearch) {
    srchOpts.textsearch.split(' ').forEach((tSrch) => {
      query.search.push({ name: { $regex: tSrch, $options: 'i' } });
    });
  } else if (srchOpts.textsearch) {
    query.search.push({ $text: { $search: srchOpts.textsearch } });
  }
  /*
  * aggregateArr works because of 'by reference'
  * Adding to the pipline in the right position and then going on to build the
  * rest of the sort and limit.
  */
  const aggregateArr = [];

  const activitySearchArr = [
    // { $unwind: '$results' },
    { $group: { _id: null, arr: { $push: '$activityId' } } },
    { $project: { _id: 0, arr: 1 } },
  ];
  if (geoData) {
    console.log('geoData', geoData);
    aggregate.push(geoData);
  }
  aggregate.push({ $match: { $and: query.search } });

  aggregate.push({ $facet: {
    activCalcFilter: [{ $group: aggregateGroup }],
    results: aggregateArr,
    activitySearch: activitySearchArr,
  } });
  if (sortObj) {
    aggregateArr.push({ $sort: sortObj });
  }

  if (srchOpts.page > 1) {
    aggregateArr.push({ $skip: (srchOpts.page * srchOpts.limit) - srchOpts.limit });
  }

  aggregateArr.push({ $limit: srchOpts.limit });

  activitySearchArr.unshift(...aggregateArr);


  /**
  * CSV projection
  */
  if (q.csv) {
    aggregateArr.push({ $project: {
      _id: 0,
      name: 1,
      description: 1,
      type: 1,
      workout_type: 1,
      distance: 1,
      moving_time: 1,
      elapsed_time: 1,
      average_speed: 1,
      max_speed: 1,
      average_cadence: 1,
      max_cadence: 1,
      average_heartrate: 1,
      max_heartrate: 1,
      has_heartrate: 1,
      suffer_score: 1,
      calories: 1,
      device_watts: 1,
      ftp: 1,
      tssScore: 1,
      average_watts: 1,
      max_watts: 1,
      weighted_average_watts: 1,
      kilojoules: 1,
      elev_high: 1,
      elev_low: 1,
      total_elevation_gain: 1,
      start_date: 1,
      start_date_local: 1,
      timezone: 1,
      start_lat: '$start_latlng[0]',
      start_lon: '$start_latlng[1]',
      end_lat: '$end_latlng[0]',
      end_lon: '$end_latlng[1]',
      average_temp: 1,
      max_temp: 1,
      gearname: '$gear.name',
      achievement_count: 1,
      activityId: 1,
      trainer: 1,
      commute: 1,
      manual: 1,
      private: 1,
      flagged: 1,
    } });
  }

  // console.log(activitySearchArr);
  hlpr.consLog(['srchOpts', srchOpts, 'qString', qString]);
  const aggregateMax = [
    { $match: { $and: [{ 'athlete.id': req.user.stravaId }, { resource_state: 3 }] } },
    { $group: aggregateGroup },
  ];
  console.log('aggregate', aggregate);
  let aggResult;
  let activCalcAll;
  let activitySearch;
  try {
    aggResult = await Activities.aggregate(aggregate);
    activCalcAll = await Activities.aggregate(aggregateMax);
    activitySearch = aggResult[0].activitySearch[0] && aggResult[0].activitySearch[0].arr;
  } catch (err) {
    hlpr.consLog(['searchActivities', err]);
    return res.status(500).send({ Error: 'Failed to Search Activities' });
  }
  if (q.csv) {
    const filename = 'activity-data.csv';
    res.setHeader('Content-disposition', `attachment; filename=${filename}`);
    res.setHeader('content-type', 'text/csv');
    csv.writeToString(aggResult[0].results, {
      headers: true,
      objectMode: true,
    }, (err, resultCsv) => {
      if (err) return console.log(err);
      res.send(resultCsv);
    });
  } else {
    // const activitySearch = result.map(r => r.activityId);
    res.send({
      q,
      searchQuery: query,
      activCalcAll: activCalcAll[0],
      activCalcFilter: aggResult[0].activCalcFilter[0],
      query: qString,
      sortStrings,
      filterIEE,
      activitySearch,
      activities: aggResult[0].results,
    });
  }
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

/**
* Fitness
*
* Fitness / critical training load - exp average TSS for 42 days
* Fatigue / ATL (Acute Training Load) - exp average TSS for 7 days
* Form - difference between the two
*
* localhost:3080/apiv1/activities/fitness-today
*
* Returns one days worth of stats:

  fitnessToday.daysArr.daysAggr.days: [
    {
        "ss": 129,
        "dst": 41255.8,
        "time": 8667,
        "elev": 988,
        "cal": 1709.9,
        "kj": 1533.6,
        "tss": 180,
        "date": "2017-12-30",
        "names": [
            {
                "name": "All over Coyote Lake",
                "activityId": 1234567890
            }
        ],
        "count": 1,
        "fitnessTSS": 46.32581869868562,
        "fatigueTSS": 107.21487383531463,
        "fitnessSS": 40.218266586420015,
        "fatigueSS": 82.04940948587117
    },
  ],

*
*/


exports.fitnessToday = async (req, res) => {
  const q = qs.parse(req.query);
  const weeksPast = q.weeksPast * 1 || 0;
  const startDate = q.startDate || req.user.created_at;
  const endDate = q.endDate || format(subWeeks(startOfWeek(new Date(), { weekStartsOn: 1 }), weeksPast), 'YYYY-MM-DD');

  const daysArr = eachDay(startDate, addDays(endDate, 6)).map(d => ({
    count: 0,
    tss: 0,
    ss: 0,
    dst: 0,
    time: 0,
    elev: 0,
    cal: 0,
    kj: 0,
    date: format(d, 'YYYY-MM-DD'),
  }));

  const aggregate = [
    {
      $match: { $and: [
        { 'athlete.id': req.user.stravaId },
        { resource_state: 3 },
        { start_date_local: {
          $gt: daysArr[0].date,
          $lt: daysArr[daysArr.length - 1].date,
        } },
      ] },
    },
    {
      $group: { // combines a days worth of activities
        _id: { $substr: ['$start_date_local', 0, 10] }, // Date from date string
        ss: { $sum: '$suffer_score' },
        dst: { $sum: '$distance' },
        time: { $sum: '$moving_time' },
        elev: { $sum: '$total_elevation_gain' },
        cal: { $sum: '$calories' },
        kj: { $sum: '$kilojoules' },
        tss: { $sum: '$tssScore' },
        names: { $push: { name: '$name', activityId: '$activityId' } },
        count: { $sum: 1 },
      },
    },
    {
      $group: { // builds usable array
        _id: null,
        metricsArr: { $push: {
          ss: '$ss',
          dst: '$dst',
          time: '$time',
          elev: '$elev',
          cal: '$cal',
          kj: '$kj',
          tss: '$tss',
          date: '$_id',
          elapsedTime: '$elapsedTime',
          weightedAverageWatts: '$weightedAverageWatts',
          names: '$names',
          count: '$count',
        } },
      },
    },
    {
      $project: { // combines activity days array and empty days
        fitnessMap: {
          $map: {
            input: daysArr,
            as: 'sWDay',
            in: {
              $let: {
                vars: {
                  idx: { $indexOfArray: ['$metricsArr.date', '$$sWDay.date'] },
                },
                in: {
                  $cond: [{ $ne: ['$$idx', -1] }, { $arrayElemAt: ['$metricsArr', '$$idx'] }, '$$sWDay'],
                },
              },
            },
          },
        },
      },
    },
    {
      $facet: {
        daysArr: [
          {
            $project: {
              date: '$date',
              daysAggr: {
                $reduce: {
                  input: '$fitnessMap',
                  initialValue: {
                    fitnessTSS: 0,
                    fatigueTSS: 0,
                    fitnessSS: 0,
                    fatigueSS: 0,
                    days: [],
                  },
                  in: {
                    days: {
                      $concatArrays: [
                        '$$value.days',
                        [{ $mergeObjects: [
                          '$$this',
                          { fitnessTSS: {
                            $add: [
                              '$$value.fitnessTSS',
                              {
                                $divide: [
                                  {
                                    $subtract: [
                                      '$$this.tss',
                                      '$$value.fitnessTSS',
                                    ],
                                  },
                                  42,
                                ],
                              },
                            ],
                          } },
                          { fatigueTSS: {
                            $add: [
                              '$$value.fatigueTSS',
                              {
                                $divide: [
                                  {
                                    $subtract: [
                                      '$$this.tss',
                                      '$$value.fatigueTSS',
                                    ],
                                  },
                                  7,
                                ],
                              },
                            ],
                          } },
                          { fitnessSS: {
                            $add: [
                              '$$value.fitnessSS',
                              {
                                $divide: [
                                  {
                                    $subtract: [
                                      '$$this.ss',
                                      '$$value.fitnessSS',
                                    ],
                                  },
                                  42,
                                ],
                              },
                            ],
                          } },
                          { fatigueSS: {
                            $add: [
                              '$$value.fatigueSS',
                              {
                                $divide: [
                                  {
                                    $subtract: [
                                      '$$this.ss',
                                      '$$value.fatigueSS',
                                    ],
                                  },
                                  7,
                                ],
                              },
                            ],
                          } },
                        ] }],
                      ],
                    },
                    fitnessTSS: {
                      $add: [
                        '$$value.fitnessTSS',
                        {
                          $divide: [
                            {
                              $subtract: [
                                '$$this.tss',
                                '$$value.fitnessTSS',
                              ],
                            },
                            42,
                          ],
                        },
                      ],
                    },
                    fatigueTSS: {
                      $add: [
                        '$$value.fatigueTSS',
                        {
                          $divide: [
                            {
                              $subtract: [
                                '$$this.tss',
                                '$$value.fatigueTSS',
                              ],
                            },
                            7,
                          ],
                        },
                      ],
                    },
                    fitnessSS: {
                      $add: [
                        '$$value.fitnessSS',
                        {
                          $divide: [
                            {
                              $subtract: [
                                '$$this.ss',
                                '$$value.fitnessSS',
                              ],
                            },
                            42,
                          ],
                        },
                      ],
                    },
                    fatigueSS: {
                      $add: [
                        '$$value.fatigueSS',
                        {
                          $divide: [
                            {
                              $subtract: [
                                '$$this.ss',
                                '$$value.fatigueSS',
                              ],
                            },
                            7,
                          ],
                        },
                      ],
                    },
                  },
                },
              },
            },
          },
        ],
      },
    },
  ];

  let result;
  try {
    result = await Activities.aggregate(aggregate);
  } catch (err) {
    hlpr.consLog(['fitnessToday err', err]);
    return res.status(500).send({ Error: 'Failed to get todays fitness' });
  }
  return res.send({ fitnessToday: result });
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
  hlpr.consLog(['getWeekOfActivities', req.user.stravaId, startDate, query, sort]);

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
