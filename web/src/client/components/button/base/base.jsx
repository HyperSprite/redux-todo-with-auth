import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Tooltip from './tooltip';
import Button from './button';

/**
* Required only props

<ButtonBase
  onClick={handleClose}
/>

*
* All Props

<ButtonBase
  onClick={handleClose}
  component={Link}
  to="/some-link"
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
  component: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
  ]),
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
  color: 'default',
  disabled: false,
  hasIcon: false,
  label: '',
  onClick: () => null,
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
    minWidth: 150,
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
    toolTip,
    toolTipId,
    toolTipPlacement,
    ...buttonProps
  } = props;

  return (
    <div className={classes.root}>
      {props.disabled || !toolTipPlacement ? (
        <Button {...buttonProps} >
          {children}
        </Button>
      ) : (
        <Tooltip
          id={toolTipId}
          title={toolTip}
          placement={toolTipPlacement}
        >
          <Button {...buttonProps} >
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
