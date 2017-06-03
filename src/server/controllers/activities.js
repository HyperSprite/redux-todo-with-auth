const addDays = require('date-fns/add_days');
const format = require('date-fns/format');
const startOfWeek = require('date-fns/start_of_week');
const subWeeks = require('date-fns/sub_weeks');
const getTime = require('date-fns/get_time');
const Activities = require('../models/activities');
const User = require('../models/user');
const strava = require('strava-v3');
const hlpr = require('../lib/helpers');

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
    if (acts.length === 0 || !acts) {
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

const setExtendedActivityStats = (input, act, options, result) => {
  const superReturn = Activities.findOrCreate({ activityId: act.id }, act, (err, dbActivity, created) => {
    // By using findOrCreate here, we are only adding new if they do not yet exist.
    // This can also be useful if an activity is updated in strava and needs to be re-fetched
    if (created) {
      hlpr.consLog(['setExtendedActivityStats findOrCreate created', dbActivity.activityId]);
      strava.activities.get({ id: dbActivity.activityId, access_token: options.access_token }, (err, data) => {
        if (err) hlpr.consLog(['setExtendedActivityStats strava.activities.get', err]);
        if (input.user.premium) {
          strava.activities.listZones({ id: dbActivity.activityId, access_token: options.access_token }, (err, aData) => {
            if (err) hlpr.consLog(['setExtendedActivityStats strava..activities.listZones', err]);
            data.zones = aData;
            if (data.weighted_average_watts) {
              const ftp = input.user.ftpHistory[input.user.ftpHistory.length -1].ftp;
              const wattsOverFTP = data.weighted_average_watts / ftp;
              const wattsByHour = ftp * 3600;
              data.tssScore = Math.round(((data.elapsed_time * data.weighted_average_watts * wattsOverFTP) / wattsByHour) * 100, 2);
            }
            hlpr.consLog(['setExtendedActivityStats pushActivities listZones', , data.id, data.resource_state, data.tssScore]);
            Activities.findOneAndUpdate({ activityId: data.id }, data, options, (err, fullActivity) => {
              if (err) hlpr.consLog(['setExtendedActivityStats strava..activities premium', err]);
              // hlpr.consLog(['strava..activities premium', fullActivity]);
              return fullActivity;
            });
          });
        } else {
          Activities.findOneAndUpdate({ activityId: data.id }, data, options, (err, fullActivity) => {
            if (err) hlpr.consLog(['setExtendedActivityStats strava..activities !premium', err]);
            // hlpr.consLog(['strava..activities !premium', fullActivity]);
            return fullActivity;
          });
        }
      });
    } else {
      hlpr.consLog(['setExtendedActivityStats findOrCreate not created', dbActivity.activityId]);
      return { notUpdated: dbActivity.activityId };
    }
    hlpr.consLog(['superReturn', superReturn]);
    return result(superReturn);
  });
};

exports.getRecentActivities = (req, res) => {
  const options = {
    id: req.user.stravaId,
    access_token: req.user.access_token,
    per_page: req.perPage || 5,
    page: req.pageCount,
    user: req.user,
  };

  function getActivityDetails(activity, opts, index, created, cb) {
    if (!created) return cb(index);
    strava.activities.get({ id: activity.activityId, access_token: opts.access_token }, (err, data) => {
      if (err) hlpr.consLog(['setExtendedActivityStats strava.activities.get', err]);
      if (opts.user.premium) {
        strava.activities.listZones({ id: activity.activityId, access_token: opts.access_token }, (err, aData) => {
          if (err) hlpr.consLog(['setExtendedActivityStats strava..activities.listZones', err]);
          data.zones = aData;
          if (data.weighted_average_watts) {
            const ftp = opts.user.ftpHistory[opts.user.ftpHistory.length -1].ftp;
            const wattsOverFTP = data.weighted_average_watts / ftp;
            const wattsByHour = ftp * 3600;
            data.tssScore = Math.round(((data.elapsed_time * data.weighted_average_watts * wattsOverFTP) / wattsByHour) * 100, 2);
          }
          hlpr.consLog(['setExtendedActivityStats pushActivities listZones', , data.id, data.resource_state, data.tssScore]);
          Activities.findOneAndUpdate({ activityId: data.id }, data, opts, (err, fullActivity) => {
            if (err) hlpr.consLog(['setExtendedActivityStats strava..activities premium', err]);
            hlpr.consLog(['strava..activities premium']);
            if (fullActivity) {
              return cb(index);
            }
            // return cb(fullActivity);
          });
        });
      } else {
        Activities.findOneAndUpdate({ activityId: data.id }, data, opts, (err, fullActivity) => {
          if (err) hlpr.consLog(['setExtendedActivityStats strava..activities !premium', err]);
          hlpr.consLog(['strava..activities !premium']);
          return cb(index);
        });
      }
    });
  }

  strava.athlete.listActivities(options, (err, acts) => {
    const counter = [];
    acts.forEach((act, index) => {
      Activities.findOrCreate({ activityId: act.id }, act, (err, dbActivity, created) => {
        if (err) return { error: err };
        getActivityDetails(dbActivity, options, index, created, (done) => {
          counter.push(done);
          if (counter.length === acts.length) {
            exports.getWeeklyStats(req, res);
          }
        });
      });
    });
  });
};

// This function runs every three minutes to process 40 activities to ensure
// the 600 requests per 15 min rate limit is not exceeded.
// There is no user triger for this.
const minutes = 3;
const theInterval = min => min * 60 * 1000;
const limitCount = 40;

// It seraches for resource_state: 2 (indexed) then pulls more detailed Strava data
// and Zone info.
exports.getExtendedActivityStats = setInterval(() => {
  // hlpr.consLog(['getExtendedActivityStats has run']);
  const options = { new: true };
  Activities.find({ resource_state: 2 }).limit(limitCount).sort({ start_date: -1 }).exec((err, tmpActs) => {
    if (err) {
      hlpr.consLog(['getExtendedActivityStats err tmpActs', err]);
      return err;
    }
    tmpActs.forEach((tmpAct) => {
      hlpr.consLog(['getExtendedActivityStats tmpAct.activityId', tmpAct.activityId]);
      User.findOne({ stravaId: tmpAct.athlete.id}, { access_token: 1, premium: 1, ftpHistory: 1, _id: 0 }, (err, user) => {
        hlpr.consLog(['getExtendedActivityStats token', user]);
        strava.activities.get({ id: tmpAct.activityId, access_token: user.access_token }, (err, data) => {
          if (err) hlpr.consLog(['strava.activities.get', err]);
          const tmpData = data;
          tmpData.activityId = tmpData.id;
          if (user.premium) {
            strava.activities.listZones({ id: tmpAct.activityId, access_token: user.access_token }, (err, aData) => {
              if (err) hlpr.consLog(['strava..activities.listZones', err]);
              tmpData.zones = aData;
              if (tmpData.weighted_average_watts) {
                const ftp = user.ftpHistory[user.ftpHistory.length -1].ftp;
                const wattsOverFTP = data.weighted_average_watts / ftp;
                const wattsByHour = ftp * 3600;
                tmpData.tssScore = Math.round(((data.elapsed_time * data.weighted_average_watts * wattsOverFTP) / wattsByHour) * 100, 2);
              }
              hlpr.consLog(['pushActivities listZones', , tmpData.activityId, tmpData.resource_state, tmpData.tssScore]);
              Activities.findOneAndUpdate({ activityId: tmpData.activityId }, tmpData, options, (err, fullActivity) => {
                if (err) hlpr.consLog(['strava..activities premium', err]);
                hlpr.consLog(['strava..activities premium', fullActivity]);
                return fullActivity;
              });
            });
          } else {
            Activities.findOneAndUpdate({ activityId: tmpData.activityId }, tmpData, options, (err, fullActivity) => {
              if (err) hlpr.consLog(['strava..activities !premium', err]);
              hlpr.consLog(['strava..activities !premium', fullActivity]);
              return fullActivity;
            });
          }
        });
      });
    });
  });
}, theInterval(minutes));

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

function oneWeek(weekStart) {
  const weekEnd = format(addDays(weekStart, 7), 'YYYY-MM-DD');
  return weekEnd;
}

function fourWeek(weekStart) {
  const weekEnd = format(addDays(weekStart, 28), 'YYYY-MM-DD');
  return weekEnd;
}

const getOneWeek = async (startDate, stravaId) => {
  let data = [];
  const query = {
    'athlete.id': stravaId,
    resource_state: 3,
    start_date_local: {
      $gt: startDate,
      $lt: oneWeek(startDate),
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
  const metricsTypes = ['tss', 'ss', 'dst', 'time', 'elev'];
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
      dayTotals[i].tss.total = weeklyTotals.tss.day;
      dayTotals[i].ss.total = weeklyTotals.ss.day;
      dayTotals[i].dst.total = weeklyTotals.dst.day;
      dayTotals[i].time.total = weeklyTotals.time.day;
      dayTotals[i].elev.total = weeklyTotals.elev.day;
    }

    activities.forEach((act) => {
      if (weekArr[i] === act.start_date_local.slice(0, 10)) {
        dayTotals[i].names.push({ name: act.name, activityId: act.activityId });

        dayTotals[i].tss.day += isNaN(act.tssScore) ? 0 : act.tssScore;
        dayTotals[i].ss.day += isNaN(act.suffer_score) ? 0 : act.suffer_score;
        dayTotals[i].dst.day += isNaN(act.distance) ? 0 : act.distance;
        dayTotals[i].time.day += isNaN(act.moving_time) ? 0 : act.moving_time;
        dayTotals[i].elev.day += isNaN(act.total_elevation_gain) ? 0 : act.total_elevation_gain;

        weeklyTotals.names.push({ name: act.name, activityId: act.activityId });
        weeklyTotals.tss.day += isNaN(act.tssScore) ? 0 : act.tssScore;
        weeklyTotals.ss.day += isNaN(act.suffer_score) ? 0 : act.suffer_score;
        weeklyTotals.dst.day += isNaN(act.distance) ? 0 : act.distance;
        weeklyTotals.time.day += isNaN(act.moving_time) ? 0 : act.moving_time;
        weeklyTotals.elev.day += isNaN(act.total_elevation_gain) ? 0 : act.total_elevation_gain;
      }
    });
  }

  weeklyTotals.tss.total = weeklyTotals.tss.day;
  weeklyTotals.ss.total = weeklyTotals.ss.day;
  weeklyTotals.dst.total = weeklyTotals.dst.day;
  weeklyTotals.time.total = weeklyTotals.time.day;
  weeklyTotals.elev.total = weeklyTotals.elev.day;

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

  res.send(result);
};

// TODO setup activity reset front end
// activities set to "2" are not returned from the DB to the user
// They are "fresh", this sets existing "3"s back to "2", then we
// update the activity with the lates info, unless it has been deleted
// from strava, then it never gets updated. At that point, we should
// set the status to "4" so it is not returned but also not cheked.
exports.resetActivity = (req, res) => {
  const query = {
    activityId: req.params.activityId,
    'athlete.id': req.user.stravaId,
  };
  const data = {
    $set: { resource_state: 2 },
  };
  Activities.findOneAndUpdate(query, data, { new: true }, (err, activity) => {
    hlpr.consLog([query, activity]);
    if (err || !event) {
      hlpr.consLog(['favEvent err', err]);
      res.status(404).send({ resetActivity: 'Activity not found' });
    }
    res.send({ activityId: activity.activityId, resetActivity: activity.resource_state });
  });
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
      $lt: oneWeek(startDate),
    },
  };
  const sort = { start_date_local: 1 };
  hlpr.consLog(['getWeekOfActivities', req.user.stravaId, startDate, query, sort]);

  Activities.find(query).sort(sort).exec((err, week) => {
    if (err) res.send({ [weeksPast]: [{ error: 'no data' }] });
    res.send({ [startDate]: week });
  });
};
