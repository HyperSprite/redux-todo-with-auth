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

lib.dateFormating = (dateFormat) => {
  const dateFormats = {
    'D%m/%d/%Y': 'MM-DD-YYYY',
  };
  return dateFormats[`D${dateFormat}`];
};

lib.dateFormat = (date, datePref) => format(date, lib.dateFormating(datePref));

export default lib;
