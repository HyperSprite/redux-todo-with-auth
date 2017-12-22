import lib from '../../containers/lib';

/**
*
* Display type is itterated through when createing the display.
* Some fields like count do not need any addtional label or conversion.
* Summing or Averaging the dates also don't make a lot of sense
* So this field describes which will be applied.
*
* displayType: [3, 2]~ [ 0  ,    1  ,   2  ,   3  , 4 ]
* const displayTypes = ['Avg', 'Sum', 'Max', 'Min', ''];
*/
// this array will be mapped to display each metric for an activity.
const returnValues = [
  {
    activityType: 'count',
    activityLabel: 'Total Activities',
    displayType: [4],
  },
  {
    activityType: 'date',
    activityLabel: 'Dates',
    displayType: [3, 2],
    compute: lib.dateFormat,
    arg1: 'date',
    arg2: 'datePref',
  },
  {
    activityType: 'tssScore',
    activityLabel: 'TSS',
    displayType: [0, 1, 2],
    compute: lib.round,
    arg1: 'tssScore',
    arg2: 1,
  },
  {
    activityType: 'sufferScore',
    activityLabel: 'Suffering',
    displayType: [0, 1, 2],
    compute: lib.round,
    arg1: 'sufferScore',
    arg2: 1,
  },
  {
    activityType: 'kilojoules',
    activityLabel: 'Kilojoules',
    displayType: [0, 1, 2],
    compute: lib.round,
    arg1: 'kilojoules',
    arg2: 1,
  },
  {
    activityType: 'averageWatts',
    activityLabel: 'Average Watts',
    displayType: [0, 2],
    compute: lib.round,
    arg1: 'averageWatts',
    arg2: 1,
  },
  {
    activityType: 'weightedAverageWatts',
    activityLabel: 'Normalized Watts',
    displayType: [0, 2],
    compute: lib.round,
    arg1: 'weightedAverageWatts',
    arg2: 1,
  },

  {
    activityType: 'averageHeartrate',
    activityLabel: 'Average Heartrate',
    displayType: [0, 2],
    compute: lib.round,
    arg1: 'averageHeartrate',
    arg2: 1,
  },
  {
    activityType: 'calories',
    activityLabel: 'Calories',
    displayType: [0, 1, 2],
    compute: lib.round,
    arg1: 'calories',
    arg2: 1,
  },
  {
    activityType: 'maxHeartrate',
    activityLabel: 'Max Heartrate',
    displayType: [0, 2],
    compute: lib.round,
    arg1: 'maxHeartrate',
    arg2: 1,
  },
  {
    activityType: 'maxSpeed',
    activityLabel: 'Max Speed',
    displayType: [0, 2],
    conversionFunction: lib.statsConversions,
    conversionMetric: 'spd',
    conversionYAxis: false,
    conversionData: 'maxSpeed',
    conversionTypeSA: 'mph',
    conversionTypeMetric: 'kph',
    conversionmPref: true,
  },
  {
    activityType: 'maxWatts',
    activityLabel: 'Max Watts',
    displayType: [0, 2],
    compute: lib.round,
    arg1: 'maxWatts',
    arg2: 1,
  },
  {
    activityType: 'movingTime',
    activityLabel: 'Moving Time',
    displayType: [0, 1, 2],
    conversionFunction: lib.statsConversions,
    conversionMetric: 'time',
    conversionYAxis: false,
    conversionData: 'movingTime',
  },
  {
    activityType: 'distance',
    activityLabel: 'Distance',
    displayType: [0, 1, 2],
    conversionFunction: lib.statsConversions,
    conversionMetric: 'dst',
    conversionYAxis: false,
    conversionData: 'distance',
    conversionTypeSA: 'miles',
    conversionTypeMetric: 'meters',
    conversionmPref: true,
  },
  {
    activityType: 'elevation',
    activityLabel: 'Elevation',
    displayType: [0, 1, 2],
    conversionFunction: lib.statsConversions,
    conversionMetric: 'elev',
    conversionYAxis: false,
    conversionData: 'elevation',
    conversionTypeSA: 'feet',
    conversionTypeMetric: 'meters',
    conversionmPref: true,
  },
];

export default returnValues;
