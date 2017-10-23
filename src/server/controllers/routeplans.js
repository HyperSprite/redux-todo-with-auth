const csv = require('fast-csv');

const qs = require('qs');
const _ = require('lodash');
const strava = require('strava-v3');

const Routeplans = require('../models/routeplans');
const UserCommon = require('../models/user-common');
const auth = require('./authentication');
const enhancePolylineLocation = require('../lib/enhancePolylineLocation');
const stopwords = require('../lib/stopwords');
const hlpr = require('../lib/helpers');

/**
* This is basically a Routeplan cache
* If the id is in the db, it returs that.
* if not, it gets it from strava, adds it to the db and returns the new routeplan.
*
* input === routeplanId
* returns full enhanced Routeplan
*
* used by getRouteplan
*/
const getOneRoute = (input, result) => {
  Routeplans.find({ routeplanId: input.routeplanId }, (err, oneRouteplan) => {
    if (oneRouteplan[0]) {
      hlpr.consLog(['found oneRouteplan']);
      return result(oneRouteplan[0]);
    }
    strava.routes.get({ id: input.routeplanId, access_token: input.user.access_token }, (
      err, oneRoute) => {
      if (err || !oneRoute) {
        console.log({ message: 'Error or no oneRoute found' });
        return { message: 'Error or no oneRoute found' };
      }
      if (oneRoute.message === 'Authorization Error') {
        console.log(oneRoute.message);
        return { message: oneRoute.message };
      }
      hlpr.consLog(['getOneRoute oneRoute >>>>>>>', oneRoute.id]);

      enhancePolylineLocation(oneRoute.map.summary_polyline, (enhancedData) => {
        const oneRouteEnhanced = Object.assign(
          oneRoute, enhancedData, { routeplanId: oneRoute.id }
        );

        /**
        * If we are here, then we did not find a routeplan resource_state: 3 above
        * and we have fetched the route from Strava and enhanced it with more location
        * data from the polyline. We want to create a new routeplan or
        * update a resource_state: 2 routeplan to a resource_state: 3.
        */
        const opts = {
          new: true, // returns the new doc
          upsert: true, // creates a new one if none is found
          runValidators: true, // runs the schema validators
        };
        Routeplans.findOneAndUpdate({ routeplanId: input.routeplanId }, oneRouteEnhanced, opts, (
          err, updatedRouteplan) => {
          if (err) {
            hlpr.consLog(['getOneRoute findOneAndUpdate | ERROR ', err]);
            return { message: 'Error: getOneRoute findOneAndUpdate' };
          }
          hlpr.consLog([`getOneRoute updated: ${updatedRouteplan.routeplanId}`]);
          return result(updatedRouteplan);
        });
      });
    });
  });
};

/**
* called by the router
*   /apiv1/routeplan/:routeplanId
*/
exports.getRouteplan = (req, res) => {
  const rPInput = {
    routeplanId: req.params.routeplanId,
    user: {
      access_token: req.user.access_token,
    },
  };
  getOneRoute(rPInput, (result) => {
    res.send(result);
  });
};

// This function runs every three minutes to process 40 activities to ensure
// the 600 requests per 15 min rate limit is not exceeded.
// There is no user triger for this.
const minutes = 3;
const theInterval = min => min * 60 * 1000;
const limitCount = 40;

//
// and Zone info.
exports.getRouteplansOnTimer = setInterval(async () => {
  const usersRouteplans = await UserCommon.distinct('routeplans').exec();
  const savedRouteplans = await Routeplans.distinct('routeplanId').exec();
  const getNewRouteplans = _.difference(usersRouteplans.filter(rP => typeof rP === 'number'), savedRouteplans);

  if (getNewRouteplans.length) {
    const shortListNewRouteplans = _.slice(getNewRouteplans, 0, limitCount);
    shortListNewRouteplans.forEach((rP) => {
      const rPInput = {
        routeplanId: rP,
        user: {
          access_token: process.env.STRAVA_ROUTES_ACCESS_TOKEN,
        },
      };
      hlpr.consLog(['shortListNewRouteplans', rPInput.routeplanId]);
      getOneRoute(rPInput, done => hlpr.consLog([`getRouteplansOnTimer OneRoute: ${done.routeplanId}`]));
    });
  }
  hlpr.consLog(['No new routeplans']);
}, theInterval(minutes));

/**
* Writes creaets or updates usercommons routeplans array
*/
const userCommonRouteUpdate = (input, result) => {
  const optsFOAU = {
    new: true, // returns the new doc
    upsert: true, // creates a new one if none is found
    runValidators: true, // runs the schema validators
  };
  UserCommon.findOneAndUpdate({ stravaId: input.stravaId }, input, optsFOAU, (err, updated) => {
    if (err) {
      hlpr.consLog(['faided to update UserCommon']);
      return result({ message: 'Error failed to update UserCommon' });
    }
    hlpr.consLog(['UserCommon.findOneAndUpdate'])
    return result(updated);
  });
}

/**
* This is a recursive function that returns an array of routeplansIds.
*/
exports.getAllRouteplans = (input, result) => {
  const options = {
    id: input.user.stravaId,
    access_token: input.user.access_token,
    per_page: input.perPage || 200,
    page: input.pageCount,
  };

  hlpr.consLog(['getAllRouteplans options', options.id, options.page]);
  if (input.arrLength === 0) {
    const user = {
      stravaId: input.user.stravaId,
      routeplans: input.routeplans,
    };
    hlpr.consLog(['getAllRouteplans > Done', user]);
    return userCommonRouteUpdate(user, result);
  }

  strava.athlete.listRoutes(options, (err, rtsReturn) => {
    if (err) return new Error(err);
    if (!rtsReturn || !rtsReturn.length) {
      input.arrLength = 0;
      hlpr.consLog(['getAllRouteplans arrLength = 0 or !rts', input.user.routeplans]);
    } else {
      hlpr.consLog(['rtsReturn', rtsReturn]);
      const rtsIdArr = rtsReturn.filter(rF => !rF.private).map(rM => rM.id);
      input.pageCount += 1;
      input.routeplans = [...new Set(input.routeplans.concat(rtsIdArr))];
    }
    return exports.getAllRouteplans(input, result);
  });
};

// TODO build this first
exports.getUserRouteplans = (req, res) => {
  res.send({ message: 'getRouteplans' });
};


// TODO setup Routeplan refresh, goes out and gets the latest version
exports.refreshRouteplan = (req, res) => {
  res.send({ message: 'refresh routeplan' })
};

// TODO delete Routplan, what does this even mean?
exports.deleteRouteplan = (req, res) => {
  const query = {
    routeplanId: req.body.routeplanId,
    'athlete.id': req.user.stravaId,
    status: 'deleted mock',
  };
  res.send({ status: query });
};

// TODO this needs building too
exports.userRouteplanRefresh = (req, res) => {
  res.send({ message: 'getRouteplans' });
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


// Search Routeplans
// localhost:3080/apiv1/routeplans/search?text=rock&sort={"total_elevation_gain":-1}&wildcard=true
// with no query string, returns all
exports.searchRouteplan = async (req, res) => {
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
  // private
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
  hlpr.consLog(['query.page', query.page]);
  if (query.page > 1) {
    query.skip = (query.page * query.limit) - query.limit;
    query.aggregate.push({ $skip: query.skip });
  }
  query.aggregate.push({ $limit: query.limit });

  hlpr.consLog([query.aggregate]);
  // projection for CSV
  if (query.csv) {
    query.aggregate.push({ $project: {
      athlete: 1,
      description: 1, // the best ride ever,
      distance: 1, // 4475.4,
      elevation_gain: 1, // 154.5,
      routeplanId: 1, // 321934,
      name: 1, // Evening Ride,
      resource_state: 1, // 3,
      starred: 1,
      sub_type: 1,
      created_at: 1,
      updated_at: 1,
      type: 1,
      estimated_moving_time: 1,
      segments: 1,
      start_lat: '$start_latlng[0]',
      start_lon: '$start_latlng[1]',
      end_lat: '$end_latlng[0]',
      end_lon: '$end_latlng[1]',
      private: 1,
    } });
  }

  // text: full text search of Routeplans titles and descriptions
  hlpr.consLog([query, query.text]);
  let result;
  try {
    result = await Routeplans.aggregate(query.aggregate);
    //   [
    //     { $match: { $and: query.search } },
    //     { $sort: query.sort },
    //     query.project,
    //   ]
    // );
  } catch (err) {
    hlpr.consLog(['searchRouteplans', err]);
    return res.status(500).send({ Error: 'Failed to Search Routeplans' });
  }
  if (query.csv) {
    const filename = 'Routeplans-data.csv';
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
    const RouteplansSearch = result.map(r => r.RouteplansId);
    res.send({ Routeplans: result, RouteplansSearch });
  }
};
