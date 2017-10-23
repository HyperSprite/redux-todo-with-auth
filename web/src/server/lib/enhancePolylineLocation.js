const googlePolyline = require('google-polyline');
const resources = require('./resources');

/**
* Takes polyline and returns start and end lat/lon/elev
*/
module.exports = (polyline, result) => {
  const cooArr = googlePolyline.decode(polyline);
  const latLonStart = { loc: `${cooArr[0][1]},${cooArr[0][0]}` };
  const latLonEnd = { loc: `${cooArr[cooArr.length - 1][1]},${cooArr[cooArr.length - 1][0]}` };
  resources.rLonLat(latLonStart, 'elevation', (cbStart) => {
    resources.rLonLat(latLonEnd, 'elevation', (cbEnd) => {
      const resultData = {
        coordinatesStart: cooArr[0],
        coordinatesEnd: cooArr[cooArr.length - 1],
        elevationStart: cbStart.elevation,
        elevationEnd: cbEnd.elevation,
      };
      return result(resultData);
    });
  });
};
