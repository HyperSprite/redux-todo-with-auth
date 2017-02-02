import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppBar, Avatar, Divider, Drawer, IconButton, IconMenu, MenuItem } from 'material-ui';
import MdSettingsApplication from 'react-icons/lib/md/settings-applications';
import ARaceAthleteSVG from '../assets/araceathlete-w-noname.svg';

import * as actions from './../actions';

import router from './../router';
import Signin from './auth/signin';
import EventFilter from './events/filter-toolbar';

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
          containerElement={<Link to="/home">Home</Link>}
        />
        <MenuItem
          onTouchTap={this.handleClose}
          primaryText="Events"
          containerElement={<Link to="/events">Events</Link>}
        />
        <MenuItem
          onTouchTap={this.handleClose}
          primaryText="Athlete"
          containerElement={<Link to="/athlete">Athlete</Link>}
        />
        {/* <MenuItem
          onTouchTap={this.handleClose}
          primaryText="Help"
        /> */}
        <Divider />
        <MenuItem
          onTouchTap={this.handleClose}
          primaryText="Sign out"
          containerElement={<Link to="/signout">Sign out</Link>}
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
    let rightMenu;
    switch (this.props.page.name) {
      case 'Events':
        rightMenu = EventFilter();
        break;
      default:
        rightMenu = null;
        break;
    }

    return this.props.authenticated ? (
      <span>{rightMenu}</span>
    ) : (
      <Signin />
    );
  }

  render() {
    return (
      <div className="site-header" >
        <AppBar
          title={this.props.page.name}
          onLeftIconButtonTouchTap={this.handleToggle.bind(this)}
          showMenuIconButton={this.props.authenticated}
          iconElementLeft={<img src={ARaceAthleteSVG} alt="A Race Athlete logo" style={style.appBar.iconLeft} />}
          iconElementRight={this.renderRightMenu()}
          zDepth={1}
          style={style.appBar}
          className="app-bar"
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
    page: state.page,
  };
}

export default connect(mapStateToProps, actions)(Header);
