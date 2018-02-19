import React from 'react';
import PropTypes from 'prop-types';
import ExtGeolocation from '@hypersprite/react-geolocation-hoc';

import GoogleMapLocation from './google-map-location';

const ExtGoogleMapWithLocation = (props) => {
  return (
    <div>
      {(props.lat) ? (
        <GoogleMapLocation
          {...props}
        />
      ) : (
        <div style={{ width: 200, height: 400 }} >
          <h3>Waiting for user verification.</h3>
          <p>Allow Location Access: We can use your current location.</p>
          <p>Block Location Access: We can use your Strava City settings.</p>
        </div>
      )}
    </div>
  );
};

export default ExtGeolocation(ExtGoogleMapWithLocation);
