import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { IconButton } from 'material-ui';
import { ActionDeleteForever } from 'material-ui/svg-icons';

import lib from '../../containers/lib';
import * as actions from '../../actions';

const propTypes = {
  name: PropTypes.string,
  activityId: PropTypes.number,
  activities: PropTypes.array,
  mPref: PropTypes.bool,
  removeActivity: PropTypes.func,
};

const defaultProps = {
  mPref: false,
};

const deleteActivityURL = 'apiv1/activities/delete-activity';

class SingleActivity extends Component {
  constructor(props) {
    super(props);
    this.deleteActivity = this.deleteActivity.bind(this);
  }

  deleteActivity() {
    this.props.setIsFetching();
    this.props.removeActivity(deleteActivityURL, this.props.activityId);
  }

  thisActivity() {
    return this.props.activities.filter(activity => activity.activityId === this.props.activityId);
  }

  render() {
    const { mPref } = this.props;
    const activity = this.thisActivity()[0];

    if (activity.deleted) {
      return (
        <h4 style={{ color: '#77000' }}>{activity.name}</h4>
      );
    }

    return (
      <div>
        <h4><a href={`https://www.strava.com/activities/${activity.activityId}`} target="new">{activity.name}</a></h4>
        <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }} >

          {activity.tssScore ? (
            <div style={{ width: 100 }} >TSS<br />{activity.tssScore}</div>
          ) : (null)}

          {activity.suffer_score ? (
            <div style={{ width: 100 }} >SS<br />{activity.suffer_score}</div>
          ) : (null)}

          {activity.kilojoules ? (
            <div style={{ width: 100 }} >KJ<br />{activity.kilojoules}</div>
          ) : (null)}

          <div style={{ width: 100 }} >Moving Time<br />
            {lib.statsConversions('time', false, activity.moving_time)}
          </div>

          <div style={{ width: 100 }} >Distance<br />
            {lib.statsConversions('dst', false, activity.distance, mPref)}
            {mPref ? (<span> miles</span>) : (<span> meters</span>)}
          </div>

          <div style={{ width: 100 }} >Elevation<br />
            {lib.statsConversions('elev', false, activity.total_elevation_gain, mPref)}
            {mPref ? (<span> feet</span>) : (<span> meters</span>)}
          </div>
          <IconButton
            onClick={this.deleteActivity}
            tooltip="Delete from A Race athlete (does not remove from Strava)"
          >
            <ActionDeleteForever />
          </IconButton>
        </div>
      </div>
    );
  }
}

SingleActivity.propTypes = propTypes;
SingleActivity.defaultProps = defaultProps;

function mapStateToProps(state) {
  return {
    activities: state.activities.activities,
    mPref: state.auth.user.measurement_preference === 'feet',
  };
}

export default connect(mapStateToProps, actions)(SingleActivity);
