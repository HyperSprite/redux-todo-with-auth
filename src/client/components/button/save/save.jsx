import React from 'react';
import PropTypes from 'prop-types';
import ContentSaveIcon from 'mdi-react/ContentSaveIcon';

import ButtonBase from '../base';

/**
* Required only props

<ButtonSave
  onClick={handleClose}
/>

*
* All Props

<ButtonSave
  onClick={handleClose}
  color="secondary"
  label="Save"
  size="small"
  toolTip="Save"
  toolTipId="tooltip-save"
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
  label: 'Save',
  hasIcon: true,
  size: 'small',
  toolTip: 'Save',
  toolTipId: 'tooltip-save',
  toolTipPlacement: 'top',
  variant: 'flat',
};

const ButtonRefresh = props => (
  <ButtonBase {...props} >
    <ContentSaveIcon />
  </ButtonBase>
);

ButtonRefresh.propTypes = propTypes;
ButtonRefresh.defaultProps = defaultProps;

export default ButtonRefresh;
