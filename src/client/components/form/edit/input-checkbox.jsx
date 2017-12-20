import React from 'react';
import PropTypes from 'prop-types';
import Checkbox from 'material-ui/Checkbox';

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
  meta: { touched, error, warning },
}) => (
  <div>
    <label
      htmlFor={input}
    >
      {label}
    </label>
    <div>
      <Checkbox
        className="form-control"
        {...input}
        checked={!!input.value}
        onCheck={input.onChange}
      />
      {touched && (
        (error && <div className="form-error">{error}</div>) || (warning && <div className="form-warning">{warning}</div>)
      )}
    </div>
  </div>
);

renderCheckbox.propTypes = propTypes;

export default renderCheckbox;
