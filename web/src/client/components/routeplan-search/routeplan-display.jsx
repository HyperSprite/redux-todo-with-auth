import React from 'react';
import PropTypes from 'prop-types';

import RouteView from '../route-view';

const RouteplanDisplay = (props) => {

  console.dir(props);
  return (
    <div>
      {props.routeplans.map(routeData => (
        <RouteView
          key={routeData.routeplanId}
          routeData={routeData}
          mPref={props.mPref}
        />
      ))}
    </div>
  );
};

export default RouteplanDisplay;
