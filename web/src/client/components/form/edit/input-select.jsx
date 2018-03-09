import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui-next/styles';
import { FormControl } from 'material-ui-next/Form';
import Input, { InputLabel } from 'material-ui-next/Input';
import Select from 'material-ui-next/Select';
import { MenuItem } from 'material-ui-next/Menu';

import './styles.css';

const propTypes = {
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
    marginTop: theme.spacing.unit * 2,
  },
});

const RenderSelect = (props) => {
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
        {contentOptions.map(cOpts => (
          <MenuItem key={cOpts.value} value={cOpts.value} >{cOpts.option}</MenuItem>
        ))}
      </Select>
      {touched && (
        (error && <div className={classes.formError}>{error}</div>) ||
        (warning && <div className={classes.formWarning}>{warning}</div>)
      )}
    </FormControl>
  );
};

RenderSelect.propTypes = propTypes;

export default withStyles(styles, { name: 'StyledRenderSelect' })(RenderSelect);
