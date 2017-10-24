import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Card, CardHeader, CardMedia, CardTitle } from 'material-ui/Card';

import lib from '../../containers/lib';
import Static from './../form/static';
import ViewRouteMap from '../google-map';

const RouteView = (props) => {

  const { routeData, mPref } = props;
  return (
    <Card style={{ marginBottom: 5, marginTop: 5 }}>
      {routeData.map &&
        <ViewRouteMap {...routeData} />
      }
      <CardHeader
        title={routeData.name}
      />
      <div  style={{ marginLeft: 20, marginRight: 20 }}>

        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', margin: 20 }} >
          <Static
            contentLabel="Strava Route Link"
            content={routeData.routeplanId}
            contentType="url"
            baseURL="https://www.strava.com/routes/"
          />
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

// RouteView.propTypes = propTypes;

export default RouteView;
