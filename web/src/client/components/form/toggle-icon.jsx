import React, { PropTypes } from 'react';
import FaToggleOff from 'react-icons/lib/fa/toggle-off';
import FaToggleOn from 'react-icons/lib/fa/toggle-on';

const propTypes = {
  option: PropTypes.bool,
};

const defaultProps = {
  option: false,
};

const ToggleIcon = ({ option }) => {
  const FaIcon = option ? FaToggleOn : FaToggleOff;
  return (
    <FaIcon size={20} style={{ transition: 'all 450ms' }} />
  );
};

ToggleIcon.propTypes = propTypes;
ToggleIcon.defaultProps = defaultProps;

export default ToggleIcon;
