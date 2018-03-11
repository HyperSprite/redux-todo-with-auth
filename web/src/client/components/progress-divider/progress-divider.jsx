import React from 'react';
import PropTypes from 'prop-types';
import Divider from 'material-ui/Divider';
import { LinearProgress } from 'material-ui-next/Progress';

const propTypes = {
  isProgress: PropTypes.bool.isRequired,
};

const ProgressDivider = ({ isProgress }) => (
  <div>
    {isProgress ? <LinearProgress /> : <Divider style={{ hight: 5, padding: '3px 0' }} />}
  </div>
);

ProgressDivider.propTypes = propTypes;

export default ProgressDivider;
