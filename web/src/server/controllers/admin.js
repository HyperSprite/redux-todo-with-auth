const qs = require('qs');
const User = require('../models/user');
const Events = require('../models/events');
const Activities = require('../models/activities');
const Routeplans = require('../models/routeplans');
const UserCommon = require('../models/user-common');
const Logging = require('../models/logging');

const stravaControl = require('./strava');
const activControl = require('./activities');
const hlpr = require('../lib/helpers');

const logObj = {
  file: 'controllers/admin',
  stravaId: null,
  logType: 'admin',
  level: 10,
};

// Aggregation that returns a list of users and coungs of activities and events
exports.userList = (req, res) => {
  User.aggregate(
    [
      { $match: {} },
      // {
      //   $lookup: {
      //     from: 'activities',
      //     localField: 'stravaId',
      //     foreignField: 'athlete.id',
      //     as: 'useractivities',
      //   },
      // },
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
        ftpHistory: 1,
        userGeoElevation: 1,
        created_at: 1,
        updated_at: 1,
        createdAt: 1,
        updatedAt: 1,
        adminMember: 1,
        clubMember: 1,
        authorizationErrors: 1,
        // activityCount: { $size: '$useractivities' },
        eventCount: { $size: '$userevents' },
        logCount: { $size: {
          $filter: {
            input: '$userlogs',
            as: 'userLogs',
            cond: { $eq: ['$$userLogs.logType', 'auth'] },
          } },
        },
        logLastAccess: {
          $slice: [
            { $filter: {
              input: '$userlogs',
              as: 'userLogs',
              cond: { $eq: ['$$userLogs.logType', 'auth'] },
            } },
            -1,
          ],
        },
        _id: 0,
      } },
      { $sort: { firstname: 1, lastname: 1 } },
    ], (err, result) => {
    hlpr.logOutArgs(`${logObj.file}.userList`, 'admin', 'status now', 5, JSON.stringify(err), req.originalUrl, 'admin status', req.user.stravaId);
    if (err) return err;
    res.send(result);
  });
};

exports.getLogs = (req, res) => {
  Logging.aggregate(
    [
      { $match: {} },
      { $sort: { date: -1 } },
      { $group: {
        _id: {
          stravaId: '$stravaId',
          logType: '$logType',
          error: '$error',
        },
        count: { $sum: 1 },
        date: { $last: '$date' },
      } },
      {
        $lookup: {
          from: 'users',
          localField: '_id.stravaId',
          foreignField: 'stravaId',
          as: 'user',
        },
      },
      {
        $unwind: {
          path: '$user',
          preserveNullAndEmptyArrays: true,
        },
      },
      { $project: {
        _id: 0,
        stravaId: '$_id.stravaId',
        logType: '$_id.logType',
        error: '$_id.error',
        user: { $concat: ['$user.firstname', ' ', '$user.lastname'] },
        count: 1,
        date: 1,
      } },
    ], (err, result) => {
    hlpr.logOutArgs(`${logObj.file}.getLogs err`, 'admin', 'info', 5, err, req.originalUrl, 'admin status', req.user.stravaId);
    if (err) return err;
    res.send(result);
  });
};

// localhost:3080/apiv1/admin/activities/processing-status-all
exports.processingStatusAll = async (req, res) => {
  let results;
  try {
    const users = await User.find({}, { _id: 0, stravaId: 1 });
    results = await Promise.all(users.map(async user => activControl.resourceState(user.stravaId)));
  } catch (err) {
    return res.status(500).send({ error: 'failed request', err });
  }
  return res.send(results);
};

// localhost:3080/apiv1/admin/activities/processing-status/12345
exports.processingStatusOne = async (req, res) => {
  const prms = qs.parse(req.params);
  const user = parseInt(prms.stravaId || 0, 10);
  console.log('processingStatusOne', user);
  let result;
  try {
    result = await activControl.resourceState(user);
  } catch (err) {
    return res.status(500).send({ stravaId: user, error: 'failed request processing-status', err });
  }
  return res.send(result);
};

// run nightlyUpdate
exports.updateAllUsers = (req, res) => {
  stravaControl.nightlyUpdate();
  res.send({ message: 'update started' });
};

exports.removeUser = async (req, res) => {
  const userToRemove = req.params.userToRemove; // stravaId
  let logMessage = '';
  try {
    const userCommonRes = await UserCommon.findOneAndRemove({ stravaId: userToRemove });
    const userActivitiesRes = await Activities.remove({ stravaId: userToRemove });
    const userAuthRes = await User.findOneAndRemove({ stravaId: userToRemove });
    const deauthUserRes = await stravaControl.deauthUser(userAuthRes);
    logMessage = `Remove User Success: ${userToRemove}, deauthUserRes: ${!!deauthUserRes}, userCommonRemoved: ${!!userCommonRes}, activitiesRemoved: ${!!userActivitiesRes}, userRemoved: ${!!userAuthRes}`;
    hlpr.logOutArgs(`${logObj.file}.removeUser User removed`, 'admin', 'info', 5, null, req.originalUrl, logMessage, req.user.stravaId);
    return res.send({
      userToRemove,
      deauthUserRes,
      success: true,
      userCommonRes: !!userCommonRes,
      userActivitiesRes: !!userActivitiesRes,
      userAuthRes: !!userAuthRes,
    });
  } catch (err) {
    hlpr.logOutArgs(`${logObj.file}.removeUser UserCommon err`, 'admin', 'err', 2, err, req.originalUrl, logMessage, req.user.stravaId);
    return res.status(500).send({ userToRemove, err });
  }


  UserCommon.findOneAndRemove({ stravaId: userToRemove }, (err, userCommonRemoved) => {
    if (err) {
      const logMessage = `removeUser Failed ${userToRemove} userCommonRemoved ${!!userCommonRemoved} adminId: ${req.user.stravaId}`;
      hlpr.logOutArgs(`${logObj.file}.removeUser UserCommon err`, 'admin', 'err', 2, err, req.originalUrl, logMessage, req.user.stravaId);
      return res.send({ userToRemove, success: false, message: 'activitiesRemoved failed' });
    }
    Activities.remove({ 'athlete.id': userToRemove }, (err, activitiesRemoved) => {
      if (err) {
        const logMessage = `Remove User Failed ${userToRemove} userCommonRemoved ${!!userCommonRemoved} activitiesRemoved ${!!activitiesRemoved}`;
        hlpr.logOutArgs(`${logObj.file}.removeUser Activities err`, 'admin', 'err', 1, err, req.originalUrl, logMessage, req.user.stravaId);
        return res.send({ userToRemove, success: false, message: 'activitiesRemoved failed' });
      }
      User.findOneAndRemove({ stravaId: userToRemove }, (err, userRemoved) => {
        if (err) {
          const logMessage = `Remove User Failed ${userToRemove} userCommonRemoved ${!!userCommonRemoved} activitiesRemoved ${!!activitiesRemoved} userRemoved ${!!userRemoved}`;
          hlpr.logOutArgs(`${logObj.file}.removeUser User err`, 'admin', 'err', 1, err, req.originalUrl, logMessage, req.user.stravaId);
          return res.send({ userToRemove, success: false });
        }
        const logMessage = `Remove User Success ${userToRemove} userCommonRemoved ${!!userCommonRemoved} activitiesRemoved ${!!activitiesRemoved} userRemoved ${!!userRemoved}`;
        hlpr.logOutArgs(`${logObj.file}.removeUser User removed`, 'admin', 'info', 5, err, req.originalUrl, logMessage, req.user.stravaId);
        return res.send({ userToRemove, success: true });
      });
    });
  });
};

// exports.removeUser = (req, res) => {
//   const userToRemove = req.params.userToRemove; // stravaId
//   UserCommon.findOneAndRemove({ stravaId: userToRemove }, (err, userCommonRemoved) => {
//     if (err) {
//       const logMessage = `removeUser Failed ${userToRemove} userCommonRemoved ${!!userCommonRemoved} adminId: ${req.user.stravaId}`;
//       hlpr.logOutArgs(`${logObj.file}.removeUser UserCommon err`, 'admin', 'err', 2, err, req.originalUrl, logMessage, req.user.stravaId);
//       return res.send({ userToRemove, success: false, message: 'activitiesRemoved failed' });
//     }
//     Activities.remove({ 'athlete.id': userToRemove }, (err, activitiesRemoved) => {
//       if (err) {
//         const logMessage = `Remove User Failed ${userToRemove} userCommonRemoved ${!!userCommonRemoved} activitiesRemoved ${!!activitiesRemoved}`;
//         hlpr.logOutArgs(`${logObj.file}.removeUser Activities err`, 'admin', 'err', 1, err, req.originalUrl, logMessage, req.user.stravaId);
//         return res.send({ userToRemove, success: false, message: 'activitiesRemoved failed' });
//       }
//       User.findOneAndRemove({ stravaId: userToRemove }, (err, userRemoved) => {
//         if (err) {
//           const logMessage = `Remove User Failed ${userToRemove} userCommonRemoved ${!!userCommonRemoved} activitiesRemoved ${!!activitiesRemoved} userRemoved ${!!userRemoved}`;
//           hlpr.logOutArgs(`${logObj.file}.removeUser User err`, 'admin', 'err', 1, err, req.originalUrl, logMessage, req.user.stravaId);
//           return res.send({ userToRemove, success: false });
//         }
//         const logMessage = `Remove User Success ${userToRemove} userCommonRemoved ${!!userCommonRemoved} activitiesRemoved ${!!activitiesRemoved} userRemoved ${!!userRemoved}`;
//         hlpr.logOutArgs(`${logObj.file}.removeUser User removed`, 'admin', 'info', 5, err, req.originalUrl, logMessage, req.user.stravaId);
//         return res.send({ userToRemove, success: true });
//       });
//     });
//   });
// };
