import React, { PropTypes } from 'react';

import Areachart from './areaChart';

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
// saWeight: 153.1
// weight: 69.8079

function getLastInArray(arr, arrType) {
  let item;
  if (arr && arr.length > 0 && arr[arr.length - 1][arrType] != null) {
    item = arr[arr.length - 1][arrType];
  }
  return item;
}

// TODO make carts responsive
const ChartStack = ({ data, measurementPref }) => (
  <div style={{ margin: 5 }}>
    <Areachart
      contentLabel="Watts per Kg"
      content={getLastInArray(data, 'wPKG')}
      contentType="text"
      id="wPKGChart"
      data={data}
      domain={['dataMin', 'dataMax']}
      syncId="anyId"
      xAxisDataKey="day"
      name="Watts per Kg"
      dataKey="wPKG"
    />
    <Areachart
      contentLabel="Weight"
      contentLabelLink="https://www.strava.com/settings/profile"
      content={getLastInArray(data, measurementPref ? 'weight' : 'saWeight')}
      contentType="text"
      id="weightChart"
      data={data}
      domain={['dataMin - 2', 'dataMax + 2']}
      syncId="anyId"
      xAxisDataKey="day"
      name="Weight"
      dataKey={measurementPref ? 'weight' : 'saWeight'}
    />
    <Areachart
      contentLabel="FTP"
      contentLabelLink="https://www.strava.com/settings/performance"
      content={getLastInArray(data, 'ftp')}
      contentType="text"
      id="ftpChart"
      data={data}
      dataKey="ftp"
      domain={['dataMin - 2', 'dataMax + 2']}
      syncId="anyId"
      xAxisDataKey="day"
      name="FTP"
      brush
    />
  </div>
);

ChartStack.propTypes = propTypes;

export default ChartStack;
