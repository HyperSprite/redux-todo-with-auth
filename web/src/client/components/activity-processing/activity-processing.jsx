import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import justFNS from 'just-fns';

import ChartBarSingleHorz from '../charts/bar-single-horz';

const propTypes = {
  classes: PropTypes.object.isRequired,
  processed: PropTypes.number, // state-3
  queued: PropTypes.number, // state-2
};

const defaultProps = {
  processed: 0,
  queued: 0,
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

const ActivityProcessing = (props) => {
  const {
    classes,
    processed,
    queued,
  } = props;

  const total = processed + queued || 0;

  return (total) ? (
    <div className={classes.root} >
      <ChartBarSingleHorz
        chartData={[{
          name: 'Activities',
          Total: total,
          Processed: processed,
        }]}
      />
      <div className={classes.container}>
        <div className={classes.box}>
          <div className={classes.boxLabel}>
            {'Processed'}
          </div>
          <div className={classes.boxData}>
            {processed}
          </div>
        </div>
        {(queued !== total) ? (
          <div className={classes.box} >
            <div className={classes.boxLabel}>
              {`Queued ${justFNS.round((queued / total) * 100, 0)}%`}
            </div>
            <div className={classes.boxData}>
              {queued}
            </div>
          </div>
        ) : null}
        <div className={classes.box} >
          <div className={classes.boxLabel}>
            {'Total Activities'}
          </div>
          <div className={classes.boxData}>
            {total}
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

ActivityProcessing.propTypes = propTypes;
ActivityProcessing.defaultProps = defaultProps;


export default withStyles(styles, { name: 'styledActivityProcessing' })(ActivityProcessing);
