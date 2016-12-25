import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { AppBar, Drawer, IconButton, IconMenu, MenuItem } from 'material-ui';

import NavigationClose from 'material-ui/svg-icons/navigation/close';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

import router from './../router';
import Signin from './auth/signin';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
  }

  handleToggle = () => this.setState({ open: !this.state.open });
  handleClose = () => this.setState({ open: false });

  renderRightMenu() {
    return this.props.authenticated ? (
      <IconMenu
        iconButtonElement={
          <IconButton><MoreVertIcon /></IconButton>
        }
        targetOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
      >
        <MenuItem primaryText="User" containerElement={<Link to="/about">User</Link>} />
        <MenuItem primaryText="Help" />
        <MenuItem primaryText="Sign out" containerElement={<Link to="/signout">Sign out</Link>} />
      </IconMenu>
    ) : (
      <Signin />
    );
  }

  renderLeftMenu() {
    return this.props.authenticated ? (
      <Drawer
        open={this.state.open}
        onRequestChange={open => this.setState({ open })}
      >
        <MenuItem onTouchTap={this.handleClose} primaryText="Home" containerElement={<Link to="/">Home</Link>} />
        <MenuItem onTouchTap={this.handleClose} primaryText="Todos" containerElement={<Link to="/todos">Todos</Link>} />
        <MenuItem onTouchTap={this.handleClose} primaryText="Add Event" containerElement={<Link to="/addevent">Add Event</Link>} />
        <MenuItem onTouchTap={this.handleClose} primaryText="Events" containerElement={<Link to="/events">Events</Link>} />
      </Drawer>
    ) : (
      <span />
    );
  }

  render() {
    return (
      <AppBar
        title="A Race Athlete"
        onLeftIconButtonTouchTap={this.handleToggle.bind(this)}
        showMenuIconButton={this.props.authenticated}
        iconElementRight={this.renderRightMenu()}
      >
        {this.renderLeftMenu()}
      </AppBar>
    );
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
  };
}

export default connect(
  mapStateToProps,
)(Header);
