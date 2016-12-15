import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Redirect, Link } from 'react-router';
import Popout from 'react-popout';

import { signinUser, ifToken } from '../../actions';
import validate from './../form/validate';
import Input from './../form/input';
import Alert from './../form/alert';

const propTypes = {
  handleSubmit: PropTypes.func,
  signinUser: PropTypes.func,
  onClickifToken: PropTypes.func,
  ifToken: PropTypes.func,
};

let Signin = class Signin extends Component {
  constructor(props) {
    super(props);
    this.popout = this.popout.bind(this);
    this.popoutClosed = this.popoutClosed.bind(this);
    this.state = { isPoppedOut: false };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.popoutContentClicked = this.popoutContentClicked.bind(this);
  }

  popout() {
    this.setState({isPoppedOut: true});
  }

  popoutClosed() {
    this.setState({isPoppedOut: false});
  }

  handleFormSubmit(formProps) {
    this.props.signinUser(formProps);
  }

  popoutContentClicked() {
    this.props.ifToken();
    this.popoutClosed();
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        Alert('Opps', this.props.errorMessage)
      );
    }
  }

  render() {
    const { handleSubmit, onClickifToken, authenticated, pristine, reset, submitting } = this.props;

    if (authenticated) {
      return (
        <Redirect to="/todos" />
      );
    }
    if (this.state.isPoppedOut) {
      return (
        <Popout
          url="/auth/strava"
          title="Strava Auth"
        >
          <div
            id="stravaCheck"
          >
            Checking with Strava
            <button type="button" className="btn btn-default hiddenAuth" onClick={this.popoutContentClicked}>Save user</button>
          </div>

        </Popout>
      );
    } else {
      return (
        <div>
          <form onSubmit={handleSubmit(this.handleFormSubmit)}>
            <fieldset className="form-group">
              <Field
                component={Input}
                label="Email:"
                name="email"
                type="email"
                placeholder="Type your email"
              />
            </fieldset>
            <fieldset className="form-group">
              <Field
                component={Input}
                label="Password:"
                name="password"
                type="password"
                placeholder="Type a password"
              />
            </fieldset>
            { this.renderAlert() }
            <button type="submit" className="btn btn-primary" disabled={pristine || submitting}>Submit</button>
            <button type="button" className="btn btn-secondary" disabled={pristine || submitting} onClick={reset}>Clear Values</button>
            <span>
              {' or '}
              <Link to="/signup">
                {'Sign up!'}
              </Link>
            </span>
          </form>
          <div>
            <button type="button" className="btn btn-default" onClick={this.popout}>Signin with Strava</button>
          </div>
        </div>
      );
    }
  }
};

Signin.propTypes = propTypes;

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
    errorMessage: state.auth.error,
  };
}

Signin = reduxForm({
  form: 'signin',
  validate,
})(Signin);

export default Signin = connect(mapStateToProps, { signinUser, ifToken })(Signin);
