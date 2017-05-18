import React, { PropTypes } from 'react';
import { addDays, eachDay, format } from 'date-fns';

import lib from '../../containers/lib';
import BarChart from './bar-chart';
import Static from '../form/static';

const propTypes = {
  week: PropTypes.string.isRequired, // "2017-05-02"
  activities: PropTypes.array.isRequired,
  datePref: PropTypes.string,
  measurementPref: PropTypes.bool,
};

const defaultProps = {
  datePref: '%m/%d/%Y',
  measurementPref: false,
};

function oneWeek(weekStart) {
  const weekEnd = format(addDays(weekStart, 6), 'YYYY-MM-DD');
  return weekEnd;
}

class OneMetric {
  constructor(day = 0, total = 0) {
    this.day = day;
    this.total = total;
  }
}

class OneDay {
  constructor(date = '', day = '') {
    this.date = date;
    this.day = day;
    this.names = [];
  }
}
// date is the date in string "2017-05-02" format
function dayObjBuilder(date, datePref) {
  const metricsTypes = ['tss', 'ss', 'dst', 'time', 'elev'];
  const resDay = new OneDay(lib.dateFormat(date, datePref), date.slice(-2));
  metricsTypes.forEach(mType => resDay[mType] = new OneMetric());
  return resDay;
}

function weeklyStats({ week, activities, datePref, measurementPref }) {
  // make simple weekly totals object track totals.
  const weeklyTotals = dayObjBuilder(week, datePref);
  // const weekArr = ["2017-05-01", "2017-05-02", "2017-05-03", "2017-05-04"..."];
  const weekArr = eachDay(week, oneWeek(week)).map(eDay => format(eDay, 'YYYY-MM-DD'));
  const dayTotals = weekArr.map(day => dayObjBuilder(day, datePref));
  // go through each day and add activities.

  for (let i = 0; i < weekArr.length; i++) {
    if (weekArr[i] <= format(new Date(), 'YYYY-MM-DD')) {
      dayTotals[i].tss.total = weeklyTotals.tss.day;
      dayTotals[i].ss.total = weeklyTotals.ss.day;
      dayTotals[i].dst.total = weeklyTotals.dst.day;
      dayTotals[i].time.total = weeklyTotals.time.day;
      dayTotals[i].elev.total = weeklyTotals.elev.day;
    }

    activities.forEach((act) => {
      if (weekArr[i] === act.start_date_local.slice(0, 10)) {
        dayTotals[i].names.push(act.name);

        dayTotals[i].tss.day += isNaN(act.tssScore) ? 0 : act.tssScore;
        dayTotals[i].ss.day += isNaN(act.suffer_score) ? 0 : act.suffer_score;
        dayTotals[i].dst.day += isNaN(act.distance) ? 0 : act.distance;
        dayTotals[i].time.day += isNaN(act.moving_time) ? 0 : act.moving_time;
        dayTotals[i].elev.day += isNaN(act.total_elevation_gain) ? 0 : act.total_elevation_gain;

        weeklyTotals.tss.day += isNaN(act.tssScore) ? 0 : act.tssScore;
        weeklyTotals.ss.day += isNaN(act.suffer_score) ? 0 : act.suffer_score;
        weeklyTotals.dst.day += isNaN(act.distance) ? 0 : act.distance;
        weeklyTotals.time.day += isNaN(act.moving_time) ? 0 : act.moving_time;
        weeklyTotals.elev.day += isNaN(act.total_elevation_gain) ? 0 : act.total_elevation_gain;
      }
    });
  }
  weeklyTotals.tss.total = weeklyTotals.tss.day;
  weeklyTotals.ss.total = weeklyTotals.ss.day;
  weeklyTotals.dst.total = weeklyTotals.dst.day;
  weeklyTotals.time.total = weeklyTotals.time.day;
  weeklyTotals.elev.total = weeklyTotals.elev.day;
  return (
    <div style={{ border: '1px solid #880000' }}>
      <Static
        contentLabel="Week of "
        content={weeklyTotals.date}
        contentType="text"
      />
      <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
        {weeklyTotals.tss.total ? (
          <BarChart
            contentLabel="TSS"
            content={`${weeklyTotals.tss.total}`}
            contentType="text"
            metric="tss"
            weeklyTotals={dayTotals}
          />
        ) : (
          <BarChart
            contentLabel="Distance"
            content={`${weeklyTotals.dst.total}`}
            contentType="text"
            metric="dst"
            weeklyTotals={dayTotals}
            mPref={measurementPref}
          />
        )}
        {weeklyTotals.ss.total ? (
          <BarChart
            contentLabel="Suffer Score"
            content={`${weeklyTotals.ss.total}`}
            contentType="text"
            metric="ss"
            weeklyTotals={dayTotals}
          />
        ) : (null)}
        <BarChart
          contentLabel="Moving Time"
          content={`${weeklyTotals.time.total}`}
          contentType="text"
          metric="time"
          weeklyTotals={dayTotals}
        />
        <BarChart
          contentLabel="Elevation"
          content={`${weeklyTotals.elev.total}`}
          contentType="text"
          metric="elev"
          weeklyTotals={dayTotals}
          mPref={measurementPref}
        />
      </div>
    </div>
  );
}

weeklyStats.propTypes = propTypes;
weeklyStats.defaultProps = defaultProps;

export default weeklyStats;
