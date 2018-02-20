import React from 'react';
import PropTypes from 'prop-types';
import ExtGeolocation from '@hypersprite/react-geolocation-hoc';
import { IconButton, Toggle } from 'material-ui';
import GPSFixed from 'material-ui/svg-icons/device/gps-fixed';
import GPSNotFixed from 'material-ui/svg-icons/device/gps-not-fixed';
import GPSOff from 'material-ui/svg-icons/device/gps-off';
import GoogleMapLocation from './google-map-location';
import style from './style';

class ExtGoogleMapWithLocation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      geoAllowed: false,
      showMyPin: true,
    };
    this.handleGPSClick = this.handleGPSClick.bind(this);
    this.handleMyPin = this.handleMyPin.bind(this);
  }

  handleGPSClick() {
    this.setState({
      geoAllowed: true,
    });
    this.props.refreshLocation();
  }

  handleMyPin() {
    this.setState({
      showMyPin: !this.state.showMyPin,
    });
  }

  render() {
    const { geolocation, lat, lng } = this.props;
    const { geoAllowed, showMyPin } = this.state; 
    return (
      <div>

        <div style={style.flexcontainer}>
          <IconButton onClick={() => this.handleGPSClick()}>
            {geoAllowed ? <GPSFixed /> : <GPSNotFixed />}
          </IconButton>
          {geoAllowed && (
            <Toggle
              style={style.toggle}
              label="Show my pin"
              onToggle={this.handleMyPin}
              toggled={showMyPin}
              labelPosition="right"
            />
          )}
        </div>
        {(geoAllowed) ? (
          <div>
            {(lat) ? (
              <GoogleMapLocation
                {...this.props}
                myLat={showMyPin && lat}
                myLng={showMyPin && lng}
              />
            ) : (
              <div style={{ width: 200, height: 400 }} >
                <h3>Waiting for user verification.</h3>
                <p>Allow Location Access: We can use your current location.</p>
                <p>Block Location Access: We can use your Strava City settings.</p>
              </div>
            )}
          </div>
      ) : (
        (lat) && (
          <GoogleMapLocation
            {...this.props}
          />
      ))}
      </div>
    );
  }
}


export default ExtGeolocation(ExtGoogleMapWithLocation);
