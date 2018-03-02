import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import VisibilitySensor from 'react-visibility-sensor';
import { CircularProgress, Paper, RaisedButton } from 'material-ui';
import FaRefresh from 'react-icons/lib/fa/refresh';

import * as actions from '../../actions';
import Layout from '../layout';
import WeeklyStats from './weekly-stats';

import ScrollIntoView from '../../containers/scroll-into-view';
import style from '../../styles/style';

const propTypes = {
  datePref: PropTypes.string,
  fetchActivitiesWeeklyTotals: PropTypes.func.isRequired,
  fetchData: PropTypes.func.isRequired,
  fetchStrava: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  mPref: PropTypes.bool.isRequired,
  stravaId: PropTypes.number,
  setIsFetching: PropTypes.func.isRequired,
  setPageName: PropTypes.func.isRequired,
  setWeeklyStats: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  weeklyStatsCount: PropTypes.number.isRequired,
  weeklyStats: PropTypes.array.isRequired,
};

const defaultProps = {
  stravaId: null,
};

const relURL = 'apiv1/activities/weekly-stats';

class activeStats extends Component {
  constructor(props) {
    super(props);
    this.fetchAnotherWeek = this.fetchAnotherWeek.bind(this);
    this.updateUserActivities = this.updateUserActivities.bind(this);
    this.loadSensor = this.loadSensor.bind(this);
  }

  componentDidMount() {
    this.updateUserActivities();
    this.props.setPageName('Weekly Stats', '/blog/weekly-stats');
  }

  fetchAnotherWeek() {
    this.props.setIsFetching();
    this.props.fetchActivitiesWeeklyTotals(relURL, this.props.stravaId, this.props.weeklyStats.length);
  }

  loadSensor(isVisible) {
    if (isVisible && !this.props.isFetching) {
      this.fetchAnotherWeek();
    }
  }

  updateUserActivities() {
    this.props.setIsFetching();
    this.props.fetchStrava('user-activities', null, null, this.props.user.stravatoken, 'getUserActivities');
  }

  render() {
    const { weeklyStats, datePref, isFetching, mPref } = this.props;
    return (
      <Layout>
            <ScrollIntoView
              id={location.hash}
              headerHeight={70}
            />
        <div>
          <div>
              {isFetching ? (
                  <RaisedButton
                    label="Check Strava for New Activities"
                    secondary
                    style={style.button}
                    icon={<CircularProgress size={22} thickness={4} />}
                    disabled
                  />
              ) : (
                  <RaisedButton
                    label="Check Strava for New Activities"
                    secondary
                    style={style.button}
                    onClick={this.updateUserActivities}
                    icon={<FaRefresh size={20} />}
                  />
              )}
            </div>
              {!weeklyStats ? (
                <p>Loading Activities</p>
              ) : (
                <div >
                  { weeklyStats.map((oneWeek, i) => (
                    <WeeklyStats
                      key={`week-${oneWeek.weeklyTotals.date}`}
                      week={oneWeek.weeklyTotals.date}
                      stats={oneWeek}
                      datePref={datePref}
                      mPref={mPref}
                    />
                  ))}
                </div>
              )}
              {isFetching ? (
                <div>
                  {weeklyStats.length ? (
                    <RaisedButton
                      label="Load Another Week"
                      primary
                      style={style.button}
                      disabled
                      icon={<CircularProgress size={22} thickness={4} />}
                    />
                  ) : null}
                </div>
              ) : (
                <div>
                  <VisibilitySensor
                    delayedCall
                    onChange={this.loadSensor}
                  />
                  <RaisedButton
                    label="Load Another Week"
                    primary
                    style={style.button}
                    onClick={this.fetchAnotherWeek}
                  />
                </div>
              )}
            </div>
      </Layout>
    );
  }
}

activeStats.propTypes = propTypes;
activeStats.defaultProps = defaultProps;

function mapStateToProps(state) {
  return {
    datePref: state.auth.user.date_preference,
    mPref: state.page.mPref,
    stravaId: state.auth.user.stravaId,
    user: state.auth.user,
    weeklyStats: state.activities.weeklyStats,
    weeklyStatsCount: state.activities.weeklyStatsCount,
    isFetching: state.page.isFetching,
  };
}

export default connect(mapStateToProps, actions)(activeStats);
