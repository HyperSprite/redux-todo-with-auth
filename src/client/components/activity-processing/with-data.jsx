import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import IconButton from 'material-ui/IconButton';
import SvgIcon from 'material-ui/SvgIcon';
import { CircularProgress } from 'material-ui/Progress';
import RefreshIcon from 'mdi-react/RefreshIcon';
import withData from '../../containers/withData';
import ActivityProcessing from '../activity-processing';

const url = '/apiv1/activities/processing-status';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chart: {
    flexGrow: 2,
  },
  items: {

  },
  button: {
    width: 48,
    height: 48,
  },
});

const ProcessingStatus = (props) => {
  const { classes, data, withDataFetching, withDataNotice, onClick, timer } = props;

  console.log('fetching', data, withDataFetching, withDataNotice);

  const Button = () => {
    if (withDataFetching) {
      console.log('fetching', withDataFetching, withDataNotice);
      return (
        <div className={classes.button}>
          <IconButton color="secondary" >
            <CircularProgress />
          </IconButton>
        </div>
      );
    }
    if (!data || !data.RESOURCE_STATE.state3 || (data && data.RESOURCE_STATE.state2)) {
      return (
        <div className={classes.button} >
          <IconButton color="secondary" onClick={onClick} >
            <SvgIcon>
              <RefreshIcon />
            </SvgIcon>
          </IconButton>
        </div>
      );
    }
    return null;
  };

  return (
    <div className={classes.root} >
      <Button />
      {(data && data.RESOURCE_STATE.state2) ? (
        <div className={classes.chart} >
          <ActivityProcessing
            processed={data.RESOURCE_STATE.state3}
            queued={data.RESOURCE_STATE.state2}
          />
        </div>
      ) : null}
    </div>
  );
};

const withAutoData = withData(url);
const styledProcessingStatus = withStyles(styles, { name: 'styledProcessingStatus' })(ProcessingStatus)
export default withAutoData(styledProcessingStatus);
