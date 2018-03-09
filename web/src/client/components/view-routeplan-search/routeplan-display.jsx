import React from 'react';
import PropTypes from 'prop-types';

import CardSmall from '../card-small';
import RouteView from '../route-view';

const RouteplanDisplay = (props) => {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {props.routeplans.map(routeData => (
        <CardSmall key={routeData.routeplanId}>
          <RouteView
            routeData={routeData}
            mPref={props.mPref}
            height={300}
          />
        </CardSmall>
      ))}
    </div>
  );
};

export default RouteplanDisplay;
