// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui-next/styles';
import Drawer from 'material-ui-next/Drawer';
import List from 'material-ui-next/List';
import Divider from 'material-ui-next/Divider';
import * as actions from './../../actions';

import menuDrawerList from './menu-drawer-list';
import MenuDrawerItem from './menu-drawer-item';
import SwitcherMPref from '../switcher-mpref';
import SwitcherTheme from '../switcher-theme';

const styles = theme => ({
  list: {
    width: 300,
  },
  fullList: {
    width: 'auto',
  },
});

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
    const { classes, theme } = this.props;
    const drawer = (
      <div>
        <div className={classes.toolbar} />
        <List>
          <SwitcherMPref />
          <SwitcherTheme />
          <Divider />
          {menuDrawerList.filter(mIF => mIF.access.includes(this.accessLevel())).map(mI => (
            <MenuDrawerItem
              key={mI.linkTo}
              onClick={this.handleClose}
              {...mI}
            />
          ))}
        </List>
      </div>
    );
    return (
      <Drawer
        onClose={this.handleClose}
        open={this.props.open}
      >
        {drawer}
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

const styledMenuDrawer = withStyles(styles, { name: 'styledMenuDrawer', theme: true })(MenuDrawer);
export default connect(mapStateToProps, actions)(styledMenuDrawer);
