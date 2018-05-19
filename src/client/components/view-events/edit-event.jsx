import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { FieldArray, reduxForm, formValueSelector } from 'redux-form';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Toolbar from '@material-ui/core/Toolbar';

import ScrollIntoView from '../../containers/scroll-into-view';
import * as actions from '../../actions';
import Alert from './../form/alert';
import { validate, warn } from './../form/validate';

import EditSwitch from '../form/edit/switch';
import { formValues, relURLAdd, relURLEdit, thisForm, title, help } from './form-values';
import EditEventRoutes from './edit-event-routes';
import Layout from '../layout';
import singleFieldArray from '../form/single-field-array';
import ProgressDivider from '../progress-divider';
import ButtonCancel from '../button/cancel';
import ButtonReset from '../button/reset';
import ButtonSave from '../button/save';

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
  mPref: PropTypes.bool.isRequired,
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
  root: {
    display: 'inherit',
  },
  buttonSet: {
    display: 'flex',
    justifyContent: 'space-evenly',
    flexWrap: 'wrap',
    padding: '4px 0',
    alignItems: 'baseline',
  },
});

let EditEvent = class EditEvent extends Component {
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
      mPref,
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
      <form className={classes.root} onSubmit={handleSubmit(this.handleFormSubmit)}>

        {/* <div className={classes.flexParent}> */}
          <div>
            <div>
          {/* <div className={classes.flexcontainer} > */}
            {formValues.map(fV => (
              <div key={fV.name} >
                <EditSwitch
                  form={this.props.form}
                  formValues={fV}
                />
              </div>
            ))}
            <FieldArray
              name="eventRoutes"
              component={EditEventRoutes}
              form={this.props.form}
              mPref={mPref}
              eventSelector={eventSelector.eventRoutes}
            />
            <FieldArray
              name="eventOwners"
              label="Owner"
              form={this.props.form}
              component={singleFieldArray}
            />
          </div>
        </div>

        { this.renderAlert() }


        <ProgressDivider isProgress={submitSucceeded} />
        <div className={classes.buttonSet}>
          <ButtonSave
            type="submit"
            label="Save"
            variant={pristine ? 'flat' : 'raised'}
            color="primary"
            disabled={pristine || submitting || submitSucceeded}
          />
          <ButtonReset
            disabled={pristine || submitting || submitSucceeded}
            onClick={reset}
          />
          <ButtonCancel
            onClick={this.cancelFormEdit}
            disabled={submitSucceeded}
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
          <Card className="card">
            <CardHeader
              className="card-header"
              title={initialValues.eventTitle}
              subtitle="Open for Editing..."
            />
            {renderForm}
          </Card>
        ) : (
          <Layout>
            <Card className="card">
              <Toolbar>
                <Typography variant="title" color="inherit">
                  Add Event
                </Typography>
              </Toolbar>
              {renderForm}
            </Card>
          </Layout>
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
    // initialValues.eventDate = new Date(state.events.event.eventDate);
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
    mPref: state.page.mPref,
  };
}

EditEvent = reduxForm({
  form: thisForm,
  validate,
  warn,
})(EditEvent);

const styledEditEvent = withStyles(styles, { name: 'StyledEditEvent' })(EditEvent);
export default connect(mapStateToProps, actions)(styledEditEvent);
