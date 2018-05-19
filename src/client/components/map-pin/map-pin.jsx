import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import FaMapPin from 'react-icons/lib/fa/map-pin';

const propTypes = {
  // classes: PropTypes.object.isRquired,
  /** Color for pin */
  color: PropTypes.string,
};

const defaultProps = {
  // classes: {},
  color: '',
};

const styles = theme => ({
  root: {
    marginLeft: -12,
    marginTop: -24,
  },
  marker: {
    width: 24,
    height: 24,
    color: theme.palette.primary[900],
  },
});

const MapPin = ({ classes, color }) => (
  <div className={classes.root} >
    <FaMapPin
      className={classes.marker}
      color={color}
    />
  </div>

);

MapPin.propTypes = propTypes;
MapPin.defaultProps = defaultProps;

export default withStyles(styles, { name: 'styledMapPin' })(MapPin);
