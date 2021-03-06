import React from 'react';
import PropTypes from 'prop-types';
import Divider from '@material-ui/core/Divider';
import LinearProgress from '@material-ui/core/LinearProgress';

/**
<ProgressDivider isProgress={actionOnTrue} />
*/

const propTypes = {
  isProgress: PropTypes.bool.isRequired,
};

const ProgressDivider = ({ isProgress }) => (
  <div>
    {isProgress ? <LinearProgress /> : <div style={{ paddingTop: 1 }} ><Divider style={{ padding: '2px 0' }} /></div>}
  </div>
);

ProgressDivider.propTypes = propTypes;

export default ProgressDivider;
