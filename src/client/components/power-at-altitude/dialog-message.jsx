import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardHeader, CardText } from 'material-ui';

import lib from '../../containers/lib';

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

const propTypes = {
  data: PropTypes.number.isRequired,
};

const powerZones = [
  [6, 'Anaerobic', 1.21, false],
  [5, 'VO2 Max', 1.06, 1.20],
  [4, 'Threshold', 0.96, 1.05],
  [3, 'Tempo', 0.76, 0.95],
  [2, 'Endurance', 0.56, 0.75],
  [1, 'Active Recovery', false, 0.55],
];

const getZones = (low, high, data, percent) => {
  const tmpPercent = percent ? '%' : '';
  const tmpLow = low ? `${lib.round(low * data, 0)}${tmpPercent}` : '<';
  const tmpHigh = high ? `${lib.round(high * data, 0)}${tmpPercent}` : '+';
  return `${tmpLow} - ${tmpHigh}`;
};


const DialogMessage = props => (
  <div>
    <h4>{`Relative FTP of ${props.data}`}</h4>
    <div>
      {powerZones.map(pZ => (
        <div key={pZ[0]} style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', marginTop: 10 }}>
          <div style={{ width: '240px' }}>
            {`${pZ[0]} - ${pZ[1]} - ${getZones(pZ[2], pZ[3], 100, true)}`}
          </div>
          <div style={{ width: '240px' }}>
            {getZones(pZ[2], pZ[3], props.data, false)}
          </div>
        </div>
      ))}
    </div>
  </div>
);

DialogMessage.propTypes = propTypes;

export default DialogMessage;
