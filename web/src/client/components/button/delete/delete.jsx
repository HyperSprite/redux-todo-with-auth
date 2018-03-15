import React from 'react';
import PropTypes from 'prop-types';
import DeleteIcon from 'mdi-react/DeleteIcon';

import ButtonBase from '../base';

/**
* Required only props

<ButtonDelete
  onClick={handleClose}
/>

*
* All Props

<ButtonDelete
  onClick={handleClose}
  color="secondary"
  label="Delete Hashtag"
  size="small"
  toolTip="Delete hashtag"
  toolTipId="tooltip-delete"
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
  label: 'Delete',
  hasIcon: true,
  size: 'small',
  toolTip: 'Add',
  toolTipId: 'tooltip-delete',
  toolTipPlacement: 'top',
  variant: 'flat',
};

const ButtonRefresh = props => (
  <ButtonBase {...props} >
    <DeleteIcon />
  </ButtonBase>
);

ButtonRefresh.propTypes = propTypes;
ButtonRefresh.defaultProps = defaultProps;

export default ButtonRefresh;
