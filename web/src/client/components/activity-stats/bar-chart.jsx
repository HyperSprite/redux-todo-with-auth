import React, { PropTypes } from 'react';
import { Bar, BarChart, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

import lib from '../../containers/lib';
import Static from '../form/static';

const propTypes = {
  content: PropTypes.any,
  contentLabel: PropTypes.string,
  metric: PropTypes.string,
  mPref: PropTypes.bool,
  weeklyTotals: PropTypes.array,
};

// metric = 'time', 'dst', 'elev' type: string
// yAxis = bool
// data = non-formatted number, like time in seconds, dist in meters.
// mPref = true for SAE, false for Metric
const conversions = (metric, yAxis, data, mPref) => {
  if (data || data === 0) {
    switch (metric) {
      case 'time':
        return lib.secondsToTime(data);
      case 'dst':
        return mPref ? lib.metersToMilesRound(data, 2) : lib.metersToKmRound(data, 1);
      case 'elev':
        return mPref ? lib.metersToFeetRound(data, 2) : data;
      case 'cal':
      case 'kj':
        return lib.round(data, 0);
      default:
        return data;
    }
  }
  if (yAxis) {
    switch (metric) {
      case 'time':
        return lib.secondsToTime;
      case 'dst':
        return lib.metersToMilesRound;
      case 'elev':
        return lib.metersToFeetRound;
      default:
        return null;
    }
  }
  return null;
};

const renderTooltipContent = (o) => {
  // payload array item for each bar
  // metric = 'time', 'dst', 'elev' type: string
  // mPref = true for SAE, false for Metric
  const { payload, label, metric, mPref } = o;

  const total = payload.reduce((result, entry) => (result + entry.value), 0);

  return (
    <div style={{ background: '#FFFFFF', margin: 5 }} className="customized-tooltip-content" >
      <p>{label}</p>
      <ul style={{ listStyle: 'none', marginLeft: 4, padding: 0 }}>
        <li>
          {`Total: ${conversions(metric, false, total, mPref)}`}
        </li>
        {
          payload.map(entry => (
            <li key={`item-${entry.value + entry.name}`} style={{ color: entry.color }}>
              {`${entry.name}: ${conversions(metric, false, entry.value, mPref)}`}
            </li>
          ))
        }
      </ul>
    </div>
  );
};

const Chart = props => (
  <div>
    <Static
      contentLabel={props.contentLabel}
      content={`${conversions(props.metric, false, props.content, props.mPref)}`}
    />
    <BarChart
      width={180}
      height={150}
      data={props.weeklyTotals}
      margin={{ top: 5, right: 10, left: 2, bottom: 5 }}
    >
      <XAxis dataKey="day" />
      <YAxis tickFormatter={conversions(props.metric, true)} />
      <CartesianGrid strokeDasharray="3 3" />
      <Tooltip content={renderTooltipContent} metric={props.metric} mPref={props.mPref} />
      <Bar name="Day" dataKey={`${props.metric}.day`} stackId="a" fill="#DD0000" barGap={1} isAnimationActive={false} />
      <Bar name="Previous" dataKey={`${props.metric}.total`} stackId="a" fill="#770000" barGap={1} isAnimationActive={false} />
    </BarChart>
  </div>
);

Chart.propTypes = propTypes;

export default Chart;
