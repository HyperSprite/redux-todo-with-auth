import React from 'react';
import { connect } from 'react-redux';
import { Match, Redirect } from 'react-router';

const MatchAuthorized = ({ authenticated, component: Component, ...rest }) => {
  return (
    <Match
      {...rest} render={props => (
        authenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: '/signin', state: { from: props.location } }}
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
)(MatchAuthorized);
