import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { FormControl } from 'material-ui/Form';
import Input, { InputLabel } from 'material-ui/Input';

import StaticMD from '../static-markdown';

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
    width: '40%',
  },
  formControlMD: {
    margin: theme.spacing.unit,
    width: '46%',
  },
  flexDisplay: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  selectEmpty: {
    // marginTop: theme.spacing.unit * 3,
  },
});

const InputTextMarkdown = (props) => {
  const {
    classes,
    input,
    label,
    initialValue,

    eventSelector,
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
    <div className={classes.flexDisplay}>
      <FormControl
        className={classes.formControlMD}
        // fullWidth
        margin={margin}
      >
        <InputLabel htmlFor={input.name}>{label}</InputLabel>
        <Input
          // className={classes.formControl}
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
        />
        {/* <FormHelperText>{inputOpts.placeholder}</FormHelperText> */}
        {(touched) && (
          // TODO Focus errors in view
          (error && <div className={classes.formError}>{error}</div>) ||
          (warning && <div className={classes.formWarning}>{warning}</div>)
        )}
      </FormControl>
      <div className={classes.formControlMD}>
        <StaticMD
          contentLabel="Formatted"
          content={input.value}
        />
      </div>
    </div>

  );
};

InputTextMarkdown.propTypes = propTypes;

export default withStyles(styles, { name: 'StyledInputText' })(InputTextMarkdown);
