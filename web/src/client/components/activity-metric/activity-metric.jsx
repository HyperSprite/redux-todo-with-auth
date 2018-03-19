import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

const propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.object,
  rV: PropTypes.object,
  mPref: PropTypes.bool,
};

const defaultProps = {
  mPref: false,
  data: null,
  rV: null,
};

const styles = theme => ({
  root: {
    width: 180,
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  boxLabel: {
    ...theme.typography.body1,
    color: theme.palette.secondary.dark,
    marginLeft: 10,
  },
  boxData: {
    ...theme.typography.body3,
    color: theme.palette.primary.dark,
  },
});

const ActivityMetric = ({ classes, data, rV, mPref }) => {
  if (data[rV.activityType] && rV.conversionMetric) {
    return (
      <div className={classes.root} >
        <div className={classes.boxLabel}>
          {rV.activityLabel}
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
        <div className={classes.boxData}>
          {rV.conversionFunction(
            rV.conversionMetric,
            rV.conversionYAxis,
            data[rV.conversionData],
            mPref,
          )}

        </div>
      </div>
    );
  } else if (data[rV.activityType] && data[rV.activityType][rV.activityTypeSub]) {
    return (
      <div className={classes.root} >
        <div className={classes.boxLabel}>
          {rV.activityLabel}
        </div>
        <div className={classes.boxData}>
          {data[rV.activityType][rV.activityTypeSub]}
        </div>
      </div>
    );
  } else if (rV.compute && data[rV.arg1]) {
    return (
      <div className={classes.root} >
        <div className={classes.boxLabel}>
          {rV.activityLabel}
        </div>
        <div className={classes.boxData}>
          {rV.compute(data[rV.arg1], data[rV.arg2], rV.arg3)}
        </div>
      </div>
    );
  } else if (rV.link && data[rV.arg1]) {
    return (
      <div className={classes.root} >
        <div className={classes.boxLabel}>
          <a href={rV.link(data[rV.arg1])} target="new" >
            {rV.activityLabel}
          </a>
        </div>
      </div>
    );
  } else if (data[rV.activityType]) {
    return (
      <div className={classes.root} >
        <div className={classes.boxLabel}>
          {rV.activityLabel}
        </div>
        <div className={classes.boxData}>
          {data[rV.activityType]}
        </div>
      </div>
    );
  }
  return null;
};

ActivityMetric.propTypes = propTypes;
ActivityMetric.defaultProps = defaultProps;

export default withStyles(styles, { name: 'StyledActivityMetric' })(ActivityMetric);
