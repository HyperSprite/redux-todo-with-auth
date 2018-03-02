// @flow weak

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from 'material-ui-next/styles';
import TestIcon from './test-icon';

const propTypes = {
  classes: PropTypes.object.isRequired,
  /** color=<option> - "primary" for primary palette color, "secondary" for secondary color */
  color: PropTypes.string,
  /** inverse - (bool) the icon will swap the colors */
  inverse: PropTypes.bool,
  /** pointer - (bool) the icon look like a link */
  pointer: PropTypes.bool,
  /** size=<option> - xs: 12x12, sm: 24x24, md: 28x28, lg: 72x72, xl: 120x120 */
  size: PropTypes.string,
  /** This is an icon component from mdi-react */
  svgIcon: PropTypes.any,
};

const defaultProps = {
  color: null,
  inverse: false,
  pointer: false,
  size: null,
  svgIcon: TestIcon,
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
  primary: {
    fill: theme.palette.primary[500],
    backgroundColor: theme.palette.getContrastText(theme.palette.primary[500]),
    '&$inverse': {
      fill: theme.palette.getContrastText(theme.palette.primary[500]),
      backgroundColor: theme.palette.primary[500],
    },
  },
  secondary: {
    fill: theme.palette.secondary.A200,
    backgroundColor: theme.palette.getContrastText(theme.palette.secondary.A200),
    '&$inverse': {
      fill: theme.palette.getContrastText(theme.palette.secondary.A200),
      backgroundColor: theme.palette.secondary.A200,
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
});

const ExtIcon = (props) => {
  const { classes, color, className: classNameProp, inverse, pointer, size, svgIcon } = props;

  const className = classNames(
    {
      [classes.root]: true,
      [classes.primary]: color === 'primary',
      [classes.secondary]: color === 'secondary',
      [classes.inverse]: inverse,
      [classes.pointer]: pointer,
      [classes.xs]: size === 'xs',
      [classes.sm]: size === 'sm',
      [classes.md]: size === 'md',
      [classes.lg]: size === 'lg',
      [classes.xl]: size === 'xl',
    },
    classNameProp,
  );

  const SVGIcon = svgIcon;
  return (
    <div className={classNames(classes.root, className)} >
      <SVGIcon className={classNames(classes.root, className)} />
    </div>
  );
};

ExtIcon.propTypes = propTypes;
ExtIcon.defaultProps = defaultProps;


export default withStyles(styles, { name: 'StyledExtIcon' })(ExtIcon);
