import justFns from 'just-fns';
import lib from '../../containers/lib';

// this array will be mapped to display each metric for an activity.
const returnValues = [
  {
    category: 'group1',
    activityType: 'tssScore',
    activityLabel: 'TSS',
    compute: justFns.round,
    arg1: 'tssScore',
    arg2: 0,
  },
  {
    category: 'group1',
    activityType: 'suffer_score',
    activityLabel: 'Relative Effort',
  },
  {
    category: 'group1',
    activityType: 'kilojoules',
    activityLabel: 'Kilojoules',
  },
  {
    category: 'group1',
    activityType: 'calories',
    activityLabel: 'Calories',
  },
  {
    category: 'group2',
    activityType: 'moving_time',
    activityLabel: 'Moving Time',
    conversionFunction: justFns.statsConversions,
    conversionMetric: 'time',
    conversionYAxis: false,
    conversionData: 'moving_time',
  },
  {
    category: 'group2',
    activityType: 'distance',
    activityLabel: 'Distance',
    conversionFunction: justFns.statsConversions,
    conversionMetric: 'dst',
    conversionYAxis: false,
    conversionData: 'distance',
    conversionTypeSA: 'mi',
    conversionTypeMetric: 'km',
    conversionmPref: true,
  },
  {
    category: 'group2',
    activityType: 'total_elevation_gain',
    activityLabel: 'Total Ascent',
    conversionFunction: justFns.statsConversions,
    conversionMetric: 'elev',
    conversionYAxis: false,
    conversionData: 'total_elevation_gain',
    conversionTypeSA: 'ft',
    conversionTypeMetric: 'm',
    conversionmPref: true,
  },
  {
    category: 'group2',
    activityType: 'difficulty_index',
    activityLabel: 'Difficulty Index',
    compute: justFns.difficultyIndex,
    arg1: 'total_elevation_gain',
    arg2: 'distance',
    arg3: 2,
  },
  {
    category: 'group3',
    activityType: 'variability_index',
    activityLabel: 'Variability Index',
    compute: justFns.divideAndRound,
    arg1: 'weighted_average_watts',
    arg2: 'average_watts',
    arg3: 2,
  },
  {
    category: 'group3',
    activityType: 'efficiency_factor',
    activityLabel: 'Efficiency Factor',
    compute: justFns.divideAndRound,
    arg1: 'weighted_average_watts',
    arg2: 'average_heartrate',
    arg3: 2,
  },
  {
    category: 'group3',
    activityType: 'weighted_average_watts',
    activityLabel: 'Nomalized Power',
  },
  {
    category: 'group3',
    activityType: 'average_watts',
    activityLabel: 'Average Power',
  },
  {
    category: 'group3',
    activityType: 'average_heartrate',
    activityLabel: 'Average HR',
  },
  {
    category: 'group4',
    activityType: 'start_date_local',
    activityLabel: 'Date',
    compute: lib.dateFormat,
    arg1: 'start_date_local',
    arg2: 'datePref',
  },
  {
    category: 'group4',
    activityType: 'ftp',
    activityLabel: 'FTP',
  },
  {
    category: 'group4',
    activityType: 'type',
    activityLabel: 'Type',
  },
  {
    category: 'group4',
    activityType: 'gear',
    activityTypeSub: 'name',
    activityLabel: 'Gear',
  },
];

export default returnValues;
