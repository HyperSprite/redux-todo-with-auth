import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { IconButton } from 'material-ui';
import { ActionDeleteForever } from 'material-ui/svg-icons';

import lib from '../../containers/lib';
import * as actions from '../../actions';
import theme from '../../styles/theme';


const style = {
  title: {
    display: 'inline-flex',
    verticalAlign: 'middle',
    alignItems: 'center',
    justifyContent: 'space-between',
    fontWeight: 600,
  },
  delete: {

  },
  container: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    maxWidth: 600,
  },
  box: {
    width: 200,
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    // border: `thin solid ${theme.palette.accent3Color}`,
  },
  boxLabel: {
    fontStyle: 'strong',
    color: theme.palette.accent1Color,
    marginLeft: 10,
  },
  boxData: {
    marginRight: 10,
  },
};

const returnValues = [
  {
    activityType: 'gear',
    activityTypeSub: 'name',
    activityLabel: 'Gear',
  },
  {
    activityType: 'tssScore',
    activityLabel: 'TSS',
  },
  {
    activityType: 'kilojoules',
    activityLabel: 'Kilojoules',
  },
  {
    activityType: 'weighted_average_watts',
    activityLabel: 'Nomalized Power',
  },
  {
    activityType: 'suffer_score',
    activityLabel: 'Suffer Score',
  },
  {
    activityType: 'calories',
    activityLabel: 'Calories',
  },
  {
    activityType: 'moving_time',
    activityLabel: 'Moving Time',
    conversionFunction: lib.statsConversions,
    conversionMetric: 'time',
    conversionYAxis: false,
    conversionData: 'moving_time',
  },
  {
    activityType: 'distance',
    activityLabel: 'Distance',
    conversionFunction: lib.statsConversions,
    conversionMetric: 'dst',
    conversionYAxis: false,
    conversionData: 'distance',
    conversionTypeSA: 'miles',
    conversionTypeMetric: 'meters',
    conversionmPref: true,
  },
  {
    activityType: 'total_elevation_gain',
    activityLabel: 'Elevation',
    conversionFunction: lib.statsConversions,
    conversionMetric: 'elev',
    conversionYAxis: false,
    conversionData: 'total_elevation_gain',
    conversionTypeSA: 'feet',
    conversionTypeMetric: 'meters',
    conversionmPref: true,
  },
];
// metric, yAxis, data, mPref

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
        <h4 style={style.h4}>{activity.name}</h4>
      );
    }

    return (
      <div key={`${activity.activityId}-single`} >
        <div style={style.title}>
          <a href={`https://www.strava.com/activities/${activity.activityId}`} target="new">
            {activity.name}
          </a>
          <IconButton
            onClick={this.deleteActivity}
            tooltip="Delete from A Race athlete (does not remove from Strava)"
          >
            <ActionDeleteForever />
          </IconButton>
        </div>
        <div style={style.container} >

          {returnValues.map((rV) => {
            if (activity[rV.activityType] && rV.conversionMetric) {
              return (
                <div key={rV.activityType} style={style.box} >
                  <div style={style.boxLabel}>
                    {rV.activityLabel}
                  </div>
                  <div style={style.boxData}>
                    {rV.conversionFunction(
                      rV.conversionMetric,
                      rV.conversionYAxis,
                      activity[rV.conversionData],
                      mPref,
                    )}
                    {rV.conversionmPref ? (
                      <span>
                        {mPref ? (
                          <span> {rV.conversionTypeSA}</span>
                        ) : (
                          <span> {rV.conversionTypeMetric}</span>
                        )}
                      </span>
                    ) : (null)}
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
