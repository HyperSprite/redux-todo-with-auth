const mbPolyline = require('polyline');
const resources = require('./resources');

/**
* Takes polyline and returns start and end lat/lon/elev
*/
module.exports = (polyline, result) => {
  if (!polyline) {
    result({});
  }
  const cooArr = mbPolyline.decode(polyline);
  /**
  * polyline decode returns array of arrays
  *   [[38.5, -120.2], [40.7, -120.95]]
  *   [[ lat,   lng ], [ lat,    lng ]]
  */
  const geoStart = [cooArr[0][1], cooArr[0][0]];
  const geoEnd = [cooArr[cooArr.length - 1][1], cooArr[cooArr.length - 1][0]];
  resources.rLonLat({ loc: polyline, samples: 500 }, 'elevationpath', (rslt) => {
    /**
    * rLatLng returns array of objects
    * {
        "elevation" : 1987.576904296875,
        "location" : {
        "lng" : -120.1198445639192,
        "lat" : 39.26963554253002
        },
      }
    */
    if (!rslt.elevationpath.length) {
      return { geoStart, geoEnd };
    }
    const resultData = {
      geoStart,
      geoEnd,
      elevatoinPath: rslt.elevationpath,
      elevationStart: rslt.elevationpath[0] && rslt.elevationpath[0].elevation,
      elevationEnd: rslt.elevationpath[rslt.elevationpath.length - 1] && rslt.elevationpath[rslt.elevationpath.length - 1].elevation,
    };
    return result(resultData);
  });
};
