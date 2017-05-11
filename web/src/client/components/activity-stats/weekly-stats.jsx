import React, { PropTypes } from 'react';
import { cloneDeep } from 'lodash';
import { addDays, eachDay, format } from 'date-fns';

import BarChart from './bar-chart';

const propTypes = {

};

const defaultProps = {

};

function oneWeek(weekStart) {
  const weekEnd = format(addDays(weekStart, 6), 'YYYY-MM-DD');
  return weekEnd;
}

function weeklyStats({ week, activities }) {
  const tickValues = eachDay(week, oneWeek(week)).map(eDay => format(eDay, 'YYYY-MM-DD'));

  const totals = {
    day: '',
    names: [],
    tss: { day: 0, week: 0, total: 0 },
    ss: { day: 0, week: 0, total: 0 },
    dst: { day: 0, week: 0, total: 0 },
    time: { day: 0, week: 0, total: 0 },
    elev: { day: 0, week: 0, total: 0 },
  };
  const weeklyTotals = [];
  // const dayValues = [];
  for (let i = 0; i < tickValues.length; i++) {
    const dayTotals = cloneDeep(totals);
    activities.forEach((act) => {
      if (tickValues[i] === format(act.start_date_local, 'YYYY-MM-DD')) {
        dayTotals.names.push(act.name);
        dayTotals.tss.day += isNaN(act.tssScore) ? 0 : act.tssScore;
        dayTotals.ss.day += isNaN(act.suffer_score) ? 0 : act.suffer_score;
        dayTotals.dst.day += isNaN(act.distance) ? 0 : act.distance;
        dayTotals.time.day += isNaN(act.moving_time) ? 0 : act.moving_time;
        dayTotals.elev.day += isNaN(act.total_elevation_gain) ? 0 : act.total_elevation_gain;
      }
    });
    dayTotals.day = tickValues[i];

    weeklyTotals.push(dayTotals);
    totals.tss.total += dayTotals.tss.day;
    totals.ss.total += dayTotals.ss.day;
    totals.dst.total += dayTotals.dst.day;
    totals.time.total += dayTotals.time.day;
    totals.elev.total += dayTotals.elev.day;
  }

  weeklyTotals[0].tss.week = weeklyTotals[6].tss.day + weeklyTotals[6].tss.total;
  weeklyTotals[0].ss.week = weeklyTotals[6].ss.day + weeklyTotals[6].ss.total;
  weeklyTotals[0].dst.week = weeklyTotals[6].dst.day + weeklyTotals[6].dst.total;
  weeklyTotals[0].time.week = weeklyTotals[6].time.day + weeklyTotals[6].time.total;
  weeklyTotals[0].elev.week = weeklyTotals[6].elev.day + weeklyTotals[6].elev.total;

  return (
    <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', border: '1px solid #880000' }}>
      {weeklyTotals[0].tss.week ? (
        <BarChart
          contentLabel="TSS"
          content={`${weeklyTotals[0].tss.week}`}
          contentType="text"
          day="tss.day"
          total="tss.total"
          weeklyTotals={weeklyTotals}
        />
      ) : (
        <BarChart
          contentLabel="Distance"
          content={`${weeklyTotals[0].dst.week}`}
          contentType="text"
          day="dst.day"
          total="dst.total"
          weeklyTotals={weeklyTotals}
        />
      )}
      {weeklyTotals[0].ss.week ? (
        <BarChart
          contentLabel="Suffer Score"
          content={`${weeklyTotals[0].ss.week}`}
          contentType="text"
          day="ss.day"
          total="ss.total"
          weeklyTotals={weeklyTotals}
        />
      ) : (null)}
      <BarChart
        contentLabel="Time"
        content={`${weeklyTotals[0].time.week}`}
        contentType="text"
        day="time.day"
        total="time.total"
        weeklyTotals={weeklyTotals}
      />
      <BarChart
        contentLabel="Elevation"
        content={`${weeklyTotals[0].elev.week}`}
        contentType="text"
        day="elev.day"
        total="elev.total"
        weeklyTotals={weeklyTotals}
      />
    </div>
  );
}

weeklyStats.propTypes = propTypes;
weeklyStats.defaultProps = defaultProps;

export default weeklyStats;
