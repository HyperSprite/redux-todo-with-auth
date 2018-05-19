import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

const propTypes = {
  Icon: PropTypes.any,
  linkTo: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  pageName: PropTypes.string.isRequired,
  primaryText: PropTypes.string.isRequired,
  target: PropTypes.string,
};

const defaultProps = {
  Icon: null,
  target: null,
};

const styles = theme => ({
  root: {
    fill: theme.palette.primary[600],
  },
});

const MenuDrawerItem = ({ classes, Icon, linkTo, onClick, pageName, primaryText, target }) => (
  <ListItem
    className={classes.root}
    button
    onClick={onClick}
    component={Link}
    to={linkTo}
    target={target}
    disabled={primaryText === pageName}
  >
    {Icon && (
      <ListItemIcon>
        <Icon color="inherit" />
      </ListItemIcon>
    )}
    <ListItemText primary={primaryText} />
  </ListItem>
);

MenuDrawerItem.propTypes = propTypes;
MenuDrawerItem.defaultProps = defaultProps;

export default withStyles(styles, { name: 'StyledMenuDrawerItem' })(MenuDrawerItem);
