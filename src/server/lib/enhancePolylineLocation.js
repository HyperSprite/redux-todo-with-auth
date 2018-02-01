const mbPolyline = require('polyline');
const resources = require('./resources');

/**
* Takes polyline and returns start and end lat/lon/elev
*/
module.exports = (polyline, meters, result) => {
  const cooArr = mbPolyline.decode(polyline);
  resources.rLonLat({ loc: polyline, samples: Math.floor(meters * 0.001) }, 'elevationpath', (rslt) => {
    const resultData = {
      geoStart: [cooArr[0][1], cooArr[0][0]],
      geoEnd: [cooArr[cooArr.length - 1][1], cooArr[cooArr.length - 1][0]],
      elevatoinPath: rslt.elevationpath,
      elevationStart: rslt.elevationpath[0] && rslt.elevationpath[0].elevation,
      elevationEnd: rslt.elevationpath[rslt.elevationpath.length - 1] && rslt.elevationpath[rslt.elevationpath.length - 1].elevation,
    };
    return result(resultData);
  });
};
