const moment = require('moment');

const resorces = require('../lib/resources');
const hlpr = require('../lib/helpers');

// TODO Do get request to Open Weather Map
// input.resTarget: 'owmForcast', 'googleMaps'
// input.resType: 'elevation', 'timezone'
// input.loc: '-122.1439698,37.426941'

exports.resource = (req, res) => {
  // const loc = req.params.loc.split(',');
  const input = {
    resTarget: req.params.resTarget,
    loc: req.query.loc,
  };

  resorces.rLonLat(input, (output) => {
    return res.send(output);
  });
};
//   hlpr.consLog(['getFiveDay', loc]);
//   requestify.request(`http://api.openweathermap.org/data/2.5/forecast?lat=${loc[1]}&lon=${loc[0]}&APPID=${apiKey}`, {
//     method: 'GET',
//   }).then((response) => {
//
//   }).catch((response) => {
//     hlpr.consLog(['getFiveDay catch', response]);
//     return res.send({error: 'Failed: fiveday request'});
//   });
// };
