import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

import './styles.css';

const propTypes = {
  input: PropTypes.object,
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]),
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
    minWidth: 200,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
});

const InputSelect = (props) => {
  const {
    classes,
    input,
    label,
    placeholder,
    type,
    initialValue,
    contentOptions,
    meta: { touched, error, warning },
  } = props;

  return (
    <FormControl className={classes.formControl}>
      <InputLabel htmlFor={input.value}>{label}</InputLabel>
      <Select
        value={input.value}
        onChange={event => input.onChange(event.target.value)}
        input={<Input name={input.name} id={input.name} />}
      >
        {contentOptions.data.map(cOpts => (
          <MenuItem key={cOpts.value} value={cOpts.value} >{cOpts.label}</MenuItem>
        ))}
      </Select>
      {touched && (
        (error && <div className={classes.formError}>{error}</div>) ||
        (warning && <div className={classes.formWarning}>{warning}</div>)
      )}
    </FormControl>
  );
};

InputSelect.propTypes = propTypes;

export default withStyles(styles, { name: 'StyledInputSelect' })(InputSelect);
