import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { IconButton } from 'material-ui';
import { ActionDeleteForever } from 'material-ui/svg-icons';

import * as actions from '../../../actions';
import returnValues from './return-values';
import style from './style';

const propTypes = {
  activityId: PropTypes.number.isRequired,
  activities: PropTypes.array.isRequired,
  mPref: PropTypes.bool,
  removeActivity: PropTypes.func.isRequired,
  setIsFetching: PropTypes.func.isRequired,
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
    return this.props.activities.filter(activity => activity.activityId === this.props.activityId)[0];
  }

  render() {
    const { mPref } = this.props;
    const activity = this.thisActivity();

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
          <div style={style.delete}>
            <IconButton
              onClick={this.deleteActivity}
              tooltip="Delete from A Race athlete (does not remove from Strava)"
            >
              <ActionDeleteForever />
            </IconButton>
          </div>
        </div>
        <div style={style.container} >

          {returnValues.map((rV) => {
            if (activity[rV.activityType] && rV.conversionMetric) {
              return (
                <div key={rV.activityType} style={style.box} >
                  <div style={style.boxLabel}>
                    {rV.activityLabel}
                    {rV.conversionmPref ? (
                      <span>
                        {mPref ? (
                          <span> {`(${rV.conversionTypeSA})`}</span>
                        ) : (
                          <span> {`(${rV.conversionTypeMetric})`}</span>
                        )}
                      </span>
                    ) : (null)}
                  </div>
                  <div style={style.boxData}>
                    {rV.conversionFunction(
                      rV.conversionMetric,
                      rV.conversionYAxis,
                      activity[rV.conversionData],
                      mPref,
                    )}

                  </div>
                </div>
              );
            } else if (activity[rV.activityType] && activity[rV.activityType][rV.activityTypeSub]) {
              return (
                <div key={rV.activityType} style={style.box} >
                  <div style={style.boxLabel}>
                    {rV.activityLabel}
                  </div>
                  <div style={style.boxData}>
                    {activity[rV.activityType][rV.activityTypeSub]}
                  </div>
                </div>
              );
            } else if (rV.division && activity[rV.divideThis]) {
              return (
                <div key={rV.activityType} style={style.box} >
                  <div style={style.boxLabel}>
                    {rV.activityLabel}
                  </div>
                  <div style={style.boxData}>
                    {rV.division(activity[rV.divideThis], activity[rV.byThis], 2)}
                  </div>
                </div>
              );
            } else if (activity[rV.activityType]) {
              return (
                <div key={rV.activityType} style={style.box} >
                  <div style={style.boxLabel}>
                    {rV.activityLabel}
                  </div>
                  <div style={style.boxData}>
                    {activity[rV.activityType]}
                  </div>
                </div>
              );
            }
            return null;
          })}
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
