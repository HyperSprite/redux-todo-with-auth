import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

import { signinUser, ifToken } from '../../actions';
import Alert from './../form/alert';

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
        <Redirect to="/todos" />
      );
    }
    return (
      <div>
        <button type="button" className="btn btn-default" onClick={this.stravaClick}>Signin with Strava</button>
      </div>
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
