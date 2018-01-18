import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
};

const Vignette = ({ height, width }) => (
  <div
    style={{
      // position: 'absolute',
      // boxShadow: 'inset 0px 0px 98px #030303',
      top: 0,
      left: 0,
      width,
      height,
      background: 'radial-gradient( circle, transparent 70%, #030303 160%)',
    }}
  />
);

Vignette.propTypes = propTypes;

export default Vignette;
