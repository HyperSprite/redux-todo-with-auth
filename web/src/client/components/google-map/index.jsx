import React from 'react';
import PropTypes from 'prop-types';
import GoogleMapReact from 'google-map-react';
import googlePolyline from 'google-polyline';

import ViewRouteMapPolylineDraw from './google-map-polyline-draw';
import ViewRouteMapFlag from './google-map-flag';
import styles from './styles';

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
      <div style={{ backgroundColor: 'black', width: 500, height: 300, margin: 20 }}>
        { this.props.map &&
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
            options={{ styles }}
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
        }
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
