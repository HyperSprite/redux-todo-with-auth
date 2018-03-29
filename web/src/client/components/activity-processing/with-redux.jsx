import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import ActivityProcessing from '../activity-processing';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
});

const ProcessingStatus = (props) => {
  const { classes, processed, queued } = props;
  return (
    <div>
      {(queued) ? (
        <div>
          <ActivityProcessing
            processed={processed}
            queued={queued}
          />
        </div>
      ) : null}
    </div>
  );
};

ProcessingStatus.propTypes = {
  classes: PropTypes.object.isRequired,
  processed: PropTypes.number.isRequired,
  queued: PropTypes.number,
};

ProcessingStatus.defaultProps = {
  queued: 0,
};

function mapStateToProps(state) {
  return {
    processed: state.activities.status.state3,
    queued: state.activities.status.state2,
  };
}

const styledProcessingStatus = withStyles(styles, { name: 'styledProcessingStatus' })(ProcessingStatus);
export default connect(mapStateToProps)(styledProcessingStatus);
