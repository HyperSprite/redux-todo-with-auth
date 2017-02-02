import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const RouteAuthorized = ({ authenticated, component: Component, ...rest }) => {
  return (
    <Route
      {...rest} render={props => (
        authenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: '/home', state: { from: props.location } }}
          />
        )
      )}
    />
  );
};

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
  };
}

export default connect(
  mapStateToProps,
)(RouteAuthorized);
