import lib from '../../containers/lib';

// this array will be mapped to display each metric for an activity.
const returnValues = [
  {
    activityType: 'tssScore',
    activityLabel: 'TSS',
  },
  {
    activityType: 'difficulty_index',
    activityLabel: 'Difficulty Index',
    compute: lib.difficultyIndex,
    firstArg: 'total_elevation_gain',
    secondArg: 'distance',
  },
  {
    activityType: 'suffer_score',
    activityLabel: 'Suffer Score',
  },
  {
    activityType: 'efficiency_factor',
    activityLabel: 'Efficiency Factor',
    compute: lib.divideAndRound,
    firstArg: 'weighted_average_watts',
    secondArg: 'average_heartrate',
  },
  {
    activityType: 'kilojoules',
    activityLabel: 'Kilojoules',
  },
  {
    activityType: 'variability_index',
    activityLabel: 'Variability Index',
    compute: lib.divideAndRound,
    firstArg: 'weighted_average_watts',
    secondArg: 'average_watts',
  },
  {
    activityType: 'average_watts',
    activityLabel: 'Average Power',
  },
  {
    activityType: 'average_heartrate',
    activityLabel: 'Avereage HR',
  },
  {
    activityType: 'weighted_average_watts',
    activityLabel: 'Nomalized Power',
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
    activityType: 'start_date_local',
    activityLabel: 'Date',
    compute: lib.dateFormat,
    firstArg: 'start_date_local',
    secondArg: 'datePref',
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
