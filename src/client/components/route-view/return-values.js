import justFns from 'just-fns';
import lib from '../../containers/lib';

// this array will be mapped to display each metric for an activity.
const returnValues = [
  {
    activityType: 'difficulty_index',
    activityLabel: 'Difficulty Index',
    compute: justFns.difficultyIndex,
    arg1: 'total_elevation_gain',
    arg2: 'distance',
    arg3: 2,
  },
  {
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
    activityType: 'elevation_gain',
    activityLabel: 'Total Ascent',
    conversionFunction: justFns.statsConversions,
    conversionMetric: 'elev',
    conversionYAxis: false,
    conversionData: 'elevation_gain',
    conversionTypeSA: 'ft',
    conversionTypeMetric: 'm',
    conversionmPref: true,
  },
  {
    activityType: 'elevationStart',
    activityLabel: 'Starting Elev.',
    conversionFunction: justFns.statsConversions,
    conversionMetric: 'elev',
    conversionYAxis: false,
    conversionData: 'elevationStart',
    conversionTypeSA: 'ft',
    conversionTypeMetric: 'm',
    conversionmPref: true,
  },
  {
    activityType: 'geoStart',
    activityLabel: 'Start in Google Maps',
    link: lib.googlemapbylnglat,
    arg1: 'geoStart',
  },
  {
    activityType: 'TZName',
    activityLabel: 'Time Zone',
  },
  {
    activityType: 'updated_at',
    activityLabel: 'Last Updated',
    compute: lib.dateFormat,
    arg1: 'updated_at',
    arg2: 'datePref',
  },

];

export default returnValues;
