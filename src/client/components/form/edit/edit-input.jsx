import React from 'react';
import { withStyles } from 'material-ui-next/styles';
import { Field, Form, reduxForm } from 'redux-form';
import Button from 'material-ui-next/Button';

// eslint-disable-next-line
import * as actions from '../../../actions';

import lib from '../../../containers/lib';
import validate from '../../form/validate';

const normalizer = {
  numbersOnly: lib.numbersOnly,
};

const styles = theme => ({
  container: {
    margin: '0 5px 0 5px',
  },
});

const WizardInput = (props) => {
  const {
    classes,
    content,
    component,
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
        <Button
          variant="raised"
          type="submit"
          disabled={pristine || submitting}
        >
          {submitLabel}
        </Button>
        {(auxButtonLabel) ? (
          <Button
            type="button"
            variant="raised"
            onClick={auxButton}
          >
            {auxButtonLabel}
          </Button>
          ) : null}
      </div>
    ) : null
  );

  const ExtField = (
    <Field
      {...props}
      classes={{}}
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
    <div className={classes.container} >
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

const styledWizardInput = withStyles(styles, { name: 'StyledWizardInput' })(WizardInput);
export default reduxForm({ destroyOnUnmount: false, validate })(styledWizardInput);
