import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui-next/styles';
import Typography from 'material-ui-next/Typography';
import { connect } from 'react-redux';
import { IconButton } from 'material-ui-next';
import DeleteForeverIcon from 'mdi-react/DeleteForeverIcon';
import OpenInNewIcon from 'mdi-react/OpenInNewIcon';
import RefreshIcon from 'mdi-react/RefreshIcon';

import * as actions from '../../actions';

import ActivityMetric from '../activity-metric';
import MetricLabel from '../metric-label';
import Icon from '../icon';
import returnValues from './return-values';
// import style from './style';

const propTypes = {
  /** Activity ID */
  activityId: PropTypes.number.isRequired,
  /** Activity array */
  activities: PropTypes.array.isRequired,
  /** Imperial or Metric */
  mPref: PropTypes.bool,
  /** Function to remove this Activity */
  removeActivity: PropTypes.func.isRequired,
  /** Sets Redux state to isFetching */
  setIsFetching: PropTypes.func.isRequired,
};

const defaultProps = {
  datePref: '%m/%d/%Y',
  mPref: false,
  thisActivity: {},
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    margin: '15px 2px 5px 2px',
    overflow: 'hidden',
  },
  titleBox: {
    display: 'flex',
    color: theme.palette.primary[500],
    fontSize: '1.2em',
    fontWeight: 600,
    width: '100%',
    flexWrap: 'wrap',
  },
  title: {
    marginTop: 14,
    fontSize: 18,
  },
  icons: {
    // marginRight: '3vw',
  },
  container: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    maxWidth: 600,
  },
  // box: {
  //   width: 200,
  //   display: 'flex',
  //   justifyContent: 'space-between',
  //   flexWrap: 'wrap',
  // },
});

const deleteActivityURL = 'apiv1/activities/delete-activity';

class ExtActivitySingle extends Component {
  constructor(props) {
    super(props);
    this.deleteActivity = this.deleteActivity.bind(this);
    this.refreshActivity = this.refreshActivity.bind(this);
  }

  getThisActivity() {
    return this.props.activities.filter(activity => activity.activityId === this.props.activityId)[0];
  }

  manageActivity(action) {
    this.props.setIsFetching();
    this.props.manageActivity(action, this.props.activityId);
  }

  deleteActivity() {
    this.manageActivity('delete');
  }

  refreshActivity() {
    this.manageActivity('refresh');
  }

  render() {
    const { classes, mPref, datePref, deleteActivity, refreshActivity } = this.props;
    const thisActivity = this.getThisActivity();
    thisActivity.datePref = datePref;
    return (
      <div key={`${thisActivity.activityId}-single`} className={classes.root} >
        <div className={classes.titleBox} >
          <div className={classes.title} >
            {thisActivity.name}
          </div>
          <div className={classes.icons} >
            <IconButton
              onClick={() => window.open(`https://www.strava.com/activities/${thisActivity.activityId}`, '_new')}
            >
              <Icon pointer inverse>
                <OpenInNewIcon />
              </Icon>
            </IconButton>
            <IconButton
              onClick={this.deleteActivity}
              tooltip="Delete from A Race athlete (does not remove from Strava)"
            >
              <Icon pointer size="lg">
                <DeleteForeverIcon />
              </Icon>
            </IconButton>
            <IconButton
              onClick={this.refreshActivity}
              tooltip="Updates Activity from Strava"
            >
              <Icon pointer color="secondary" inverse >
                <RefreshIcon />
              </Icon>
            </IconButton>
          </div>
        </div>
        <div className={classes.container} >

          {returnValues.map(rV => (
            <ActivityMetric
              key={rV.activityType}
              data={thisActivity}
              rV={rV}
              mPref={mPref}
            />
          ))}
        </div>
      </div>
    );
  }
}

ExtActivitySingle.propTypes = propTypes;
ExtActivitySingle.defaultProps = defaultProps;

function mapStateToProps(state) {
  return {
    activities: state.activities.activities,
    mPref: state.page.mPref,
    datePref: state.auth.user.date_preference,
  };
}

const StyledSingleActivity = withStyles(styles, { name: 'StyledSingleActivity' })(ExtActivitySingle);

export default connect(mapStateToProps, actions)(StyledSingleActivity);
