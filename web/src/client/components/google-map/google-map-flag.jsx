import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  text: PropTypes.string.isRequired,
};

const GoogleMapFlag = ({ text }) => (
  <div
    style={{ backgroundColor: '#FAFAFA', width: 40, height: 10, color: '#B71C1C' }}
  >
    {text}
  </div>);

GoogleMapFlag.propTypes = propTypes;

export default GoogleMapFlag;
