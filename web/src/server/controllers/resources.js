const resorces = require('../lib/resources');
const hlpr = require('../lib/helpers');

// input.resTarget: 'elevation', 'timezone'
// input.loc: '-122.1439698,37.426941'
// input.date: '2017-02-03T19:15:03Z' // date string
// test with Postman
// localhost:3080/apiv1/resource/astrophases/?loc=-122.1439698,37.426941&date=3/20/2017&tzOffset=-28800
// localhost:3080/apiv1/resource/timezone/?loc=-122.1439698,37.426941&date=1458000000
// localhost:3080/apiv1/resource/elevation/?loc=-122.1439698,37.426941
// localhost:3080/apiv1/resource/weatherforcast/?loc=-122.1439698,37.426941

exports.resource = (req, res) => {
  // const loc = req.params.loc.split(',');
  const input = {
    resTarget: req.params.resTarget,
    loc: req.query.loc, // lon, lat
    date: req.query.date, // will be converted to seconds
    tzOffset: req.query.tzOffset, // in seconds -28800 (-8 hours)
    dstOffset: req.query.dstOffset, // in seconds 3600 ( 1 hour)
  };
  hlpr.consLog(['controller, resources input', input]);

  resorces.rLonLat(input, input.resTarget, output => res.send(output));
};
