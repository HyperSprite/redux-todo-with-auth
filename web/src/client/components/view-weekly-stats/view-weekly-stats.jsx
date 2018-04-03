import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import VisibilitySensor from 'react-visibility-sensor';

import ActivityProcessingWithData from '../activity-processing/with-redux';
import ProgressDivider from '../progress-divider';
import ButtonRefresh from '../button/refresh';
import ButtonBase from '../button/base';
import ButtonProgress from '../button/progress';

import * as actions from '../../actions';
import Layout from '../layout';
import WeeklyStats from './weekly-stats';
import FeatureNotice from '../feature-notice';

import ScrollIntoView from '../../containers/scroll-into-view';

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

  componentWillUnmount() {
    this.props.clearActivitySearch();
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
    const { weeklyStats, weeklyStatsCount, datePref, isFetching, mPref, title, user } = this.props;
    return (
      <Layout>
        <ScrollIntoView
          id={location.hash}
          headerHeight={70}
        />
        {!user.clubMember && (
          <FeatureNotice
            user={user}
            checks={['clubMember']}
            title={title}
            optional
          />
        )}
        <ActivityProcessingWithData />
        <div>
          <div>
            <ButtonRefresh
              label="Check Strava for New Activities"
              color="secondary"
              onClick={this.updateUserActivities}
              disabled={isFetching}
            />
            <ProgressDivider isProgress={isFetching} />
          </div>
          {!weeklyStats ? (
            <p>Loading Activities</p>
          ) : (
            <div >
              { weeklyStats.map(oneWeek => (
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
          {(weeklyStats.length < 2) ? (
            <div>
              {weeklyStats.length ? (
                <ButtonProgress
                  variant="raised"
                  label="Load Another Week"
                  color="primary"
                  disabled={isFetching}
                  onClick={this.fetchAnotherWeek}
                />
              ) : null}
            </div>
          ) : (
            <div>
              <VisibilitySensor
                delayedCall
                onChange={this.loadSensor}
              />
              <ButtonBase
                variant="raised"
                label="Load Another Week"
                color="primary"
                onClick={this.fetchAnotherWeek}
              />
              <ProgressDivider isProgress={isFetching} />
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
    title: state.page.name,
  };
}

export default connect(mapStateToProps, actions)(activeStats);
