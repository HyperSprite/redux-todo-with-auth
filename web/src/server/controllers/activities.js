const csv = require('fast-csv');
const addDays = require('date-fns/add_days');
const subDays = require('date-fns/sub_days');
const format = require('date-fns/format');
const startOfWeek = require('date-fns/start_of_week');
const subWeeks = require('date-fns/sub_weeks');
const getTime = require('date-fns/get_time');
const eachDay = require('date-fns/each_day');
const isAfter = require('date-fns/is_after');
const qs = require('qs');
const url = require('url');
const justFns = require('just-fns');

const Activities = require('../models/activities');
const auth = require('./authentication');
const User = require('../models/user');
const stopwords = require('../lib/stopwords');
const strava = require('strava-v3');
const hlpr = require('../lib/helpers');

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
              let indx = input.user.ftpHistory.length - 1;
              let ftp = input.user.ftpHistory[indx].ftp;
              while (isAfter(input.user.ftpHistory[indx].date, data.start_date) || indx < 0) {
                ftp = input.user.ftpHistory[indx - 1].ftp;
                indx -= 1;
              }
              data.ftp = ftp;
              data.tssScore = justFns.calcTssScore(data.elapsed_time, data.weighted_average_watts, ftp);
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

const getActivityDetails = (activity, opts, index, created, cb) => {
  if (!created) return cb(index);
  strava.activities.get({ id: activity.activityId, access_token: opts.access_token }, (err, data) => {
    if (err) hlpr.consLog(['setExtendedActivityStats strava.activities.get', err]);
    if (opts.user.premium) {
      strava.activities.listZones({ id: activity.activityId, access_token: opts.access_token }, (err, aData) => {
        if (err) hlpr.consLog(['setExtendedActivityStats strava..activities.listZones', err]);
        data.zones = aData;
        if (data.weighted_average_watts) {
          let indx = opts.user.ftpHistory.length - 1;
          let ftp = opts.user.ftpHistory[opts.user.ftpHistory.length - 1].ftp;
          while (isAfter(opts.user.ftpHistory[indx].date, data.start_date) || indx < 0) {
            ftp = opts.user.ftpHistory[indx - 1].ftp;
            indx -= 1;
          }
          data.ftp = ftp;
          data.tssScore = justFns.calcTssScore(data.elapsed_time, data.weighted_average_watts, ftp);
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

exports.getRecentActivities = (req, res) => {
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
                let indx = user.ftpHistory.length - 1;
                let ftp = user.ftpHistory[indx].ftp;
                hlpr.consLog(['getExtendedActivityStats ftp while', user.stravaId, indx]);
                while (isAfter(user.ftpHistory[indx].date, data.start_date) || indx < 0)
                  ftp = user.ftpHistory[indx - 1].ftp;
                  indx -= 1;
                }
                tmpData.ftp = ftp;
                tmpData.tssScore = justFns.calcTssScore(data.elapsed_time, data.weighted_average_watts, ftp);
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
  let sortObj = { start_date_local: -1 };

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

  // localhost:3080/apiv1/activities/search-activities?lnglatstart=-122.1439698,37.426941
  if (q.lnglatstart || q.lnglatend) {
    const point = q.lnglatstart ? 'start' : 'end';
    console.log('point', point);
    query.search.push({
      [`${point}GeoCoordinates`]: {
        near: {
          type: 'Point',
          coordinates: q[`lnglat${point}`].split(',').map(Number),
        },
        distanceField: 'distance',
        maxDistance: q.maxDist * 1 || 321869, // 200 miles in meters
        spherical: true,
      },
    });
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

  aggregate.push({ $match: { $and: query.search } });
  aggregate.push({ $facet: {
    activCalcFilter: [{ $group: aggregateGroup }],
    results: aggregateArr,
    activitySearch: activitySearchArr,
  } });

  aggregateArr.push({ $sort: sortObj });

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
