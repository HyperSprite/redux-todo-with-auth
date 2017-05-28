import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../actions';

const propTypes = {
  name: PropTypes.string,
  activityId: PropTypes.number,
  activities: PropTypes.array,
};

class SingleActivity extends Component {
  componentDidMount() {

  }

  render() {
    const { activityId, activities } = this.props;
    const thisActivity = activities.filter(activity => activity.activityId === activityId);
    return (
      <div>
        <p>{thisActivity[0].name}</p>
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
