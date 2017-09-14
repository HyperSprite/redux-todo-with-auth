import GoogleMapsPolyline from './google-map-polyline';

class GoogleMapsPolylineDraw extends GoogleMapsPolyline {

  renderPolyline() {
    return {
      clickable: this.props.clickable || false,
      geodesic: this.props.geodesic || true,
      strokeColor: this.props.color || '#B71C1C',
      strokeOpacity: this.props.opacity || 1,
      strokeWeight: this.props.weight || 4,
    };
  }
}

export default GoogleMapsPolylineDraw;

// clickable={false}
// geodesic={true}
// color="#B71C1C"
// opacity={1}
// weight={4}
