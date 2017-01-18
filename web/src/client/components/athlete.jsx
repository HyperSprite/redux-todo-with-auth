import React, { Component, PropTypes } from 'react';
import { Paper, Subheader } from 'material-ui';
import { Toolbar, ToolbarTitle } from 'material-ui/Toolbar';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import { connect } from 'react-redux';

import * as actions from './../actions';
import Static from './form/static';
import ScrollIntoView from '../containers/scroll-into-view';

import style from './../styles/style';

const propTypes = {
  fetchData: PropTypes.func,
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
  // this is here to allow users to refresh their strava user data
  // without signing out, this should already be loded in state.
  // actions/index.js fetchData(relURL)
  componentDidMount() {
    this.props.fetchData('auth/user');
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
    } = this.props.user;
    return (
      <Paper
        style={style.paper1}
        zDepth={1}
      >
        <ScrollIntoView
          id={location.hash}
          headerHeight={70}
        />
        <Toolbar>
          <ToolbarTitle
            text="Athlete"
          />
        </Toolbar>
        <Card
          style={style.card}
        >
          <a href={`https://www.strava.com/athletes/${stravaId}`} target="new">
            <CardHeader
              title="Athlete Profile on Strava"
            />
          </a>
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
        </Card>
        <p>The information above is supplied by the Strava connection.</p>
        <blockquote>As with any Strava app, if you would like to revoke access to ARaceAthlete, visit <a href="https://www.strava.com/settings/apps" target="new">www.strava.com/settings/apps</a>, find ARaceAthlete and click the Revoke Access button.</blockquote>
      </Paper>
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
