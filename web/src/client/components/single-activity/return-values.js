import lib from '../../containers/lib';

// this array will be mapped to display each metric for an activity.
const returnValues = [
  {
    activityType: 'tssScore',
    activityLabel: 'TSS',
  },
  {
    activityType: 'efficiency_factor',
    activityLabel: 'Efficiency Factor',
    division: lib.divideAndRound,
    divideThis: 'weighted_average_watts',
    byThis: 'average_heartrate',
  },
  {
    activityType: 'variability_index',
    activityLabel: 'Variability Index',
    division: lib.divideAndRound,
    divideThis: 'weighted_average_watts',
    byThis: 'average_watts',
  },
  {
    activityType: 'weighted_average_watts',
    activityLabel: 'Nomalized Power',
  },
  {
    activityType: 'average_watts',
    activityLabel: 'Average Power',
  },
  {
    activityType: 'kilojoules',
    activityLabel: 'Kilojoules',
  },
  {
    activityType: 'suffer_score',
    activityLabel: 'Suffer Score',
  },
  {
    activityType: 'average_heartrate',
    activityLabel: 'Avereage HR',
  },
  {
    activityType: 'calories',
    activityLabel: 'Calories',
  },
  {
    activityType: 'moving_time',
    activityLabel: 'Moving Time',
    conversionFunction: lib.statsConversions,
    conversionMetric: 'time',
    conversionYAxis: false,
    conversionData: 'moving_time',
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
    activityType: 'total_elevation_gain',
    activityLabel: 'Elevation',
    conversionFunction: lib.statsConversions,
    conversionMetric: 'elev',
    conversionYAxis: false,
    conversionData: 'total_elevation_gain',
    conversionTypeSA: 'feet',
    conversionTypeMetric: 'meters',
    conversionmPref: true,
  },
  {
    activityType: 'type',
    activityLabel: 'Type',
  },
  {
    activityType: 'gear',
    activityTypeSub: 'name',
    activityLabel: 'Gear',
  },
];

export default returnValues;
