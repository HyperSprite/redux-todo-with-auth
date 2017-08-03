const csv = require('fast-csv');
const addDays = require('date-fns/add_days');
const format = require('date-fns/format');
const startOfWeek = require('date-fns/start_of_week');
const subWeeks = require('date-fns/sub_weeks');
const getTime = require('date-fns/get_time');
const qs = require('qs');

const Activities = require('../models/activities');
const auth = require('./authentication');
const User = require('../models/user');
const stopwords = require('../lib/stopwords');
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
    if (!input.cronjob && acts.message === 'Authorization Error') {
      hlpr.consLog(['getAllActivities Authorization Error', input.user.stravaId, input.cronjob]);
      auth.stravaSignOut(input, result);
    }
    if (!acts.length || !acts) {
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
    per_page: req.perPage || 21,
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
    if (acts.message === 'Authorization Error') {
      hlpr.consLog(['listActivities Authorization Error', req.user.stravaId]);
      return auth.stravaSignOut(req, res);
    }
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
          if (user.premium && user.ftpHistory.length !== 0) {
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

  res.send(result);
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
    if (err || !event) {
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


// Search Activities:
// localhost:3080/apiv1/activities/search-activities?text=rock&sort={"total_elevation_gain":-1}&wildcard=true
// with no query string, returns all
exports.searchActivities = async (req, res) => {
  const query = qs.parse(req.query);

  query.search = [{ 'athlete.id': req.user.stravaId }, { resource_state: 3 }];

  if (query.wildcard && query.textsearch) {
    // slow but allows wildcard option
    query.search.push({ name: { $regex: query.textsearch, $options: 'i' } });
  } else if (query.textsearch) {
    // fast but returns stemmed words, will not return partial matches
    // also works with -not words
    query.search.push({ $text: { $search: query.textsearch } });
  }
  if (query.trainer) {
    query.search.push({ trainer: true });
  }
  if (query.commute) {
    query.search.push({ commute: true });
  }
  // manual
  // private
  // flagged
  // Put all search above this line
  query.aggregate = [
    { $match: { $and: query.search } },
  ];
  query.sort = { start_date_local: -1 };
  query.aggregate.push({ $sort: query.sort });

  // query.aggregate.push({ $group: {
  //   _id: null,
  //   count: { $sum: 1 },
  //   results: { $push: '$$ROOT' },
  // } });

  query.limit = query.limit * 1 || 12;

  query.page = query.page || 1;
  query.page *= 1;
  console.log('query.page', query.page);
  if (query.page > 1) {
    query.skip = (query.page * query.limit) - query.limit;
    query.aggregate.push({ $skip: query.skip });
  }
  query.aggregate.push({ $limit: query.limit });

  console.dir(query.aggregate);
  // projection for CSV
  if (query.csv) {
    query.aggregate.push({ $project: {
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

  // text: full text search of activity titles and descriptions
  hlpr.consLog([query, query.text]);
  let result;
  try {
    result = await Activities.aggregate(query.aggregate);
    //   [
    //     { $match: { $and: query.search } },
    //     { $sort: query.sort },
    //     query.project,
    //   ]
    // );
  } catch (err) {
    hlpr.consLog(['searchActivities', err]);
    return res.status(500).send({ Error: 'Failed to Search Activities' });
  }
  if (query.csv) {
    const filename = 'activity-data.csv';
    res.setHeader('Content-disposition', `attachment; filename=${filename}`);
    res.setHeader('content-type', 'text/csv');
    csv.writeToString(result, {
      headers: true,
      objectMode: true,
    }, (err, resultCsv) => {
      if (err) return console.log(err);
      res.send(resultCsv);
    });
  } else {
    const activitySearch = result.map(r => r.activityId);
    res.send({ activities: result, activitySearch });
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
