import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from './../actions';
import Static from './form/static';
// import Astrophases from './weather/astrophases';
import ThemeObject from './admin/theme-object';
import Motivation from './motivation';
import OneDayWeather from './weather/one-day-weather';
import UserList from './form/user-list';
import TextBalance from './admin/txt-balance';
import ScrollIntoView from '../containers/scroll-into-view';

import style from '../styles/style';

const propTypes = {
  fetchData: PropTypes.func,
  mPref: PropTypes.bool.isRequired,
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
      userGeoLongitude,
      userGeoLatitude,
      userGeoTzDSTOffset,
      userGeoTzRawOffset,
      weightHistory,
    } = this.props.user;
    const { mPref } = this.props;

    if (!adminMember) {
      return (
        <Redirect to="/" />
      );
    }

    return (
      <div>
        <div className="main-flex-container" >
          <div className="side-lite left-pane" />
          <div className="main" >
            <ScrollIntoView
              id={location.hash}
              headerHeight={70}
            />
            <div >
              {userGeoTzRawOffset ? (
                <div>
                  <OneDayWeather
                    geoCoordinates={`${userGeoLongitude},${userGeoLatitude}`}
                    dstOffset={userGeoTzDSTOffset}
                    tzOffset={userGeoTzRawOffset}
                    date={+new Date()}
                    mPref={mPref}
                  />
                </div>
              ) : (
                <div>
                  Loading Weather Data...
                </div>
              )}
              <ThemeObject />
              <Motivation style={style} />
              <TextBalance />
              <div style={style.flexcontainer}>
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
              </div>
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
            </div>
            <UserList />
          </div>
          <div className="side-lite right-pane" />
        </div>
      </div>

    );
  }
}

Athlete.propTypes = propTypes;

function mapStateToProps(state) {
  return {
    user: state.auth.user,
    mPref: state.page.mPref,
  };
}

export default connect(mapStateToProps, actions)(Athlete);
