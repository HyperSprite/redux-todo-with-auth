// There are no settings in here.
// Everything is passed in as props and passed on
import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  map: PropTypes.object.isRequired, // supplied by google-map-react
  maps: PropTypes.object.isRequired, // supplied by google-map-react
};

class GoogleMapsPolyline extends React.PureComponent {
  componentWillUpdate() {
    this.line.setMap(null);
  }

  componentWillUnmount() {
    this.line.setMap(null);
  }

  renderPolyline() {
    throw new Error('Implement renderPolyline method');
  }

  render() {
    const Polyline = this.props.maps.Polyline;
    const renderedPolyline = this.renderPolyline();
    const path = { path: this.props.mapData };
    this.line = new Polyline(Object.assign({}, renderedPolyline, path));
    this.line.setMap(this.props.map);
    return null;
  }
}

GoogleMapsPolyline.propTypes = propTypes;

export default GoogleMapsPolyline;
