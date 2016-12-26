import React, { PropTypes } from 'react';
import { TextField } from 'redux-form-material-ui';

import './styles.css';

const propTypes = {
  input: PropTypes.object,
  label: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  initialValue: PropTypes.any,
  meta: PropTypes.object,
};

const renderInput = ({
  input,
  label,
  placeholder,
  type,
  initialValue,
  meta: { touched, error, warning },
}) => (
  <div>
    <label
      htmlFor={input}
    >
      {label}
    </label>
    <div>
      <TextField
        className="form-control"
        {...input}
        placeholder={placeholder}
        type={type}
        // value={initialValue}
      />
      {touched && (
        (error && <div className="form-error">{error}</div>) || (warning && <div className="form-warning">{warning}</div>)
      )}
    </div>
  </div>
);

renderInput.propTypes = propTypes;

export default renderInput;
