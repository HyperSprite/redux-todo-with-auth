import React from 'react';
import PropTypes from 'prop-types';
import { DatePicker } from 'material-ui';

import lib from '../../../containers/lib';


// import metricConv from './metric-conversions';
import styles from './styles';


const propTypes = {
  /** date display '%m/%d/%Y' from Strava*/
  datePref: PropTypes.string.isRequired,
  /** [default min value, default max value] */
  defaultValue: PropTypes.arrayOf(PropTypes.string).isRequired,
  /** part of redux-form */
  input: PropTypes.shape({
    onChange: PropTypes.func.isRequired,
    /** input feild name, 'date' sent in body as key */
    name: PropTypes.string,
    /** on change becomes [min, max] date objects array */
    // value: PropTypes.oneOfType([
      // PropTypes.string,
      // PropTypes.arrayOf(PropTypes.object),
    // ]).isRequired,
  }).isRequired,
  /** 'Date' */
  label: PropTypes.string.isRequired,
  /** starting max value */
  max: PropTypes.string.isRequired,
  /** starting min value */
  min: PropTypes.string.isRequired,
};

class InputRangeDate extends React.Component {
  constructor(props) {
    super(props);
    this.handleDateUpdate = this.handleDateUpdate.bind(this);
    this.handleDate = this.handleDate.bind(this);
  }

  handleDateUpdate(value, indx) {
    const min = indx === 'min' ? value : this.props.input.value[0];
    const max = indx === 'max' ? value : this.props.input.value[1];
    this.props.input.onChange([min, max]);
  }

  handleDate(value) {
    lib.dateFormat(value, this.props.datePref);
  }

  render() {
    const {
      input,
      datePref,
      defaultValue,
      label,
      min,
      max,
      meta: { touched, error, warning }
    } = this.props;
    const dsply = {
      min: lib.dateFormat(min, datePref),
      max: lib.dateFormat(max, datePref),
    };

    return (
      <div>
        <div style={styles.inputLabel}>
          <label
            htmlFor={input.name}
          >
            {label}
          </label>
        </div>
        <div style={styles.flexParent}>
          <div style={styles.inputBox}>
            <DatePicker
              onChange={(event, value) => this.handleDateUpdate(new Date(value), 'min')}
              autoOk
              floatingLabelText={dsply.min}
              floatingLabelStyle={styles.floatingLabelStyle}
              floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
              minDate={new Date(min)}
              maxDate={(this.props.input.value && this.props.input.value[1]) || new Date(max)}
              value={this.props.input.value[0]}
              defaultDate={new Date(defaultValue[0])}
              formatDate={lib.dateFormat}
            />
          </div>
          <div style={styles.inputBox}>
            <DatePicker
              onChange={(event, value) => this.handleDateUpdate(new Date(value), 'max')}
              autoOk
              floatingLabelText={dsply.max}
              floatingLabelStyle={styles.floatingLabelStyle}
              floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
              minDate={(this.props.input.value && this.props.input.value[0]) || new Date(min)}
              maxDate={new Date(max)}
              value={this.props.input.value[1]}
              defaultDate={new Date(defaultValue[1])}
              formatDate={lib.dateFormat}
            />
          </div>
        </div>
        {touched && (
          (error && <div className="form-error">{error}</div>) || (warning && <div className="form-warning">{warning}</div>)
        )}
      </div>
    );
  }
}

InputRangeDate.propTypes = propTypes;

export default InputRangeDate;
