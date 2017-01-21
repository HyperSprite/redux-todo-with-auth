import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { AppBar, Avatar, Divider, Drawer, IconButton, IconMenu, MenuItem } from 'material-ui';

import * as actions from './../actions';

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
          primaryText="Home"
          containerElement={<Link to="/">Home</Link>}
        />
        <MenuItem
          onTouchTap={this.handleClose}
          primaryText="Events"
          containerElement={<Link to="/events">Events</Link>}
        />
      </Drawer>
    ) : (
      <Drawer
        docked={false}
        open={this.state.open}
        onRequestChange={open => this.setState({ open })}
      >
        <MenuItem
          onTouchTap={this.handleClose}
          primaryText="Home"
          containerElement={<Link to="/">Home</Link>}
        />
        <MenuItem
          onTouchTap={this.handleClose}
          primaryText="Events"
          containerElement={<Link to="/events">Events</Link>}
        />
      </Drawer>
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
        <Divider />
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
      <div className="site-header" >
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
      </div>
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
