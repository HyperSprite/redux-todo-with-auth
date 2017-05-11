import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { flatten } from 'lodash';
import { eachDay, format, min } from 'date-fns';

import * as actions from '../../actions';
import WeeklyStats from './weekly-stats';

const propTypes = {
  // activities: PropTypes.object,
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
    const { weeks, weeksBack } = this.props;

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
              />
            ))}
          </div>
        )}
        <button onClick={this.fetchAnotherWeek} >Get Another Week</button>
      </div>


    );
  }
}

// { weeks.map(oneWeek => oneWeek[Object.keys(oneWeek)].map(activity => (
//   <WeeklyStats
//     week={Object.keys(oneWeek)}
//     activities={oneWeek}
//   />
// )))
// }

activeStats.propTypes = propTypes;

function mapStateToProps(state) {
  return {
    stravaId: state.auth.user.stravaId,
    weeks: state.activities.weeks,
    weeksBack: state.activities.weeks.length || null,
  };
}

export default connect(mapStateToProps, actions)(activeStats);
