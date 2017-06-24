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
  [7, 'Anaerobic', 1.21, false],
  [6, 'VO2 Max', 1.06, 1.20],
  [5, 'Threshold', 0.96, 1.05],
  [4, 'Sweet Spot', 0.85, 0.95],
  [3, 'Tempo', 0.76, 0.84],
  [2, 'Endurance', 0.56, 0.75],
  [1, 'Active Recovery', false, 0.55],
];

const getZones = (low, high, data, percent) => {
  const tmpPercent = percent ? '%' : '';
  const tmpLow = low ? `${lib.round(low * data, 0)}${tmpPercent}` : 'below';
  const tmpHigh = high ? `${lib.round(high * data, 0)}${tmpPercent}` : 'and above';
  return `${tmpLow} - ${tmpHigh}`;
};


const DialogMessage = props => (
  <Card>
    <CardHeader
      title={`Based on an FTP of ${props.data}`}
    />
    <CardText>
      <Table
        fixedHeader
        selectable={false}
        multiSelectable={false}
      >
        <TableHeader
          displaySelectAll={false}
          adjustForCheckbox={false}
        >
          <TableRow >
            <TableHeaderColumn>Zone</TableHeaderColumn>
            <TableHeaderColumn>Zone Name</TableHeaderColumn>
            <TableHeaderColumn>Zone Percentage</TableHeaderColumn>
            <TableHeaderColumn>Zone FTP</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody
          displayRowCheckbox={false}
          stripedRows
        >
          {powerZones.map(pZ => (
            <TableRow key={pZ[0]}>
              <TableRowColumn>{pZ[0]}</TableRowColumn>
              <TableRowColumn>{pZ[1]}</TableRowColumn>
              <TableRowColumn>{getZones(pZ[2], pZ[3], 100, true)}</TableRowColumn>
              <TableRowColumn>{getZones(pZ[2], pZ[3], props.data, false)}</TableRowColumn>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </CardText>
  </Card>
);

DialogMessage.propTypes = propTypes;

export default DialogMessage;
