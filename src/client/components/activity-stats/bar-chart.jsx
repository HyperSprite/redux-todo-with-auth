import React from 'react';
import PropTypes from 'prop-types';
import { Bar, BarChart, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

import justFns from 'just-fns';
import Static from '../form/static';

const propTypes = {
  content: PropTypes.any,
  contentLabel: PropTypes.string,
  metric: PropTypes.string,
  mPref: PropTypes.bool,
  weeklyTotals: PropTypes.array,
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
          {`Total: ${justFns.statsConversions(metric, false, total, mPref)}`}
        </li>
        {
          payload.map(entry => (
            <li key={`item-${entry.value + entry.name}`} style={{ color: entry.color }}>
              {`${entry.name}: ${justFns.statsConversions(metric, false, entry.value, mPref)}`}
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
      content={`${justFns.statsConversions(props.metric, false, props.content, props.mPref)}`}
    />
    <BarChart
      width={180}
      height={150}
      data={props.weeklyTotals}
      margin={{ top: 5, right: 10, left: 2, bottom: 5 }}
    >
      <XAxis dataKey="day" />
      <YAxis tickFormatter={justFns.statsConversions(props.metric, true)} />
      <CartesianGrid strokeDasharray="3 3" />
      <Tooltip content={renderTooltipContent} metric={props.metric} mPref={props.mPref} />
      <Bar name="Previous" dataKey={`${props.metric}.total`} stackId="a" fill="#770000" barGap={1} isAnimationActive={false} />
      <Bar name="Day" dataKey={`${props.metric}.day`} stackId="a" fill="#DD0000" barGap={1} isAnimationActive={false} />
    </BarChart>
  </div>
);

Chart.propTypes = propTypes;

export default Chart;
