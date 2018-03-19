import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from 'material-ui/styles';

const propTypes = {
  /**
  * Offests info left or right
  */
  bias: PropTypes.oneOf(['left', 'right']),
  /**
  * Sets bold to right
  */
  inverse: PropTypes.bool,
  /**
  * content to be displayed on left side
  */
  leftContent: PropTypes.any,
  /**
  * content to be displayed on right side
  */
  rightContent: PropTypes.any,
  /**
  * 'md' sets minWidth to 100
  * 'lg' sets minWidth to 300
  */
  size: PropTypes.oneOf(['md', 'lg']),
};

const defaultProps = {
  bias: null,
  inverse: false,
  leftContent: '',
  rightContent: '',
  size: null,
};

const styles = theme => ({
  root: {
    width: 145,
    display: 'flex',
    '&$md': {
      width: 200,
    },
    '&$lg': {
      width: 'inherit',
      minWidth: 300,
    },
  },

  left: {
    width: '50%',
    marginRight: 5,
    display: 'flex',
    justifyContent: 'flex-end',
    fontWeight: 700,
    color: theme.palette.primary[500],
    '&$inverse': {
      fontWeight: 400,
      color: theme.palette.primary[900],
    },
    '&$md': {
      width: 100,
    },
    '&$lg': {
      width: 'inherit',
      minWidth: 300,
    },
    '&$biasLeft': {
      width: '65%',
    },
    '&$biasRight': {
      width: '30%',
    },
  },
  right: {
    width: '50%',
    display: 'flex',
    justifyContent: 'flex-start',
    fontWeight: 400,
    color: theme.palette.primary[900],
    '&$inverse': {
      fontWeight: 700,
      color: theme.palette.primary[500],
    },
    '&$md': {
      // width: 100,
    },
    '&$lg': {
      width: 'inherit',
      minWidth: 300,
    },
    '&$biasRight': {
      width: '65%',
    },
    '&$biasLeft': {
      width: '30%',
    },
  },
  inverse: {},
  md: {},
  lg: {},
  biasLeft: {},
  biasRight: {},
});

const ExtMetricLabel = ({ bias, classes, className: classNameProp, leftContent, inverse, rightContent, size }) => {
  const className = classNames(
    {
      [classes.root]: true,
      [classes.inverse]: inverse,
      [classes.md]: size === 'md',
      [classes.lg]: size === 'lg',
      [classes.biasLeft]: bias === 'left',
      [classes.biasRight]: bias === 'right',
    },
    classNameProp,
  );
  return (
    <div className={classNames(classes.root, className)} >
      <div className={classNames(classes.left, className)}>
        {leftContent}
      </div>
      <div className={classNames(classes.right, className)}>
        {rightContent}
      </div>
    </div>
  );
};

ExtMetricLabel.propTypes = propTypes;
ExtMetricLabel.defaultProps = defaultProps;

export default withStyles(styles, { name: 'StyledExtMetricLabel' })(ExtMetricLabel);
