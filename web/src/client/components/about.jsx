import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import * as actions from './../actions';

import Input from './form/input';

class About extends Component {
  componentWillMount() {
    this.props.fetchMessage();
    this.props.fetchData('auth/user');
  }

  render() {
    return (
      <div>
        <h1>About</h1>
        <p>{'This is an about page. :)'}</p>
        <h2>{ this.props.message }</h2>
        <div className="control-group">
          <label className="control-label">Email</label>
          <div className="contorl">
            { this.props.email }
          </div>
        </div>
        <div className="control-group">
          <label className="control-label">Strava ID</label>
          <div className="contorl">
            { this.props.stravaId }
          </div>
        </div>
        <div className="control-group">
          <label className="control-label">Resource State</label>
          <div className="contorl">
            { this.props.resource_state }
          </div>
        </div>
        <div className="control-group">
          <label className="control-label">Name</label>
          <div className="contorl">
            { this.props.firstname + ' ' + this.props.lastname }
          </div>
        </div>
        <div className="control-group">
          <label className="control-label">Profile Med URL</label>
          <div className="contorl">
            <img src={ this.props.profile_medium } />
          </div>
        </div>
        <div className="control-group">
          <label className="control-label">Profile</label>
          <div className="contorl">
            <img src={ this.props.profile } />
          </div>
        </div>
        <div className="control-group">
          <label className="control-label">City</label>
          <div className="contorl">
            { this.props.city }
          </div>
        </div>
        <div className="control-group">
          <label className="control-label">Country</label>
          <div className="contorl">
            { this.props.country }
          </div>
        </div>
        <div className="control-group">
          <label className="control-label">Sex</label>
          <div className="contorl">
            { this.props.sex }
          </div>
        </div>
        <div className="control-group">
          <label className="control-label">Premium</label>
          <div className="contorl">
            { this.props.premium }
          </div>
        </div>
        <div className="control-group">
          <label className="control-label">created_at</label>
          <div className="contorl">
            { this.props.created_at }
          </div>
        </div>
        <div className="control-group">
          <label className="control-label">updated_at</label>
          <div className="contorl">
            { this.props.updated_at }
          </div>
        </div>
        <div className="control-group">
          <label className="control-label">athlete_type</label>
          <div className="contorl">
            { this.props.athlete_type }
          </div>
        </div>
        <div className="control-group">
          <label className="control-label">date_preference</label>
          <div className="contorl">
            { this.props.date_preference }
          </div>
        </div>
        <div className="control-group">
          <label className="control-label">measurement_preference</label>
          <div className="contorl">
            { this.props.measurement_preference }
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {

  return {
    message: state.auth.message,
    email: state.auth.user.email,
    stravaId: state.auth.user.stravaId,
    resource_state: state.auth.user.resource_state,
    firstname: state.auth.user.firstname,
    lastname: state.auth.user.lastname,
    profile_medium: state.auth.user.profile_medium,
    profile: state.auth.user.profile,
    city: state.auth.user.city,
    country: state.auth.user.country,
    sex: state.auth.user.sex,
    premium: state.auth.user.premium,
    created_at: state.auth.user.created_at,
    updated_at: state.auth.user.updated_at,
    athlete_type: state.auth.user.athlete_type,
    date_preference: state.auth.user.date_preference,
    measurement_preference: state.auth.user.measurement_preference,
    ftp: state.auth.user.ftp,
    weight: state.auth.user.weight,
  };
}



About = reduxForm({
  form: 'about',
})(About);

export default connect(mapStateToProps, actions)(About);
