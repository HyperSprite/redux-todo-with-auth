import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

import * as actions from '../../actions';
import validate from './../form/validate';
import Alert from './../form/alert';
import DatePicker from './../form/datepicker';
import Input from './../form/input';

const propTypes = {

};

const relURL = 'events/addevent';

let AddEvent = class AddEvent extends Component {
  handleFormSubmit(formProps) {
    this.props.postForm(formProps, relURL);
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        Alert('Opps', this.props.errorMessage)
      );
    }
  }


  render() {
    const { handleSubmit, authenticated, pristine, reset, submitting } = this.props;
    const newDate = new Date();
    if (!authenticated) {
      return (
        <Redirect to="/signin" />
      );
    }
    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <fieldset className="form-group">
          <Field
            component={Input}
            label="Title:"
            name="eventTitle"
            type="text"
            placeholder="Event Title"
            initialValue="Epic Ride"
          />
        </fieldset>
        <fieldset className="form-group">
          <Field
            component={DatePicker}
            label="Event Date:"
            name="eventDate"
            time={false}
            calendar={true}
          />
        </fieldset>
        <fieldset className="form-group">
          <Field
            component={Input}
            label="City:"
            name="eventLocCity"
            type="text"
            placeholder="Type the City"
            initialValue="San Jose"
          />
        </fieldset>
        <fieldset className="form-group">
          <Field
            component={Input}
            label="State:"
            name="eventLocState"
            type="text"
            placeholder="Type the State"
            initialValue="CA"
          />
        </fieldset>
        <fieldset className="form-group">
          <Field
            component={Input}
            label="Country:"
            name="eventLocCountry"
            type="text"
            placeholder="Type the Country"
            initialValue="United States"
          />
        </fieldset>
        <fieldset className="form-group">
          <Field
            component={Input}
            label="Starting Elevation:"
            name="eventStartElevation"
            type="number"
            placeholder="Meters"
            initialValue="40"
          />
        </fieldset>
        <fieldset className="form-group">
          <Field
            component={Input}
            label="Event URL:"
            name="eventURL"
            type="text"
            placeholder="Link to Event Homepage"
            initialValue="http://rcrsv.com"
          />
        </fieldset>
        <fieldset className="form-group">
          <Field
            component={Input}
            label="Description:"
            name="eventDesc"
            type="text"
            placeholder="Event Description"
            initialValue="Super epic ride all over"
          />
        </fieldset>
        <fieldset className="form-group">
          <Field
            component={Input}
            label="Route:"
            name="eventRouteURL"
            type="text"
            placeholder="Type the Strava route link"
            initialValue="https://www.strava.com/routes/4966998"
          />
        </fieldset>
        <fieldset className="form-group">
          <Field
            component={Input}
            label="Type:"
            name="eventType"
            type="text"
            placeholder="Type"
            initialValue="Cycling - Road"
          />
        </fieldset>
        { this.renderAlert() }
        <div>
          <button type="submit" className="btn btn-primary" disabled={pristine || submitting}>Submit</button>
          <button type="button" className="btn btn-secondary" disabled={pristine || submitting} onClick={reset}>Clear Values</button>
        </div>
      </form>
    );
  }
};

AddEvent.propTypes = propTypes;

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
    errorMessage: state.auth.error,
  };
}

AddEvent = reduxForm({
  form: 'addevent',
  validate,
})(AddEvent);


export default connect(mapStateToProps, actions)(AddEvent);
