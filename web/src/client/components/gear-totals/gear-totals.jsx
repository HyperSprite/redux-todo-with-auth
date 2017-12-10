import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import returnValues from './return-values';
import style from './style';

class GearTotals extends Component {
  static propTypes = {
    activityIds: PropTypes.arrayOf(
      PropTypes.number,
    ),
    activities: PropTypes.arrayOf(PropTypes.object).isRequired,
    gear: PropTypes.arrayOf(PropTypes.object).isRequired,
    mPref: PropTypes.bool,
  }

  static defaultProps = {
    mPref: false,
    activityIds: [],
  }

  render() {
    const { activityIds, activities, gear, mPref } = this.props;

    const calcTotals = (actNAI, acts) => {
      const totalsObj = actNAI.reduce((acc, act) => {
        const thisAct = acts.filter(activity => activity.activityId === act)[0];
        if (thisAct && thisAct.gear) {
          acc[thisAct.gear.id] = acc[thisAct.gear.id] ?
            acc[thisAct.gear.id] : {
              moving_time: 0,
              distance: 0,
              total_elevation_gain: 0,
            };
          acc[thisAct.gear.id].moving_time += thisAct.moving_time;
          acc[thisAct.gear.id].distance += thisAct.distance;
          acc[thisAct.gear.id].total_elevation_gain += thisAct.total_elevation_gain;
        }
        return acc;
      }, {});
      const results = Object.entries(totalsObj).map(([gearId, values]) => {
        const tmpGear = gear.filter(g => g.id === gearId)[0];
        values.gearName = tmpGear ? tmpGear.name : 'Unknown';
        return values;
      });
      return results;
    }

    const gearTotals = calcTotals(activityIds, activities);
    const tableRows = (stl, i) => {
      if (i % 2) {
        const newStl = Object.assign({}, stl.row, stl.rowOdd);
        return newStl;
      }
      return stl.row;
    };

    return (
      <div>
        {gearTotals.length !== 0 && (
          <div>
            {gearTotals.map((row, index) => (
              <div key={row.gearName} style={tableRows(style, index)}>
                {returnValues.map(rV => (
                  <div key={`${row.gearName}${rV.activityType}`}>
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
                    ) : (
                      <div style={style.boxMain}>
                        {row[rV.activityType]}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    gear: [...state.auth.user.bikes, ...state.auth.user.shoes],
    activities: state.activities.activities,
    mPref: state.auth.user.measurement_preference === 'feet',
  };
}

export default connect(mapStateToProps, null)(GearTotals);
