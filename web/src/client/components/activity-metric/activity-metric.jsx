import React from 'react';
import PropTypes from 'prop-types';

import style from './style';

const ActivityMetric = ({ data, rV, mPref }) => {
  if (data[rV.activityType] && rV.conversionMetric) {
    return (
      <div style={style.box} >
        <div style={style.boxLabel}>
          {rV.activityLabel}
          {rV.conversionmPref ? (
            <span>
              {mPref ? (
                <span> {`(${rV.conversionTypeSA})`}</span>
              ) : (
                <span> {`(${rV.conversionTypeMetric})`}</span>
              )}
            </span>
          ) : (null)}
        </div>
        <div style={style.boxData}>
          {rV.conversionFunction(
            rV.conversionMetric,
            rV.conversionYAxis,
            data[rV.conversionData],
            mPref,
          )}

        </div>
      </div>
    );
  } else if (data[rV.activityType] && data[rV.activityType][rV.activityTypeSub]) {
    return (
      <div style={style.box} >
        <div style={style.boxLabel}>
          {rV.activityLabel}
        </div>
        <div style={style.boxData}>
          {data[rV.activityType][rV.activityTypeSub]}
        </div>
      </div>
    );
  } else if (rV.compute && data[rV.firstArg]) {
    return (
      <div style={style.box} >
        <div style={style.boxLabel}>
          {rV.activityLabel}
        </div>
        <div style={style.boxData}>
          {rV.compute(data[rV.firstArg], data[rV.secondArg], 2)}
        </div>
      </div>
    );
  } else if (data[rV.activityType]) {
    return (
      <div style={style.box} >
        <div style={style.boxLabel}>
          {rV.activityLabel}
        </div>
        <div style={style.boxData}>
          {data[rV.activityType]}
        </div>
      </div>
    );
  }
  return null;
};

export default ActivityMetric;
