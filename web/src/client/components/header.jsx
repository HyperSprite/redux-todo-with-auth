import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './../actions';
import { Link } from 'react-router';
import { AppBar, Avatar, Drawer, IconButton, IconMenu, MenuItem } from 'material-ui';

import NavigationClose from 'material-ui/svg-icons/navigation/close';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

import router from './../router';
import Signin from './auth/signin';

import style from '../styles/style';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
  }

  handleToggle = () => this.setState({ open: !this.state.open });
  handleClose = () => this.setState({ open: false });

  renderLeftMenu() {
    return this.props.authenticated ? (
      <Drawer
        docked={false}
        open={this.state.open}
        onRequestChange={open => this.setState({ open })}
      >
        <MenuItem
          onTouchTap={this.handleClose}
          primaryText="Events"
          containerElement={<Link to="/events">Events</Link>}
        />
      </Drawer>
    ) : (
      <span />
    );
  }

  renderRightMenu() {
    return this.props.authenticated ? (
      <IconMenu
        iconButtonElement={
          <IconButton
            style={style.header.IconButton}
          >
            <Avatar src={this.props.profile_medium} size={48} />
          </IconButton>
        }
        targetOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
      >
        <MenuItem
          primaryText="Athlete"
          containerElement={<Link to="/athlete">Athlete</Link>}
        />
        <MenuItem
          primaryText="Help"
        />
        <MenuItem
          primaryText="Sign out"
          containerElement={<Link to="/signout">Sign out</Link>}
        />
      </IconMenu>
    ) : (
      <Signin />
    );
  }


  render() {
    return (
      <AppBar
        title="A Race Athlete"
        onLeftIconButtonTouchTap={this.handleToggle.bind(this)}
        showMenuIconButton={this.props.authenticated}
        iconElementRight={this.renderRightMenu()}
        zDepth={1}
        style={style.appBar}
      >
        {this.renderLeftMenu()}
      </AppBar>
    );
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
    profile_medium: state.auth.user.profile_medium,
    firstname: state.auth.user.firstname,
  };
}

export default connect(mapStateToProps, actions)(Header);
