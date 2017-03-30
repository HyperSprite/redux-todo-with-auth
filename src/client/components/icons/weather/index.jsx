import React, { PropTypes } from 'react';

import './style/weather.css';
import './style/weather-icons.css';
import './style/weather-icons-wind.css';

const propTypes = {
  icon: PropTypes.string.isRequired,
  wind: PropTypes.bool,
  iconStyle: PropTypes.string,
};

const defaultProps = {
  wind: false,
  iconStyle: 'wi-standard',
};

const weatherIcon = ({ ...opts }) => (
  <div>
    {opts.icon ? (
      <i className={`wi ${opts.wind ? 'wi-wind' : null} ${opts.icon} ${opts.iconStyle}`} />
    ) : (
      <i className="wi wi-na" />
    )}

  </div>
);

weatherIcon.propTypes = propTypes;
weatherIcon.defaultProps = defaultProps;

export default weatherIcon;
