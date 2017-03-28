import React, { Component, PropTypes } from 'react';
import { Paper, Subheader } from 'material-ui';
import { Toolbar, ToolbarTitle } from 'material-ui/Toolbar';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import { connect } from 'react-redux';

import * as actions from './../actions';
import Static from './form/static';
import OneDayWeather from './weather/one-day-weather';
import Astrophases from './weather/astrophases';
import ScrollIntoView from '../containers/scroll-into-view';

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
    this.props.fetchStrava('user', this.props.user.stravaId, null, this.props.user.stravatoken, 'getUser' )
  }

  render() {
    const {
      email,
      stravaId,
      firstname,
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
    } = this.props.user;
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
            <a href={`https://www.strava.com/athletes/${stravaId}`} target="new">
              <CardHeader
                title="Athlete Profile on Strava"
              />
            </a>
            <button onClick={this.updateUser}>Refresh</button>
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
            {userGeoTzRawOffset ? (
              <div>
                <OneDayWeather
                  geoCoordinates={`${userGeoLongitude},${userGeoLatitude}`}
                  dstOffset={userGeoTzDSTOffset}
                  tzOffset={userGeoTzRawOffset}
                  date={+new Date()}
                  measurementPref={measurement_preference}
                />
                <Astrophases
                  geoCoordinates={`${userGeoLongitude},${userGeoLatitude}`}
                  dstOffset={userGeoTzDSTOffset}
                  tzOffset={userGeoTzRawOffset}
                  date={+new Date()}
                />
              </div>
            ) : (
              <div>
                Loading Location Data...
              </div>
            )}
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
