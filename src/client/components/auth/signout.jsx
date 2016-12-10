import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
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
      <div>Sorry to see you go...</div>
    );
  }
}

Signout.propTypes = propTypes;

export default connect(null, actions)(Signout);
