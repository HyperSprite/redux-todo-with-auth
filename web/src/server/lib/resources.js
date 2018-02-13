const requestify = require('requestify');
const moment = require('moment');
const hlpr = require('./helpers');

const OwmAPIKey = process.env.OPEN_WEATHER_MAP;
const gMapsAPIKey = process.env.GOOGLE_MAPS;

const logObj = {
  file: 'lib/resources',
  logType: 'lib',
  level: 10,
};

// target: 'weatherforcast', 'elevation', elevationpath, 'timezone', astrophases
// input.loc: '-122.1439698,37.426941' or polyline
exports.rLonLat = ({ loc, samples, date, tzOffset = 0, dstOffset = 0 }, target, output) => {
  const sLoc = target === 'elevationpath' ? loc : loc.split(',');
  const timestamp = moment(date).format('X');
  let timeOffset = 0;
  if (tzOffset) {
    timeOffset = ((tzOffset * 1) + (dstOffset * 1)) / 3600;
  }

  hlpr.logOut(Object.assign({}, logObj, {
    func: `${logObj.file} default args setup`,
    logSubType: 'info',
    message: `${target} sLoc: ${sLoc.toString().substring(0, 30)} input.date: ${date} timeOffset: ${timeOffset} tzOffset: ${tzOffset} dstOffset ${dstOffset} timestamp: ${timestamp}`,
  }));

  // TODO remove sample date from astrophases and set real date
  const resourceMap = {
    weatherforcast: {
      url: `http://api.openweathermap.org/data/2.5/forecast?lat=${sLoc[1]}&lon=${sLoc[0]}&APPID=${OwmAPIKey}`,
    }, // body: { ...see this https://openweathermap.org/forecast5 }
    elevation: {
      url: `https://maps.googleapis.com/maps/api/elevation/json?locations=${sLoc[1]},${sLoc[0]}&key=${gMapsAPIKey}`,
    }, // body: {results: [ { elevation: 10.85572719573975, location: { lat: 37.426941, lng: -122.1439698 }, resolution: 4.771975994110107 } ], status: OK }
    elevationpath: {
      url: `https://maps.googleapis.com/maps/api/elevation/json?samples=${samples}&path=enc:${sLoc}&key=${gMapsAPIKey}`,
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

  requestify.request(resourceMap[target].url, {
    method: 'GET',
    cache: {
      cache: true, // Will set caching to true for this request.
      expires: 3.6e+6, // (1 hour = 3.6e+6) Time for cache to expire in milliseconds
    },
  }).then((response) => {
    const result = {
      output: {},
    };
    hlpr.logOut(Object.assign({}, logObj, {
      func: `${logObj.file} default response`,
      logSubType: 'info',
      message: `target ${target} target.url: ${resourceMap[target].url}`,
    }));
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
      hlpr.logOut(Object.assign({}, logObj, {
      }));
      switch (target) {
        case 'elevation':
          result.output.elevation = result.outputParsed.results[0].elevation;
          break;
        case 'elevationpath':
          result.output.elevationpath = result.outputParsed.results;
          break;
        case 'timezone':
          result.output.timezone = result.outputParsed;
          break;
        default:
          break;
      }
      return output(result.output);
    }
    return output({ [target]: null });
  }).fail((response) => {
    hlpr.logOut(Object.assign({}, logObj, {
      func: `${logObj.file} default`,
      level: 5,
      logSubType: 'error',
      message: `Error resources.rLonLat - ${sLoc.toString().substring(0, 30)} response ${response} target.url: ${resourceMap[target].url}`,
    }));
    return output({ [target]: null });
  });
};
