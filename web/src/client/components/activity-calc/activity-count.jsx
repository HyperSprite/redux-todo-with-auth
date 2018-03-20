import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui';
import justFNS from 'just-fns';

import ChartBarSingleHorz from '../charts/bar-single-horz';

const propTypes = {
  classes: PropTypes.object.isRequired,
  activitySearchCount: PropTypes.number,
  activCalcAll: PropTypes.number,
  activCalcFilter: PropTypes.number,
};

const defaultProps = {
  activitySearchCount: 0,
  activCalcAll: 0,
  activCalcFilter: 0,
};

const styles = theme => ({
  root: {},
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',

  },
  box: {
    width: 190,
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  boxLabel: {
    ...theme.typography.body1,
    color: theme.palette.secondary.dark,
    marginRight: 10,
  },
  boxData: {
    ...theme.typography.body3,
    color: theme.palette.primary.dark,
    marginLeft: 10,
  },
});

const ActivityCount = (props) => {
  const {
    classes,
    activitySearchCount,
    activCalcAll,
    activCalcFilter,
  } = props;

  return (activCalcFilter && activCalcAll) ? (
    <div className={classes.root} >
      <ChartBarSingleHorz
        chartData={[{
          name: 'Activities',
          Total: activCalcAll,
          Matched: activCalcFilter,
          Loaded: activitySearchCount,
        }]}
      />
      <div className={classes.container}>
        <div className={classes.box}>
          <div className={classes.boxLabel}>
            {'Loaded'}
          </div>
          <div className={classes.boxData}>
            {activitySearchCount}
          </div>
        </div>
        {(activCalcFilter !== activCalcAll) ? (
          <div className={classes.box} >
            <div className={classes.boxLabel}>
              {`Matched ${justFNS.round((activCalcFilter / activCalcAll) * 100, 0)}%`}
            </div>
            <div className={classes.boxData}>
              {activCalcFilter}
            </div>
          </div>
        ) : null}
        <div className={classes.box} >
          <div className={classes.boxLabel}>
            {'Total'}
          </div>
          <div className={classes.boxData}>
            {activCalcAll}
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

ActivityCount.propTypes = propTypes;
ActivityCount.defaultProps = defaultProps;

function mapStateToProps(state) {
  const { activities } = state;
  return {
    activitySearchCount: activities.activitySearch && activities.activitySearch.length,
    activCalcAll: activities.activCalcAll.count,
    activCalcFilter: activities.activCalcFilter.count,
  };
}

const StyledActivityCount = withStyles(styles, { name: 'styledActivityCount' })(ActivityCount);
export default connect(mapStateToProps)(StyledActivityCount);
