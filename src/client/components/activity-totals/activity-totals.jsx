import React from 'react';
import PropTypes from 'prop-types';

import returnValues from './return-values';
import style from './style';

const propTypes = {
  totals: PropTypes.array.isRequired,
  mPref: PropTypes.bool.isRequired,
};

const tableRows = (stl, i) => {
  if (i % 2) {
    const newStl = Object.assign({}, stl.row, stl.rowOdd);
    return newStl;
  }
  return stl.row;
};

const ActivityTotals = ({ totals, mPref }) => (
  <div>
    {totals.map((row, index) => (
      <div key={row.name} style={tableRows(style, index)}>
        <div style={style.box} >
          <div style={style.boxMain}>
            {row.name}
          </div>
          <div style={style.boxData}>
            {row.count}
          </div>
        </div>
        {returnValues.map(rV => (
          <div key={`${row.name}${rV.activityType}`}>
            {(rV.conversionMetric) ? (
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
                    row[rV.conversionData],
                    mPref,
                  )}
                </div>
              </div>
            ) : null}
          </div>
        ))}
      </div>
    ))}
  </div>
);

ActivityTotals.propTypes = propTypes;

export default ActivityTotals;
