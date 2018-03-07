import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui-next/styles';
import Tooltip from 'material-ui-next/Tooltip';
import Button from 'material-ui-next/Button';

import Icon from '../../icon';

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
  /** Button variant enum: 'flat', 'raised', 'fab' <round> */
  variant: PropTypes.string,
};

const defaultProps = {
  color: '',
  label: '',
  size: 'small',
  toolTip: '',
  toolTipId: '',
  toolTipPlacement: 'top',
  variant: 'flat',
};

const styles = theme => ({
  root: {},
  button: {
    margin: '0.3em',
  },
  buttonLabel: {
    paddingLeft: '0.5em',
  },
  /**
  * Print style
  */
  '@media print': {
    button: {
      display: 'none',
    },
  },
});

const ExtButton = ({
  classes,
  children,
  color,
  onClick,
  label,
  size,
  toolTip,
  toolTipId,
  toolTipPlacement,
  variant,
}) => (
  <Tooltip
    id={toolTipId}
    title={toolTip}
    placement={toolTipPlacement}
  >
    <Button
      aria-label={label}
      className={classes.button}
      color={color}
      onClick={onClick}
      size={size}
      variant={variant}
    >
      <Icon color={color} size={size} variant={variant} >
        {children}
      </Icon>
      <span className={classes.buttonLabel}>
        {label}
      </span>
    </Button>
  </Tooltip>
);

ExtButton.propTypes = propTypes;
ExtButton.defaultProps = defaultProps;

export default withStyles(styles, { name: 'StyledCloseButton' })(ExtButton);
