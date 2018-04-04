import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { connect } from 'react-redux';
import classNames from 'classnames';
import Card, { CardHeader, CardContent } from 'material-ui/Card';
import Collapse from 'material-ui/transitions/Collapse';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import SvgIcon from 'material-ui/SvgIcon';
import ChevronDownIcon from 'mdi-react/ChevronDownIcon';
import DeleteForeverIcon from 'mdi-react/DeleteForeverIcon';
import OpenInNewIcon from 'mdi-react/OpenInNewIcon';
import RefreshIcon from 'mdi-react/RefreshIcon';

import * as actions from '../../actions';

import ActivityMetric from '../activity-metric';
import Icon from '../icon';
import returnValues from './return-values';
import StaticMarkdown from '../form/static-markdown';

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
    margin: '4px 6px',
    overflow: 'hidden',
    border: `4px solid ${theme.palette.background.contentFrame}`,
    borderRadius: 2,
  },
  titleBox: {
    display: 'flex',
    color: theme.palette.primary[500],
    backgroundColor: theme.palette.background.contentFrame,
    fontSize: '1.3em',
    fontWeight: 500,
    width: '100%',
    flexWrap: 'wrap',
  },
  title: {
    marginTop: 2,
    fontSize: 18,
  },
  container: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    maxWidth: 800,
  },
  containerCol: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
  },
  boxLabel: {
    ...theme.typography.body1,
    color: theme.palette.secondary.dark,
    marginLeft: 10,
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
    marginLeft: 'auto',
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  cardContent: {
    padding: '4px 8px',
    '&:lastChild': '4px 8px',
  },
  '@media print': {
    icons: {
      display: 'none',
    },
    expand: {
      display: 'none',
    },
  },
});

class ExtActivitySingle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
    };
    this.deleteActivity = this.deleteActivity.bind(this);
    this.refreshActivity = this.refreshActivity.bind(this);
  }

  handleExpandClick = () => {
    this.setState({ expanded: !this.state.expanded });
  };

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

    if (!thisActivity.description) {
      return null;
    }

    return (
      <div key={`${thisActivity.activityId}-single`} className={classes.root} >
        <div className={classes.containerCol}>
          <div className={classes.titleBox} >
            {thisActivity.name}
          </div>
          <div className={classNames(classes.container, classes.icons)} >
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
              <Icon pointer inverse>
                <DeleteForeverIcon />
              </Icon>
            </IconButton>
            <IconButton
              onClick={this.refreshActivity}
              tooltip="Updates Activity from Strava"
            >
              <Icon pointer inverse >
                <RefreshIcon />
              </Icon>
            </IconButton>
            {thisActivity.description && (
              <div className={classes.boxLabel}>
                  Metrics
                  <IconButton
                    className={classNames(classes.expand, {
                      [classes.expandOpen]: this.state.expanded,
                    })}
                    onClick={this.handleExpandClick}
                    aria-expanded={this.state.expanded}
                    aria-label="Show more"
                  >
                    <SvgIcon size={24} >
                      <ChevronDownIcon />
                    </SvgIcon>
                  </IconButton>
                </div>
            )}
          </div>
          <Collapse
            in={this.state.expanded}
            timeout="auto"
            unmountOnExit
          >
            <div className={classes.container} >
              <div className={classes.containerCol} >
                {returnValues.filter(f => f.category === 'group1').map(rV => (
                  <ActivityMetric
                    key={rV.activityType}
                    data={thisActivity}
                    rV={rV}
                    mPref={mPref}
                  />
                ))}
              </div>
              <div className={classes.containerCol} >
                {returnValues.filter(f => f.category === 'group2').map(rV => (
                  <ActivityMetric
                    key={rV.activityType}
                    data={thisActivity}
                    rV={rV}
                    mPref={mPref}
                  />
                ))}
              </div>
              <div className={classes.containerCol} >
                {returnValues.filter(f => f.category === 'group3').map(rV => (
                  <ActivityMetric
                    key={rV.activityType}
                    data={thisActivity}
                    rV={rV}
                    mPref={mPref}
                  />
                ))}
              </div>
              <div className={classes.containerCol} >
                {returnValues.filter(f => f.category === 'group4').map(rV => (
                  <ActivityMetric
                    key={rV.activityType}
                    data={thisActivity}
                    rV={rV}
                    mPref={mPref}
                  />
                ))}
              </div>
            </div>
          </Collapse>
          <CardContent className={classes.cardContent} >
            <StaticMarkdown
              content={thisActivity.description}
            />
          </CardContent>
        </div>
        <Divider light />
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
