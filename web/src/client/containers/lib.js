import { addSeconds, startOfDay, format } from 'date-fns';

const lib = {};

lib.round = (val, place) => Number(Math.round(val + `e${place}`) + `e-${place}`);
lib.secondsToTime = seconds => format(addSeconds(startOfDay(new Date()), seconds), 'H:mm');
lib.kgToPounds = kg => kg * 2.20462;
lib.kgToPoundsRound = (kg, p = 0) => lib.round(kg * 2.20462, p);
lib.metersToFeet = m => m * 3.28084;
lib.metersToFeetRound = (m, p = 0) => lib.round(m * 3.28084, p);
lib.metersToMiles = m => m * 0.00062137121212121;
lib.metersToMilesRound = (m, p = 0) => lib.round(m * 0.00062137121212121, p);
lib.metersToKm = m => m * 1000;
lib.metersToKmRound = (m, p = 0) => lib.round(m / 1000, p);

lib.percentFTPAcc = adjustedElev => -1.12 * (Math.pow(adjustedElev, 2)) - 1.90 * adjustedElev + 99.9;
lib.percentFTPNAcc = adjustedElev => 0.178 * (Math.pow(adjustedElev, 3)) - 1.43 * (Math.pow(adjustedElev, 2)) - (4.07 * adjustedElev) + 100;
// metric = 'time', 'dst', 'elev', 'cal', 'kj' type: string
// yAxis = bool - for recharts
// data = non-formatted number, like time in seconds, dist in meters.
// mPref = true for SAE, false for Metric
lib.statsConversions = (metric, yAxis, data, mPref) => {
  if (data || data === 0) {
    switch (metric) {
      case 'time':
        return lib.secondsToTime(data);
      case 'dst':
        return mPref ? lib.metersToMilesRound(data, 2) : lib.metersToKmRound(data, 1);
      case 'elev':
        return mPref ? lib.metersToFeetRound(data, 2) : lib.round(data, 0);
      case 'cal':
      case 'kj':
        return lib.round(data, 0);
      default:
        return data;
    }
  }
  if (yAxis) {
    switch (metric) {
      case 'time':
        return lib.secondsToTime;
      case 'dst':
        return lib.metersToMilesRound;
      case 'elev':
        return lib.metersToFeetRound;
      default:
        return null;
    }
  }
  return null;
};

// Only one type of date format on Strava as far as I can tell
// Have not found a setting to change date pref
// if I find more, will add them to this object
lib.dateFormating = (datePref) => {
  const dateFormats = {
    'D%m/%d/%Y': 'MM-DD-YYYY',
  };
  return dateFormats[`D${datePref}`];
};

// metric = 'speedS', 'speedL' 'dstS', 'dstL', 'temp' type: string
// mPref = true for SAE, false for Metric
// returns an object { display: , help: } : { display: , help: };
lib.mPrefLabel = (metric, mPref) => {
  switch (metric) {
    case ('speedS'):
      return mPref ?
      { display: 'fps', help: 'Feet per Second' } :
      { display: 'm/s', help: 'Meters / Second' };
    case ('speedL'):
      return mPref ?
      { display: 'mph', help: 'Miles per Hour' } :
      { display: 'km/h', help: 'Kilometers / Hour' };
    case ('dstS'):
      return mPref ?
      { display: 'ft', help: 'Feet' } :
      { display: 'm', help: 'Meters' };
    case ('dstL'):
      return mPref ?
        { display: 'mi', help: 'Miles' } :
        { display: 'km', help: 'Kilometers' };
    case ('temp'):
      return mPref ?
        { display: '°F', help: 'Fahrenheit' } :
        { display: '°C', help: 'Celsius' };
    default:
      return mPref ?
        { display: 'Imperial', help: '' } :
        { display: 'Metric', help: '' };
  }
};

lib.dateFormat = (date, datePref) => format(date, lib.dateFormating(datePref));

lib.getLastInArray = (arr, arrType) => {
  let item;
  if (arr && arr.length > 0 && arr[arr.length - 1][arrType] != null) {
    item = arr[arr.length - 1][arrType];
  }
  return item;
};

export default lib;
