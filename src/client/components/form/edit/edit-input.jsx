import React from 'react';
import { Field, Form, reduxForm } from 'redux-form';
import { CircularProgress, RaisedButton } from 'material-ui';

// eslint-disable-next-line
import * as actions from '../../../actions';

import lib from '../../../containers/lib';
import validate from '../../form/validate';

const normalizer = {
  numbersOnly: lib.numbersOnly,
};

const WizardInput = (props) => {
  const {
    content,
    formValues,
    handleSubmit,
    auxButton,
    auxButtonLabel,
    pristine,
    submitting,
    submitLabel
  } = props;

  const buttonSet = (
    formValues.addButtonset ? (
      <div className="edit-in-place form-right">
        <RaisedButton
          type="submit"
          disabled={pristine || submitting}
        >
          {submitLabel}
        </RaisedButton>
        {(auxButtonLabel) ? (
          <RaisedButton
            type="button"
            onClick={auxButton}
          >
            {auxButtonLabel}
          </RaisedButton>
          ) : null}
      </div>
    ) : null
  );

  const ExtField = (
    <Field
      content={content}
      formValues={formValues}
      component={props.component}
      label={formValues.contentLabel}
      name={formValues.contentName}
      type={formValues.contentType}
      checked={formValues.content}
      shouldFocus
      addedComps={buttonSet}
      contentOptions={formValues.contentOptions}
      normalize={normalizer[formValues.normalize]}
      placeholder={formValues.contentPlaceholder}
    />
  );

  return (
    <div>
      {formValues.addButtonset ? (
        <Form id={formValues.contentName} onSubmit={handleSubmit}>
          <div>
            {ExtField}
          </div>
        </Form>
    ) : (
      <div>
        {ExtField}
      </div>
    )}
    </div>
  );
};

export default reduxForm({
  destroyOnUnmount: false,
  validate,
})(WizardInput);
