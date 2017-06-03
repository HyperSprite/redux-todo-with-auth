import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../actions';

const propTypes = {
  name: PropTypes.string,
  activityId: PropTypes.number,
  activities: PropTypes.array,
};

class SingleActivity extends Component {

  thisActivity() {
    return this.props.activities.filter(activity => activity.activityId === this.props.activityId);
  }

  render() {
    const activity = this.thisActivity()[0];
    return (
      <div>
        <p>{activity.name}</p>
      </div>
    );
  }
}

SingleActivity.propTypes = propTypes;

function mapStateToProps(state) {
  return {
    activities: state.activities.activities,
  };
}

export default connect(mapStateToProps, actions)(SingleActivity);
