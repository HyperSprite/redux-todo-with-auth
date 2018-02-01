import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Card, CardHeader, CardMedia, CardTitle } from 'material-ui/Card';

import VisibilitySensorLock from '../../containers/visibility-sensor-lock';
// import lib from '../../containers/lib';
import returnValues from './return-values';
import ActivityMetric from '../activity-metric';
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
        title={
          <a href={`https://www.strava.com/routes/${routeData.routeplanId}`}>
            {routeData.name}
          </a>
        }
      />

      <div style={{ padding: '0 5px 10px 5px' }}>

        <div style={{ display: 'flex', flexWrap: 'wrap', margin: 5 }} >
          {returnValues.map(rV => (
            <ActivityMetric
              key={rV.activityType}
              rV={rV}
              data={routeData}
              mPref={mPref}
            />
          ))}
        </div>
      </div>
    </Card>
  );
};

RouteView.propTypes = propTypes;

export default RouteView;
