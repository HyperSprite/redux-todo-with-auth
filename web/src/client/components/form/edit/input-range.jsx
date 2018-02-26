import React from 'react';
import PropTypes from 'prop-types';
import Range from 'rc-slider/lib/Range';
import 'rc-slider/assets/index.css';
import justFNS from 'just-fns';
import metricConv from './metric-conversions';
import styles from './styles';

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

const InputRange = (props) => {
  const { input, defaultValue, label, min, max, mPref, meta: { touched, error, warning } } = props;
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
    <div style={styles.rangeBox}>
      <label
        htmlFor={input.name}
      >
        <div style={{ fontWeight: 'bold' }} >{`${label} ${dsply.metric ? dsply.metric : ''}`}</div>
        <div style={styles.flexParent} >
          <div style={styles.flexChild} >
            <div style={styles.div} >{dsply.min}</div>
            <div style={styles.div} >{dsply.min !== dsply.iValue0 && dsply.iValue0}</div>
          </div>
          <div style={styles.flexChild}>
            <div style={styles.div} >{dsply.max !== dsply.iValue1 && dsply.iValue1}</div>
            <div style={styles.div} >{dsply.max}</div>
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
          trackStyle={styles.rangeTrackStyle}
          handleStyle={styles.rangeHandleStyle}
          railStyle={styles.rangeRailStyle}
        />
      </div>
      {touched && (
        (error && <div className="form-error">{error}</div>) || (warning && <div className="form-warning">{warning}</div>)
      )}
    </div>
  );
};

InputRange.propTypes = propTypes;

export default InputRange;
