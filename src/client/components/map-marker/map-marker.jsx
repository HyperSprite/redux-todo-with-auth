import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui-next/styles';
import MapMarkerIcon from 'mdi-react/MapMarkerIcon';

const propTypes = {
  // classes: PropTypes.object.isRquired,
  /** Color for pin */
  color: PropTypes.string,
};

const defaultProps = {
  // classes: {},
  color: '',
};

// TODO - muiV1 setup default color
const styles = theme => ({
  root: {
    marginLeft: -12,
    marginTop: -24,
  },
  marker: {
    width: 24,
    height: 24,
  },
});

const MapMarker = ({ classes, color }) => (
  <div className={classes.root}>
    <MapMarkerIcon
      className={classes.marker}
      fill={color}
    />
  </div>
);

MapMarker.propTypes = propTypes;
MapMarker.defaultProps = defaultProps;

export default withStyles(styles, { name: 'styledMapPin' })(MapMarker);
