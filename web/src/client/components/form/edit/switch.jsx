import React from 'react';
import PropTypes from 'prop-types';

import InputCheckbox from './input-checkbox';
import InputRadio from './input-radio';
import InputSelect from './input-select';
import InputText from './input-text';
import InputRange from './input-range';
import InputRangeDates from './input-range-dates';

import EditInput from './edit-input';

const propTypes = {
  formValues: PropTypes.shape({
    componentType: PropTypes.string.isRequired,
  }).isRequired,
};

const EditSwitch = (props) => {
  switch (props.formValues.componentType) {
    case 'InputText':
      return <EditInput {...props} component={InputText} />;
    case 'InputCheckbox':
      return <EditInput {...props} component={InputCheckbox} />;
    case 'InputRadio':
      return <EditInput {...props} component={InputRadio} />;
    case 'InputSelect':
      return <EditInput {...props} component={InputSelect} />;
    case 'InputRange':
      return <EditInput {...props} component={InputRange} />;
    case 'InputRangeDates':
      return <EditInput {...props} component={InputRangeDates} />;
    default:
      return null;
  }
};

EditSwitch.propTypes = propTypes;

export default EditSwitch;
