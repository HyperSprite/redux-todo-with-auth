import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './../actions'

class About extends Component {
  componentWillMount() {
    this.props.fetchMessage();
  }

  render() {
    return (
      <div>
        <h1>About</h1>
        <p>{'This is an about page. :)'}</p>
        <h2>{ this.props.message }</h2>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { message: state.auth.message }
}

export default connect(mapStateToProps, actions)(About);
