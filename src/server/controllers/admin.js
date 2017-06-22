const User = require('../models/user');
const Events = require('../models/events');
const Activities = require('../models/activities');
const Logging = require('../models/logging');

const stravaControl = require('./strava');
const hlpr = require('../lib/helpers');

// Aggregation that returns a list of users and coungs of activities and events
exports.userList = (req, res) => {
  User.aggregate(
    [
      { $match: {} },
      {
        $lookup: {
          from: 'activities',
          localField: 'stravaId',
          foreignField: 'athlete.id',
          as: 'useractivities',
        },
      },
      {
        $lookup: {
          from: 'events',
          localField: 'stravaId',
          foreignField: 'eventOwner',
          as: 'userevents',
        },
      },
      {
        $lookup: {
          from: 'logs',
          localField: 'stravaId',
          foreignField: 'stravaId',
          as: 'userlogs',
        },
      },
      { $project: {
        firstname: 1,
        lastname: 1,
        stravaId: 1,
        premium: 1,
        created_at: 1,
        updated_at: 1,
        adminMember: 1,
        clubMember: 1,
        activityCount: { $size: '$useractivities' },
        eventCount: { $size: '$userevents' },
        logCount: { $size: '$userlogs' },
        logLastAccess: { $slice: ['$userlogs', -1] },
        _id: 0,
      } },
      { $sort: { firstname: 1, lastname: 1 } },
    ], (err, result) => {
    const logObj = {
      stravaId: req.user.stravaId,
      logType: 'admin',
      level: 3,
      error: err,
      message: 'Controler/Admin: exports.userList',
      page: req.originalUrl,
    };
    hlpr.logOut(logObj);
    if (err) return err;
    res.send(result);
  });
};

// run nightlyUpdate
exports.updateAllUsers = (req, res) => {
  stravaControl.nightlyUpdate();
  res.send('update started');
};
