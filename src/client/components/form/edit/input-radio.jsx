import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui-next/styles';
import Radio, { RadioGroup } from 'material-ui-next/Radio';
import { FormLabel, FormControl, FormControlLabel } from 'material-ui-next/Form';

const styles = theme => ({
  formError: {
    color: '#dd0000',
    fontWeight: 'bold',
  },
  formWarning: {
    color: '#dd9900',
    fontWeight: 'bold',
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

const renderCheckbox = ({
  classes,
  input,
  label,
  placeholder,
  type,
  initialValue,
  contentOptions,
  meta: { touched, error, warning },
}) => (
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
        value={input.value}
        onChange={(event, value) => input.onChange(value)}
      >
        {contentOptions.map(cOpts => (
          <FormControlLabel
            key={cOpts.label}
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

renderCheckbox.propTypes = propTypes;

export default withStyles(styles, { name: 'StyledrenderCheckbox' })(renderCheckbox);
