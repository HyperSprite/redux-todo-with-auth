import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import Range from 'rc-slider/lib/Range';
import 'rc-slider/assets/index.css';
import justFNS from 'just-fns';
import metricConv from './metric-conversions';

import muiPalette from '../../../styles/mui-palette';

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
    flexGrow: 1,
    padding: '5px 15px',
  },
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
});
const style = {
  rangeTrackStyle: [{
    backgroundColor: muiPalette.primary[700],
    height: 4,
  }],
  rangeHandleStyle: [
    {
      borderColor: muiPalette.primary[500],
      height: 16,
      width: 16,
      marginLeft: -4,
      marginTop: -6,
      backgroundColor: muiPalette.primary[500],
    },
    {
      borderColor: muiPalette.primary[500],
      height: 16,
      width: 16,
      marginLeft: -4,
      marginTop: -6,
      backgroundColor: muiPalette.primary[500],
    },
  ],
  rangeRailStyle: {
    backgroundColor: muiPalette.secondary[300],
    height: 4,
  },
};

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
        <InputLabel
          htmlFor={input.name}
        >
          {label}
        </InputLabel>
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
