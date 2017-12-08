import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import returnValues from './return-values';
import lib from '../../containers/lib';
import style from './style';

const propTypes = {
  // activityId: PropTypes.number.isRequired,
  // activities: PropTypes.array.isRequired,
  // mPref: PropTypes.bool,
  // removeActivity: PropTypes.func.isRequired,
  // setIsFetching: PropTypes.func.isRequired,
};

const defaultProps = {
  mPref: false,
};



class GearTotals extends Component {
  constructor(props) {
    super(props);
  }


  render() {
    const { actNameAndId, activities, gear, mPref } = this.props;

    const calcTotals = (actNAI, acts) => {
      const totalsObj = actNAI.reduce((acc, act) => {
        const thisAct = acts.filter(activity => activity.activityId === act.activityId)[0];
        if (thisAct.gear) {
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
        values.gearName = gear.filter(g => g.id === gearId)[0].name;
        return values;
      });
      return results;
    }

    const gearTotals = calcTotals(actNameAndId, activities);

    return (

      <div>
        {gearTotals.length !== 0 && (
          <div>
            {gearTotals.map(row => (
              <div key={row.gearName} style={style.container}>
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

GearTotals.propTypes = propTypes;
GearTotals.defaultProps = defaultProps;

function mapStateToProps(state) {
  return {
    gear: state.auth.user.bikes,
    activities: state.activities.activities,
    mPref: state.auth.user.measurement_preference === 'feet',
  };
}

export default connect(mapStateToProps, null)(GearTotals);
