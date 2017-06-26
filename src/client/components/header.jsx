import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { AppBar } from 'material-ui';
import ARaceAthleteSVG from '../assets/araceathlete-w-noname.svg';

import * as actions from './../actions';

import Signin from './auth/signin';
import EventFilter from './events/filter-toolbar';

import style from '../styles/style';

const propTypes = {
  authenticated: PropTypes.bool,
  page: PropTypes.object.isRequired,
  setDrawer: PropTypes.func.isRequired,
  fetchData: PropTypes.func.isRequired,
  user: PropTypes.object,
};

const defaultProps = {
  authenticated: false,
  user: {},
};

class Header extends Component {

  componentDidMount() {
    if (this.props.authenticated && !this.props.user) {
      this.props.fetchData('auth/user');
    }
  }

  handleToggle = () => this.props.setDrawer({ drawer: !this.props.page.drawer });

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
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
    page: state.page,
    stravaId: state.auth.user.stravaId,
    user: state.auth.user,
  };
}

Header.propTypes = propTypes;
Header.defaultProps = defaultProps;

export default connect(mapStateToProps, actions)(Header);
