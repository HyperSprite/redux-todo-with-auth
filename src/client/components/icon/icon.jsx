// @flow weak
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from 'material-ui/styles';
import TestIcon from './test-icon';

/**
Required only props
<Icon
  svgIcon
/>

All Props
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
  classes: PropTypes.object.isRequired,
  /** color=<option> - "primary" for primary palette color, "secondary" for secondary color */
  color: PropTypes.string,
  /** used with buttons to change color */
  disabled: PropTypes.bool,
  /** force - (bool) fixed primary colors */
  force: PropTypes.bool,
  /** inverse - (bool) the icon will swap the colors */
  inverse: PropTypes.bool,
  /** pointer - (bool) the icon look like a link */
  pointer: PropTypes.bool,
  /** enum: xs: 12x12, sm || small: 24x24, md || medium: 28x28,
            lg || large: 72x72, xl: 120x120 */
  size: PropTypes.string,
  /** This is an icon component from mdi-react */
  children: PropTypes.any,
  /** works like inverse for raised buttons */
  variant: PropTypes.string,
};

const defaultProps = {
  color: '',
  disabled: false,
  force: false,
  inverse: false,
  pointer: false,
  size: 'sm',
  children: TestIcon,
  variant: 'flat',
};

const styles = theme => ({
  root: {
    display: 'inline-block',
    fill: 'currentColor',
    backgroundColor: 'transparent',
    height: 24,
    width: 24,
    borderRadius: 2,
    userSelect: 'none',
    flexShrink: 0,
    transition: theme.transitions.create('fill', {
      duration: theme.transitions.duration.shorter,
    }),
  },
  inherit: {
    '&$variant': {
      fill: theme.palette.primary.main,
      backgroundColor: 'inherit',
    },
  },
  force: {
    fill: theme.palette.primary[500],
    backgroundColor: 'white',
    '&$inverse': {
      fill: theme.palette.background.default,
      backgroundColor: theme.palette.primary[500],
    },
  },
  primary: {
    fill: theme.palette.primary[500],
    backgroundColor: 'transparent',
    '&$disabled': {
      fill: theme.palette.action.disabled,
      backgroundColor: 'transparent',
    },
    '&$inverse': {
      fill: theme.palette.background.default,
      backgroundColor: 'transparent',
    },
    '&$variant': {
      fill: theme.palette.primary.contrastText,
      backgroundColor: theme.palette.primary.main,
    },
  },
  secondary: {
    fill: theme.palette.secondary.A200,
    backgroundColor: theme.palette.getContrastText(theme.palette.secondary.A200),
    '&$inverse': {
      fill: theme.palette.getContrastText(theme.palette.secondary.A200),
      backgroundColor: 'transparent',
    },
    '&$variant': {
      fill: theme.palette.secondary.contrastText,
      backgroundColor: theme.palette.secondary.main,
    },
  },
  xs: {
    height: 12,
    width: 12,
  },
  sm: {
    height: 24,
    width: 24,
  },
  md: {
    height: 48,
    width: 48,
    borderRadius: 0,
  },
  lg: {
    height: 72,
    width: 72,
  },
  xl: {
    height: 120,
    width: 120,
  },
  inverse: {},
  pointer: {
    cursor: 'pointer',
  },
  variant: {},
  disabled: {
    fill: theme.palette.action.disabled,
    backgroundColor: 'transparent',
  },
});

const ExtIcon = (props) => {
  const { classes, children, color, className: classNameProp, disabled, force, inverse, pointer, size, variant } = props;

  const className = classNames(
    {
      [classes.root]: true,
      [classes.primary]: color === 'primary',
      [classes.secondary]: color === 'secondary',
      [classes.inherit]: color === 'inherit',
      [classes.force]: force,
      [classes.disabled]: disabled,
      [classes.inverse]: inverse,
      [classes.variant]: variant === 'raised',
      [classes.pointer]: pointer,
      [classes.xs]: size === 'xs',
      [classes.sm]: size === 'sm' || size === 'small',
      [classes.md]: size === 'md' || size === 'medium',
      [classes.lg]: size === 'lg' || size === 'large',
      [classes.xl]: size === 'xl',
    },
    classNameProp,
  );
  return (
    <div className={classNames(classes.root, className)} >
      {React.cloneElement(children, { className: classNames(classes.root, className) })}
    </div>
  );
};

ExtIcon.propTypes = propTypes;
ExtIcon.defaultProps = defaultProps;

export default withStyles(styles, { name: 'StyledExtIcon' })(ExtIcon);
