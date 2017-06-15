const User = require('../models/user');
const Events = require('../models/events');
const Activities = require('../models/activities');

const hlpr = require('../lib/helpers');

// TODO write an aggregation that will return a list of users and their activities and events
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
        _id: 0,
      } },
      { $sort: { firstname: 1, lastname: 1 } },
    ], (err, result) => {
    if (err) return err;
    res.send(result);
  });
};

exports.nightlyUpdate = (req, res) => {
  res.send(hello);
}
