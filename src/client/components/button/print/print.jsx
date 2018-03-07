import React from 'react';
import PropTypes from 'prop-types';
import PrinterIcon from 'mdi-react/PrinterIcon';

import ButtonBase from '../base';

/**
* Required only props

<ButtonPrint
  onClick={handleClose}
/>

*
* All Props

<ButtonPrint
  onClick={handleClose}
  color="primary"
  label="Print"
  size="small"
  toolTip="Print this page"
  toolTipId="tooltip-print"
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
  label: 'Print',
  hasIcon: true,
  size: 'small',
  toolTip: '',
  toolTipId: 'tooltip-print',
  toolTipPlacement: 'top',
  variant: 'flat',
  onClick: () => window.print(),
};

const ButtonPrint = props => (
  <ButtonBase {...props} >
    <PrinterIcon />
  </ButtonBase>
);

ButtonPrint.propTypes = propTypes;
ButtonPrint.defaultProps = defaultProps;

export default ButtonPrint;
