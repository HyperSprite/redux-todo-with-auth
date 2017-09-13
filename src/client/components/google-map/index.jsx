import React from 'react';
import PropTypes from 'prop-types';
import GoogleMapReact from 'google-map-react';
import googlePolyline from 'google-polyline';
import { fitBounds } from 'google-map-react/utils';
import turfHelpers from '@turf/helpers';
import bbox from '@turf/bbox';

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
    // polyline: undefined,
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
    const mapOptions = {
      styles: googleMapStyles,
      mapTypeControl: true,
      mapTypeId: 'terrain',
      rotateControl: false,
      fullscreenControl: false,
    };
    const convertMapData = (encodedPolyline) => {
      return googlePolyline.decode(encodedPolyline).map((eP) => {
        return { lat: eP[0], lng: eP[1] };
      });
    };

    const getCenterAndZoom = (mapPolyline) => {
      console.log('here');
      const routeDataLS = turfHelpers.lineString(convertMapData(mapPolyline)
        .map(rD => [rD.lat, rD.lng]));
      const newbounds = bbox(routeDataLS);

      const bounds = {
        nw: {
          lat: newbounds[2],
          lng: newbounds[1],
        },
        se: {
          lat: newbounds[0],
          lng: newbounds[3],
        },
      };

      console.log('\n\nbounds', bounds);

      const size = {
        width: 400, // Map width in pixels
        height: 400, // Map height in pixels
      };
      const result = fitBounds({ nw: bounds.nw, se: bounds.se }, size);
      console.log('result', result);
      return result;
    };

    this.mapData = this.props.map.polyline && convertMapData(this.props.map.polyline);
    this.centerZoom = this.props.map.polyline && getCenterAndZoom(this.props.map.polyline);

    return (
      <div style={{ width: this.props.containerWidth, height: 400 }}>
        { this.props.map && this.props.map.polyline ? (
          <GoogleMapReact
            onGoogleApiLoaded={({ map, maps }) => {
              this.setState({ map, maps, mapLoaded: true });
            }}
            yesIWantToUseGoogleMapApiInternals
            center={this.centerZoom.center}
            defaultZoom={this.centerZoom.zoom}
            bootstrapURLKeys={{
              key: process.env.GOOGLE_MAPS_WEB,
              language: 'en',
            }}
            options={mapOptions}
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
