import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ActivityMetric from '../activity-metric';
import ChartBarSingleHorz from '../charts/bar-single-horz';

import style from './style';

const propTypes = {
  activitySearchCount: PropTypes.number,
  activCalcAll: PropTypes.number,
  activCalcFilter: PropTypes.number,
};

const defaultProps = {
  activitySearchCount: 0,
  activCalcAll: 0,
  activCalcFilter: 0,
};

class ActivityCount extends React.Component {

  render() {
    const {
      activitySearchCount,
      activCalcAll,
      activCalcFilter,
    } = this.props;

    return (activCalcFilter && activCalcAll) ? (
      <div style={style.flexParent} >
        <ChartBarSingleHorz
          chartData={[{
            name: 'Activities',
            Total: activCalcAll,
            Matched: activCalcFilter,
            Loaded: activitySearchCount,
          }]}
        />
        <div style={{ ...style.container, justifyContent: 'space-evenly' }}>
          <div style={{ ...style.box, ...style.narrowBox }} >
            <div style={style.boxLabel}>
              {'Loaded'}
            </div>
            <div style={style.boxData}>
              {activitySearchCount}
            </div>
          </div>
          {(activCalcFilter !== activCalcAll) ? (
            <div style={{ ...style.box, ...style.narrowBox }} >
              <div style={style.boxLabel}>
                {'Matched'}
              </div>
              <div style={style.boxData}>
                {activCalcFilter}
              </div>
            </div>
          ) : (
            <div style={{ ...style.box, ...style.narrowBox }} />
          )}
          <div style={{ ...style.box, ...style.narrowBox }} >
            <div style={style.boxLabel}>
              {'Total'}
            </div>
            <div style={style.boxData}>
              {activCalcAll}
            </div>
          </div>
        </div>
      </div>
    ) : null;
  }
}

ActivityCount.propTypes = propTypes;
ActivityCount.defaultProps = defaultProps;

function mapStateToProps(state) {
  const { activities } = state;
  return {
    activitySearchCount: activities.activitySearch.length,
    activCalcAll: activities.activCalcAll.count,
    activCalcFilter: activities.activCalcFilter.count,
  };
}

export default connect(mapStateToProps)(ActivityCount);
