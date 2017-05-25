import React, { PropTypes } from 'react';
import { addDays, eachDay, format } from 'date-fns';

import lib from '../../containers/lib';
import BarChart from './bar-chart';
import SingleActivity from './single-activity';
import Static from '../form/static';

const propTypes = {
  week: PropTypes.string.isRequired, // "2017-05-02"
  stats: PropTypes.object.isRequired,
  datePref: PropTypes.string,
  measurementPref: PropTypes.bool,
};

const defaultProps = {
  datePref: '%m/%d/%Y',
  measurementPref: false,
};

function weeklyStats({ week, stats, datePref, measurementPref }) {

  return (
    <div style={{ border: '1px solid #880000' }}>
      <Static
        contentLabel="Week of "
        content={week}
        contentType="text"
      />
      <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
        {stats.weeklyTotals.tss.total ? (
          <BarChart
            contentLabel="TSS"
            content={`${stats.weeklyTotals.tss.total}`}
            contentType="text"
            metric="tss"
            weeklyTotals={stats.dayTotals}
          />
        ) : (
          <BarChart
            contentLabel="Distance"
            content={`${stats.weeklyTotals.dst.total}`}
            contentType="text"
            metric="dst"
            weeklyTotals={stats.dayTotals}
            mPref={measurementPref}
          />
        )}
        {stats.weeklyTotals.ss.total ? (
          <BarChart
            contentLabel="Suffer Score"
            content={`${stats.weeklyTotals.ss.total}`}
            contentType="text"
            metric="ss"
            weeklyTotals={stats.dayTotals}
          />
        ) : (null)}
        <BarChart
          contentLabel="Moving Time"
          content={`${stats.weeklyTotals.time.total}`}
          contentType="text"
          metric="time"
          weeklyTotals={stats.dayTotals}
        />
        <BarChart
          contentLabel="Elevation"
          content={`${stats.weeklyTotals.elev.total}`}
          contentType="text"
          metric="elev"
          weeklyTotals={stats.dayTotals}
          mPref={measurementPref}
        />
      </div>
      {/* <ul>
        {activities.map(act => (
          // TODO build a component to show each activity
          <li key={act.activityId}>
            <SingleActivity
              {...act}
            />
          </li>
        ))}
      </ul> */}
    </div>
  );
}

weeklyStats.propTypes = propTypes;
weeklyStats.defaultProps = defaultProps;

export default weeklyStats;
