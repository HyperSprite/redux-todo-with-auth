import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  ListItem,
  ListItemIcon,
  ListItemText,
} from 'material-ui-next/List';


const propTypes = {
  Icon: PropTypes.any,
  linkTo: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  primaryText: PropTypes.string.isRequired,
  target: PropTypes.string,
};

const defaultProps = {
  Icon: null,
  target: null,
};

const MenuDrawerItem = ({ Icon, linkTo, onClick, primaryText, target }) => (
  <ListItem
    button
    onClick={onClick}
    component={Link}
    to={linkTo}
    target={target}
  >
    {Icon && (
      <ListItemIcon>
        <Icon />
      </ListItemIcon>
    )}
    <ListItemText primary={primaryText} />
  </ListItem>
);

MenuDrawerItem.propTypes = propTypes;
MenuDrawerItem.defaultProps = defaultProps;

export default MenuDrawerItem;
