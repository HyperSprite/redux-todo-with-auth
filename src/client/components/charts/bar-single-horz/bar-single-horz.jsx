import React from 'react';
import PropTypes from 'prop-types';
import { Bar, BarChart, XAxis, YAxis, ResponsiveContainer } from 'recharts';
// Tooltip, Legend
const propTypes = {
  chartData: PropTypes.arrayOf(PropTypes.objects).isRequired,
};

const color = [
  '#93a6af',
  '#5e0000',
  '#c40000',
  '#ff5959',
  '#ffe7e7',
];

// const testData = [
//   {
//     name: 'Activities', // name is reserved.
//     total: 1018,
//     downloaded: 320,
//     display: 300,
//
//   },
// ];

const ChartBarSingleHorz = (props) => {
  const chartData = props.chartData || [{ name: '', total: 0 }];
  const dataKeys = Object.keys(chartData[0]).filter(vNF => vNF !== 'name');

  return (
    <div>
      <ResponsiveContainer
        width="100%"
        height={30}
      >
        <BarChart
          data={chartData}
          width={500}
          height={30}
          layout="vertical"
          reverseStackOrder
        >
          <XAxis type="number" domain={[0, 'dataMax']} hide />
          {dataKeys.map((vN, i) => (
            <YAxis
              key={vN}
              type="category"
              dataKey="name"
              hide
              yAxisId={i}
            />
          ))}

          {/* <Tooltip /> */}
          {/* <Legend /> */}
          {dataKeys.map((vN, i) => (
            <Bar
              key={vN}
              dataKey={vN}
              fill={color[i]}
              yAxisId={i}
              isAnimationActive={false}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

ChartBarSingleHorz.propTypes = propTypes;

export default ChartBarSingleHorz;
