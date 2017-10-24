import React from 'react';
import PropTypes from 'prop-types';
import FaChevronUp from 'react-icons/lib/fa/chevron-up';
import FaChevronDown from 'react-icons/lib/fa/chevron-down';

const propTypes = {
  option: PropTypes.bool,
};

const defaultProps = {
  option: false,
};

const SpinnerIcon = ({ option }) => {
  const FaIcon = option ? FaChevronUp : FaChevronDown;
  return (
    <FaIcon size={12} style={{ transition: 'all 450ms' }} />
  );
};

SpinnerIcon.propTypes = propTypes;
SpinnerIcon.defaultProps = defaultProps;

export default SpinnerIcon;
