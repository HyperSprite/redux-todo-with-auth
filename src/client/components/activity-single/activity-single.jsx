import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { IconButton } from 'material-ui';
import { ActionDeleteForever, NavigationRefresh } from 'material-ui/svg-icons';

import * as actions from '../../actions';
import returnValues from './return-values';
import ActivityMetric from '../activity-metric';
import style from './style';

const propTypes = {
  activityId: PropTypes.number.isRequired,
  activities: PropTypes.array.isRequired,
  datePref: PropTypes.string,
  mPref: PropTypes.bool,
  manageActivity: PropTypes.func.isRequired,
  setIsFetching: PropTypes.func.isRequired,
};

const defaultProps = {
  datePref: '%m/%d/%Y',
  mPref: false,
};

class ActivitySingle extends Component {
  constructor(props) {
    super(props);
    this.manageActivity = this.manageActivity.bind(this);
  }

  manageActivity(action) {
    this.props.setIsFetching();
    this.props.manageActivity(action, this.props.activityId);
  }

  thisActivity() {
    return this.props.activities.filter(activity => activity.activityId === this.props.activityId)[0];
  }

  render() {
    const { mPref, datePref } = this.props;
    const activity = this.thisActivity();
    activity.datePref = datePref;
    if (activity.deleted) {
      return (
        <h4 style={style.h4}>{activity.name}</h4>
      );
    }

    return (
      <div key={`${activity.activityId}-single`} >
        <div style={style.title}>
          <div>
            <a href={`https://www.strava.com/activities/${activity.activityId}`} target="new">
              {activity.name}
            </a>
          </div>
        </div>
        <div style={style.container} >

          {returnValues.map(rV => (
            <ActivityMetric
              key={rV.activityType}
              data={activity}
              rV={rV}
              mPref={mPref}
            />
          ))}
        </div>
        <div style={style.delete}>
          <IconButton
            onClick={() => this.manageActivity('delete')}
          >
            <ActionDeleteForever />
          </IconButton>
          <IconButton
            onClick={() => this.manageActivity('refresh')}
          >
            <NavigationRefresh />
          </IconButton>
        </div>

      </div>
    );
  }
}

ActivitySingle.propTypes = propTypes;
ActivitySingle.defaultProps = defaultProps;

function mapStateToProps(state) {
  return {
    activities: state.activities.activities,
    mPref: state.page.mPref,
    datePref: state.auth.user.date_preference,
  };
}

export default connect(mapStateToProps, actions)(ActivitySingle);
