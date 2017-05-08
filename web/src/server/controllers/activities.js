const Activities = require('../models/activities');
const User = require('../models/user');
const strava = require('strava-v3');
const hlpr = require('../lib/helpers');

exports.getAllActivities = (input, result) => {
  const options = {
    id: input.user.stravaId,
    access_token: input.user.access_token,
    per_page: 200,
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
    acts.forEach((act) => {
      const tmpAct = act;
      tmpAct.activityId = tmpAct.id; // activities are returned as "id"
      Activities.findOrCreate({ activityId: tmpAct.activityId }, tmpAct, (err, dbActivity, created) => {
        // By using findOrCreate here, we are only adding new if they do not yet exist.
        // This can also be useful if an activity is updated in strava and needs to be re-fetched
        if (created && !input.cronjob) {
          input.activities.push(dbActivity);
        }
      });
    });
    input.pageCount++;
    return exports.getAllActivities(input, result);
  });
};

const minutes = 3;
const theInterval = min => min * 60 * 1000;
const limitCount = 40;

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
