import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';

import { signinUser, ifToken } from '../../actions';
import Alert from './../form/alert';

import ConnectWithStrava from '../../assets/btn_strava_connectwith_light.svg';

const propTypes = {
  // eslint-disable-next-line
  classes: PropTypes.object,
  errorMessage: PropTypes.string,
  authenticated: PropTypes.bool.isRequired,
  toggle: PropTypes.bool.isRequired,
  handleToggle: PropTypes.func.isRequired,
};

const styles = theme => ({
  signin: {
    marginTop: 4,
    top: theme.spacing.unit * 8,
    right: theme.spacing.unit * 1,
    position: 'fixed',
    zIndex: theme.zIndex.header + 1,
    '&$toggle': {
      backgroundColor: 'rgba(255, 255, 255, 0.50)',
      width: 185,
      height: 40,
      padding: 4,
      marginTop: 8,
      borderRadius: 3,
      top: theme.spacing.unit * 9,
      right: theme.spacing.unit * 3,
    },
  },
  toggle: {},
});

let Signin = class Signin extends Component {
  constructor(props) {
    super(props);
    this.stravaClick = this.stravaClick.bind(this);
  }

  stravaClick() {
    this.props.handleToggle();
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
    const { classes, authenticated, toggle } = this.props;
    if (authenticated) {
      return (
        <Redirect to="/" />
      );
    }
    return (
      <Button
        onClick={this.stravaClick}
        className={classNames(classes.signin, { [classes.toggle]: toggle })}
      >
        {toggle ? (
          <div>
            Connecting
            <LinearProgress mode="query" />
          </div>
        ) : (
          <img src={ConnectWithStrava} alt="Signin with Strava" />
        )}
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
