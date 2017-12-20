import React from 'react';
import PropTypes from 'prop-types';
import { TextField } from 'redux-form-material-ui';

import InputCheckbox from './input-checkbox';
import InputRadio from './input-radio';
import InputSelect from './input-select';
import InputText from './input-text';

import EditInput from './edit-input';

const propTypes = {

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
    default:
      return null;
  }
};

EditSwitch.propTypes = propTypes;

export default EditSwitch;
