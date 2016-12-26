import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import { RaisedButton, FlatButton } from 'material-ui';
import { DatePicker, TextField } from 'redux-form-material-ui';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

import * as actions from '../../actions';
import validate from './../form/validate';
import Alert from './../form/alert';
// import DatePicker from './../form/datepicker';
import Input from './../form/input';

const style = {
  margin: 12,
};

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
        <div>
          <Field
            component={TextField}
            floatingLabelText="Title"
            name="eventTitle"
            type="text"
            hintText="Event Title"
          />
        </div>
        <div>
          <Field
            component={DatePicker}
            floatingLabelText="Event Date"
            name="eventDate"
            format={null}
            onChange={(value) => {
              console.log('date changed ', value) // eslint-disable-line no-console
            }}
            hintText="Event Day?"
          />
        </div>
        <div>
          <Field
            component={TextField}
            floatingLabelText="City"
            name="eventLocCity"
            type="text"
            hintText="Type the City"
          />
        </div>
        <div>
          <Field
            component={TextField}
            floatingLabelText="State"
            name="eventLocState"
            type="text"
            hintText="Type the State"
          />
        </div>
        <div>
          <Field
            component={TextField}
            floatingLabelText="Country"
            name="eventLocCountry"
            type="text"
            hintText="Type the Country"
          />
        </div>
        <div>
          <Field
            component={TextField}
            floatingLabelText="Starting Elevation"
            name="eventStartElevation"
            type="number"
            hintText="Meters"
          />
        </div>
        <div>
          <Field
            component={TextField}
            floatingLabelText="Event URL"
            name="eventURL"
            type="text"
            hintText="Link to Event Homepage"
          />
        </div>
        <div>
          <Field
            component={TextField}
            floatingLabelText="Description"
            name="eventDesc"
            type="text"
            hintText="Event Description"
          />
        </div>
        <div>
          <Field
            component={TextField}
            floatingLabelText="Route"
            name="eventRouteURL"
            type="text"
            hintText="Type the Strava route link"
          />
        </div>
        <div>
          <Field
            component={TextField}
            floatingLabelText="Type"
            name="eventType"
            type="text"
            floatingLabelText="Type"
          />
        </div>
        { this.renderAlert() }
        <div>
          <RaisedButton type="submit" label="Submit" primary={true} style={style} disabled={pristine || submitting} />
          <FlatButton type="button" label="Clear Values" style={style} disabled={pristine || submitting} onClick={reset} />
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
