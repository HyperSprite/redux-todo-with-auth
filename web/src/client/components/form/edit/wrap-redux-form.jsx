import React from 'react';
import { Field, Form, reduxForm } from 'redux-form';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';

// eslint-disable-next-line
import * as actions from '../../../actions';

import lib from '../../../containers/lib';
import validate from '../../form/validate';

const normalizer = {
  numbersOnly: lib.numbersOnly,
  alphaNumbersOnly: lib.alphaNumbersOnly,
};

const styles = theme => ({
  container: {
    margin: '0 5px 0 5px',
  },
});

const EditWrapperReduxForm = (props) => {
  const {
    classes,
    content,
    component,
    formValues,
    handleSubmit,
    onBlurSubmit,
    auxButton,
    auxButtonLabel,
    anyTouched,
    pristine,
    submitting,
    submitLabel,
    ...fieldProps
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
      {...fieldProps}
      {...formValues}
      name={formValues.name}
      component={props.component}
      checked={formValues.content}
      shouldFocus
      addedComps={buttonSet}
      normalize={normalizer[formValues.normalize]}
    />
  );

  return (
    <div className={classes.container} >
      {formValues.addButtonset ? (
        <Form id={formValues.name} onSubmit={handleSubmit}>
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

const styledEditWrapperReduxForm = withStyles(styles, { name: 'StyledEditWrapperReduxForm' })(EditWrapperReduxForm);
export default reduxForm({ destroyOnUnmount: false, validate })(styledEditWrapperReduxForm);
