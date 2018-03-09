import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui-next/styles';
import { FormControl, FormHelperText } from 'material-ui-next/Form';
import Input, { InputLabel } from 'material-ui-next/Input';

import './styles.css';

const propTypes = {
  classes: PropTypes.object.isRequired,
  input: PropTypes.object,
  label: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  initialValue: PropTypes.any,
  meta: PropTypes.object,
};

const styles = theme => ({
  formError: {
    color: '#dd0000',
    fontWeight: 'bold',
  },
  formWarning: {
    color: '#dd9900',
    fontWeight: 'bold',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  selectEmpty: {
    // marginTop: theme.spacing.unit * 3,
  },
});

const RenderInput = ({
  classes,
  input,
  label,
  placeholder,
  type,
  initialValue,
  meta: { touched, error, warning },
}) => (
  <FormControl className={classes.formControl}>
    <InputLabel htmlFor={input.value}>{label}</InputLabel>
    <Input
      className={classes.formControl}
      {...input}
      type={type}
    />
    <FormHelperText>{placeholder}</FormHelperText>
    {touched && (
      (error && <div className={classes.formError}>{error}</div>) ||
      (warning && <div className={classes.formWarning}>{warning}</div>)
    )}
  </FormControl>
);

RenderInput.propTypes = propTypes;

export default withStyles(styles, { name: 'StyledRenderInput' })(RenderInput);
