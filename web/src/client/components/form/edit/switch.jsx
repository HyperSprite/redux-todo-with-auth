import React from 'react';
import PropTypes from 'prop-types';

import Input from '../input';

import EditInput from './input';

const propTypes = {

};

const EditSwitch = (props) => {
  switch (props.formValues.componentType) {
    case 'Input':
      return <EditInput {...props} component={Input} />;
    default:
      return null;
  }
};

EditSwitch.propTypes = propTypes;

export default EditSwitch;
