import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../actions';
import WeeklyStats from './weekly-stats';

const propTypes = {
  fetchActivitiesOneWeek: PropTypes.func,
  stravaId: PropTypes.number,
};

const relURL = 'apiv1/activities/one-week';

class activeStats extends Component {
  constructor(props) {
    super(props);
    this.fetchAnotherWeek = this.fetchAnotherWeek.bind(this);
  }

  componentDidMount() {
    this.props.fetchActivitiesOneWeek(relURL, this.props.stravaId, this.props.weeksBack);
  }

  fetchAnotherWeek() {
    this.props.fetchActivitiesOneWeek(relURL, this.props.stravaId, this.props.weeksBack);
  }

  render() {
    const { weeks, weeksBack, datePref, measurementPref } = this.props;

    return (
      <div>
        {!weeks ? (
          <p>Loading Activities</p>
        ) : (
          <div>
            { weeks.map(oneWeek => (
              <WeeklyStats
                key={Object.keys(oneWeek)[0]}
                week={Object.keys(oneWeek)[0]}
                activities={oneWeek[Object.keys(oneWeek)[0]]}
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

function mapStateToProps(state) {
  return {
    datePref: state.auth.user.date_preference,
    measurementPref: state.auth.user.measurement_preference === 'feet',
    stravaId: state.auth.user.stravaId,
    weeks: state.activities.weeks,
    weeksBack: state.activities.weeks.length || null,
  };
}

export default connect(mapStateToProps, actions)(activeStats);
