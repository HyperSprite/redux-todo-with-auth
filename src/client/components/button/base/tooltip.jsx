import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui-next/styles';
import Tooltip from 'material-ui-next/Tooltip';

const propTypes = {
  classes: PropTypes.object, // eslint-disable-line
  toolTip: PropTypes.string,
  toolTipId: PropTypes.string,
  /** enum: 'bottom-end', 'bottom-start', 'bottom', 'left-end',
            'left-start', 'left', 'right-end', 'right-start',
            'right', 'top-end', 'top-start', 'top' */
  toolTipPlacement: PropTypes.string,
};

const defaultProps = {
  toolTip: '',
  toolTipId: '',
  toolTipPlacement: 'top',
};

const styles = theme => ({
  root: {},
  /**
  * Print style
  */
  '@media print': {
    root: {
      display: 'none',
    },
  },
});

const ButtonBaseTooltip = ({
  classes,
  children,
  toolTip,
  toolTipId,
  toolTipPlacement,
}) => (
  <div className={classes.root}>
    <Tooltip
      id={toolTipId}
      title={toolTip}
      placement={toolTipPlacement}
    >
      {children}
    </Tooltip>
  </div>
);

ButtonBaseTooltip.propTypes = propTypes;
ButtonBaseTooltip.defaultProps = defaultProps;

export default withStyles(styles, { name: 'StyledButtonTooltip' })(ButtonBaseTooltip);
