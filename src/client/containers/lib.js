import { addSeconds, startOfDay, format } from 'date-fns';

const lib = {};

lib.secondsToTime = seconds => format(addSeconds(startOfDay(new Date()), seconds), 'H:mm');
lib.kgToPounds = kg => kg * 2.20462;
lib.metersToFeet = m => m * 3.28084;
lib.metersToMiles = m => m * 0.00062137121212121;
lib.metersToKm = m => m * 1000;
lib.round = (val, place) => Number(Math.round(val + `e${place}`) + `e-${place}`);

lib.dateFormating = (dateFormat) => {
  const dateFormats = {
    'D%m/%d/%Y': 'MM-DD-YYYY',
  };
  return dateFormats[`D${dateFormat}`];
};

lib.dateFormat = (date, datePref) => format(date, lib.dateFormating(datePref));

export default lib;
