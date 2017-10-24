import React from 'react';
import PropTypes from 'prop-types';
import { DatePicker } from 'redux-form-material-ui';
// import Moment from 'moment';
import momentLocalizer from 'react-widgets/lib/localizers/moment';
import 'react-widgets/dist/css/react-widgets.css';
import './styles.css';

momentLocalizer(moment);

const propTypes = {
  input: PropTypes.object,
  label: PropTypes.string,
  time: PropTypes.bool,
  calendar: PropTypes.bool,
  meta: PropTypes.object,
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
    <DatePicker
      {...input}
      value={input.value && new Date(input.value) || null}
      onChange={(event, value) => { console.log(value); input.onChange(value); }}
      // onBlur={input.onBlur}
      // time={time}
      // calendar={calendar}
      // format={'MMMM D YYYY'}
      // editFormat={'MM/DD/YYYY'}
      // parse={['M/D/YYYY', 'M/D/YY']}
    />
    {touched && (
      (error && <div className="form-error">{error}</div>) || (warning && <div className="form-warning">{warning}</div>)
    )}
  </div>
);

renderDatePicker.propTypes = propTypes;

export default renderDatePicker;
