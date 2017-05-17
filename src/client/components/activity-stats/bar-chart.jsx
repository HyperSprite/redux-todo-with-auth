import React, { PropTypes } from 'react';
// import { addSeconds, startOfDay, format } from 'date-fns';
import { Bar, BarChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

import lib from '../../containers/lib';
import Static from '../form/static';

// const setWeight = measurementPref ? 'weight' : 'saWeight';

const renderTooltipContent = (o) => {
  const { payload, label } = o;
  const total = payload.reduce((result, entry) => (result + entry.value), 0);

  return (
    <div style={{ background: '#FFFFFF', margin: 5 }} className="customized-tooltip-content" >
      <p>{label}</p>
      <ul style={{ listStyle: 'none', marginLeft: 4, padding: 0 }}>
        <li>
          {`Total: ${lib.secondsToTime(total)}`}
        </li>
        {
          payload.map(entry => (
            <li key={`item-${entry.value + entry.name}`} style={{ color: entry.color }}>
              {`${entry.name}: ${lib.secondsToTime(entry.value)}`}
            </li>
          ))
        }
      </ul>
    </div>
  );
};

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

const conversions = (metric, yAxis, data) => {
  if (data) {
    switch (metric) {
      case 'time':
        return lib.secondsToTime(data);
      default:
        return data;
    }
  }
  if (yAxis) {
    switch (metric) {
      case 'time':
        return lib.secondsToTime;
      default:
        return null;
    }
  }
  if (metric) {
    return renderTooltipContent;
  }
  return null;
};

const Chart = props => (
  <div>
    <Static
      contentLabel={props.contentLabel}
      content={conversions(props.metric, false, props.content)}
    />
    <BarChart width={180} height={150} data={props.weeklyTotals}
      margin={{ top: 5, right: 10, left: 2, bottom: 5 }}
    >
      <XAxis dataKey="day" />
      <YAxis tickFormatter={conversions(props.metric, true)} />
      <CartesianGrid strokeDasharray="3 3" />
      <Tooltip content={conversions(props.metric)} />
      <Bar name="Day" dataKey={`${props.metric}.day`} stackId="a" fill="#DD0000" barGap={1} isAnimationActive={false} />
      <Bar name="Previous" dataKey={`${props.metric}.total`} stackId="a" fill="#770000" barGap={1} isAnimationActive={false} />
    </BarChart>
  </div>
);

// Chart.propTypes = propTypes;

export default Chart;
