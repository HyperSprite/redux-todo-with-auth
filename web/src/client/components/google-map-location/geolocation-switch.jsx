// TODO material-ui - move styles to jss
import React from 'react';
import PropTypes from 'prop-types';
import ExtGeolocation from '@hypersprite/react-geolocation-hoc';
import { FormControlLabel } from 'material-ui/Form';
import IconButton from 'material-ui/IconButton';
import Switch from 'material-ui/Switch';
import CrosshairsGpsIcon from 'mdi-react/CrosshairsGpsIcon';
import CrosshairsIcon from 'mdi-react/CrosshairsIcon';
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
              <FormControlLabel
                control={
                  <Switch
                    color="primary"
                    onChange={this.handleMyPin}
                    checked={showMyPin}
                  />
                }
                label="Show my pin"
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
