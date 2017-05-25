import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../actions';
import WeeklyStats from './weekly-stats';

const propTypes = {
  fetchActivitiesWeeklyTotals: PropTypes.func.isRequired,
  stravaId: PropTypes.number,
  weeksBack: PropTypes.number,
};

const defaultProps = {
  weeksBack: 0,
  stravaId: null,
};

const relURL = 'apiv1/activities/weekly-stats';

class activeStats extends Component {
  constructor(props) {
    super(props);
    this.fetchAnotherWeek = this.fetchAnotherWeek.bind(this);
  }

  componentDidMount() {
    this.props.fetchActivitiesWeeklyTotals(relURL, this.props.stravaId, this.props.weeksBack);
  }

  fetchAnotherWeek() {
    this.props.fetchActivitiesWeeklyTotals(relURL, this.props.stravaId, this.props.weeksBack);
  }

  render() {
    const { weeklyStats, weeksBack, datePref, measurementPref } = this.props;

    return (
      <div>
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
        <button onClick={this.fetchAnotherWeek} >Get Another Week</button>
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
    weeklyStats: state.activities.weeklyStats,
    weeksBack: state.activities.weeklyStats.length || null,
  };
}

export default connect(mapStateToProps, actions)(activeStats);
