import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardHeader, CardText } from 'material-ui';

import justFns from 'just-fns';
import style from './style';

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
  const tmpLow = low ? `${justFns.round(low * data, 0)}${tmpPercent}` : '<';
  const tmpHigh = high ? `${justFns.round(high * data, 0)}${tmpPercent}` : '+';
  return `${tmpLow} - ${tmpHigh}`;
};

const tableRows = (stl, i) => {
  if (i % 2) {
    const newStl = Object.assign({}, stl.row, stl.rowOdd);
    return newStl;
  }
  return stl.row;
};


const DialogMessage = props => (
  <div>
    <h5 style={style.title}>
      {`Relative FTP of ${props.data}`}
    </h5>
    <div>
      {powerZones.map((row, index) => (
        <div key={row[0]} style={tableRows(style, index)}>
          <div style={style.boxLabel}>
            {`Zone ${row[0]} - ${row[1]}`}
          </div>
          <div style={style.box}>
            <div style={style.boxData}>
              {`${getZones(row[2], row[3], 100, true)}`}
            </div>
            <div style={style.boxData}>
              {getZones(row[2], row[3], props.data, false)}
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

DialogMessage.propTypes = propTypes;

export default DialogMessage;
