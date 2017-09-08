// @flow

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { MenuItem } from 'material-ui';

const propTypes = {
  linkTo: PropTypes.string.isRequired,
  menuText: PropTypes.string.isRequired,
  onTouchTap: PropTypes.func.isRequired,
  primaryText: PropTypes.string.isRequired,
  target: PropTypes.string,
};

const defaultProps = {
  target: null,
};

const MenuDrawerItem = ({ linkTo, onTouchTap, menuText, primaryText, target }) => {
  // const { linkTo, onTouchTap, menuText, primaryText, target } = props;
  return (
    <MenuItem
      onTouchTap={onTouchTap}
      primaryText={primaryText}
      containerElement={
        <Link
          to={linkTo}
          target={target}
        >
          {menuText}
        </Link>
      }
    />
  );
};

MenuDrawerItem.propTypes = propTypes;
MenuDrawerItem.defaultProps = defaultProps;

export default MenuDrawerItem;
