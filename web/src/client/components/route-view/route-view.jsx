import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Card, CardHeader, CardMedia, CardTitle } from 'material-ui/Card';

import VisibilitySensorLock from '../../containers/visibility-sensor-lock';
import lib from '../../containers/lib';
import Static from './../form/static';
import GoogleMapWithPolyline from '../google-map';

const propTypes = {
  height: PropTypes.number.isRequired,
  mPref: PropTypes.bool.isRequired,
  routeData: PropTypes.object.isRequired,
};

const RouteView = (props) => {
  const { height, mPref, routeData } = props;
  return (
    <Card style={{ marginBottom: 5, marginTop: 5 }}>

      <VisibilitySensorLock >
        { routeData.map && <GoogleMapWithPolyline {...routeData} height={height} /> }
      </VisibilitySensorLock>

      <CardHeader
        title={routeData.name}
        subtitle={
          <a href={`https://www.strava.com/routes/${routeData.routeplanId}`}>
            {routeData.routeplanId}
          </a>
        }
      />

      <div style={{ marginLeft: 20, marginRight: 20 }}>

        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', margin: 20 }} >

          <Static
            contentLabel="Distance"
            content={`${lib.statsConversions('dst', null, routeData.distance, mPref)} ${lib.mPrefLabel('dstL', mPref).display}`}
            contentType="text"
          />
          <Static
            contentLabel="Elevation"
            content={`${lib.statsConversions('elev', null, routeData.elevation_gain, mPref)} ${lib.mPrefLabel('dstS', mPref).display}`}
            contentType="text"
          />
        </div>
      </div>
    </Card>
  );
};

RouteView.propTypes = propTypes;

export default RouteView;
