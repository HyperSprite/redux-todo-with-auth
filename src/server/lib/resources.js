const requestify = require('requestify');
const moment = require('moment');

const hlpr = require('./helpers');

const OwmAPIKey = process.env.OPEN_WEATHER_MAP;
const gElevationAPIKey = process.env.GOOGLE_MAPS;
const gMapsAPIKey = process.env.GOOGLE_MAPS;
const gTimezone = process.env.GOOGLE_MAPS;

// input.resTarget: 'weatherforcast', 'elevation', 'timezone'
// input.loc: '-122.1439698,37.426941'
exports.rLonLat = (input, output) => {
  const loc = input.loc.split(',');
  const time = input.timestamp || moment();
  const timestamp = 1458000000;// input.timestamp || moment(time).format('X');

  const resourceMap = {
    weatherforcast: {
      url: `http://api.openweathermap.org/data/2.5/forecast?lat=${loc[1]}&lon=${loc[0]}&APPID=${OwmAPIKey}`,
    },
    elevation: {
      url: `https://maps.googleapis.com/maps/api/elevation/json?locations=${loc[1]},${loc[0]}&key=${gMapsAPIKey}`,
    }, // body: {results: [ { elevation: 10.85572719573975, location: { lat: 37.426941, lng: -122.1439698 }, resolution: 4.771975994110107 } ], status: OK }
    distance: {
      url: `https://maps.googleapis.com/maps/api/${input.resType}/json?location=${input.loc}&key=${gMapsAPIKey}`,
    },
    timezone: {
      url: `https://maps.googleapis.com/maps/api/timezone/json?location=${loc[1]},${loc[0]}&timestamp=${timestamp}&key=${gMapsAPIKey}`,
    }, // body: { dstOffset: 3600, rawOffset: -28800, status: 'OK', timeZoneId : 'America/Los_Angeles;, timeZoneName: 'Pacific Daylight Time' }
  };

  hlpr.consLog(['rLonLat', resourceMap[input.resTarget].url]);
  requestify.request(resourceMap[input.resTarget].url, {
    method: 'GET',
  }).then((response) => {
    return output(response);
  }).catch((response) => {
    hlpr.consLog(['resources.rLonLat Error', response]);
    return output({ error: 'Failed: resources.rLonLat request' });
  });
};
