import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ActivityProcessing from '../activity-processing';

import types from '../../types';

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
  classes: types.classes,
  processed: types.processed.isRequired,
  queued: types.queued,
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

export default connect(mapStateToProps)(ProcessingStatus);
