import justFns from 'just-fns';
import lib from '../../containers/lib';

// this array will be mapped to display each metric for an activity.
const returnValues = [
  {
    activityType: 'tssScore',
    activityLabel: 'TSS',
    compute: justFns.round,
    arg1: 'tssScore',
    arg2: 1,
  },
  {
    activityType: 'difficulty_index',
    activityLabel: 'Difficulty Index',
    compute: justFns.difficultyIndex,
    arg1: 'total_elevation_gain',
    arg2: 'distance',
    arg3: 2,
  },
  {
    activityType: 'suffer_score',
    activityLabel: 'Suffer Score',
  },
  {
    activityType: 'efficiency_factor',
    activityLabel: 'Efficiency Factor',
    compute: justFns.divideAndRound,
    arg1: 'weighted_average_watts',
    arg2: 'average_heartrate',
    arg3: 2,
  },
  {
    activityType: 'kilojoules',
    activityLabel: 'Kilojoules',
  },
  {
    activityType: 'variability_index',
    activityLabel: 'Variability Index',
    compute: justFns.divideAndRound,
    arg1: 'weighted_average_watts',
    arg2: 'average_watts',
    arg3: 2,
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
  {
    activityType: 'start_date_local',
    activityLabel: 'Date',
    compute: lib.dateFormat,
    arg1: 'start_date_local',
    arg2: 'datePref',
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
