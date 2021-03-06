import React from 'react';
import PropTypes from 'prop-types';

import justFns from 'just-fns';
import Areachart from './areaChart';

const propTypes = {
  data: PropTypes.array.isRequired,
  hasFTP: PropTypes.number.isRequired,
  mPref: PropTypes.bool.isRequired,
};

// incoming data
// 0: Object
// date: Tue Mar 28 2017 00:00:00 GMT-0700 (PDT)
// day: "03-28-2017"
// ftp: 280
// wPKG: 4.01
// saWeight: 153.1
// weight: 69.8079

// TODO make carts responsive
const ChartStack = ({ data, hasFTP, mPref }) => (
  <div style={{ margin: 5 }}>
    {hasFTP ? (
      <Areachart
        contentLabel="Watts per Kg"
        content={justFns.getLastInArray(data, 'wPKG')}
        contentType="text"
        id="wPKGChart"
        data={data}
        domain={['dataMin', 'dataMax']}
        syncId="anyId"
        xAxisDataKey="day"
        name="Watts per Kg"
        dataKey="wPKG"
      />
    ) : null}
    <Areachart
      contentLabel="Weight"
      contentLabelLink="https://www.strava.com/settings/profile"
      content={justFns.getLastInArray(data, mPref ? 'saWeight' : 'weight')}
      contentType="text"
      id="weightChart"
      data={data}
      domain={['dataMin - 2', 'dataMax + 2']}
      syncId="anyId"
      xAxisDataKey="day"
      name="Weight"
      dataKey={mPref ? 'saWeight' : 'weight'}
    />
    {hasFTP ? (
      <Areachart
        contentLabel="FTP"
        contentLabelLink="https://www.strava.com/settings/performance"
        content={justFns.getLastInArray(data, 'ftp')}
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
    ) : null}
  </div>
);

ChartStack.propTypes = propTypes;

export default ChartStack;
