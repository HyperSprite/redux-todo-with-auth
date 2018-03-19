import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

import returnValues from './return-values';
import ActivityMetric from '../activity-metric';
import style from './style';

const propTypes = {
  classes: PropTypes.object.isRequired,
  totals: PropTypes.array.isRequired,
  mPref: PropTypes.bool.isRequired,
};

const styles = theme => ({
  title: {
    display: 'flex',
    verticalAlign: 'middle',
    alignItems: 'center',
    justifyContent: 'space-between',
    fontWeight: 500,
  },
  row: {
    padding: 15,
    display: 'flex',
    justifyContent: 'flex-start',
    flexFlow: 'row wrap',
    backgroundColor: theme.palette.secondary[50],
    '&:nth-child(even)': {
      backgroundColor: theme.palette.secondary[100],
    },
    '&:nth-child(odd)': {
      backgroundColor: theme.palette.secondary[50],
    },
  },
  box: {
    width: 180,
    display: 'flex',
    justifyContent: 'space-between',
  },
  boxLabel: {
    ...theme.typography.body1,
    color: theme.palette.secondary.dark,
    marginLeft: 10,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  boxData: {
    ...theme.typography.body3,
    color: theme.palette.primary.dark,
  },
});

const ActivityTotals = ({ classes, totals, mPref }) => (
  <div>
    {totals.map(row => (
      <div key={row.name} className={classes.row}>
        <div className={classes.box} >
          <div className={classes.boxLabel}>
            {row.name}
          </div>
          <div className={classes.boxData}>
            {row.count}
          </div>
        </div>
        {returnValues.map(rV => (
          <div key={`${row.name}${rV.activityType}`}>
            {(rV.conversionMetric) ? (
              <ActivityMetric
                key={rV.activityType}
                data={row}
                rV={rV}
                mPref={mPref}
              />

            ) : null}
          </div>
        ))}
      </div>
    ))}
  </div>
);

ActivityTotals.propTypes = propTypes;

export default withStyles(styles, { name: 'StyledActivityTotals' })(ActivityTotals);

/*
<div className={classes.box} >
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
      row[rV.conversionData],
      mPref,
    )}
  </div>
</div>
*/
