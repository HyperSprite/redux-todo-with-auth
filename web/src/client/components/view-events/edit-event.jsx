import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Form, reduxForm, formValueSelector } from 'redux-form';
import { withStyles } from 'material-ui-next/styles';

import { Divider, FlatButton, LinearProgress, RaisedButton } from 'material-ui';
import { Card, CardHeader } from 'material-ui/Card';
import { Toolbar, ToolbarTitle } from 'material-ui/Toolbar';

import ScrollIntoView from '../../containers/scroll-into-view';
import * as actions from '../../actions';
import Alert from './../form/alert';
import { validate, warn } from './../form/validate';

import EditSwitch from '../form/edit/switch';
import { formValues, relURLAdd, relURLEdit, thisForm, title, help } from './form-values';

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
const defaultProps = {
  form: thisForm,
};

const NumOfDaysMenuOpts = [];
for (let i = 1; i < 32; i++) {
  NumOfDaysMenuOpts.push(i);
}

const styles = theme => ({

});

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
      classes,
      form,
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
      submitSucceeded,
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

        <div className={classes.flexParent}>
          <div className={classes.flexcontainer} >
            {formValues.map(fV => (
              <div key={fV.name} >
                <EditSwitch
                  form={this.props.form}
                  formValues={fV}
                />
              </div>
            ))}
          </div>
        </div>

        { this.renderAlert() }
        {submitSucceeded ? (
          <div>
            <LinearProgress mode="indeterminate" />
            <RaisedButton
              type="button"
              label="Submit"
              primary
              style={style.button}
              disabled
            />
            <FlatButton
              type="button"
              label="Clear Values"
              style={style.button}
              disabled
            />
            <FlatButton
              type="button"
              label="Cancel"
              style={style.button}
              disabled
            />
          </div>
        ) : (
          <div>
            <Divider style={{ height: 4 }} />
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
        )}
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
EditEvent.defaultProps = defaultProps;

const selector = formValueSelector('editevent');

function mapStateToProps(state) {
  const initialValues = state.events.event;
  if (state.events.event && state.events.event.eventDate) {
    initialValues.eventDate = new Date(state.events.event.eventDate);
  } else {
    initialValues.eventAthleteType = 'Cycling';
    initialValues.eventOwners = [state.auth.user.stravaId];
  }
  if (state.events.event && !state.events.event.eventDays) {
    initialValues.eventDays = 1;
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
    submitSucceeded: state.form.submitSucceeded,
  };
}

EditEvent = reduxForm({
  form: thisForm,
  validate,
  warn,
})(EditEvent);

const styledEditEvent = withStyles(styles, { name: 'StyledEditEvent' })(EditEvent);
export default connect(mapStateToProps, actions)(styledEditEvent);
