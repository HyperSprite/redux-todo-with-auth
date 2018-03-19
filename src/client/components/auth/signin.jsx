import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';

import { signinUser, ifToken } from '../../actions';
import Alert from './../form/alert';

import ConnectWithStrava from '../../assets/btn_strava_connectwith_light.svg';

const propTypes = {
  errorMessage: PropTypes.string,
  authenticated: PropTypes.bool,
};

const styles = theme => ({
  signin: {
    marginTop: 4,
  },
});

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
    const { classes, authenticated } = this.props;

    if (authenticated) {
      return (
        <Redirect to="/" />
      );
    }
    return (
      <Button onClick={this.stravaClick} className={classes.signin}>
        <img src={ConnectWithStrava} alt="Signin with Strava" />
      </Button>
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

const styledSignin = withStyles(styles, { name: 'StyledSignin' })(Signin);
export default connect(mapStateToProps, { signinUser, ifToken })(styledSignin);
