import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ActivityTotals from '../activity-totals';
// import returnValues from './return-values';
// import style from './style';

class GearTotals extends React.Component {
  static propTypes = {
    activityIds: PropTypes.arrayOf(
      PropTypes.number,
    ),
    activities: PropTypes.arrayOf(PropTypes.object).isRequired,
    gear: PropTypes.arrayOf(PropTypes.object).isRequired,
    mPref: PropTypes.bool.isRequired,
  }

  static defaultProps = {
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
              count: 0,
            };
          acc[thisAct.gear.id].moving_time += thisAct.moving_time;
          acc[thisAct.gear.id].distance += thisAct.distance;
          acc[thisAct.gear.id].total_elevation_gain += thisAct.total_elevation_gain;
          acc[thisAct.gear.id].count += 1;
        }
        return acc;
      }, {});
      const results = Object.entries(totalsObj).map(([gearId, values]) => {
        const tmpGear = gear.filter(g => g.id === gearId)[0];
        values.name = tmpGear ? tmpGear.name : 'Unknown';
        return values;
      });
      return results;
    };

    const totals = calcTotals(activityIds, activities);


    return (
      <div>
        {totals.length !== 0 && (
          <ActivityTotals
            totals={totals}
            mPref={mPref}
          />
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    gear: [...state.auth.user.bikes, ...state.auth.user.shoes],
    activities: state.activities.activities,
    mPref: state.page.mPref,
  };
}

export default connect(mapStateToProps, null)(GearTotals);
