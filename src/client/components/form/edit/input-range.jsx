import React from 'react';
import PropTypes from 'prop-types';
import Range from 'rc-slider/lib/Range';
import 'rc-slider/assets/index.css';
import justFNS from 'just-fns';
import EditSwitch from './switch';
import style from './styles';

const propTypes = {
  // mPref: PropTypes.bool.isRequired,
  // valueItems: PropTypes.shape([
  //   {
  //     value: PropTypes.string,
  //     option: PropTypes.string,
  //   },
  // ]).isRequired,
  // valuesMinMax: PropTypes.object.isRequired,
};

const InputRange = (props) => {
  const { input, defaultValue, label, rangeValue, reset, min, max, mPref, meta: { touched, error, warning } } = props;

  const dsply = {
    min: justFNS.statsConversions(rangeValue.conMetric, false, min, mPref),
    max: justFNS.statsConversions(rangeValue.conMetric, false, max, mPref),
    iValue0: justFNS.statsConversions(rangeValue.conMetric, false, input.value[0] || defaultValue[0], mPref),
    iValue1: justFNS.statsConversions(rangeValue.conMetric, false, input.value[1] || defaultValue[1], mPref),
    metric: rangeValue.conTypeImp && mPref ? rangeValue.conTypeImp : rangeValue.conTypeMet,
  };

  return (
    <div style={style.rangeBox}>
      <label
        htmlFor={props.input.name}
      >
        <div style={{ fontWeight: 'bold' }} >{`${label} ${dsply.metric ? dsply.metric : ''}`}</div>
        <div style={style.flexParent} >
          <div style={style.flexChild} >
            <div style={style.div} >{dsply.min}</div>
            <div style={style.div} >{dsply.min !== dsply.iValue0 && dsply.iValue0}</div>
          </div>
          <div style={style.flexChild}>
            <div style={style.div} >{dsply.max !== dsply.iValue1 && dsply.iValue1}</div>
            <div style={style.div} >{dsply.max}</div>
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
          pushable
          trackStyle={style.rangeTrackStyle}
          handleStyle={style.rangeHandleStyle}
          railStyle={style.rangeRailStyle}
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


{/* <div style={{ width: 250 }}>
  <Range
    onChange={props.input.onChange}
    defaultValue={[justFNS.round(valuesMinMax[rA[0].contentValue], 0), justFNS.round(valuesMinMax[rA[1].contentValue], 0)]}
    min={justFNS.round(valuesMinMax[rA[0].contentValue], 0)}
    max={justFNS.round(valuesMinMax[rA[1].contentValue], 0)}
  />
</div>
{touched && (
  (error && <div className="form-error">{error}</div>) || (warning && <div className="form-warning">{warning}</div>)
)}

onChange={(event, value) => props.input.onChange(value)}
*/}
