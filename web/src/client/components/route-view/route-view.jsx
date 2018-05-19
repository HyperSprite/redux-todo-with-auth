import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';
import OpenInNewIcon from 'mdi-react/OpenInNewIcon';

import VisibilitySensorLock from '../../containers/visibility-sensor-lock';
import returnValues from './return-values';
import ActivityMetric from '../activity-metric';
import Icon from '../icon';
import GoogleMapWithPolyline from '../google-map';

const propTypes = {
  height: PropTypes.number.isRequired,
  mPref: PropTypes.bool.isRequired,
  routeData: PropTypes.object.isRequired,
};

const RouteView = (props) => {
  const { height, mPref, routeData } = props;
  if (!routeData.routeplanId) {
    return (
      <Card style={{ marginBottom: 5, marginTop: 5 }}>
        <ActivityMetric
          key={routeData.error}
          rV={{
            activityType: 'error',
            activityLabel: 'Error',
          }}
          data={routeData}
        />
      </Card>
    );
  }

  return (
    <div>
      {routeData.routeplanId ? (
        <Card style={{ marginBottom: 5, marginTop: 5 }}>

          <VisibilitySensorLock >
            { routeData.map && <GoogleMapWithPolyline {...routeData} height={height} /> }
          </VisibilitySensorLock>

          <CardHeader
            title={(
              <div>
                {routeData.name}
                <IconButton
                  onClick={() => window.open(`https://www.strava.com/routes/${routeData.routeplanId}`, '_new')}
                >
                  <Icon pointer inverse>
                    <OpenInNewIcon />
                  </Icon>
                </IconButton>
              </div>
            )}
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
      ) : null}
    </div>

  );
};

RouteView.propTypes = propTypes;

export default RouteView;
