import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { MenuItem } from 'material-ui';

const propTypes = {
  linkTo: PropTypes.string.isRequired,
  onTouchTap: PropTypes.func.isRequired,
  primaryText: PropTypes.string.isRequired,
  target: PropTypes.string,
};

const defaultProps = {
  target: null,
};

const MenuDrawerItem = ({ linkTo, onTouchTap, primaryText, target }) => (
  <MenuItem
    onTouchTap={onTouchTap}
    primaryText={primaryText}
    containerElement={
      <Link to={linkTo} target={target} />
    }
  />
);

MenuDrawerItem.propTypes = propTypes;
MenuDrawerItem.defaultProps = defaultProps;

export default MenuDrawerItem;
