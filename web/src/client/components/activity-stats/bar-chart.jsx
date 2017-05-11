import React, { PropTypes } from 'react';
import { Bar, BarChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

import Static from '../form/static';

// const setWeight = measurementPref ? 'weight' : 'saWeight';

// const linearGrad = () => (
//   <defs>
//     <linearGradient id="lGColor" x1="0" y1="0" x2="0" y2="1">
//       <stop offset="5%" stopColor="#990000" stopOpacity={0.8} />
//       <stop offset="95%" stopColor="#990000" stopOpacity={0} />
//     </linearGradient>
//   </defs>
// );

const Chart = (props) => (
  <div>
    <Static
      contentLabel={props.contentLabel}
      content={props.content}
    />
    <BarChart width={180} height={150} data={props.weeklyTotals}
      margin={{ top: 5, right: 10, left: 2, bottom: 5 }}
    >
      <XAxis />
      <YAxis />
      <CartesianGrid strokeDasharray="3 3" />
      <Tooltip />
      {/* <Legend /> */}
      <Bar name="Day" dataKey={props.day} stackId="a" fill="#DD0000" barGap={1} />
      <Bar name="Cumulative" dataKey={props.total} stackId="a" fill="#770000" barGap={1} />
    </BarChart>
  </div>
);

// Chart.propTypes = propTypes;

export default Chart;
