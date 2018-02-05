const mbPolyline = require('polyline');
const resources = require('./resources');

/**
*
* extended:
*   true will call rLonLat to return Elevation path along with geoStart, geoEnd
*   false will skip rLngLat and only return only geoStart, geoEnd
*
* examples of use:
*   routeplans controller uses extended: true and saves the returned polyline
*   activites controller uses extended: false as elevatoin is returned from Strava
*
* Takes google style polyline and returns:
* {
*   geoStart: [-120.2, 38.5], // lng, lat
*   geoEnd: [-120.95, 40.7], // /lng, lat
*   elevatoinPath: [
*     {
*       "elevation" : 1987.576904296875,
*       "location" : {
*       "lng" : -120.1198445639192,
*       "lat" : 39.26963554253002
*       },
*     },
*   ]
*   elevationStart: 1987.576904296875 // Number
*   elevationEnd: 1947.576904296875 // Number
* }
*
* Note: polyline decode returns array of arrays
*   [[38.5, -120.2], [40.7, -120.95]]
*   [[ lat,   lng ], [ lat,    lng ]]
*/
module.exports = (polyline, extended, result) => {
  if (!polyline) {
    result({});
  }
  const cooArr = mbPolyline.decode(polyline);
  const geoStart = [cooArr[0][1], cooArr[0][0]];
  const geoEnd = [cooArr[cooArr.length - 1][1], cooArr[cooArr.length - 1][0]];
  if (extended) {
    resources.rLonLat({ loc: polyline, samples: 500 }, 'elevationpath', (rslt) => {
      if (rslt.elevationpath && rslt.elevationpath.length) {
        const rsltElLen = rslt.elevationpath.length;
        const resultData = {
          geoStart,
          geoEnd,
          elevatoinPath: rslt.elevationpath,
          elevationStart: rslt.elevationpath[0] && rslt.elevationpath[0].elevation,
          elevationEnd: rslt.elevationpath[rsltElLen - 1] && rslt.elevationpath[rsltElLen - 1].elevation,
        };
        return result(resultData);
      }
      return { geoStart, geoEnd };
    });
  }
  return { geoStart, geoEnd };
};
