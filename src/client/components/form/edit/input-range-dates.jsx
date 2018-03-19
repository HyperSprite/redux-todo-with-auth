import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import { InputLabel } from 'material-ui/Input';

import lib from '../../../containers/lib';

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
  /** array of date strings [min, max] */
  value: PropTypes.arrayOf(PropTypes.string),
};

const defaultProps = {
  value: ['', ''],
};

const styles = theme => ({
  formError: {
    color: '#dd0000',
    fontWeight: 'bold',
  },
  formWarning: {
    color: '#dd9900',
    fontWeight: 'bold',
  },
  flexParent: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});

class InputRangeDate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      min: lib.dateStringFormat(this.props.min, 'utc'),
      max: lib.dateStringFormat(this.props.max, 'utc'),
    };
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
      classes,
      input,
      datePref,
      label,
      meta: { touched, error, warning },
    } = this.props;

    const { min, max } = this.state;

    return (
      <div>
        <InputLabel
          htmlFor={input.name}
        >
          {label}
        </InputLabel>
        <div className={classes.flexParent}>
          <div className={classes.rangeDateBox}>
            <TextField
              id="dateMin"
              onChange={event => this.handleDateUpdate(event.target.value, 'min')}
              type="date"
              min={min}
              max={(input.value && input.value[1]) || max}
              value={input.value[0] || min}
              fullWidth
            />
          </div>
          <div className={classes.rangeDateBox}>
            <TextField
              id="dateMax"
              onChange={event => this.handleDateUpdate(event.target.value, 'max')}
              type="date"
              min={(input.value && input.value[0]) || min}
              max={max}
              value={input.value[1] || max}
              fullWidth
            />
          </div>
        </div>
        {touched && (
          (error && <div className={classes.formError}>{error}</div>) || (warning && <div className={classes.formWarning}>{warning}</div>)
        )}
      </div>
    );
  }
}

InputRangeDate.propTypes = propTypes;
InputRangeDate.defaultProps = defaultProps;

export default withStyles(styles, { name: 'StyledInputRangeDate' })(InputRangeDate);
