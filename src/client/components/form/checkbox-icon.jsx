import React from 'react';
import PropTypes from 'prop-types';
import Checkbox from 'material-ui-next/Checkbox';

const propTypes = {
  option: PropTypes.bool,
};

const defaultProps = {
  option: false,
};

const CheckboxIcon = ({ option, onClick }) => (
  <Checkbox checked={option} onChange={onClick} />
);

CheckboxIcon.propTypes = propTypes;
CheckboxIcon.defaultProps = defaultProps;

export default CheckboxIcon;
