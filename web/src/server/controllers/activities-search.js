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
const url = require('url');

const Activities = require('../models/activities');
const hlpr = require('../lib/helpers');

const logObj = {
  file: 'controllers/activities-search',
  logType: 'controller',
  level: 10,
};

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
    let maxDist = 80000; // 50'ish miles
    if (q.maxDist) {
      maxDist = q.mPref === true ? justFns.milesToMeters(q.maxDist * 1) : q.maxDist * 1000;
    }
    geoData = {
      $geoNear: {
        near: {
          type: 'Point',
          coordinates: coords },
        distanceField: 'distance',
        maxDistance: maxDist, // 200 miles in meters
        spherical: true,
        query: { $and: query.search },
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
    Max: '$lt',
    Min: '$gt',
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


    if (sortOptions[item]) {
      console.log ('item', item, 'search', `{ $gt: ${q[item][0] * 1}, $lt: ${q[item][1] * 1} }`, sortOptions[item]);
      if (item === 'date') {
        const tmpDate = format(q[item], 'YYYY-MM-DD');
        query.search.push({ [sortOptions[item]]: { [sortOptions[item]]: tmpDate } });
      } else {
        query.search.push({ [sortOptions[item]]: { $gt: q[item][0] * 1, $lt: q[item][1] * 1 } });
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

  const aggRangeProject = sortStrings.reduce((acc, sS) => {
    acc[`${sS.value}`] = {
      range: [
        `$${sS.value}Min`,
        `$${sS.value}Max`,
      ],
      avg: `$${sS.value}Avg`,
      sum: `$${sS.value}Sum`,
    };
    return acc;
  }, {
    count: 1,
  });

  /**
  * Sorts --------------------------------------------------------------------
  *
  * query value will be like: 'sort=movingTime-des'
  * slit this and check they match the qsValue and sortOptions objects
  * if they don't they are ignored and defaults to $sort: { date: -1 }
  */
  if (q.sortBy) {
    console.log('sortBy', q.sortBy);
    const sortKey = q.sortBy.substr(0, q.sortBy.length - 4);
    const sortMod = q.sortBy.substr(q.sortBy.length - 3);
    console.log('sortBy', q.sortBy, sortKey, sortMod);
    // const tmpSrt = q.sortBy.split('-');
    if (qsValue[sortMod] && sortOptions[sortKey]) {
      sortObj = { [sortOptions[sortKey]]: qsValue[sortMod] };
    }
  }

  /**
  * Text or Fuzzy search
  * wildcard: true uses regex, else text index
  *  fast but returns stemmed words, will not return partial matches
  *  also works with -not words
  */
  if (srchOpts.wildcard && srchOpts.textsearch && !geoData) {
    srchOpts.textsearch.split(' ').forEach((tSrch) => {
      query.search.push({ name: { $regex: tSrch, $options: 'i' } });
    });
  } else if (srchOpts.textsearch && !q.lat) {
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
    aggregate.push(geoData);
  } else {
    aggregate.push({ $match: { $and: query.search } });
  }

  aggregate.push({ $facet: {
    activCalcFilter: [{ $group: aggregateGroup }, { $project: aggRangeProject }],
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
      geoStart: 1,
      elevationStart: 1,
      geoEnd: 1,
      elevationEnd: 1,
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
  const aggregateMax = [
    { $match: { $and: [{ 'athlete.id': req.user.stravaId }, { resource_state: 3 }] } },
    { $group: aggregateGroup },
    { $project: aggRangeProject },
  ];
  let aggResult;
  let activCalcAll;
  let activitySearch;
  try {
    aggResult = await Activities.aggregate(aggregate);
    activCalcAll = await Activities.aggregate(aggregateMax);
    activitySearch = aggResult[0].activitySearch[0] && aggResult[0].activitySearch[0].arr;
  } catch (err) {
    hlpr.logOutArgs(`${logObj.file}.searchActivities err`, logObj.logType, 'error', 3, JSON.stringify(err), req.originalUrl, '500 - Failed to Search Activities', req.user.stravaId);
    return res.status(500).send({ Error: 'Failed to Search Activities', err: err });
  }
  if (q.csv) {
    const filename = 'activity-data.csv';
    res.setHeader('Content-disposition', `attachment; filename=${filename}`);
    res.setHeader('content-type', 'text/csv');
    csv.writeToString(aggResult[0].results, {
      headers: true,
      objectMode: true,
    }, (err, resultCsv) => {
      if (err) {
        hlpr.logOutArgs(`${logObj.file}.searchActivities csv err`, logObj.logType, 'error', 5, err, req.originalUrl, 'Something went wrong at CSV creation', req.user.stravaId);
        res.status(500).send({ error: 'Something went wrong at CSV creation' });
      }
      res.send(resultCsv);
    });
  } else {
    // const activitySearch = result.map(r => r.activityId);
    res.send({
      aggregate: hlpr.isProd() ? null : aggregate,
      q,
      searchQuery: query,
      activCalcFilter: aggResult[0].activCalcFilter[0] || { count: 0 },
      activCalcAll: activCalcAll[0],
      query: qString,
      sortStrings,
      filterIEE,
      activitySearch,
      activities: aggResult[0].results,
    });
  }
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
    hlpr.logOutArgs(`${logObj.file}.fitnessToday err`, logObj.logType, 'error', 5, err, req.originalUrl, 'Failed to get todays fitness', req.user.stravaId);
    return res.status(500).send({ Error: 'Failed to get todays fitness' });
  }
  hlpr.logOutArgs(`${logObj.file}.fitnessToday info`, logObj.logType, 'info', 9, null, req.originalUrl, 'Success getting todays fitness', req.user.stravaId);
  return res.send({ fitnessToday: result });
};
