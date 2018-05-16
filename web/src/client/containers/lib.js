import { format } from 'date-fns';

const lib = {};

lib.googlemapbylnglat = lnglat => `https://www.google.com/maps/search/?api=1&query=${lnglat[1]},${lnglat[0]}`;


// Only one type of date format on Strava as far as I can tell
// Have not found a setting to change date pref
// if I find more, will add them to this object
lib.dateFormating = (datePref) => {
  const dateFormats = {
    Dutc: 'YYYY-MM-DD',
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

lib.dateStringFormat = (date, datePref = '%m/%d/%Y') => {
  const dateObj = { YYYY: 0, MM: 1, DD: 2 };
  const datePrefArr = lib.dateFormating(datePref).split('-');
  const dateArr = date.toString().split(/[-T/]+/);
  const dateStringResult = datePrefArr.map(dPA => dateArr[dateObj[dPA]]).join('-');
  return dateStringResult;
};

lib.numbersOnly = value => value.replace(/[^0-9.-]+/g, '');
lib.alphaNumbersOnly = value => value.replace(/[^a-zA-Z0-9]/g, '');

lib.axiosConfig = {
  headers: {
    authorization: localStorage.getItem('token'),
  },
};

lib.debounce = (func, wait, immediate) => {
  let timeout;
  return () => {
    const context = this;
    const args = arguments;
    const later = () => {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};


export default lib;
