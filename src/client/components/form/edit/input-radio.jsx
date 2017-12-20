import React from 'react';
import PropTypes from 'prop-types';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';

import './styles.css';

const propTypes = {
  input: PropTypes.object,
  label: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  initialValue: PropTypes.any,
  meta: PropTypes.object,
};

const renderCheckbox = ({
  input,
  label,
  placeholder,
  type,
  initialValue,
  contentOptions,
  meta: { touched, error, warning },
}) => (
  <div>
    <label
      htmlFor={input}
    >
      {label}
    </label>
    <div>
      <RadioButtonGroup
        className="form-control"
        {...input}
        valueSelected={input.value}
        onChange={(event, value) => input.onChange(value)}
      >
        {contentOptions.map(cOpts => (
          <RadioButton key={cOpts.label} value={cOpts.value} label={cOpts.label} />
        ))}
      </RadioButtonGroup>
      {touched && (
        (error && <div className="form-error">{error}</div>) || (warning && <div className="form-warning">{warning}</div>)
      )}
    </div>
  </div>
);

renderCheckbox.propTypes = propTypes;

export default renderCheckbox;
