const addDays = require('date-fns/add_days');
const format = require('date-fns/format');
const startOfWeek = require('date-fns/start_of_week');
const subWeeks = require('date-fns/sub_weeks');
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

// localhost:3080/apiv1/activities/one-week/100 (returns -40 weeks)
// localhost:3080/apiv1/activities/one-week (no number returns current week)
exports.getWeekOfActivities = (req, res) => {
  const weeksPast = req.params.weeksPast * 1 || 0;
  const startDate = req.params.startDate || format(subWeeks(startOfWeek(new Date(), { weekStartsOn: 1 }), weeksPast), 'YYYY-MM-DD');
  const query = {
    'athlete.id': req.user.stravaId,
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
