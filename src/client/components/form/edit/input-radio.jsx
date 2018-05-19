import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';

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
});

const propTypes = {
  input: PropTypes.object,
  label: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  initialValue: PropTypes.any,
  meta: PropTypes.object,
};

const InputRadio = ({
  classes,
  input,
  label,
  placeholder,
  type,
  initialValue,
  contentOptions,
  meta: { touched, error, warning },
}) => {
  return (
    <div >
      <FormControl
        component="fieldset"
        className={classes.formControl}
      >
        <FormLabel component="legend">
          {label}
        </FormLabel>
        <RadioGroup
          aria-label={input.name}
          className={classes.group}
          {...input}
          // value={input.value || initialValue}
          // onChange={(event, value) => input.onChange(value)}
        >
          {contentOptions.data.map(cOpts => (
            <FormControlLabel
              key={cOpts.label}
              name={input.name}
              value={cOpts.value}
              control={<Radio />}
              label={cOpts.label}
            />
          ))}
        </RadioGroup>
      </FormControl>
      {touched && (
        (error && <div className={classes.formError}>{error}</div>) ||
        (warning && <div className={classes.formWarning}>{warning}</div>)
      )}
    </div>
  );
};

InputRadio.propTypes = propTypes;

export default withStyles(styles, { name: 'StyledInputRadio' })(InputRadio);
