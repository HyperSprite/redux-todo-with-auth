import React, { PropTypes } from 'react';
import { Area, AreaChart, Brush, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

import Static from '../form/static';

const propTypes = {
  data: PropTypes.array.isRequired,
  measurementPref: PropTypes.bool.isRequired,
};

// incoming data
// 0: Object
// date: Tue Mar 28 2017 00:00:00 GMT-0700 (PDT)
// day: "03-28-2017"
// ftp: 280
// wPKG: 4.01
// weight: 69.8079


// TODO look at react-resize-detector
const styles = {
  lineChart: {
    margin: {
      top: 30,
      right: 30,
      left: 0,
      bottom: 0,
    },
    height: 200,
    width: document.documentElement.clientWidth > 760 ?
      600 :
      document.documentElement.clientWidth - 40,
    xAxis: {
      padding: {
        left: 0,
        right: 0,
      },
    },
    yAxis: {
      padding: {
        top: 5,
        bottom: 5,
      },
    },
  },
};

// const setWeight = measurementPref ? 'weight' : 'saWeight';

const linearGrad = () => (
  <defs>
    <linearGradient id="lGColor" x1="0" y1="0" x2="0" y2="1">
      <stop offset="5%" stopColor="#990000" stopOpacity={0.8} />
      <stop offset="95%" stopColor="#990000" stopOpacity={0} />
    </linearGradient>
  </defs>
);

function getLastInArray(arr, arrType) {
  let item;
  if (arr && arr.length > 0 && arr[arr.length - 1][arrType] != null) {
    item = arr[arr.length - 1][arrType];
  }
  return item;
}
// TODO make carts responsive
const Chart = ({ data, measurementPref }) => (
  <div style={{ margin: 5 }}>
    <Static
      contentLabel="Watts per Kg"
      content={getLastInArray(data, 'wPKG')}
      contentType="text"
    />
    <AreaChart
      id="wPKGChart"
      width={styles.lineChart.width}
      height={styles.lineChart.height}
      data={data}
      syncId="anyId"
      margin={styles.lineChart.margin}
    >
      {linearGrad()}
      <XAxis dataKey="day" padding={styles.lineChart.xAxis.padding} />
      <YAxis
        type="number"
        domain={['dataMin', 'dataMax']}
        padding={styles.lineChart.yAxis.padding}
      />
      <CartesianGrid strokeDasharray="3 3" />
      <Tooltip />
      <Area
        type="monotone"
        name="Watts per Kg"
        dataKey="wPKG"
        stroke="#990000"
        fillOpacity={1}
        fill="url(#lGColor)"
      />
    </AreaChart>
    <Static
      contentLabel="Weight"
      contentLabelLink="https://www.strava.com/settings/profile"
      content={getLastInArray(data, measurementPref ? 'weight' : 'saWeight')}
      contentType="text"
    />
    <AreaChart
      id="weightChart"
      width={styles.lineChart.width}
      height={styles.lineChart.height}
      data={data}
      syncId="anyId"
      margin={styles.lineChart.margin}
    >
      {linearGrad()}
      <XAxis dataKey="day" padding={styles.lineChart.xAxis.padding} />
      <YAxis
        type="number"
        domain={['dataMin - 2', 'dataMax + 2']}
        padding={styles.lineChart.yAxis.padding}
      />
      <CartesianGrid strokeDasharray="3 3" />
      <Tooltip />
      <Area
        type="monotone"
        name="Weight"
        dataKey={measurementPref ? 'weight' : 'saWeight'}
        stroke="#990000"
        fillOpacity={1}
        fill="url(#lGColor)"
      />
    </AreaChart>
    <Static
      contentLabel="FTP"
      contentLabelLink="https://www.strava.com/settings/performance"
      content={getLastInArray(data, 'ftp')}
      contentType="text"
    />
    <AreaChart
      id="ftpChart"
      width={styles.lineChart.width}
      height={styles.lineChart.height}
      data={data}
      syncId="anyId"
      margin={styles.lineChart.margin}
    >
      {linearGrad()}
      <XAxis dataKey="day" padding={styles.lineChart.xAxis.padding} />
      <YAxis
        type="number"
        domain={['dataMin - 2', 'dataMax + 2']}
        padding={styles.lineChart.yAxis.padding}
      />
      <CartesianGrid strokeDasharray="3 3" />
      <Tooltip />
      <Area
        type="monotone"
        name="FTP"
        dataKey="ftp"
        stroke="#990000"
        fillOpacity={1}
        fill="url(#lGColor)"
      />
      <Brush />
    </AreaChart>
  </div>
);

Chart.propTypes = propTypes;

export default Chart;
