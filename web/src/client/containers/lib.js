import { addSeconds, startOfDay, format } from 'date-fns';

const lib = {};

lib.round = (val, place = 0) => Number(Math.round(val + `e${place}`) + `e-${place}`);

lib.isValid = (val, type) => {
  switch (type) {
    case 's' :
      return typeof val === 'string';
    default:
      return Number.isFinite(val);
  }
};

lib.secondsToTime = seconds => format(addSeconds(startOfDay(new Date()), seconds), 'H:mm');
lib.kgToPounds = kg => kg * 2.20462;
lib.kgToPoundsRound = (kg, p) => lib.round(kg * 2.20462, p);
lib.metersToFeet = m => m * 3.28084;
lib.metersToFeetRound = (m, p) => lib.round(m * 3.28084, p);
lib.metersToMiles = m => m * 0.00062137121212121;
lib.metersToMilesRound = (m, p) => lib.round(m * 0.00062137121212121, p);
lib.metersToKm = m => m / 1000;
lib.metersToKmRound = (m, p) => lib.round(m / 1000, p);
lib.divideAndRound = (divideThis, byThis, p) => {
  if (!lib.isValid(divideThis) || !lib.isValid(byThis || !byThis)) {
    return 0;
  }
  return lib.round(((divideThis * 1) / (byThis * 1)), p);
};

lib.difficultyIndex = (totalEleGain, distance) => {
  return lib.round(lib.divideAndRound(totalEleGain, distance, 6) * 200, 2);
};

/**
* percentFTPAcc takes (elevation - user.elevation * 0.01) and returns acclimated power
* percentFTPNAcc takes (elevation - user.elevation * 0.01) and returns non acclimated power
* e.g adjustedElev would be .500 - .025
*/
lib.percentFTPAcc = adjustedElev => -1.12 * (Math.pow(adjustedElev, 2)) - 1.90 * adjustedElev + 99.9;
lib.percentFTPNAcc = adjustedElev => 0.178 * (Math.pow(adjustedElev, 3)) - 1.43 * (Math.pow(adjustedElev, 2)) - (4.07 * adjustedElev) + 100;

/**
* metric = 'time', 'dst', 'elev', 'cal', 'kj' type: string
* yAxis = bool - for recharts
* data = non-formatted number, like time in seconds, dist in meters.
* mPref = true for Imperial, false for Metric
*/
lib.statsConversions = (metric, yAxis, data, mPref) => {
  if (data || data === 0) {
    switch (metric) {
      case 'time':
        return lib.secondsToTime(data);
      case 'dst':
        return mPref ? lib.metersToMilesRound(data, 1) : lib.metersToKmRound(data, 1);
      case 'elev':
        return mPref ? lib.metersToFeetRound(data, 0) : lib.round(data, 0);
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

lib.getLastInArray = (arr, arrType) => {
  let item;
  if (arr && arr.length > 0 && arr[arr.length - 1][arrType] != null) {
    item = arr[arr.length - 1][arrType];
  }
  return item;
};

// Only one type of date format on Strava as far as I can tell
// Have not found a setting to change date pref
// if I find more, will add them to this object
lib.dateFormating = (datePref) => {
  const dateFormats = {
    'D%m/%d/%Y': 'MM-DD-YYYY',
    'D%d/%m/%Y': 'DD-MM-YYYY',
  };
  return dateFormats[`D${datePref}`];
};

lib.dateFormat = (date, datePref = '%m/%d/%Y') => format(date, lib.dateFormating(datePref));

/*
* Function below no longer needed but it was fun to write so I left it here down here.
* Can be removed (also make sure to remove test).
* dateFormat above does the same thing.
*
* Formats a Strava date string into datePref
* strava date string example: 2017-12-07T23:39:40Z
*
* create an object to map over for placement
* Split the datePrefArr, default should return ['MM', 'DD', 'YYYY']
*
* Split dateString on - and T chars,
* Example above returns: ['2017', '12', '07', '23:39:40Z']
*
* Map over datePrefArr and return string in proper order
* using the dateObj[dPA] to match the element by index.
*/
lib.dateStringFormat = (dateString, datePref = 'MM-DD-YYYY') => {
  const dateObj = { YYYY: 0, MM: 1, DD: 2 };
  const datePrefArr = datePref.split('-');
  const dateArr = dateString.split(/[-T/]+/);
  const dateStringResult = datePrefArr.map(dPA => dateArr[dateObj[dPA]]).join('-');
  return dateStringResult;
};

export default lib;
