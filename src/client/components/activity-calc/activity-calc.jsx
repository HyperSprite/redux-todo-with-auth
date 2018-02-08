import React from 'react';
import PropTypes from 'prop-types';

import ActivityMetric from '../activity-metric';
import style from './style';
import returnValues from './return-values';

const propTypes = {
  data: PropTypes.any,
  mPref: PropTypes.bool.isRequired,
  title: PropTypes.string,
  sortStrings: PropTypes.array,
};

const defaultProps = {
  title: 'Loading...',
};

const displayTypes = ['Avg', 'Sum', 'Max', 'Min', ''];

const activityTypeMod = (rv, mod) => {
  const tmpObj = Object.assign({}, rv);
  tmpObj.activityType = `${rv.activityType}${mod}`;
  tmpObj.conversionData = `${rv.activityType}${mod}`;
  tmpObj.activityLabel = `${mod}`;
  tmpObj.arg1 = `${rv.activityType}${mod}` || null;
  return tmpObj;
};

const ActivityCalc = ({
  data,
  mPref,
  title,
  labels,
}) => {
  return (
    <div>
      <div style={style.title}>
        <div>
          {title}
        </div>
      </div>
      <div style={style.container} >
        {returnValues.map(rV => (
          <div key={rV.activityType}>
            {[rV.activityLabel]}
            {rV.displayType.map(rVDT => (
              <ActivityMetric
                key={`${rV.activityType}${rVDT}`}
                data={data}
                rV={activityTypeMod(rV, displayTypes[rVDT])}
                mPref={mPref}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
ActivityCalc.propTypes = propTypes;
ActivityCalc.defaultProps = defaultProps;

export default ActivityCalc;
