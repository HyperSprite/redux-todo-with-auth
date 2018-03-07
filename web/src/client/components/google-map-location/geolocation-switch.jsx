import React from 'react';
import PropTypes from 'prop-types';
import ExtGeolocation from '@hypersprite/react-geolocation-hoc';
import { FlatButton, IconButton, Toggle } from 'material-ui';
import CrosshairsGpsIcon from 'mdi-react/CrosshairsGpsIcon';
import CrosshairsIcon from 'mdi-react/CrosshairsIcon';
import GPSOff from 'material-ui/svg-icons/device/gps-off';
import justFNS from 'just-fns';
import GoogleMapLocation from './google-map-location';
import Icon from '../icon';
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
    this.props.handleMapPinDrop(this.props.lat, this.props.lng);
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
            {geoAllowed ? (
              <Icon size="sm" color="primary">
                <CrosshairsGpsIcon />
              </Icon>
            ) : (
              <Icon size="sm" color="secondary">
                <CrosshairsIcon />
              </Icon>
            )}
          </IconButton>
          {geoAllowed && (
            <div>
              <Toggle
                style={style.toggle}
                label={'Show my pin'}
                onToggle={this.handleMyPin}
                toggled={showMyPin}
                labelPosition="right"
              />
            </div>
          )}
        </div>
        {(geoAllowed) ? (
          <div>
            {(lat) ? (
              <GoogleMapLocation
                {...this.props}
                myLat={showMyPin ? lat : null}
                myLng={showMyPin ? lng : null}
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
