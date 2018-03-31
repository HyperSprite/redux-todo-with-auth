import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'mdi-react/MenuIcon';

import Icon from '../icon';

const propTypes = {
  classes: PropTypes.object.isRequired,
  /**
  * Icon (see mdi-react)
  */
  leftIcon: PropTypes.node,
  /**
  * () => window.location.assign('/auth/strava')
  */
  leftOnClick: PropTypes.func,
  /**
  * rightImgSrc ? RightButton === image : RightButton === text
  * e.g http://someimage.png or import
  */
  rightImgSrc: PropTypes.string,
  /**
  * e.g. () => window.location.assign('/auth/strava')
  */
  rightOnClick: PropTypes.any,
  /**
  *
  */
  rightMenu: PropTypes.any,
  /**
  * Will be used as button text or image alt text
  * e.g. 'Login with Strava'
  */
  rightText: PropTypes.string,
  /** AppBar title */
  title: PropTypes.object,
};

const defaultProps = {
  leftIcon: <Icon force size="md" />,
  rightImgSrc: null,
  rightOnClick: null,
  rightText: '',
  title: {},
};

const styles = theme => ({
  root: {
    width: '100%',
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
});

function ExtAppBar(props) {
  const { classes, color, leftIcon, leftOnClick, rightImgSrc, rightOnClick, rightMenu, rightText, position } = props;
  const LeftIcon = leftIcon === 'menu' ? <Icon force inverse size="md" ><MenuIcon /></Icon> : leftIcon;
  const RightButton = () => {
    if (rightMenu) {
      return rightMenu
    }
    return (
      <Button
        onClick={rightOnClick}
      >
        {rightImgSrc ? (
          <img src={rightImgSrc} alt={rightText} />
        ) : (
          <span>{rightText}</span>
        )}
      </Button>
    );
  };

  return (
    <div className={classes.root}>
      <AppBar position={position} color={color}>
        <Toolbar>
          <IconButton onClick={leftOnClick} className={classes.menuButton} aria-label="Menu">
            {LeftIcon}
          </IconButton>
          <div className={classes.flex}>
            {props.title}
          </div>
          {(rightText || rightMenu) && <RightButton />}
        </Toolbar>
      </AppBar>
    </div>
  );
}

ExtAppBar.propTypes = propTypes;
ExtAppBar.defaultProps = defaultProps;

export default withStyles(styles, { name: 'StyledAppBar' })(ExtAppBar);
