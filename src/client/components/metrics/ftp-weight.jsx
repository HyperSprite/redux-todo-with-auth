import React, { PropTypes } from 'react';
import { flatten } from 'lodash';
import { eachDay, format, min } from 'date-fns';

import lib from '../../containers/lib';
import Areachart from './areaChart';
import AthleteStatsLineChart from './athlete-stats-line-chart';

const propTypes = {
  ftpHistory: PropTypes.array,
  weightHistory: PropTypes.array.isRequired,
  measurementPref: PropTypes.bool.isRequired,
};

const defaultProps = {
  ftpHistory: [],
};

function consolidateData(ftp = [], weight) {
  const valTypes = ['ftp', 'weight'];
  const tmpVals = { ftp, weight };
  const nDate = new Date();
  tmpVals.flatArgs = flatten([ftp, weight]);
  tmpVals.min = min(...tmpVals.flatArgs.map(obj => obj.date));
  tmpVals.max = nDate;
  tmpVals.dateSet = eachDay(tmpVals.min, tmpVals.max).reduce((acc, dR) => {
    const tmpDay = format(dR, 'MM-DD-YYYY');
    acc.tickValues.push(tmpDay);
    acc[tmpDay] = { date: dR }; // eslint-disable-line no-param-reassign
    return acc;
  }, { tickValues: [] });

  tmpVals.dataSets = {};
  valTypes.forEach((vT) => {
    tmpVals.dataSets[vT] = tmpVals[vT].reduce((acc, v) => {
      const tmpDay = format(v.date, 'MM-DD-YYYY');
      if (!acc[tmpDay] || (acc[tmpDay] && acc[tmpDay].date < v.date)) {
        v.day = tmpDay; // eslint-disable-line no-param-reassign
        acc[tmpDay] = v; // eslint-disable-line no-param-reassign

        return acc;
      }
      return acc;
    }, []);
  });

  tmpVals.wPKG = tmpVals.dateSet.tickValues.reduce((acc, dR) => {
    if (
    (!tmpVals.dataSets.ftp[dR] && acc.lastFTP === 0) &&
    (tmpVals.dataSets.weight[dR] || acc.lastWeight > 0)) {
      acc.lastWeight = tmpVals.dataSets.weight[dR] ? // eslint-disable-line no-param-reassign
        tmpVals.dataSets.weight[dR].weight :
        acc.lastWeight;
      acc.data.push({
        day: dR,
        date: tmpVals.dateSet[dR].date,
        ftp: null,
        weight: lib.round(acc.lastWeight, 2),
        saWeight: lib.kgToPoundsRound(acc.lastWeight, 1),
        wPKG: null,
      });
      return acc;
    } else if (
    (tmpVals.dataSets.ftp[dR] || acc.lastFTP > 0) &&
    (tmpVals.dataSets.weight[dR] || acc.lastWeight > 0)) {
      acc.lastFTP = tmpVals.dataSets.ftp[dR] ? // eslint-disable-line no-param-reassign
        tmpVals.dataSets.ftp[dR].ftp :
        acc.lastFTP;
      acc.lastWeight = tmpVals.dataSets.weight[dR] ? // eslint-disable-line no-param-reassign
        tmpVals.dataSets.weight[dR].weight :
        acc.lastWeight;
      acc.data.push({
        day: dR,
        date: tmpVals.dateSet[dR].date,
        ftp: acc.lastFTP,
        weight: lib.round(acc.lastWeight, 2),
        saWeight: lib.kgToPoundsRound(acc.lastWeight, 1),
        wPKG: lib.round((acc.lastFTP / acc.lastWeight), 2),
      });
      return acc;
    }
    return acc;
  }, { lastFTP: 0, lastWeight: 0, data: [] });
  return tmpVals.wPKG.data;
}


const ftpWeight = ({ ftpHistory, weightHistory, measurementPref }) => (
  <div>
    {/* TODO - this is all ugly */}
    {/* {(ftpHistory && ftpHistory.length > 0 && ftpHistory[ftpHistory.length - 1].ftp != null) ? ( */}
      {(weightHistory) ? (
      <AthleteStatsLineChart
        data={consolidateData(ftpHistory, weightHistory)}
        label="Power to Weight"
        measurementPref={measurementPref}
        hasFTP={ftpHistory.length}
      />
    ) : null}
  </div>
  );

ftpWeight.propTypes = propTypes;
ftpWeight.defaultProps = defaultProps;

export default ftpWeight;
