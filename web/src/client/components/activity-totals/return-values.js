import justFns from 'just-fns';

// this array will be mapped to display each metric for an activity.
const returnValues = [
  {
    activityType: 'name',
  },
  {
    activityType: 'count',
    activityLabel: 'Count',
  },
  {
    activityType: 'moving_time',
    activityLabel: 'Moving Time',
    conversionFunction: justFns.statsConversions,
    conversionMetric: 'time',
    conversionYAxis: false,
    conversionData: 'moving_time',
  },
  {
    activityType: 'distance',
    activityLabel: 'Distance',
    conversionFunction: justFns.statsConversions,
    conversionMetric: 'dst',
    conversionYAxis: false,
    conversionData: 'distance',
    conversionTypeSA: 'miles',
    conversionTypeMetric: 'meters',
    conversionmPref: true,
  },
  {
    activityType: 'total_elevation_gain',
    activityLabel: 'Elevation',
    conversionFunction: justFns.statsConversions,
    conversionMetric: 'elev',
    conversionYAxis: false,
    conversionData: 'total_elevation_gain',
    conversionTypeSA: 'feet',
    conversionTypeMetric: 'meters',
    conversionmPref: true,
  },
];

export default returnValues;
