import React from 'react';
import PropTypes from 'prop-types';

import InputDatePicker from './input-datepicker';
// import InputDownshiftMultiObj from './input-downshift-multi-obj'; // auto select
import InputDownshiftMultiString from './input-downshift/multi-string'; // auto select
import InputDownshiftString from './input-downshift/string'; // auto select
import InputDownshiftObj from './input-downshift/obj'; // auto select
import InputCheckbox from './input-checkbox';
import InputRadio from './input-radio';
import InputRadioCheckbox from './input-radio-checkbox';
import InputRange from './input-range';
import InputRangeDates from './input-range-dates';
import InputSelect from './input-select';
// import InputSingleFieldArray from './input-single-field-array';
import InputText from './input-text';
import InputTextMarkdown from './input-text-markdown';

import WrapReduxForm from './wrap-redux-form';

const propTypes = {
  formValues: PropTypes.shape({
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    component: PropTypes.string.isRequired,
    addButtonset: PropTypes.bool,
    // type: PropTypes.string.isRequired,
  }).isRequired,
};

const defaultProps = {

};

const inputs = {
  InputDatePicker,
  InputDownshiftMultiString,
  InputDownshiftObj,
  InputDownshiftString,
  InputCheckbox,
  InputRadio,
  InputRadioCheckbox,
  InputRange,
  InputRangeDates,
  InputSelect,
  InputText,
  InputTextMarkdown,
};

const EditSwitch = props => (
  <WrapReduxForm
    {...props}
    component={inputs[props.formValues.component]}
  />
);

EditSwitch.propTypes = propTypes;
EditSwitch.defaultProps = defaultProps;

export default EditSwitch;
