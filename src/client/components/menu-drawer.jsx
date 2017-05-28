import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Divider, Drawer, MenuItem } from 'material-ui';

import * as actions from './../actions';

const propTypes = {
  authenticated: PropTypes.bool,
  open: PropTypes.bool,
  setDrawer: PropTypes.func.isRequired,
};

const defaultProps = {
  authenticated: false,
  open: false,
};

class MenuDrawer extends Component {

  handleClose = () => this.props.setDrawer({ drawer: false });

  render() {
    return this.props.authenticated ? (
      <Drawer
        docked={false}
        open={this.props.open}
        onRequestChange={open => this.props.setDrawer({ drawer: open })}
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
          primaryText="Weekly Stats"
          containerElement={<Link to="/weekly-stats">Weekly Stats</Link>}
        />
        <MenuItem
          onTouchTap={this.handleClose}
          primaryText="Athlete"
          containerElement={<Link to="/athlete">Athlete</Link>}
        />
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
        open={this.props.open}
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
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
    open: state.page.drawer,
  };
}

MenuDrawer.propTypes = propTypes;
MenuDrawer.defaultProps = defaultProps;

export default connect(mapStateToProps, actions)(MenuDrawer);
