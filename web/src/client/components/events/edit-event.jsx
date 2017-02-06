import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Field, FieldArray, reduxForm, formValueSelector } from 'redux-form';
import { FlatButton, RaisedButton, RadioButton } from 'material-ui';
import { Card, CardHeader } from 'material-ui/Card';
import { Toolbar, ToolbarTitle } from 'material-ui/Toolbar';
import { DatePicker, TextField, RadioButtonGroup } from 'redux-form-material-ui';

import ScrollIntoView from '../../containers/scroll-into-view';
import * as actions from '../../actions';
import Alert from './../form/alert';
import Static from './../form/static';
import StaticMD from './../form/static-markdown';
import { validate, warn } from './../form/validate';
import EventRoutes from './event-routes';
import EventHashtags from './event-hashtags';

import style from '../../styles/style';

const propTypes = {
  authenticated: PropTypes.bool,
  cancelEdit: PropTypes.func,
  clearEvent: PropTypes.func,
  errorMessage: PropTypes.object,
  fetchStravaRoutes: PropTypes.func,
  handleSubmit: PropTypes.func,
  index: PropTypes.number,
  initialValues: PropTypes.object,
  pristine: PropTypes.bool,
  postForm: PropTypes.func,
  postSuccess: PropTypes.bool,
  reset: PropTypes.func,
  hashId: PropTypes.string,
  submitting: PropTypes.bool,
};

const relURLAdd = 'apiv1/events/addevent';
const relURLEdit = 'apiv1/events';

let EditEvent = class EditEvent extends Component {
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
  fetchStravaRoutes(routeId, index) {
    this.props.fetchStrava(
      'routes',
      routeId,
      index,
      this.props.stravaToken,
      'eventRoute',
    );
  }

  renderAlert() {
    const { errorMessage } = this.props;
    return (errorMessage) ? (
      Object.keys(errorMessage).map(key => errorMessage[key]).map((eM) => {
        return Alert(eM.path, 'Opps', eM.message);
      })
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
      hashId,
      submitting,
      fetchStravaRoutes,
      eventSelector,
    } = this.props;

    if (!authenticated) {
      return (
        <Redirect to="/signin" />
      );
    }

    if (postSuccess) {
      return (
        <Redirect to={`/events${hashId}`} />
      );
    }

    const renderForm = (
      <form onSubmit={handleSubmit(this.handleFormSubmit)}>
        <Field
          component={TextField}
          style={style.formelement}
          floatingLabelText="Title"
          name="eventTitle"
          type="text"
          hintText="Event Title"
        />
        <div>
          <FieldArray
            name="eventHashtags"
            component={EventHashtags}
          />
        </div>
        <Field
          component={DatePicker}
          style={style.formelement}
          floatingLabelText="Event Date"
          name="eventDate"
          format={null}
          hintText="Event Day?"
          container="inline"
          mode="landscape"
        />
        <div>
          <Field name="eventAthleteType" style={style.formelement} component={RadioButtonGroup}>
            <RadioButton value="Cycling" label="Cycling" default />
            <RadioButton value="Running" label="Running" />
            <RadioButton value="Triathlon" label="Triathlon" />
          </Field>
        </div>
        <div>
          <Field
            component={TextField}
            style={style.formelement}
            floatingLabelText="Series"
            name="eventSeries"
            type="text"
            hintText="(optional)"
          />
          <Field
            component={TextField}
            style={style.formelement}
            floatingLabelText="Organizer"
            name="eventOrg"
            type="text"
            hintText="(optional)"
          />
        </div>
        <div>
          <Field
            component={TextField}
            style={style.formelement}
            floatingLabelText="Street"
            name="eventLocStreet"
            type="text"
            hintText="(optional)"
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
          <Field
            component={TextField}
            style={style.formelement}
            floatingLabelText="State"
            name="eventLocState"
            type="text"
          />
        </div>
        <div>
          <Field
            component={TextField}
            style={style.formelement}
            floatingLabelText="Country"
            name="eventLocCountry"
            type="text"
          />
          <Field
            component={TextField}
            style={style.formelement}
            floatingLabelText="ZIP Code"
            name="eventLocZip"
            type="number"
            hintText="(optional)"
          />
        </div>
        <div>
          <Field
            component={TextField}
            style={style.formelement}
            floatingLabelText="Event Homepage URL"
            name="eventURL"
            type="text"
            hintText="(optional)"
            fullWidth
            multiLine
          />
        </div>
        <div>
          <Field
            component={TextField}
            style={style.formelement}
            floatingLabelText="Description (Markdown)"
            name="eventDesc"
            type="text"
            hintText="Event Description"
            fullWidth
            multiLine
          />
        </div>
        <StaticMD
          contentLabel="Formatted"
          content={eventSelector.eventDesc}
        />
        <div>
          <FieldArray
            name="eventRoutes"
            component={EventRoutes}
            fetchStravaRoutes={this.fetchStravaRoutes}
            eventSelector={eventSelector.eventRoutes}
          />
        </div>
        {initialValues.eventOwner ? (
          <Field
            component={TextField}
            style={style.formelement}
            floatingLabelText="Owner"
            name="eventOwner"
            type="number"
          />
        ) : (null)}
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
        <ScrollIntoView
          id={location.hash}
          headerHeight={70}
        />
        {(initialValues.eventTitle) ? (
          <Card
            className="card"
          >
            <CardHeader
              className="card-header"
              title={initialValues.eventTitle}
              subtitle="Open for Editing..."
            />
            {renderForm}
          </Card>
        ) : (
          <Card
            className="card"
          >
            <Toolbar>
              <ToolbarTitle
                text="Add Event"
              />
            </Toolbar>
            {renderForm}
          </Card>
        )}
      </div>
    );
  }
};

EditEvent.propTypes = propTypes;

const selector = formValueSelector('editevent');

function mapStateToProps(state) {
  const initialValues = state.events.event;
  if (state.events.event && state.events.event.eventDate) {
    initialValues.eventDate = new Date(state.events.event.eventDate);
  } else {
    initialValues.eventAthleteType = 'Cycling';
  }
  let hashId = '';
  if (state.events.event.updated && state.events.event.updated.eventId) {
    hashId = `#${state.events.event.updated.eventId}`;
  }
  return {
    authenticated: state.auth.authenticated,
    stravaToken: state.auth.user.access_token,
    errorMessage: state.events.error,
    postSuccess: state.events.event.postSuccess,
    initialValues,
    hashId,
    eventSelector: selector(state, 'eventDesc', 'eventRoutes'),
  };
}

EditEvent = reduxForm({
  form: 'editevent',
  validate,
  warn,
})(EditEvent);


export default connect(mapStateToProps, actions)(EditEvent);
