import React, { PropTypes } from 'react';
import { addDays, eachDay, format } from 'date-fns';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';

import lib from '../../containers/lib';
import BarChart from './bar-chart';
import SingleActivity from './single-activity';

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

function weeklyStats({ activities, week, stats, datePref, measurementPref }) {

  return (
    <Card>
      <CardHeader
        title={`Week of ${week}`}
        actAsExpander
        showExpandableButton
      />
      <CardActions>
        <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
          
          {stats.weeklyTotals.tss.total ? (
            <BarChart
              contentLabel="TSS"
              content={`${stats.weeklyTotals.tss.total}`}
              contentType="text"
              metric="tss"
              weeklyTotals={stats.dayTotals}
            />
          ) : (null)}

          {stats.weeklyTotals.kj.total ? (
            <BarChart
              contentLabel="Kilojoules"
              content={`${stats.weeklyTotals.kj.total}`}
              contentType="text"
              metric="kj"
              weeklyTotals={stats.dayTotals}
            />
          ) : (null)}

          {stats.weeklyTotals.ss.total ? (
            <BarChart
              contentLabel="Suffer Score"
              content={`${stats.weeklyTotals.ss.total}`}
              contentType="text"
              metric="ss"
              weeklyTotals={stats.dayTotals}
            />
          ) : (null)}

          {stats.weeklyTotals.cal.total ? (
            <BarChart
              contentLabel="Calories"
              content={`${stats.weeklyTotals.cal.total}`}
              contentType="text"
              metric="cal"
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
            contentLabel="Distance"
            content={`${stats.weeklyTotals.dst.total}`}
            contentType="text"
            metric="dst"
            weeklyTotals={stats.dayTotals}
            mPref={measurementPref}
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
      </CardActions>
      <CardText
        expandable
      >

        {stats.weeklyTotals.names.map(act => (
          // TODO build a component to show each activity
          <div key={act.activityId}>
            <SingleActivity
              {...act}
            />
          </div>
        ))}

      </CardText>
    </Card>
  );
}

weeklyStats.propTypes = propTypes;
weeklyStats.defaultProps = defaultProps;

export default weeklyStats;
