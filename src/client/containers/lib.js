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
lib.metersToKmRound = (m, p = 0) => lib.round(m * 1000, p);

// Only one type of date format on Strava as far as I can tell
// Have not found a setting to change date pref
// if I find more, will add them to this object
lib.dateFormating = (datePref) => {
  const dateFormats = {
    'D%m/%d/%Y': 'MM-DD-YYYY',
  };
  return dateFormats[`D${datePref}`];
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
