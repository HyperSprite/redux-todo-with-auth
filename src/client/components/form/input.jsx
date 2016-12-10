import React, { PropTypes } from 'react';

import './styles.css';

const propTypes = {
  input: PropTypes.object,
  label: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  meta: PropTypes.object,
};

const renderInput = ({ input, label, placeholder, type, meta: { touched, error, warning } }) => (
  <div>
    <label
      htmlFor={input}
    >
      {label}
    </label>
    <div>
      <input className="form-control" {...input} placeholder={placeholder} type={type} />
      {touched && (
        (error && <div className="form-error">{error}</div>) || (warning && <div className="form-warning">{warning}</div>)
      )}
    </div>
  </div>
);

renderInput.propTypes = propTypes;

export default renderInput;
