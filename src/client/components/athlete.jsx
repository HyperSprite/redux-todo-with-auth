import React, { Component, PropTypes } from 'react';
import { Redirect } from 'react-router-dom';
import { IconButton, Paper, Subheader } from 'material-ui';
import { Toolbar, ToolbarTitle } from 'material-ui/Toolbar';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import { connect } from 'react-redux';
import FaRefresh from 'react-icons/lib/fa/refresh';
import FaToggleOff from 'react-icons/lib/fa/toggle-off';
import FaToggleOn from 'react-icons/lib/fa/toggle-on';

import * as actions from './../actions';
import Static from './form/static';
import ActivityStats from './activity-stats';
import Astrophases from './weather/astrophases';
import FtpWeight from './metrics/ftp-weight';
import OneDayWeather from './weather/one-day-weather';
import ScrollIntoView from '../containers/scroll-into-view';

import style from '../styles/style';

const propTypes = {
  fetchData: PropTypes.func,
  setPageName: PropTypes.func,
  user: PropTypes.shape({
    email: PropTypes.string,
    stravaId: PropTypes.number,
    firstname: PropTypes.string,
    lastname: PropTypes.string,
    profile_medium: PropTypes.string,
    profile: PropTypes.string,
    loc_city: PropTypes.string,
    loc_state: PropTypes.string,
    loc_country: PropTypes.string,
    sex: PropTypes.string,
    premium: PropTypes.bool,
    created_at: PropTypes.string,
    updated_at: PropTypes.string,
    date_preference: PropTypes.string,
    measurement_preference: PropTypes.string,
  }),
};

function getLastInArray(arr, arrType) {
  let item;
  if (arr && arr.length > 0 && arr[arr.length - 1][arrType] != null) {
    item = arr[arr.length - 1][arrType];
  }
  return item;
}

class Athlete extends Component {
  constructor(props) {
    super(props);
    this.updateUser = this.updateUser.bind(this);
  }
  // this is here to allow users to refresh their strava user data
  // without signing out, this should already be loded in state.
  // actions/index.js fetchData(relURL)
  componentDidMount() {
    this.props.fetchData('auth/user');
    this.props.setPageName('Athlete');
  }

  updateUser() {
    // fetchStrava(path, id, index, stravatoken, context)
    this.props.fetchStrava('user', this.props.user.stravaId, null, this.props.user.stravatoken, 'getUser');
  }

  render() {
    const {
      adminMember,
      email,
      stravaId,
      firstname,
      ftpHistory,
      lastname,
      profile_medium,
      profile,
      loc_city,
      loc_state,
      loc_country,
      sex,
      created_at,
      updated_at,
      date_preference,
      measurement_preference,
      userGeoLongitude,
      userGeoLatitude,
      userGeoTzDSTOffset,
      userGeoTzRawOffset,
      weightHistory,
    } = this.props.user;

    const measurementPref = measurement_preference === 'metric';

    if (!adminMember) {
      return (
        <Redirect to="/" />
      );
    }

    return (
      <div className="main-flex-container" >
        <div className="side-lite left-pane" />
        <div className="main" >
          <ScrollIntoView
            id={location.hash}
            headerHeight={70}
          />
          <Card
            className="card"
          >
            {userGeoTzRawOffset ? (
              <div>
                <OneDayWeather
                  geoCoordinates={`${userGeoLongitude},${userGeoLatitude}`}
                  dstOffset={userGeoTzDSTOffset}
                  tzOffset={userGeoTzRawOffset}
                  date={+new Date()}
                  measurementPref={measurementPref}
                />
              </div>
            ) : (
              <div>
                Loading Weather Data...
              </div>
            )}

            {getLastInArray(ftpHistory, 'ftp') && getLastInArray(weightHistory, 'weight') ? (
              <FtpWeight
                ftpHistory={ftpHistory}
                weightHistory={weightHistory}
                measurementPref={measurementPref}
              />
            ) : (
              <div>
                {/* TODO - this is all ugly */}
                {getLastInArray(weightHistory, 'weight') ? (
                  <FtpWeight
                    ftpHistory={[]}
                    weightHistory={weightHistory}
                    measurementPref={measurementPref}
                  />
                ) : null }
              </div>
            )}
            <div className="flex-row">
              <IconButton onClick={this.updateUser} style={style.toggleIconButton} >
                <FaRefresh size={20} />
              </IconButton>
              <a href={`https://www.strava.com/athletes/${stravaId}`} target="new">
                Athlete Profile on Strava</a>
            </div>
            <Static
              contentLabel="Strava ID"
              content={stravaId}
              contentType="text"
            />
            <Static
              contentLabel="Name"
              content={`${firstname} ${lastname}`}
              contentType="text"
            />
            <Static
              contentLabel="City"
              content={loc_city}
              contentType="text"
            />
            <Static
              contentLabel="State"
              content={loc_state}
              contentType="text"
            />
            <Static
              contentLabel="Country"
              content={loc_country}
              contentType="text"
            />
            <Static
              contentLabel="Created On"
              content={created_at}
              contentType="text"
            />
            <Static
              contentLabel="Last Updated"
              content={updated_at}
              contentType="text"
            />
            <Static
              contentLabel="Date Pref."
              content={date_preference}
              contentType="text"
            />
            {/* {userGeoTzRawOffset ? (
              <div>
                <Astrophases
                  geoCoordinates={`${userGeoLongitude},${userGeoLatitude}`}
                  dstOffset={userGeoTzDSTOffset}
                  tzOffset={userGeoTzRawOffset}
                  date={+new Date()}
                />
              </div>
            ) : (
              <div>
                Loading Astrophase Data...
              </div>
            )} */}
            <div className="quote-box">
              <p>The information above is supplied by the Strava connection.</p>
              <blockquote>As with any Strava app, if you would like to revoke access to ARaceAthlete, visit <a href="https://www.strava.com/settings/apps" target="new">www.strava.com/settings/apps</a>, find ARaceAthlete and click the Revoke Access button.</blockquote>
            </div>
          </Card>
        </div>
        <div className="side-lite right-pane" />
      </div>
    );
  }
}

Athlete.propTypes = propTypes;

function mapStateToProps(state) {
  return {
    user: state.auth.user,
  };
}

export default connect(mapStateToProps, actions)(Athlete);
