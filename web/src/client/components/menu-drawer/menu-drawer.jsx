// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';
import List from 'material-ui/List';
import Divider from 'material-ui/Divider';
import * as actions from './../../actions';

import menuDrawerList from './menu-drawer-list';
import MenuDrawerItem from './menu-drawer-item';
import MenuListItemSwitch from '../menu-list-item-switch';
import SwitcherMPref from '../switcher-mpref';
import SwitcherTheme from '../switcher-theme';
import EventFilter from '../view-events/filter-toolbar';

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
    clubMember: PropTypes.bool,
    clubNotice: PropTypes.bool,
    open: PropTypes.bool,
    setDrawer: PropTypes.func.isRequired,
  };

  static defaultProps = {
    adminMember: false,
    authenticated: false,
    clubMember: false,
    clubNotice: true,
    open: false,
  };

  handleClose = () => this.props.setDrawer({ drawer: false });

  handleClubNotice = () => {
    this.props.toggleClubNotice(!this.props.clubNotice);
    this.handleClose();
  };

  accessLevel() {
    switch (true) {
      case this.props.adminMember:
        return 'admin';
      case this.props.clubMember:
        return 'club';
      case this.props.authenticated:
        return 'user';
      default:
        return 'anon';
    }
  }

  render() {
    const { classes, authenticated, adminMember, clubMember, clubNotice, pageName, theme } = this.props;
    console.log('clubMember', clubMember, clubNotice);
    const ClubNoticeListItem = () => (
      <MenuListItemSwitch
        label="Club Notice"
        onChange={this.handleClubNotice}
        checked={!clubNotice}
        color="secondary"
      />
    );

    const drawer = (
      <div>
        <div className={classes.toolbar} />
        <List>
          {pageName === 'Events' ? <EventFilter /> : null}
          {(authenticated && !clubMember) ? <ClubNoticeListItem /> : null}
          <SwitcherMPref />
          <Divider />
          {menuDrawerList.filter(mIF => mIF.access.includes(this.accessLevel())).map(mI => (
            <MenuDrawerItem
              key={mI.linkTo}
              onClick={this.handleClose}
              pageName={pageName}
              {...mI}
            />
          ))}
          {adminMember && <SwitcherTheme />}
        </List>
      </div>
    );
    return (
      <Drawer
        onClose={this.handleClose}
        open={this.props.open}
        transitionDuration={{ exit: 700 }}
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
    pageName: state.page.name,
    clubMember: state.auth.user.clubMember,
    clubNotice: state.auth.user.clubNotice,
  };
}

const styledMenuDrawer = withStyles(styles, { name: 'styledMenuDrawer', theme: true })(MenuDrawer);
export default connect(mapStateToProps, actions)(styledMenuDrawer);
