import lib from '../../containers/lib';

// this array will be mapped to display each metric for an activity.
const returnValues = [
  {
    activityType: 'difficulty_index',
    activityLabel: 'Difficulty Index',
    compute: lib.difficultyIndex,
    firstArg: 'elevation_gain',
    secondArg: 'distance',
  },
  {
    activityType: 'estimated_moving_time',
    activityLabel: 'Est. Moving Time',
    conversionFunction: lib.statsConversions,
    conversionMetric: 'time',
    conversionYAxis: false,
    conversionData: 'estimated_moving_time',
  },
  {
    activityType: 'distance',
    activityLabel: 'Distance',
    conversionFunction: lib.statsConversions,
    conversionMetric: 'dst',
    conversionYAxis: false,
    conversionData: 'distance',
    conversionTypeSA: 'miles',
    conversionTypeMetric: 'meters',
    conversionmPref: true,
  },
  {
    activityType: 'elevation_gain',
    activityLabel: 'Elevation',
    conversionFunction: lib.statsConversions,
    conversionMetric: 'elev',
    conversionYAxis: false,
    conversionData: 'elevation_gain',
    conversionTypeSA: 'feet',
    conversionTypeMetric: 'meters',
    conversionmPref: true,
  },
];

export default returnValues;
