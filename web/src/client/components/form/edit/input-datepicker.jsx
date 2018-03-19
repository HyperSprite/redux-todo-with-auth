import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { FormControl } from 'material-ui/Form';
import Input, { InputLabel } from 'material-ui/Input';
import format from 'date-fns/format';

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

const dateOffsetFormat = (inputValue) => {
  let theDate = new Date(inputValue);
  let tzOffset = theDate.getTimezoneOffset()
  format(new Date(input.value), 'YYYY-MM-DD')
}

const InputText = (props) => {
  const {
    classes,
    input,
    label,
    initialValue,


    // extras
    contentAlt,
    contentHelp,
    contentOptions,
    fieldValues,
    meta: { touched, error, warning },

    min,
    max,
    checked,
    maxLength,

    autoComplete,
    autoFocus,
    disabled,
    endAdornment,
    fullWidth,
    inputComponent,
    margin,
    multiline,
    placeholder,
    rows,
    rowsMax,
    startAdornment,
    type,
  } = props;

  return (
    <FormControl
      className={classes.formControl}
      fullWidth={fullWidth}

      margin={margin}
    >
      <InputLabel htmlFor={input.name}>{label}</InputLabel>
      <Input
        className={classes.formControl}
        autoComplete={autoComplete}
        autoFocus={autoFocus}
        disabled={disabled}
        endAdornment={endAdornment}
        error={!!error}

        inputComponent={inputComponent}
        multiline={multiline}
        placeholder={placeholder}
        rows={rows}
        rowsMax={rowsMax}
        startAdornment={startAdornment}
        type={type}
        inputProps={{ min, max, checked, maxLength }}
        {...input}
        value={
          (
            input.value && dateOffsetFormat(input.value)
            ) ||
          dateOffsetFormat()
        }
      />
      {/* <FormHelperText>{inputOpts.placeholder}</FormHelperText> */}
      {(touched) && (
        // TODO Focus errors in view
        (error && <div className={classes.formError}>{error}</div>) ||
        (warning && <div className={classes.formWarning}>{warning}</div>)
      )}
    </FormControl>
  );
};

InputText.propTypes = propTypes;

export default withStyles(styles, { name: 'StyledInputText' })(InputText);
