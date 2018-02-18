import { format } from 'date-fns';

const lib = {};

lib.googlemapbylnglat = lnglat => `https://www.google.com/maps/search/?api=1&query=${lnglat[1]},${lnglat[0]}`;


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

lib.cleanDateTime = (dateTime, datePref = '%m/%d/%Y') => {
  const date = format(dateTime.slice(0, 11), lib.dateFormating(datePref));
  const time = dateTime.slice(12, 19);
  return `${date} ${time}`;
};

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

lib.numbersOnly = value => value.replace(/[^0-9-]+/g, '');

export default lib;
