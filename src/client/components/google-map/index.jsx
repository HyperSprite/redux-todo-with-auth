import React from 'react';
import PropTypes from 'prop-types';
import GoogleMapReact from 'google-map-react';
import googlePolyline from 'google-polyline';
import { fitBounds } from 'google-map-react/utils';
import turfHelpers from '@turf/helpers';
import bbox from '@turf/bbox';

import ViewRouteMapPolylineDraw from './google-map-polyline-draw';
import MapPin from '../map-pin';
import googleMapStyles, { palette } from './map-styles';

class GoogleMapWithPolyline extends React.Component {

  static propTypes = {
    containerWidth: PropTypes.number,
    mapPolyline: PropTypes.string,
    height: PropTypes.number,
    width: PropTypes.number,
    // map: PropTypes.shape({
    //   polyline: PropTypes.string,
    // }), // supplied by google-map-react
  };

  static defaultProps = {
    map: undefined,
    height: 400,
    width: 400,
    // polyline: undefined,
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

      const size = {
        width: this.props.width, // Map width in pixels
        height: this.props.height, // Map height in pixels
      };
      const result = fitBounds({ nw: bounds.nw, se: bounds.se }, size);
      return result;
    };

    this.mapData = this.props.map.polyline && convertMapData(this.props.map.polyline);
    this.centerZoom = this.props.map.polyline && getCenterAndZoom(this.props.map.polyline);
    return (
      <div style={{ width: this.props.containerWidth, height: this.props.height }}>
        { this.mapData ? (
          <GoogleMapReact
            onGoogleApiLoaded={({ map, maps }) => {
              this.setState({ map, maps, mapLoaded: true });
            }}
            yesIWantToUseGoogleMapApiInternals
            center={this.centerZoom.center}
            defaultZoom={this.centerZoom.zoom}
            bootstrapURLKeys={{
              key: process.env.REACT_APP_GOOGLE_MAPS_WEB,
              language: 'en',
            }}
            options={mapOptions}
          >
            { this.state.mapLoaded &&
              <MapPin
                lat={this.mapData[this.mapData.length - 1].lat}
                lng={this.mapData[this.mapData.length - 1].lng}
                color={palette.textColor}
              />
            }
            { this.state.mapLoaded &&
              <MapPin
                lat={this.mapData[0].lat}
                lng={this.mapData[0].lng}
                color={palette.accent8Color}
              />
            }
          </GoogleMapReact>
        ) : (
          <div style={{ width: 200, height: this.props.height }} >
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
