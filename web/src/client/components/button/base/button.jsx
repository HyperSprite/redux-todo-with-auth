import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui-next/styles';
import Button from 'material-ui-next/Button';

import Icon from '../../icon';

const propTypes = {
  classes: PropTypes.object, // eslint-disable-line
  autoFocus: PropTypes.bool,
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
  type: PropTypes.string,
  /** Button variant enum: 'flat', 'raised', 'fab' <round> */
  variant: PropTypes.string,
};

const defaultProps = {
  autoFocus: false,
  color: '',
  disabled: false,
  hasIcon: false,
  label: '',
  size: 'small',
  type: 'button',
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
    button: {
      display: 'none',
    },
  },
});

const ButtonBaseButton = (props) => {
  const {
    autoFocus,
    classes,
    children,
    color,
    disabled,
    hasIcon,
    label,
    onClick,
    size,
    type,
    variant,
  } = props;
  return (
    <div>
      <Button
        // {...props}
        aria-label={label}
        className={classes.button}
        color={color}
        onClick={onClick}
        size={size}
        variant={variant}
        disabled={disabled}
        autoFocus={autoFocus}
        type={type}
      >
        {hasIcon && (
          <Icon color={color} size={size} variant={variant} >
            {children}
          </Icon>
        )}
        <span className={classes.buttonLabel}>
          {label}
        </span>
      </Button>
    </div>
  );
};

ButtonBaseButton.propTypes = propTypes;
ButtonBaseButton.defaultProps = defaultProps;

export default withStyles(styles, { name: 'StyledCloseButton' })(ButtonBaseButton);
