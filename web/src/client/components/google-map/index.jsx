import React from 'react';
import PropTypes from 'prop-types';
import GoogleMapReact from 'google-map-react';
import googlePolyline from 'google-polyline';
import Dimensions from 'react-dimensions';

import ViewRouteMapPolylineDraw from './google-map-polyline-draw';
import ViewRouteMapFlag from './google-map-flag';
import googleMapStyles from './map-styles';

class GoogleMapWithPolyline extends React.Component {

  static propTypes = {
    map: PropTypes.shape({
      polyline: PropTypes.string,
    }), // supplied by google-map-react
    zoom: PropTypes.number,
  };

  static defaultProps = {
    map: undefined,
    polyline: undefined,
    zoom: 11,
  };

  constructor(props) {
    super(props);
    this.state = {
      map: null,
      maps: null,
    };
  }

  render() {
    const convertMapData = (encodedPolyline) => {
      return googlePolyline.decode(encodedPolyline).map((eP) => {
        return { lat: eP[0], lng: eP[1] };
      });
    };

    this.mapData = this.props.map && convertMapData(this.props.map.polyline);

    return (
      <div style={{ width: this.props.containerWidth, height: 400 }}>
        { this.props.map ? (
          <GoogleMapReact
            onGoogleApiLoaded={({ map, maps }) => {
              this.setState({ map, maps, mapLoaded: true });
            }}
            yesIWantToUseGoogleMapApiInternals
            center={this.mapData[0]}
            defaultZoom={this.props.zoom}
            bootstrapURLKeys={{
              key: process.env.GOOGLE_MAPS_WEB,
              language: 'en',
            }}
            options={{ styles: googleMapStyles }}
          >
            {/* <ViewRouteMapFlag
              lat={this.mapData[0].lat}
              lng={this.mapData[0].lng}
              text={'Start'}
            /> */}
            {/* <ViewRouteMapFlag
              lat={this.mapData[this.mapData.length - 1].lat}
              lng={this.mapData[this.mapData.length - 1].lng}
              text={'End'}
            /> */}
          </GoogleMapReact>
        ) : (
          <div style={{ width: 200, height: 400 }} >
            loading...
          </div>
        )}
        { this.state.mapLoaded &&
          <ViewRouteMapPolylineDraw
            {...this.state}
            mapData={this.mapData}
            opacity={0.7}
            weight={4}
          />
        }
      </div>
    );
  }
}

export default GoogleMapWithPolyline;
