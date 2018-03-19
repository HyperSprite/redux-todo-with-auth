import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { FormGroup, FormControlLabel } from 'material-ui/Form';
import Checkbox from 'material-ui/Checkbox';

const propTypes = {
  input: PropTypes.object,
  label: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  initialValue: PropTypes.any,
  meta: PropTypes.object,
};

const styles = theme => ({
  root: {
    margin: '18px 12px 14px 8px',
    marginLeft: 10,
    width: 180,
  },
  formError: {
    color: '#dd0000',
    fontWeight: 'bold',
  },
  formWarning: {
    color: '#dd9900',
    fontWeight: 'bold',
  },
});

const InputCheckbox = (props) => {
  const {
    classes,
    input,
    label,
    placeholder,
    type,
    initialValue,
    meta: { touched, error, warning },
  } = props;
  return (
    <FormGroup className={classes.root}>
      <FormControlLabel
        control={
          <Checkbox
            className="form-control"
            variant="primary"
            {...input}
            value="true"
            checked={input.value}
            onChange={input.onChange}
          />

        }
        label={label}
      />
      {touched && (
        (error && <div className={classes.formError}>{error}</div>) ||
        (warning && <div className={classes.formWarning}>{warning}</div>)
      )}
    </FormGroup>
  );
};

InputCheckbox.propTypes = propTypes;

export default withStyles(styles, { name: 'StyledInputCheckbox' })(InputCheckbox);
