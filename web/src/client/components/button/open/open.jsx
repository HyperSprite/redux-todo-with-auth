import React from 'react';
import PropTypes from 'prop-types';
import OpenInAppIcon from 'mdi-react/OpenInAppIcon';

import ButtonBase from '../base';

/**
* Required only props

<ButtonClose
  onClick={handleClose}
/>

*
* All Props

<ButtonClose
  onClick={handleClose}
  color="primary"
  label="Cancel"
  size="small"
  toolTip="Cancel Dialog"
  toolTipId="tooltip-close"
  toolTipPlacement="bottom"
  variant="flat"
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
  label: 'Open',
  size: 'small',
  toolTip: 'Open',
  toolTipId: 'tooltip-open',
  toolTipPlacement: 'top',
  variant: 'flat',
};

const ButtonOpen = props => (
  <ButtonBase {...props} >
    <OpenInAppIcon />
  </ButtonBase>
);

ButtonOpen.propTypes = propTypes;
ButtonOpen.defaultProps = defaultProps;

export default ButtonOpen;
