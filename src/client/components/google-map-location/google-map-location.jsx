import React from 'react';
import PropTypes from 'prop-types';
import GoogleMapReact from 'google-map-react';
import Dimensions from 'react-dimensions';
import { fitBounds } from 'google-map-react/utils';
import { lineString } from '@turf/helpers';
import bbox from '@turf/bbox';
import { isValid } from 'just-fns';

import MapPin from '../map-pin';
import googleMapStyles, { palette } from '../../styles/map-styles';

class GoogleMapLocation extends React.Component {

  static propTypes = {
    containerWidth: PropTypes.number,
    /** returns lat, lng from map pin location */
    handleClick: PropTypes.func.isRequired,
    lat: PropTypes.number,
    lng: PropTypes.number,
    /** Do not moving location pin */
    noClick: PropTypes.bool,
    pinDrops: PropTypes.arrayOf(
      PropTypes.shape({
        key: PropTypes.number,
        lat: PropTypes.number,
        lng: PropTypes.number,
        name: PropTypes.string,
      }),
    ),
  };

  static defaultProps = {
    noClick: false,
    map: undefined,
  };

  constructor(props) {
    super(props);
    this.state = {
      map: null,
      maps: null,
      lat: null,
      lng: null,
    };
    this.targetLocation = this.targetLocation.bind(this);
  }

  targetLocation(lat, lng) {
    this.setState({ lat, lng });
    if (this.props.handleClick && !this.props.noClick) {
      this.props.handleClick(lat, lng);
    }
  }

  render() {
    const mapOptions = {
      styles: googleMapStyles,
      mapTypeControl: true,
      mapTypeId: 'terrain',
      rotateControl: false,
      fullscreenControl: false,
    };

    const pinDrops = this.props.pinDrops.filter(
      pD => isValid(pD.lat) && isValid(pD.lng) && isValid(pD.id)
    );
    // map sizer and center

    const getCenterAndZoom = (pins) => {
      const routeDataLS = lineString(pins.map(rD => [rD.lat, rD.lng]));
      // routeDataLS.push([this.props.lat, this.props.lng]);
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
        width: this.props.containerWidth, // Map width in pixels
        height: 400, // Map height in pixels
      };
      const result = fitBounds(bounds, size);
      return result;
    };

    // end map sizer
    const clickReady = this.state.mapLoaded && !this.props.noClick;
    this.centerZoom = (pinDrops.length && this.props.lat) ?
      getCenterAndZoom([{ lat: this.props.lat, lng: this.props.lng }, ...pinDrops]) :
      { center: { lat: this.props.lat, lng: this.props.lng }, zoom: 9 };

    return (
      <div style={{ width: this.props.containerWidth, height: 400 }}>
        <GoogleMapReact
          onGoogleApiLoaded={({ map, maps }) => {
            this.setState({ map, maps, mapLoaded: true });
          }}
          yesIWantToUseGoogleMapApiInternals
          center={this.centerZoom.center || { lat: this.props.lat, lng: this.props.lng }}
          defaultZoom={9}
          zoom={this.centerZoom.zoom}
          bootstrapURLKeys={{
            key: process.env.REACT_APP_GOOGLE_MAPS_WEB,
            language: 'en',
          }}
          options={mapOptions}
          onClick={({ lat, lng }) => this.targetLocation(lat, lng)}
        >
          { this.state.mapLoaded && pinDrops.map(pin => (
            <MapPin
              key={pin.id}
              lat={pin.lat}
              lng={pin.lng}
              name={pin.name}
              color={palette.primary2Color}
            />
          ))}
          { clickReady &&
            <MapPin
              lat={this.state.lat || this.props.lat}
              lng={this.state.lng || this.props.lng}
              color={palette.accent6Color}
            />
          }
        </GoogleMapReact>
      </div>
    );
  }
}

export default Dimensions()(GoogleMapLocation);
