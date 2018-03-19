import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Checkbox from 'material-ui/Checkbox';
import { FormControl, FormControlLabel, FormGroup, FormLabel } from 'material-ui/Form';

const propTypes = {
  input: PropTypes.object,
  label: PropTypes.string,
  type: PropTypes.string,
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
});

const InputCheckboxGroup = (props) => {
  const {
    classes,
    input,
    label,
    type,
    initialValue,
    contentOptions,
    meta: { touched, error, warning },
  } = props;

  return (
    <div >
      <FormControl
        component="fieldset"
        // className={classes.formControl}
      >
        <FormLabel
          component="legend"
          // className={classes.formGroupLabel}
        >
          {label}
        </FormLabel>
        <FormGroup
          aria-label={input.name}
          // className={classes.group}
        >
          {contentOptions.data.filter(f => f.value > 0).map(cOpts => (
            <FormControlLabel
              // className={classes.formLabel}
              key={cOpts.label}
              label={cOpts.label}
              control={
                <Checkbox
                  value={cOpts.value}
                  onChange={() => input.onChange(cOpts.value)}
                  checked={(input.value === cOpts.value)}
                />
              }
            />
          ))}
        </FormGroup>
      </FormControl>
      {touched && (
        (error && <div className={classes.formError}>{error}</div>) ||
        (warning && <div className={classes.formWarning}>{warning}</div>)
      )}
    </div>
  );
};

InputCheckboxGroup.propTypes = propTypes;

export default withStyles(styles, { name: 'StyledInputCheckboxGroup' })(InputCheckboxGroup);
