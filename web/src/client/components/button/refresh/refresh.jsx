import React from 'react';
import PropTypes from 'prop-types';
import RefreshIcon from 'mdi-react/RefreshIcon';

import ButtonBase from '../base';

/**
* Required only props

<ButtonRefresh
  onClick={handleClose}
/>

*
* All Props

<ButtonRefresh
  onClick={handleClose}
  color="secondary"
  label="Refresh"
  size="small"
  toolTip="Refresh Data"
  toolTipId="tooltip-refresh"
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
  onClick: PropTypes.func.isRequired,
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
  label: 'Refresh',
  hasIcon: true,
  size: 'small',
  toolTip: 'Refresh Data',
  toolTipId: 'tooltip-refresh',
  toolTipPlacement: 'top',
  variant: 'flat',
};

const ButtonClose = props => (
  <ButtonBase {...props} >
    <RefreshIcon />
  </ButtonBase>
);

ButtonClose.propTypes = propTypes;
ButtonClose.defaultProps = defaultProps;

export default ButtonClose;
