import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { Field, FieldArray, reduxForm } from 'redux-form';
import { FlatButton, Paper, RaisedButton } from 'material-ui';
import { Card, CardHeader } from 'material-ui/Card';
import { Toolbar, ToolbarTitle } from 'material-ui/Toolbar';
import { DatePicker, TextField } from 'redux-form-material-ui';

import ScrollIntoView from '../../containers/scroll-into-view';
import * as actions from '../../actions';
import { validate, warn } from './../form/validate';
import Alert from './../form/alert';

import style from '../../styles/style';

const propTypes = {
  authenticated: PropTypes.bool,
  cancelEdit: PropTypes.func,
  clearEvent: PropTypes.func,
  errorMessage: PropTypes.string,
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

const relURLAdd = 'apiv1/goals/addgoal';
const relURLEdit = 'apiv1/goals';

let AddGoal = class AddGoal extends Component {
  constructor() {
    super();

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.cancelFormEdit = this.cancelFormEdit.bind(this);
  }

  handleFormSubmit(formProps) {
    if (this.props.initialValues.goalId) {
      this.props.postForm(formProps, `${relURLEdit}/${this.props.initialValues.goalId}`, this.props.index);
    } else {
      this.props.postForm(formProps, relURLAdd);
    }
  }

  cancelFormEdit() {
    if (this.props.initialValues.goalId) {
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
      hashId,
      submitting,
    } = this.props;

    if (!authenticated) {
      return (
        <Redirect to="/signin" />
      );
    }

    if (postSuccess) {
      return (
        <Redirect to={`/goals${hashId}`} />
      );
    }

    const renderForm = (
      <form onSubmit={handleSubmit(this.handleFormSubmit)}>
        <div>
          <Field
            component={TextField}
            style={style.formelement}
            floatingLabelText="Title"
            name="goalTitle"
            type="text"
            hintText="Goal Title"
          />
        </div>
        <div>
          <Field
            component={TextField}
            style={style.formelement}
            floatingLabelText="Motovation"
            name="goalMotivation"
            type="text"
            hintText="Why are you doing this?"
          />
        </div>
        <div>
          <Field
            component={DatePicker}
            style={style.formelement}
            floatingLabelText="Training Start"
            name="goalStartTrainingDate"
            format={null}
          />
        </div>
        <div>
          <Field
            component={TextField}
            style={style.formelement}
            floatingLabelText="Rank"
            name="goalRank"
            type="text"
          />
        </div>
        <div>
          <Field
            component={TextField}
            style={style.formelement}
            floatingLabelText="Private"
            name="goalPrivate"
            type="text"
          />
        </div>
        <div>
          <FieldArray
            name="goalNotes"
            component={GoalNotes}
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
        <ScrollIntoView
          id={location.hash}
          headerHeight={70}
        />
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
                  text="Add Goal"
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

AddGoal.propTypes = propTypes;

function mapStateToProps(state) {
  const initialValues = state.events.event;
  if (state.events.event.eventDate) {
    initialValues.eventDate = new Date(state.events.event.eventDate);
  }
  let hashId = '';
  if (state.events.event.updated && state.events.event.updated.eventId) {
    hashId = `#${state.events.event.updated.eventId}`;
  }
  return {
    authenticated: state.auth.authenticated,
    stravaToken: state.auth.user.access_token,
    errorMessage: state.auth.error,
    postSuccess: state.events.event.postSuccess,
    initialValues,
    hashId,
  };
}

AddGoal = reduxForm({
  form: 'addgoal',
  validate,
  warn,
})(AddGoal);


export default connect(mapStateToProps, actions)(AddGoal);