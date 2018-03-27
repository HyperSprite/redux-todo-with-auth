import React from 'react';
import PropTypes from 'prop-types';
import { Bar, BarChart, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import palette from '../../../styles/mui-palette';

// Tooltip, Legend
const propTypes = {
  chartData: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
  })).isRequired,
};

const color = [
  palette.secondary[300],
  palette.primary[900],
  palette.primary[500],
  palette.primary[200],
  palette.primary[50],
];

/**
props shape
Object order is critical
const testData = [
  {
    name: 'Activities', // key 'name' is reserved.
    total: 1018,        // otherwise key names are arbitrary
    downloaded: 320,    // but must be unique
    display: 300,
  },
];
*/

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
