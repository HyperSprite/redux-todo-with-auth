const requestify = require('requestify');
const moment = require('moment');
const hlpr = require('./helpers');

const OwmAPIKey = process.env.OPEN_WEATHER_MAP;
const gMapsAPIKey = process.env.GOOGLE_MAPS;

// input.resTarget: 'weatherforcast', 'elevation', 'timezone'
// input.loc: '-122.1439698,37.426941'
exports.rLonLat = (input, target, output) => {
  const loc = input.loc.split(',');
  const time = input.timestamp || moment();
  const timestamp = moment(time).format('X');

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

  hlpr.consLog(['rLonLat', resourceMap[target].url]);
  requestify.request(resourceMap[target].url, {
    method: 'GET',
    cache: {
      cache: true, // Will set caching to true for this request.
      expires: 3.6e+6, // (1 hour = 3.6e+6) Time for cache to expire in milliseconds
    },
  }).then((response) => {
    hlpr.consLog(['lib.resources.then', response.getBody()]);
    const result = {
      output: {},
    };
    result.outputParsed = response.getBody();
    if (target === 'weatherforcast' && result.outputParsed.cod === '200') {
      result.output.location = input.loc;
      result.output.weatherforcast = result.outputParsed.list;
      return output(result.output);
    }

    if (result.outputParsed.status === 'OK') {
      hlpr.consLog(['lib: result:', result]);
      if (target === 'elevation') {
        result.output.elevation = result.outputParsed.results[0].elevation;
        hlpr.consLog(['result', result]);
      } else if (target === 'timezone') {
        result.output.timezone = result.outputParsed;
      }
      return output(result.output);
    }
    return output({ [target]: null });
  }).fail((response) => {
    hlpr.consLog(['resources.rLonLat Error', response]);
    return output({ [target]: null });
  });
};
