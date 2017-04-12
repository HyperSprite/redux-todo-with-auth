import React, { Component, PropTypes } from 'react';
import { min, max } from 'date-fns';
import { Brush, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

import Static from '../form/static';

const propTypes = {
  data: PropTypes.object.isRequired,
};

// incoming data
// 0: Object
// date: Tue Mar 28 2017 00:00:00 GMT-0700 (PDT)
// day: "03-28-2017"
// ftp: 280
// wPKG: 4.01
// weight: 69.8079

function getLastInArray(arr, arrType) {
  let item;
  if (arr && arr.length > 0 && arr[arr.length - 1][arrType] != null) {
    item = arr[arr.length - 1][arrType];
  }
  return item;
}
// TODO make carts responsive
const Chart = ({ data }) => (
  <div style={{ margin: 24 }}>
    <Static
      contentLabel="Watts per Kg"
      content={getLastInArray(data, 'wPKG')}
      contentType="text"
    />
    <LineChart
      id="wPKGChart"
      width={600}
      height={200}
      data={data}
      syncId="anyId"
      margin={{ top: 30, right: 30, left: 0, bottom: 0 }}
    >
      <XAxis dataKey="day" />
      <YAxis type="number" domain={['dataMin', 'dataMax']} />
      <CartesianGrid strokeDasharray="3 3" />
      <Tooltip />
      <Line
        type="monotone"
        dataKey="wPKG"
        stroke="#990000"
        fill="#990000"
      />
    </LineChart>
    <Static
      contentLabel="Weight"
      contentLabelLink="https://www.strava.com/settings/profile"
      content={getLastInArray(data, 'weight')}
      contentType="text"
    />
    <LineChart
      id="weightChart"
      width={600}
      height={200}
      data={data}
      syncId="anyId"
      margin={{ top: 30, right: 30, left: 0, bottom: 0 }}
    >
      <XAxis dataKey="day" />
      <YAxis type="number" domain={['dataMin - 2', 'dataMax + 2']} />
      <CartesianGrid strokeDasharray="3 3" />
      <Tooltip />
      <Line
        type="monotone"
        dataKey="weight"
        stroke="#990000"
        fill="#990000"
      />
    </LineChart>
    <Static
      contentLabel="FTP"
      contentLabelLink="https://www.strava.com/settings/performance"
      content={getLastInArray(data, 'ftp')}
      contentType="text"
    />
    <LineChart
      id="ftpChart"
      width={600}
      height={200}
      data={data}
      syncId="anyId"
      margin={{ top: 30, right: 30, left: 0, bottom: 0 }}
    >
      <XAxis dataKey="day" />
      <YAxis type="number" domain={['dataMin - 2', 'dataMax + 2']} />
      <CartesianGrid strokeDasharray="3 3" />
      <Tooltip />
      <Line
        type="monotone"
        dataKey="ftp"
        stroke="#990000"
        fill="#990000"
      />
      <Brush />
    </LineChart>
  </div>
);

Chart.propTypes = propTypes;

export default Chart;
