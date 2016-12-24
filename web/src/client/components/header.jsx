import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import router from './../router';

class Header extends Component {
  renderLinks() {
    return this.props.authenticated ? (
      [
        <li className="nav-item" key={2}>
          <Link to="/addevent">AddEvent</Link>
        </li>,
        <li className="nav-item" key={3}>
          <Link to="/events">Events</Link>
        </li>,
        <li className="nav-item" key={4}>
          <Link className="nav-link" to="/signout">Sign Out</Link>
        </li>,
      ]
    ) : (
      [
        // <li className="nav-item" key={3}>
        //   <Link className="nav-link" to="/signin">Sign In</Link>
        // </li>,
      ]
    );
  }

  render() {
    return (
      <nav className="navbar navbar-light">
        <Link to="/" className="navbar-brand" >Home</Link>
        <ul className="nav navbar-nav">
          {this.renderLinks()}
          <li className="nav-item" key={5}>
            <Link className="nav-link" to="/about">About</Link>
          </li>
        </ul>
      </nav>
    );
  }
}



function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated
  };
}

export default connect(
  mapStateToProps,
)(Header);
