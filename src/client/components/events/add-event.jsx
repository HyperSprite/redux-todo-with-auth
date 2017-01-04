import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { Field, FieldArray, reduxForm } from 'redux-form';
import { FlatButton, Paper, RaisedButton } from 'material-ui';
import { Card, CardHeader } from 'material-ui/Card';
import { Toolbar, ToolbarTitle } from 'material-ui/Toolbar';
import { DatePicker, TextField } from 'redux-form-material-ui';

import * as actions from '../../actions';
import validate from './../form/validate';
import Alert from './../form/alert';
import EventRoutes from './event-routes';

import style from '../../styles/style';

const propTypes = {
  handleSubmit: PropTypes.func,
  initialValues: PropTypes.object,
  authenticated: PropTypes.bool,
  postSuccess: PropTypes.bool,
  pristine: PropTypes.bool,
  reset: PropTypes.func,
  submitting: PropTypes.bool,
  postForm: PropTypes.func,
  index: PropTypes.number,
  clearEvent: PropTypes.func,
  cancelEdit: PropTypes.func,
  errorMessage: PropTypes.string,
};

const relURLAdd = 'apiv1/events/addevent';
const relURLEdit = 'apiv1/events';

let AddEvent = class AddEvent extends Component {
  constructor() {
    super();

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.cancelFormEdit = this.cancelFormEdit.bind(this);
  }

  handleFormSubmit(formProps) {
    if (this.props.initialValues.eventId) {
      this.props.postForm(formProps, `${relURLEdit}/${this.props.initialValues.eventId}`, this.props.index);
    } else {
      this.props.postForm(formProps, relURLAdd);
    }
  }

  cancelFormEdit() {
    if (this.props.initialValues.eventId) {
      this.props.clearEvent();
    } else {
      this.props.cancelEdit();
    }
  }

  renderAlert() {
    return (this.props.errorMessage) ? (
      Alert('Opps', this.props.errorMessage)
    ) : (
      null
    );
  }

  render() {
    const {
      handleSubmit,
      initialValues,
      authenticated,
      postSuccess,
      pristine,
      reset,
      submitting,
    } = this.props;

    if (!authenticated) {
      return (
        <Redirect to="/signin" />
      );
    }

    if (postSuccess) {
      return (
        <Redirect to="/events" />
      );
    }

    const renderForm = (
      <form onSubmit={handleSubmit(this.handleFormSubmit)}>
        <div>
          <Field
            component={TextField}
            style={style.formelement}
            floatingLabelText="Title"
            name="eventTitle"
            type="text"
            hintText="Event Title"
          />
        </div>
        <div>
          <Field
            component={DatePicker}
            style={style.formelement}
            floatingLabelText="Event Date"
            name="eventDate"
            format={null}
            hintText="Event Day?"
          />
        </div>
        <div>
          <Field
            component={TextField}
            style={style.formelement}
            floatingLabelText="City"
            name="eventLocCity"
            type="text"
            hintText="Type the City"
          />
        </div>
        <div>
          <Field
            component={TextField}
            style={style.formelement}
            floatingLabelText="State"
            name="eventLocState"
            type="text"
            hintText="Type the State"
          />
        </div>
        <div>
          <Field
            component={TextField}
            style={style.formelement}
            floatingLabelText="Country"
            name="eventLocCountry"
            type="text"
            hintText="Type the Country"
          />
        </div>
        <div>
          <Field
            component={TextField}
            style={style.formelement}
            floatingLabelText="Starting Elevation"
            name="eventStartElevation"
            type="number"
            hintText="Meters"
          />
        </div>
        <div>
          <Field
            component={TextField}
            style={style.formelement}
            floatingLabelText="Event URL"
            name="eventURL"
            type="text"
            hintText="Link to Event Homepage"
          />
        </div>
        <div>
          <Field
            component={TextField}
            style={style.formelement}
            floatingLabelText="Description"
            name="eventDesc"
            type="text"
            multiLine
            hintText="Event Description"
          />
        </div>
        <div>
          <Field
            component={TextField}
            style={style.formelement}
            floatingLabelText="Type"
            name="eventType"
            type="text"
          />
        </div>
        <div>
          <FieldArray
            name="eventRoutes"
            component={EventRoutes}
          />
        </div>
        { this.renderAlert() }
        <div>
          <RaisedButton
            type="submit"
            label="Submit"
            primary
            style={style.button}
            disabled={pristine || submitting}
          />
          <FlatButton
            type="button"
            label="Clear Values"
            style={style.button}
            disabled={pristine || submitting}
            onClick={reset}
          />
          <FlatButton
            type="button"
            label="Cancel"
            style={style.button}
            onClick={this.cancelFormEdit}
          />
        </div>
      </form>
    );

    return (
      <div>
        {(initialValues.eventTitle) ? (
          <Card
            style={style.card}
          >
            <CardHeader
              style={style.cardHeader}
              title={initialValues.eventTitle}
              subtitle="Open for Editing..."
            />
            {renderForm}
          </Card>
        ) : (
          <Paper
            style={style.paper1}
          >
            <Card
              style={style.card}
            >
              <Toolbar>
                <ToolbarTitle
                  text="Add Event"
                />
              </Toolbar>
              {renderForm}
            </Card>
          </Paper>
        )}
      </div>
    );
  }
};

AddEvent.propTypes = propTypes;

function mapStateToProps(state) {
  const initialValues = state.events.event;
  if (state.events.event.eventDate) {
    initialValues.eventDate = new Date(state.events.event.eventDate);
  }

  return {
    authenticated: state.auth.authenticated,
    errorMessage: state.auth.error,
    postSuccess: state.events.event.postSuccess,
    initialValues,
  };
}

AddEvent = reduxForm({
  form: 'addevent',
  validate,
})(AddEvent);


export default connect(mapStateToProps, actions)(AddEvent);
