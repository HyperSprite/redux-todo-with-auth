import React, { PropTypes } from 'react';
import DateTimePicker from 'react-widgets/lib/DateTimePicker';
import 'react-widgets/dist/css/react-widgets.css';
import './styles.css';
import Moment from 'moment';
import momentLocalizer from 'react-widgets/lib/localizers/moment';
momentLocalizer(Moment);





const propTypes = {
  // input: PropTypes.object,
  // label: PropTypes.string,
  // type: PropTypes.string,
  // placeholder: PropTypes.string,
  // initialValue: PropTypes.any,
  // meta: PropTypes.object,
};

const renderDatePicker = ({
  input,
  label,
  time,
  calendar,
  meta: { touched, error, warning },
}) => (
  <div>
    <label
      htmlFor={input}
    >
      {label}
    </label>
    <DateTimePicker
      {...input}
      value={input.value && new Date(input.value) || null}
      onBlur={input.onBlur}
      time={time}
      calendar={calendar}
      format={'MMMM D YYYY'}
      editFormat={'MM/DD/YYYY'}
      parse={['M/D/YYYY', 'M/D/YY']}
    />
    {touched && (
      (error && <div className="form-error">{error}</div>) || (warning && <div className="form-warning">{warning}</div>)
    )}
  </div>
);

renderDatePicker.propTypes = propTypes;

export default renderDatePicker;
