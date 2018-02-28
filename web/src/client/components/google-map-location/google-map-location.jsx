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
    handleMapPinDrop: PropTypes.func.isRequired,
    lat: PropTypes.number,
    lng: PropTypes.number,
    /** Green pin */
    myLat: PropTypes.number,
    myLng: PropTypes.number,
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
    if (this.props.handleMapPinDrop && !this.props.noClick) {
      this.props.handleMapPinDrop(lat, lng);
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

    /**
    * Map sizer and center - Start
    */
    const getCenterAndZoom = (pins) => {
      const routeDataLS = lineString(pins.map(rD => [rD.lat, rD.lng]));
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
    /** map sizer and center - End */

    /**
    * Pins on the map - Start
    */
    const clickReady = this.state.mapLoaded && !this.props.noClick;
    /** pinDrops are search results pins this will add myPin to array if exists */
    const allThePins = this.props.myLat ?
      [{ lat: this.props.myLat, lng: this.props.myLng }, ...pinDrops] :
        pinDrops;
    /** allThePins are from above, this adds the location search pin if exists */
    const includedPins = clickReady && (this.state.lat || this.props.lat) ? ([
        { lat: this.state.lat || this.props.lat, lng: this.state.lng || this.props.lng },
      ...allThePins,
    ]) : allThePins;
    /** if array of pins (see above) else use default start position */
    const setCenter = includedPins.length === 1 ?
      { lat: includedPins[0].lat, lng: includedPins[0].lng } :
        { lng: this.props.lat, lng: this.props.lng };
    this.centerZoom = (includedPins.length > 1 && this.props.lat) ?
      getCenterAndZoom(includedPins) :
        { center: setCenter, zoom: 9 };
    /** Pins on the map - End */

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
          onClick={clickReady ? ({ lat, lng }) => this.targetLocation(lat, lng) : null}
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
          { (this.props.myLat) &&
            <MapPin
              lat={this.props.myLat}
              lng={this.props.myLng}
              color={palette.accent8Color}
            />
          }
        </GoogleMapReact>
      </div>
    );
  }
}

export default Dimensions()(GoogleMapLocation);
