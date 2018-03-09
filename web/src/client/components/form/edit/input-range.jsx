import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui-next/styles';
import Range from 'rc-slider/lib/Range';
import 'rc-slider/assets/index.css';
import justFNS from 'just-fns';
import metricConv from './metric-conversions';

const propTypes = {
  /** [default min value, default max value] */
  defaultValue: PropTypes.arrayOf(PropTypes.number).isRequired,
  /** part of redux-form */
  input: PropTypes.shape({
    onChange: PropTypes.func.isRequired,
    /** input feild name, 'distance' sent in body as key */
    name: PropTypes.string,
    /** starts as '', on change becomes [min, max] array */
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.number),
    ]).isRequired,
  }).isRequired,
  /** 'Distance' */
  label: PropTypes.string.isRequired,
  /** Boolean ? imperial : metric throughout app */
  mPref: PropTypes.bool.isRequired,
  /** starting max value */
  max: PropTypes.number.isRequired,
  /** starting min value */
  min: PropTypes.number.isRequired,
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
  container: {
    width: 250,
    padding: '5px 15px',
  },
  label: theme.typography.fontWeightMedium,
  flexParent: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  flexChild: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'flex-evenly',
  },
  div: {
    padding: '0 5px',
  },
  rangeTrackStyle: [
    {
      backgroundColor: '#ef9a9a',
      height: 13,
    },
  ],
  rangeHandleStyle: [
    {
      borderColor: '#d50000',
      height: 21,
      width: 21,
      marginLeft: -8,
      marginTop: -4,
      backgroundColor: '#d50000',
    },
    {
      borderColor: '#d50000',
      height: 21,
      width: 21,
      marginLeft: -8,
      marginTop: -4,
      backgroundColor: '#d50000',
    },
  ],
  rangeRailStyle: {
    backgroundColor: theme.palette.secondary[200],
    height: 13,
  },
});
const style = {
  rangeTrackStyle: [{
    backgroundColor: '#ef9a9a',
    height: 13,
  }],
  rangeHandleStyle: [
    {
      borderColor: '#d50000',
      height: 21,
      width: 21,
      marginLeft: -8,
      marginTop: -4,
      backgroundColor: '#d50000',
    },
    {
      borderColor: '#d50000',
      height: 21,
      width: 21,
      marginLeft: -8,
      marginTop: -4,
      backgroundColor: '#d50000',
    },
  ],
  rangeRailStyle: {
    backgroundColor: '#aebcc3',
    height: 13,
  },
}

const InputRange = (props) => {
  const {
    classes,
    input,
    defaultValue,
    label,
    min,
    max,
    mPref,
    meta: { touched, error, warning },
  } = props;
  const conMetric = metricConv[input.name] ? metricConv[input.name].conMetric : null;
  const dsply = {
    min: justFNS.statsConversions(conMetric, false, min, mPref),
    max: justFNS.statsConversions(conMetric, false, max, mPref),
    iValue0: justFNS.statsConversions(conMetric, false, input.value[0] || defaultValue[0], mPref),
    iValue1: justFNS.statsConversions(conMetric, false, input.value[1] || defaultValue[1], mPref),
    metric: mPref ?
      (metricConv[input.name] && metricConv[input.name].conTypeImp) || null :
      (metricConv[input.name] && metricConv[input.name].conTypeMet) || null,
  };
  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <label htmlFor={input.name}>
          <div className={classes.label} >{`${label} ${dsply.metric ? dsply.metric : ''}`}</div>
          <div className={classes.flexParent} >
            <div className={classes.flexChild} >
              <div className={classes.div} >{dsply.min}</div>
              <div className={classes.div} >{dsply.min !== dsply.iValue0 && dsply.iValue0}</div>
            </div>
            <div className={classes.flexChild}>
              <div className={classes.div} >{dsply.max !== dsply.iValue1 && dsply.iValue1}</div>
              <div className={classes.div} >{dsply.max}</div>
            </div>
          </div>
        </label>
        <div>
          <Range
            value={input.value || [min, max]}
            name={input.value}
            onChange={input.onChange}
            defaultValue={defaultValue}
            min={min}
            max={max}
            mPref={mPref}
            allowCross={false}
            trackStyle={style.rangeTrackStyle}
            handleStyle={style.rangeHandleStyle}
            railStyle={style.rangeRailStyle}
          />
        </div>
      </div>
      {touched && (
        (error && <div className={classes.formError}>{error}</div>) ||
        (warning && <div className={classes.formWarning}>{warning}</div>)
      )}
    </div>
  );
};

InputRange.propTypes = propTypes;

export default withStyles(styles, { name: 'StyledInputRange' })(InputRange);
