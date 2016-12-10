import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Redirect, Link } from 'react-router';

import { signinUser } from '../../actions';
import Input from './../form/input';
import Alert from './../form/alert';

const propTypes = {
  handleSubmit: PropTypes.func,
  signinUser: PropTypes.func,
};

let Signin = class Signin extends Component {
  handleFormSubmit(formProps) {
    this.props.signinUser(formProps);
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        Alert('Opps', this.props.errorMessage)
      );
    }
  }

  render() {
    const { handleSubmit, authenticated } = this.props;

    if (authenticated) {
      return (
        <Redirect to="/todos" />
      );
    }
    return (
      <div>
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
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
        <button action="submit" className="btn btn-primary">
          Sign in
        </button>
        <span>
          {' or '}
          <Link to="/signup">
            {'Sign up!'}
          </Link>
        </span>
      </form>

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

Signin = reduxForm({
  form: 'signin',
})(Signin);

export default Signin = connect(mapStateToProps, { signinUser })(Signin);
