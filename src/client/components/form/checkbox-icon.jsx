import React from 'react';
import PropTypes from 'prop-types';
import ToggleCheckBox from 'react-icons/lib/md/check-box';
import ToggleCheckBoxOutlineBlank from 'react-icons/lib/md/check-box-outline-blank';

import style from '../../styles/style';

const propTypes = {
  option: PropTypes.bool,
};

const defaultProps = {
  option: false,
};

const CheckboxIcon = ({ option, onClick }) => {
  const CheckBox = option ? ToggleCheckBox : ToggleCheckBoxOutlineBlank;
  return (
    <CheckBox style={style.toggleIconButton} onClick={onClick} />
  );
};

CheckboxIcon.propTypes = propTypes;
CheckboxIcon.defaultProps = defaultProps;

export default CheckboxIcon;
