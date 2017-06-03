import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Paper, RaisedButton } from 'material-ui';
import FaRefresh from 'react-icons/lib/fa/refresh';


import * as actions from '../../actions';
import WeeklyStats from './weekly-stats';
import ScrollIntoView from '../../containers/scroll-into-view';
import style from '../../styles/style';

const propTypes = {
  datePref: PropTypes.string,
  fetchActivitiesWeeklyTotals: PropTypes.func.isRequired,
  fetchData: PropTypes.func.isRequired,
  fetchStrava: PropTypes.func.isRequired,
  measurementPref: PropTypes.bool.isRequired,
  stravaId: PropTypes.number,
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
  }

  componentDidMount() {
    this.fetchWeeksActivities();
    this.props.setPageName('Weekly Stats');
  }

  fetchAnotherWeek() {
    this.props.fetchActivitiesWeeklyTotals(relURL, this.props.stravaId, this.props.weeklyStatsCount);
    this.props.setWeeklyStats();
  }

  fetchWeeksActivities() {
    setTimeout(() => {
      if (!this.props.weeklyStats.length) {
        this.fetchAnotherWeek();
      }
    }, 400);
  }

  updateUserActivities() {
    this.props.fetchStrava('user-activities', null, null, this.props.user.stravatoken, 'getUserActivities');
  }

  render() {
    const { weeklyStats, datePref, measurementPref } = this.props;

    return (
      <div className="main-flex-container" >
        <div className="side-lite left-pane" />
        <div className="main" >
          <ScrollIntoView
            id={location.hash}
            headerHeight={70}
          />
          <Paper
            zDepth={1}
          >
            {!weeklyStats ? (
              <p>Loading Activities</p>
            ) : (
              <div>
                { weeklyStats.map(oneWeek => (
                  <WeeklyStats
                    key={oneWeek.weeklyTotals.date}
                    week={oneWeek.weeklyTotals.date}
                    stats={oneWeek}
                    datePref={datePref}
                    measurementPref={measurementPref}
                  />
                ))}
              </div>
            )}
            <RaisedButton
              label="Load Another Week"
              primary
              style={style.button}
              onClick={this.fetchAnotherWeek}
            />
            <RaisedButton
              label="Check Strava for New Activities"
              secondary
              style={style.button}
              onClick={this.updateUserActivities}
              icon={<FaRefresh size={20} />}
            />
          </Paper>
        </div>
        <div className="side-lite right-pane" />
      </div>
    );
  }
}

activeStats.propTypes = propTypes;
activeStats.defaultProps = defaultProps;

function mapStateToProps(state) {
  return {
    datePref: state.auth.user.date_preference,
    measurementPref: state.auth.user.measurement_preference === 'feet',
    stravaId: state.auth.user.stravaId,
    user: state.auth.user,
    weeklyStats: state.activities.weeklyStats,
    weeklyStatsCount: state.activities.weeklyStatsCount,
  };
}

export default connect(mapStateToProps, actions)(activeStats);
