import React from 'react';
import PropTypes from 'prop-types';
import UndoIcon from 'mdi-react/UndoIcon';

import ButtonBase from '../base';

/**
* Required only props

<ButtonReset
  onClick={handleClose}
/>

*
* All Props

<ButtonReset
  onClick={handleClose}
  color="secondary"
  label="Reset"
  size="small"
  toolTip="Reset"
  toolTipId="tooltip-reset"
  toolTipPlacement="bottom"
  variant="raised"
/>

*/

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
  label: 'Reset',
  hasIcon: true,
  size: 'small',
  toolTip: 'Reset',
  toolTipId: 'tooltip-reset',
  toolTipPlacement: 'top',
  variant: 'flat',
};

const ButtonRefresh = props => (
  <ButtonBase {...props} >
    <UndoIcon />
  </ButtonBase>
);

ButtonRefresh.propTypes = propTypes;
ButtonRefresh.defaultProps = defaultProps;

export default ButtonRefresh;
