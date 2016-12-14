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
        <p>{ this.props.email }</p>
        <p>{ this.props.stravaId }</p>
        <form>
          <fieldset className="form-group">
            <Field
              component={Input}
              label="email:"
              name="email"
              type="email"
              value={this.props.email}
            />
          </fieldset>
          <fieldset className="form-group">
            <Field
              component={Input}
              label="stravaId:"
              name="stravaId"
              type="stravaId"
              value={this.props.stravaId}
            />
          </fieldset>
          <fieldset className="form-group">
            <Field
              component={Input}
              label="resource_state:"
              name="resource_state"
              type="resource_state"
              value={this.props.resource_state}
            />
          </fieldset>
          <fieldset className="form-group">
            <Field
              component={Input}
              label="firstname:"
              name="firstname"
              type="firstname"
              value={this.props.firstname}
            />
          </fieldset>
          <fieldset className="form-group">
            <Field
              component={Input}
              label="lastname:"
              name="lastname"
              type="lastname"
              value={this.props.lastname}
            />
          </fieldset>
          <fieldset className="form-group">
          <Field
              component={Input}
              label="profile_medium:"
              name="profile_medium"
              type="profile_medium"
              value={this.props.profile_medium}
            />
          </fieldset>
          <fieldset className="form-group">
            <Field
              component={Input}
              label="profile:"
              name="profile"
              type="profile"
              value={this.props.profile}
            />
          </fieldset>
          <fieldset className="form-group">
            <Field
              component={Input}
              label="city:"
              name="city"
              type="city"
              value={this.props.city}
            />
          </fieldset>
          <fieldset className="form-group">
            <Field
              component={Input}
              label="country:"
              name="country"
              type="country"
              value={this.props.country}
            />
          </fieldset>
          <fieldset className="form-group">
            <Field
              component={Input}
              label="sex:"
              name="sex"
              type="sex"
              value={this.props.sex}
            />
          </fieldset>
          <fieldset className="form-group">
            <Field
              component={Input}
              label="premium:"
              name="premium"
              type="premium"
              value={this.props.premium}
            />
          </fieldset>
          <fieldset className="form-group">
            <Field
              component={Input}
              label="created_at:"
              name="created_at"
              type="created_at"
              value={this.props.created_at}
            />
          </fieldset>
          <fieldset className="form-group">
            <Field
              component={Input}
              label="updated_at:"
              name="updated_at"
              type="updated_at"
              value={this.props.updated_at}
            />
          </fieldset>
          <fieldset className="form-group">
            <Field
              component={Input}
              label="athlete_type:"
              name="athlete_type"
              type="athlete_type"
              value={this.props.athlete_type}
            />
          </fieldset>
          <fieldset className="form-group">
            <Field
              component={Input}
              label="date_preference:"
              name="date_preference"
              type="date_preference"
              value={this.props.date_preference}
            />
          </fieldset>
          <fieldset className="form-group">
            <Field
              component={Input}
              label="measurement_preference:"
              name="measurement_preference"
              type="measurement_preference"
              value={this.props.measurement_preference}
            />
          </fieldset>
          <fieldset className="form-group">
            <Field
              component={Input}
              label="ftp:"
              name="ftp"
              type="ftp"
              value={this.props.ftp}
            />
          </fieldset>
          <fieldset className="form-group">
            <Field
              component={Input}
              label="weight:"
              name="weight"
              type="weight"
              value={this.props.weight}
            />
          </fieldset>
        </form>
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
