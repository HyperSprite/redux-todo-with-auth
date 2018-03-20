import React from 'react';
import PropTypes from 'prop-types';
import CancelIcon from 'mdi-react/CancelIcon';

import ButtonBase from '../base';

const propTypes = {
  classes: PropTypes.object, // eslint-disable-line
  /** enum: 'default', 'inherit', 'primary', 'secondary' */
  color: PropTypes.string,
  /** Label for button */
  label: PropTypes.string,
  /** onClick handler */
  onClick: PropTypes.func,
  /** enum: 'small', 'medium', 'large' */
  size: PropTypes.string,
  /** ToolTip text */
  toolTip: PropTypes.string,
  toolTipId: PropTypes.string,
  /** enum: 'bottom-end', 'bottom-start', 'bottom', 'left-end',
            'left-start', 'left', 'right-end', 'right-start',
            'right', 'top-end', 'top-start', 'top' */
  toolTipPlacement: PropTypes.string,
  /** Button variant enum: 'flat', 'raised', 'fab' */
  variant: PropTypes.string,
};

const defaultProps = {
  color: 'primary',
  label: 'Cancel',
  hasIcon: true,
  onClick: () => null,
  size: 'small',
  toolTip: 'Cancel',
  toolTipId: 'tooltip-add',
  toolTipPlacement: 'top',
  variant: 'flat',
};

const ButtonRefresh = props => (
  <ButtonBase {...props} >
    <CancelIcon />
  </ButtonBase>
);

ButtonRefresh.propTypes = propTypes;
ButtonRefresh.defaultProps = defaultProps;

export default ButtonRefresh;
