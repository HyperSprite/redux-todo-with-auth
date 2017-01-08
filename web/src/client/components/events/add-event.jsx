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
  authenticated: PropTypes.bool,
  cancelEdit: PropTypes.func,
  clearEvent: PropTypes.func,
  errorMessage: PropTypes.string,
  fetchStravaRoutes: PropTypes.func,
  handleSubmit: PropTypes.func,
  index: PropTypes.number,
  initialValues: PropTypes.object,
  pristine: PropTypes.bool,
  postForm: PropTypes.func,
  postSuccess: PropTypes.bool,
  reset: PropTypes.func,
  routeId: PropTypes.string,
  submitting: PropTypes.bool,
};

const relURLAdd = 'apiv1/events/addevent';
const relURLEdit = 'apiv1/events';

let AddEvent = class AddEvent extends Component {
  constructor() {
    super();

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.cancelFormEdit = this.cancelFormEdit.bind(this);
    this.fetchStravaRoutes = this.fetchStravaRoutes.bind(this);
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

// TODO This is not finished, need to get the value out of the form.
  fetchStravaRoutes(index) {
    console.log(index);
    console.log(this.props);
    this.props.fetchStrava(
      'routes',
      index,
      this.props.stravaToken,
    );
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
      routeId,
      submitting,
      fetchStravaRoutes,
    } = this.props;

    if (!authenticated) {
      return (
        <Redirect to="/signin" />
      );
    }

    if (postSuccess) {
      return (
        <Redirect to={`/events#${routeId}`} />
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
            fetchStravaRoutes={this.fetchStravaRoutes}
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
  let routeId = null;
  if (state.events.event.updated && state.events.event.updated.eventId) {
    routeId = state.events.event.updated.eventId;
  }
  return {
    authenticated: state.auth.authenticated,
    stravaToken: state.auth.user.access_token,
    errorMessage: state.auth.error,
    postSuccess: state.events.event.postSuccess,
    initialValues,
    routeId,
  };
}

AddEvent = reduxForm({
  form: 'addevent',
  validate,
})(AddEvent);


export default connect(mapStateToProps, actions)(AddEvent);
