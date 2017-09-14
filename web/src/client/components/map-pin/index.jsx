import React from 'react';
import PropTypes from 'prop-types';
import FaMapPin from 'react-icons/lib/fa/map-pin';
import theme from '../../styles/theme';
import style from './style';

const propTypes = {
  /** Color for pin */
  color: PropTypes.string,
};

const defaultProps = {
  color: theme.textBoldColor,
};

const MapPin = ({ color }) => (
  <FaMapPin
    style={style}
    color={color}
  />
);

MapPin.propTypes = propTypes;
MapPin.defaultProps = defaultProps;

export default MapPin;
