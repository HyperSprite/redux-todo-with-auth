import React, { PropTypes } from 'react';
import { cloneDeep } from 'lodash';
import { addDays, eachDay, format } from 'date-fns';

import lib from '../../containers/lib';
import BarChart from './bar-chart';
import Static from '../form/static';

const propTypes = {

};

const defaultProps = {

};

function oneWeek(weekStart) {
  const weekEnd = format(addDays(weekStart, 6), 'YYYY-MM-DD');
  return weekEnd;
}

function distanceConversion(value, type, measurementPref) {
  console.log('distanceConversion', value, type, measurementPref);
  if (!measurementPref) {
    switch (type) {
      case 'dst':
        return lib.metersToKm(value);
      default:
        return value;
    }
  }
  switch (type) {
    case 'dst':
      return lib.metersToMiles(value);
    case 'elev':
      return lib.metersToFeet(value);
    default:
      return value;
  }
}

function weeklyStats({ week, activities, datePref, measurementPref }) {
  const tickValues = eachDay(week, oneWeek(week)).map(eDay => format(eDay, 'YYYY-MM-DD'));

  const totals = {
    day: '',
    names: [],
    tss: { day: 0, week: 0, total: 0, previous: 0 },
    ss: { day: 0, week: 0, total: 0, previous: 0 },
    dst: { day: 0, week: 0, total: 0, previous: 0 },
    time: { day: 0, week: 0, total: 0, previous: 0 },
    elev: { day: 0, week: 0, total: 0, previous: 0 },
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
        dayTotals.dst.day += isNaN(act.distance) ? 0 : lib.round(distanceConversion(act.distance, 'dst', measurementPref), 2);
        dayTotals.time.day += isNaN(act.moving_time) ? 0 : act.moving_time;
        dayTotals.elev.day += isNaN(act.total_elevation_gain) ? 0 : lib.round(distanceConversion(act.total_elevation_gain, 'elev', measurementPref), 0);
        totals.tss.total += isNaN(act.tssScore) ? 0 : act.tssScore;
        totals.ss.total += isNaN(act.suffer_score) ? 0 : act.suffer_score;
        totals.dst.total += isNaN(act.distance) ? 0 : distanceConversion(act.distance, 'dst', measurementPref);
        totals.time.total += isNaN(act.moving_time) ? 0 : act.moving_time;
        totals.elev.total += isNaN(act.total_elevation_gain) ? 0 : distanceConversion(act.total_elevation_gain, 'elev', measurementPref);
      }
    });
    dayTotals.date = format(tickValues[i], lib.dateFormating(datePref));
    dayTotals.day = format(tickValues[i], 'DD');
    dayTotals.tss.previous = totals.tss.total - dayTotals.tss.day;
    dayTotals.ss.previous = totals.ss.total - dayTotals.ss.day;
    dayTotals.dst.previous = lib.round(totals.dst.total - dayTotals.dst.day, 2);
    dayTotals.time.previous = totals.time.total - dayTotals.time.day;
    dayTotals.elev.previous = lib.round(totals.elev.total - dayTotals.elev.day, 1);
    console.log(dayTotals);
    weeklyTotals.push(dayTotals);
    // totals.tss.total += dayTotals.tss.day;
    // totals.ss.total += dayTotals.ss.day;
    // totals.dst.total += dayTotals.dst.day;
    // totals.time.total += dayTotals.time.day;
    // totals.elev.total += dayTotals.elev.day;
  }

  weeklyTotals[0].tss.week = weeklyTotals[6].tss.day + weeklyTotals[6].tss.total;
  weeklyTotals[0].ss.week = weeklyTotals[6].ss.day + weeklyTotals[6].ss.total;
  weeklyTotals[0].dst.week = lib.round(weeklyTotals[6].dst.day + weeklyTotals[6].dst.total, 1);
  weeklyTotals[0].time.week = weeklyTotals[6].time.day + weeklyTotals[6].time.total;
  weeklyTotals[0].elev.week = lib.round(weeklyTotals[6].elev.day + weeklyTotals[6].elev.total, 2);
  console.log(weeklyTotals);
  return (
    <div style={{ border: '1px solid #880000' }}>
      <Static
        contentLabel="Week of "
        content={weeklyTotals[0].date}
        contentType="text"
      />
      <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
        {weeklyTotals[0].tss.week ? (
          <BarChart
            contentLabel="TSS"
            content={`${weeklyTotals[0].tss.week}`}
            contentType="text"
            day="tss.day"
            previous="tss.previous"
            weeklyTotals={weeklyTotals}
          />
        ) : (
          <BarChart
            contentLabel="Distance"
            content={`${weeklyTotals[0].dst.week}`}
            contentType="text"
            day="dst.day"
            previous="dst.previous"
            weeklyTotals={weeklyTotals}
          />
        )}
        {weeklyTotals[0].ss.week ? (
          <BarChart
            contentLabel="Suffer Score"
            content={`${weeklyTotals[0].ss.week}`}
            contentType="text"
            day="ss.day"
            previous="ss.previous"
            weeklyTotals={weeklyTotals}
          />
        ) : (null)}
        <BarChart
          contentLabel="Moving Time"
          content={`${weeklyTotals[0].time.week}`}
          contentType="text"
          metric="time"
          day="time.day"
          previous="time.previous"
          weeklyTotals={weeklyTotals}
        />
        <BarChart
          contentLabel="Elevation"
          content={`${weeklyTotals[0].elev.week}`}
          contentType="text"
          day="elev.day"
          previous="elev.previous"
          weeklyTotals={weeklyTotals}
        />
      </div>
    </div>
  );
}

weeklyStats.propTypes = propTypes;
weeklyStats.defaultProps = defaultProps;

export default weeklyStats;
