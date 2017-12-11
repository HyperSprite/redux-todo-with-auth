import lib from './lib';

const validDateString = '2017-12-07T23:39:40Z';
const uncommonDateString = '2017/12/07';
const datePref = '%m/%d/%Y';
const adjustedElev500 = 0.500 - (24.55533409118652 * 0.01);
const adjustedElev6000 = 6.000 - (24.55533409118652 * 0.01);
const arrOfObj = [
  { weight: 63, ftp: 250 },
  { weight: 63.1, ftp: 251 },
  { weight: 63.2, ftp: 252 },
  { weight: 63.3, ftp: 253 },
  { weight: 63.4, ftp: 254 },
  { weight: 63.5, ftp: 255 },
]

describe('round number to X place', () => {
  test('1.5 - returns 2', () => {
    expect(lib.round(1.5)).toEqual(2);
  });
  test('2.4 - returns 2', () => {
    expect(lib.round(2.4)).toEqual(2);
  });
  test('2.5 - returns 3', () => {
    expect(lib.round(2.5)).toEqual(3);
  });
  test('1.535, 2 - returns 1.54', () => {
    expect(lib.round(1.535, 2)).toEqual(1.54);
  });
  test('1.525, 2 - returns 1.52', () => {
    expect(lib.round(1.525, 2)).toEqual(1.53);
  });
});

describe('secondsToTime takes unix seconds and returns H:mm', () => {
  test('1512947840 to 23:17', () => {
    expect(lib.secondsToTime(1512947840)).toEqual('23:17');
  });
});

describe('kgToPounds number to number', () => {
  test('8kg returns 17.63696lbs', () => {
    expect(lib.kgToPounds(8)).toEqual(17.63696);
  });
  test('321.6kg returns 709.005792lbs', () => {
    expect(lib.kgToPounds(321.6)).toEqual(709.005792);
  });
});

describe('kgToPoundsRound number to number at X place', () => {
  test('8kg, 3 returns 17.63696lbs', () => {
    expect(lib.kgToPoundsRound(8, 3)).toEqual(17.637);
  });
  test('321.6kg returns 709.005792lbs', () => {
    expect(lib.kgToPoundsRound(321.1, 2)).toEqual(707.9);
  });
});

describe('metersToFeet', () => {
  test('10000 to 32808.4', () => {
    expect(lib.metersToFeet(10000)).toEqual(32808.4);
  });
});

describe('metersToFeetRound', () => {
  test('10000 to 32808', () => {
    expect(lib.metersToFeetRound(10000, 0)).toEqual(32808);
  });
  test('10040 to 32939.63', () => {
    expect(lib.metersToFeetRound(10040, 2)).toEqual(32939.63);
  });
});

describe('metersToMiles', () => {
  test('10000 to 6.2137121212121', () => {
    expect(lib.metersToMiles(10000)).toEqual(6.2137121212121);
  });
  test('357274 to 221.9997784393932', () => {
    expect(lib.metersToMiles(357274)).toEqual(221.9997784393932);
  });
});

describe('metersToMilesRound', () => {
  test('10000 to 6.21', () => {
    expect(lib.metersToMilesRound(10000, 2)).toEqual(6.21);
  });
  test('357274 to 222', () => {
    expect(lib.metersToMilesRound(357274, 0)).toEqual(222);
  });
});

describe('metersToKm', () => {
  test('1000 to 1', () => {
    expect(lib.metersToKm(1000)).toEqual(1);
  });
  test('123450 to 12.3450', () => {
    expect(lib.metersToKm(123450)).toEqual(123.45);
  });
});

describe('metersToKmRound', () => {
  test('123456789 to 123456.79', () => {
    expect(lib.metersToKmRound(123456789, 2)).toEqual(123456.79);
  });
  test('123456789 to 123457', () => {
    expect(lib.metersToKmRound(123456789, 0)).toEqual(123457);
  });
});

describe('divideAndRound', () => {
  test('240, 190, 2 to ', () => {
    expect(lib.divideAndRound(240, 190, 2)).toEqual(1.26);
  });
  test('240, 190, 4 to ', () => {
    expect(lib.divideAndRound(240, 190, 4)).toEqual(1.2632);
  });
  test('24035, 190, 2 to ', () => {
    expect(lib.divideAndRound(240, 190, 1)).toEqual(1.3);
  });
});

describe('percentFTPAcc', () => {
  test('250 elv - (user elevation of 25) ', () => {
    expect(lib.percentFTPAcc(adjustedElev500)).toEqual(99.3440390731329);
  });
  test('6000 elv - (user elevation of 25) ', () => {
    expect(lib.percentFTPAcc(adjustedElev6000)).toEqual(51.87925623316708);
  });
});

describe('percentFTPNAcc', () => {
  test('250 elv - (user elevation of 25) ', () => {
    expect(lib.percentFTPNAcc(adjustedElev500)).toEqual(98.87475177375516);
  });
  test('6000 elv - (user elevation of 25) ', () => {
    expect(lib.percentFTPNAcc(adjustedElev6000)).toEqual(63.14491042539609);
  });
});

/*
* metric = 'time', 'dst', 'elev', 'cal', 'kj' type: string
* yAxis = bool - for recharts
* data = non-formatted number, like time in seconds, dist in meters.
* mPref = true for Imperial, false for Metric
*/

describe('statsConversions', () => {
  test('time, false, 1512947840', () => {
    expect(lib.statsConversions('time', false, 1512947840)).toEqual('23:17');
  });
  test('dst, false, 15129, false', () => {
    expect(lib.statsConversions('dst', false, 15129, false)).toEqual(15.1);
  });
  test('dst, false, 15129, true', () => {
    expect(lib.statsConversions('dst', false, 15129, true)).toEqual(9.4);
  });
  test('elev, false, 1512.9352, false', () => {
    expect(lib.statsConversions('elev', false, 1512.9352, false)).toEqual(1513);
  });
  test('elev, false, 1512.9352, true', () => {
    expect(lib.statsConversions('elev', false, 1512.9352, true)).toEqual(4964);
  });
  test('cal, false, 1512.9352, false', () => {
    expect(lib.statsConversions('cal', false, 1512.9352, false)).toEqual(1513);
  });
  test('kj, false, 1512.9352, false', () => {
    expect(lib.statsConversions('kj', false, 1512.9352, false)).toEqual(1513);
  });
});

/**
* metric = 'speedS', 'speedL' 'dstS', 'dstL', 'temp' type: string
* mPref = true for SAE, false for Metric
* returns an object { display: , help: } : { display: , help: };
*/

describe('mPrefLabel', () => {
  test('speedS, false', () => {
    expect(JSON.stringify(lib.mPrefLabel('speedS', false))).toEqual(JSON.stringify({ display: 'm/s', help: 'Meters / Second' }));
  });
  test('speedS, true', () => {
    expect(JSON.stringify(lib.mPrefLabel('speedS', true))).toEqual(JSON.stringify({ display: 'fps', help: 'Feet per Second' }));
  });
  test('speedL, false', () => {
    expect(JSON.stringify(lib.mPrefLabel('speedL', false))).toEqual(JSON.stringify({ display: 'km/h', help: 'Kilometers / Hour' }));
  });
  test('speedL, true', () => {
    expect(JSON.stringify(lib.mPrefLabel('speedL', true))).toEqual(JSON.stringify({ display: 'mph', help: 'Miles per Hour' }));
  });
  test('dstS, false', () => {
    expect(JSON.stringify(lib.mPrefLabel('dstS', false))).toEqual(JSON.stringify({ display: 'm', help: 'Meters' }));
  });
  test('dstS, true', () => {
    expect(JSON.stringify(lib.mPrefLabel('dstS', true))).toEqual(JSON.stringify({ display: 'ft', help: 'Feet' }));
  });
  test('dstL, false', () => {
    expect(JSON.stringify(lib.mPrefLabel('dstL', false))).toEqual(JSON.stringify({ display: 'km', help: 'Kilometers' }));
  });
  test('dstL, true', () => {
    expect(JSON.stringify(lib.mPrefLabel('dstL', true))).toEqual(JSON.stringify({ display: 'mi', help: 'Miles' }));
  });
  test('temp, false', () => {
    expect(JSON.stringify(lib.mPrefLabel('temp', false))).toEqual(JSON.stringify({ display: '°C', help: 'Celsius' }));
  });
  test('temp, true', () => {
    expect(JSON.stringify(lib.mPrefLabel('temp', true))).toEqual(JSON.stringify({ display: '°F', help: 'Fahrenheit' }));
  });
  test('null, false', () => {
    expect(JSON.stringify(lib.mPrefLabel(null, false))).toEqual(JSON.stringify({ display: 'Metric', help: '' }));
  });
  test('null, true', () => {
    expect(JSON.stringify(lib.mPrefLabel(null, true))).toEqual(JSON.stringify({ display: 'Imperial', help: '' }));
  });
});

describe('getLastInArray', () => {
  test('arrOfObj weight to 63.5', () => {
    expect(lib.getLastInArray(arrOfObj, 'weight')).toEqual(63.5);
  });
  test('arrOfObj ftp to 255', () => {
    expect(lib.getLastInArray(arrOfObj, 'ftp')).toEqual(255);
  });
});

describe('dateFormat accpts string date/time and returns user pref format', () => {
  test('Returns MM-DD-YYYY with datePref %m/%d/%Y', () => {
    expect(lib.dateFormat('2017-12-07T23:39:40Z', datePref)).toEqual('12-07-2017');
  });
  test('Returns MM-DD-YYYY', () => {
    expect(lib.dateFormat('2017-12-07T23:39:40Z')).toEqual('12-07-2017');
  });
  test('Returns YYYY-MM-DD with uncommonDateString', () => {
    expect(lib.dateFormat(uncommonDateString, datePref)).toEqual('12-07-2017');
  });
  test('Returns DD-MM-YYYY', () => {
    expect(lib.dateFormat('2017-12-07T23:39:40Z', '%d/%m/%Y')).toEqual('07-12-2017');
  });
});

describe('dateStringFormat accpts string date/time and returns user pref format', () => {
  test('Returns MM-DD-YYYY (default)', () => {
    expect(lib.dateStringFormat('2017-12-07T23:39:40Z')).toEqual('12-07-2017');
  });
  test('Returns MM-DD-YYYY with datePref "MM-DD-YYYY"', () => {
    expect(lib.dateStringFormat('2017-12-07T23:39:40Z', 'MM-DD-YYYY')).toEqual('12-07-2017');
  });
  test('Returns DD-MM-YYYY with datePref "DD-MM-YYYY"', () => {
    expect(lib.dateStringFormat('2017-12-07T23:39:40Z', 'DD-MM-YYYY')).toEqual('07-12-2017');
  });
  test('Returns YYYY-MM-DD with uncommonDateString', () => {
    expect(lib.dateStringFormat(uncommonDateString)).toEqual('12-07-2017');
  });
});
