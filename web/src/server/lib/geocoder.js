const NodeGeocoder = require('node-geocoder');
const hlpr = require('./helpers');

const geoOptions = {
  provider: 'google',
  apiKey: process.env.GOOGLE_MAPS, // see Config file
  formatter: null,
};

const geocoder = NodeGeocoder(geoOptions);

// EVENTS --------------------------------------------------------------------
// callGeoCoder shuffles in the Geocode info from Google
// for new events, (req.body, {}, cb)
// for edit events, (req.body, event from db, cb)
exports.eventGeocoder = (toSave, event, res) => {
  const result = toSave;
  const geoQuery = `${toSave.eventLocStreet || event.eventLocStreet || ''},
  ${toSave.eventLocCity || event.eventLocCity || ''},
  ${toSave.eventLocState || event.eventLocState || ''},
  ${toSave.eventLocCountry || event.eventLocCountry || ''},
  ${toSave.eventLocZip || event.eventLocZip || ''},`;
  hlpr.consLog([geoQuery]);

  geocoder.geocode(geoQuery, (err, geoRes) => {
    if (geoRes.length === 0 || err) return res(err, toSave);
    hlpr.consLog(['callGeoCoder', 'geoRes', geoRes, 'err', err]);
    if (geoRes[0] && geoRes[0].extra.confidence >= 0.9) {
      result.eventGeoFormattedAddress = geoRes[0].formattedAddress;
      result.eventLocCity = geoRes[0].city;
      result.eventLocState = geoRes[0].administrativeLevels.level1long;
      result.eventLocCountry = geoRes[0].country;
      result.eventLocZip = geoRes[0].zipcode;
    }
    result.eventGeoCoordinates = [geoRes[0].longitude, geoRes[0].latitude];
    result.eventGeoLongitude = geoRes[0].longitude;
    result.eventGeoLatitude = geoRes[0].latitude;
    result.eventGeoLevel1Long = geoRes[0].administrativeLevels.level1long;
    result.eventGeoLevel2Long = geoRes[0].administrativeLevels.level2long;
    result.eventGeoStreetNumber = geoRes[0].streetNumber;
    result.eventGeoStreetName = geoRes[0].streetName;
    result.eventGeoCity = geoRes[0].city;
    result.eventGeoCountry = geoRes[0].country;
    result.eventGeoCountryCode = geoRes[0].countryCode;
    result.eventGeoZipCode = geoRes[0].zipcode;
    result.eventGeoProvider = geoRes[0].provider;
    return res(err, result);
  });
};

// USER --------------------------------------------------------------------

exports.userGeocoder = (toSave, user, res) => {
  const result = toSave;
  const geoQuery = `${toSave.userLocStreet || user.userLocStreet || ''},
  ${toSave.userLocCity || user.userLocCity || user.loc_city || ''},
  ${toSave.userLocState || user.userLocState || user.loc_state || ''},
  ${toSave.userLocCountry || user.userLocCountry || user.loc_country || ''},
  ${toSave.userLocZip || user.userLocZip || ''},`;
  hlpr.consLog([geoQuery]);

  geocoder.geocode(geoQuery, (err, geoRes) => {
    if (geoRes.length === 0 || err) return res(err, toSave);
    hlpr.consLog(['callGeoCoder', 'geoRes', geoRes, 'err', err]);
    if (geoRes[0] && geoRes[0].extra.confidence >= 0.9) {
      result.userGeoFormattedAddress = geoRes[0].formattedAddress;
      result.userLocCity = geoRes[0].city;
      result.userLocState = geoRes[0].administrativeLevels.level1long;
      result.userLocCountry = geoRes[0].country;
      result.userLocZip = geoRes[0].zipcode;
    }
    result.userGeoCoordinates = [geoRes[0].longitude, geoRes[0].latitude];
    result.userGeoLongitude = geoRes[0].longitude;
    result.userGeoLatitude = geoRes[0].latitude;
    result.userGeoLevel1Long = geoRes[0].administrativeLevels.level1long;
    result.userGeoLevel2Long = geoRes[0].administrativeLevels.level2long;
    result.userGeoStreetNumber = geoRes[0].streetNumber;
    result.userGeoStreetName = geoRes[0].streetName;
    result.userGeoCity = geoRes[0].city;
    result.userGeoCountry = geoRes[0].country;
    result.userGeoCountryCode = geoRes[0].countryCode;
    result.userGeoZipCode = geoRes[0].zipcode;
    result.userGeoProvider = geoRes[0].provider;
    return res(err, result);
  });
};
