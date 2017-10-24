import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { FlatButton } from 'material-ui';

import { signinUser, ifToken } from '../../actions';
import Alert from './../form/alert';

import ConnectWithStrava from '../../assets/btn_strava_connectwith_light.svg';

import style from '../../styles/style';

const propTypes = {
  errorMessage: PropTypes.string,
  authenticated: PropTypes.bool,
};

let Signin = class Signin extends Component {
  constructor(props) {
    super(props);
    this.stravaClick = this.stravaClick.bind(this);
  }

  stravaClick() {
    window.location.assign('/auth/strava');
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        Alert('Opps', this.props.errorMessage)
      );
    }
  }

  render() {
    const { authenticated } = this.props;

    if (authenticated) {
      return (
        <Redirect to="/" />
      );
    }
    return (
      <FlatButton onClick={this.stravaClick} style={style.signin}>
        <img src={ConnectWithStrava} alt="Signin with Strava" />
      </FlatButton>
    );
  }
};

Signin.propTypes = propTypes;

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
    errorMessage: state.auth.error,
  };
}

export default Signin = connect(mapStateToProps, { signinUser, ifToken })(Signin);
