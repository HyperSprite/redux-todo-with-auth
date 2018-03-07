import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui-next/styles';

import Tooltip from './tooltip';
import Button from './button';

import Icon from '../../icon';

/**
* Required only props

<ButtonBase
  onClick={handleClose}
/>

*
* All Props

<ButtonBase
  onClick={handleClose}
  color="primary"
  label="Cancel"
  hasIcon={false}
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
  disabled: PropTypes.bool,
  hasIcon: PropTypes.bool,
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
  /** Button variant enum: 'flat', 'raised', 'fab' <round> */
  variant: PropTypes.string,
};

const defaultProps = {
  color: '',
  disabled: false,
  hasIcon: false,
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
    width: 150,
    height: 38,
  },
  buttonLabel: {
    paddingLeft: '0.5em',
  },
  /**
  * Print style
  */
  '@media print': {
    root: {
      display: 'none',
    },
  },
});

const ButtonBase = (props) => {
  const {
    classes,
    children,
    disabled,
    toolTip,
    toolTipId,
    toolTipPlacement,
  } = props;
  return (
    <div className={classes.root}>
      {disabled || !toolTipId ? (
        <Button {...props} >
          {children}
        </Button>
      ) : (
        <Tooltip
          id={toolTipId}
          title={toolTip}
          placement={toolTipPlacement}
        >
          <Button {...props} >
            {children}
          </Button>
        </Tooltip>
      )}
    </div>
  );
};

ButtonBase.propTypes = propTypes;
ButtonBase.defaultProps = defaultProps;

export default withStyles(styles, { name: 'StyledCloseButton' })(ButtonBase);
