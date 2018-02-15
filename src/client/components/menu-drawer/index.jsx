// @flow

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Drawer, MenuItem } from 'material-ui';
import * as actions from './../../actions';

import menuDrawerList from './menu-drawer-list';
import MenuDrawerItem from './menu-drawer-item';
import MPrefSwitcher from '../mpref-switcher';

class MenuDrawer extends Component {

  static propTypes = {
    adminMember: PropTypes.bool.isRequired,
    authenticated: PropTypes.bool,
    open: PropTypes.bool,
    setDrawer: PropTypes.func.isRequired,
  };

  static defaultProps = {
    adminMember: false,
    authenticated: false,
    open: false,
  };

  handleClose = () => this.props.setDrawer({ drawer: false });

  accessLevel() {
    switch (true) {
      case this.props.adminMember:
        return 'admin';
      case this.props.authenticated:
        return 'user';
      default:
        return 'anon';
    }
  }

  render() {
    return (
      <Drawer
        docked={false}
        open={this.props.open}
        onRequestChange={open => this.props.setDrawer({ drawer: open })}
      >
        <MenuItem>
          <MPrefSwitcher style={{ width: 256 }} />
        </MenuItem>
        {menuDrawerList.filter(mIF => mIF.access.includes(this.accessLevel())).map(mI => (
          <MenuDrawerItem
            key={mI.linkTo}
            onTouchTap={this.handleClose}
            {...mI}
          />
        ))}
      </Drawer>
    );
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
    adminMember: state.auth.user.adminMember,
    open: state.page.drawer,
  };
}

export default connect(mapStateToProps, actions)(MenuDrawer);
