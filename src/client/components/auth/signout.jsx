import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as actions from '../../actions';

const propTypes = {
  signoutUser: PropTypes.func,
};

class Signout extends Component {
  componentWillMount() {
    this.props.signoutUser();
  }

  render() {
    return (
      <Redirect to="/" />
    );
  }
}

Signout.propTypes = propTypes;

export default connect(null, actions)(Signout);
