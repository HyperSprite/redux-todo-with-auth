const requestify = require('requestify');
const moment = require('moment');
const hlpr = require('./helpers');

const OwmAPIKey = process.env.OPEN_WEATHER_MAP;
const gMapsAPIKey = process.env.GOOGLE_MAPS;

// target: 'weatherforcast', 'elevation', 'timezone', astrophases
// input.loc: '-122.1439698,37.426941'
exports.rLonLat = ({ loc, date, tzOffset = 0, dstOffset = 0 }, target, output) => {
  const sLoc = loc.split(',');
  hlpr.consLog(['resources.rLonLat', date, typeof date]);
  const timestamp = moment(date).format('X');
  let timeOffset = 0;
  if (tzOffset) {
    timeOffset = ((tzOffset * 1) + (dstOffset * 1)) / 3600;
  }


  hlpr.consLog(['input.date', date, 'timeOffset', timeOffset, 'tzOffset', tzOffset, 'dstOffset', dstOffset, 'timestamp', timestamp, 'datestamp']);
  // TODO remove sample date from astrophases and set real date
  const resourceMap = {
    weatherforcast: {
      url: `http://api.openweathermap.org/data/2.5/forecast?lat=${sLoc[1]}&lon=${sLoc[0]}&APPID=${OwmAPIKey}`,
    }, // body: { ...see this https://openweathermap.org/forecast5 }
    elevation: {
      url: `https://maps.googleapis.com/maps/api/elevation/json?locations=${sLoc[1]},${sLoc[0]}&key=${gMapsAPIKey}`,
    }, // body: {results: [ { elevation: 10.85572719573975, location: { lat: 37.426941, lng: -122.1439698 }, resolution: 4.771975994110107 } ], status: OK }
    distance: {
      url: `https://maps.googleapis.com/maps/api/distance/json?location=${loc}&key=${gMapsAPIKey}`,
    },
    timezone: {
      url: `https://maps.googleapis.com/maps/api/timezone/json?location=${sLoc[1]},${sLoc[0]}&timestamp=${timestamp}&key=${gMapsAPIKey}`,
    }, // body: { dstOffset: 3600, rawOffset: -28800, status: 'OK', timeZoneId : 'America/Los_Angeles;, timeZoneName: 'Pacific Daylight Time' }
    astrophases: {
      url: `http://api.usno.navy.mil/rstt/oneday?date=${date}&coords=${sLoc[1]}N,${sLoc[0]}E&tz=${timeOffset}`,
    }, // body: "astrophases": {  ...see this http://aa.usno.navy.mil/data/docs/api.php#phase }
  };

  // hlpr.consLog(['rLonLat', resourceMap[target].url]);
  requestify.request(resourceMap[target].url, {
    method: 'GET',
    cache: {
      cache: true, // Will set caching to true for this request.
      expires: 3.6e+6, // (1 hour = 3.6e+6) Time for cache to expire in milliseconds
    },
  }).then((response) => {
    // hlpr.consLog(['lib.resources.then', response.getBody()]);
    const result = {
      output: {},
    };
    result.outputParsed = response.getBody();
    if (target === 'weatherforcast' && result.outputParsed.cod === '200') {
      result.output.location = loc;
      result.output.weatherforcast = result.outputParsed.list;
      return output(result.output);
    }

    if (target === 'astrophases') {
      result.output.astrophases = result.outputParsed;
      return output(result.output);
    }

    if (result.outputParsed.status === 'OK') {
      // hlpr.consLog(['lib: result:', result]);
      if (target === 'elevation') {
        result.output.elevation = result.outputParsed.results[0].elevation;
        // hlpr.consLog(['result', result]);
      } else if (target === 'timezone') {
        result.output.timezone = result.outputParsed;
      }
      return output(result.output);
    }
    return output({ [target]: null });
  }).fail((response) => {
    hlpr.consLog(['Error resources.rLonLat', response]);
    return output({ [target]: null });
  });
};
