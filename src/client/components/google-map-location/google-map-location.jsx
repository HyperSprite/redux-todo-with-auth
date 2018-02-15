import React from 'react';
import PropTypes from 'prop-types';
import GoogleMapReact from 'google-map-react';
import Dimensions from 'react-dimensions';
import ExtGeolocation from '@hypersprite/react-geolocation-hoc';
import { isValid } from 'just-fns';

import MapPin from '../map-pin';
import googleMapStyles, { palette } from '../../styles/map-styles';

class ExtGoogleMapWithLocation extends React.Component {

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

    const clickReady = this.state.mapLoaded && !this.props.noClick;

    return (
      <div style={{ width: this.props.containerWidth, height: 400 }}>
        { this.props.lat ? (
          <GoogleMapReact
            onGoogleApiLoaded={({ map, maps }) => {
              this.setState({ map, maps, mapLoaded: true });
            }}
            yesIWantToUseGoogleMapApiInternals
            center={{ lat: this.props.lat, lng: this.props.lng }}
            defaultZoom={9}
            bootstrapURLKeys={{
              key: process.env.REACT_APP_GOOGLE_MAPS_WEB,
              language: 'en',
            }}
            options={mapOptions}
            onClick={({ lat, lng }) => this.targetLocation(lat, lng)}
          >
            { clickReady &&
              <MapPin
                lat={this.state.lat || this.props.lat}
                lng={this.state.lng || this.props.lng}
                color={palette.accent6Color}
              />
            }
            { this.state.mapLoaded && pinDrops.map(pin => (
              <MapPin
                key={pin.id}
                lat={pin.lat}
                lng={pin.lng}
                name={pin.name}
                color={palette.primary2Color}
              />
            ))}
          </GoogleMapReact>
        ) : (
          <div style={{ width: 200, height: 400 }} >
            <h3>Waiting for user verification.</h3>
            <p>Allow Location Access: We can use your current location.</p>
            <p>Block Location Access: We can use your Strava City settings.</p>
          </div>
        )}
      </div>
    );
  }
}

export default ExtGeolocation(Dimensions()(ExtGoogleMapWithLocation));
