import React, { PropTypes } from 'react';
import { flatten } from 'lodash';
import { eachDay, format, min, max } from 'date-fns';

import AthleteStatsLineChart from './athlete-stats-line-chart';
import Static from '../form/static';

const propTypes = {
  ftpHistory: PropTypes.array.isRequired,
  weightHistory: PropTypes.array.isRequired,
};

function consolidateData(ftp, weight) {
  const valTypes = ['ftp', 'weight'];
  const tmpVals = { ftp, weight };
  tmpVals.flatArgs = flatten([ftp, weight]);
  tmpVals.min = min(...tmpVals.flatArgs.map(obj => obj.date));
  tmpVals.max = max(...tmpVals.flatArgs.map(obj => obj.date));
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
      acc.data.push({ day: dR,
        date: tmpVals.dateSet[dR].date,
        ftp: null,
        weight: acc.lastWeight,
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
        weight: Math.round(acc.lastWeight * 100) / 100,
        wPKG: Math.round((acc.lastFTP / acc.lastWeight) * 100) / 100,
      });
      return acc;
    }
    return acc;
  }, { lastFTP: 0, lastWeight: 0, data: [] });

  return tmpVals.wPKG.data;
}


const ftpWeight = ({ ftpHistory, weightHistory }) => (
  <div>
    {/* TODO - this is all ugly */}
    {(ftpHistory && ftpHistory.length > 0 && ftpHistory[ftpHistory.length - 1].ftp != null) ? (
      <AthleteStatsLineChart
        data={consolidateData(ftpHistory, weightHistory)}
        label="Power to Weight"
      />
    ) : null }
  </div>
  );

ftpWeight.propTypes = propTypes;

export default ftpWeight;
