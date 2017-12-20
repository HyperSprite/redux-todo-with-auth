import React from 'react';
import PropTypes from 'prop-types';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import './styles.css';

const propTypes = {
  input: PropTypes.object,
  label: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  initialValue: PropTypes.any,
  meta: PropTypes.object,
};

const renderSelect = ({
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
      <SelectField
        {...input}
        // floatingLabelText={label}
        onChange={(event, index, value) => input.onChange(value)}
        className="form-control"
      >
        {contentOptions.map(cOpts => (
          <MenuItem key={cOpts.value} value={cOpts.value} primaryText={cOpts.option} />
        ))}
      </SelectField>
      {touched && (
        (error && <div className="form-error">{error}</div>) || (warning && <div className="form-warning">{warning}</div>)
      )}
    </div>
  </div>
);

renderSelect.propTypes = propTypes;

export default renderSelect;
