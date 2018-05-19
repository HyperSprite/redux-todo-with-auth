import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import justFns from 'just-fns';
import types from '../../types';
import Dialog from './dialog';

const propTypes = {
  classes: PropTypes.object,
  baseElevation: PropTypes.number,
  currentFTP: PropTypes.number,
  mPref: types.mPref,
};

const defaultProps = {
  baseElevation: 0,
  currentFTP: 200,
  mPref: false,
};

const styles = theme => ({
  root: {
    padding: '0.1em',
  },
  tableRow: {
    '&:nth-child(odd)': {
      backgroundColor: theme.palette.secondary[50],
    },
    '&:nth-child(even)': {
      backgroundColor: theme.palette.background.paper,
    },
  },
  cell: {
    textAlign: 'center',
    padding: 'inherit',
  },
  button: {
    margin: '0.3em',
  },
  buttonLabel: {
    paddingLeft: '0.5em',
  },
  icon: {
    fill: theme.palette.primary.contrastText,
  },
  onlyPrint: {
    display: 'none',
  },
  '@media print': {
    noPrint: {
      display: 'none',
    },
    onlyPrint: {
      display: 'table-cell',
    },
    tableRow: {
      height: 20,
      padding: '0.1em',
      textSize: '1.4em',
    },
    cell: {
      fontSize: '1.2em',
    },
    button: {
      display: 'none',
    },
  },
});

const elevations = [];
for (let i = 0; i < 5; i += 0.250) {
  elevations.push(i);
}

const AltitudeTable = (props) => {
  const { classes, baseElevation, currentFTP, mPref } = props;
  const ftpAtElv = elevations.map(e => {
    const adjustedElev = e - (baseElevation * 0.01);
    const percentFTPAcc = justFns.percentFTPAcc(adjustedElev);
    const percentFTPNAcc = justFns.percentFTPNAcc(adjustedElev);
    const tmpObj = {
      eachElvM: e * 1000,
      // returns xx.xx (%) to use, * by 100
      ftpAcc: justFns.round(percentFTPAcc, 2),
      ftpAccCalc: justFns.round((currentFTP * 0.01) * percentFTPAcc, 0),
      ftpNAcc: justFns.round(percentFTPNAcc, 2),
      ftpNAccCalc: justFns.round((currentFTP * 0.01) * percentFTPNAcc, 0),
    };
    return tmpObj;
  });
  return (
    <div>
      {(baseElevation && currentFTP && !isNaN(currentFTP)) ? (
        <CardContent className={classes.root}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell
                  className={classes.cell}
                >
                  Altitude<br />
                  {mPref ? (
                    `${justFns.metersToFeetRound(baseElevation, 0)} Feet`
                  ) : (
                    `${justFns.round(baseElevation, 0)} Meters`
                  )}
                </TableCell>
                <TableCell className={classes.cell} >
                  FTP%<br />Acclimated<br />100%
                </TableCell>
                <TableCell className={classes.cell} >
                  Reletive FTP<br />Acclimated<br />{currentFTP}
                </TableCell>
                <TableCell className={classes.cell} >
                  FTP%<br />Not<br />Acclimated
                </TableCell>
                <TableCell className={classes.cell} >
                  Reletive FTP<br />Not<br />Acclimated
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {ftpAtElv.map(ftpAE => (
                <TableRow key={ftpAE.eachElvM} className={classes.tableRow}>
                  <TableCell className={classes.cell}>
                    {mPref ? (
                      justFns.metersToFeetRound(ftpAE.eachElvM, 0)
                    ) : (
                      justFns.round(ftpAE.eachElvM, 0)
                    )}
                  </TableCell>
                  <TableCell className={classes.cell}>
                    {ftpAE.ftpAcc.toFixed(2)}%
                  </TableCell>
                  <TableCell className={classNames(classes.cell, classes.noPrint)} >
                    <Dialog dialogData={ftpAE.ftpAccCalc} />
                  </TableCell>
                  <TableCell className={classNames(classes.cell, classes.onlyPrint)} >
                    {ftpAE.ftpAccCalc}
                  </TableCell>
                  <TableCell className={classes.cell}>
                    {ftpAE.ftpNAcc.toFixed(2)}%
                  </TableCell>
                  <TableCell className={classNames(classes.cell, classes.noPrint)} >
                    <Dialog dialogData={ftpAE.ftpNAccCalc} />
                  </TableCell>
                  <TableCell className={classNames(classes.cell, classes.onlyPrint)} >
                    {ftpAE.ftpNAccCalc}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      ) : (
        <div>
          !baseElevation && !currentFTP
        </div>
      )}
    </div>
  );
};

AltitudeTable.propTypes = propTypes;
AltitudeTable.defaultProps = defaultProps;

export default withStyles(styles, { name: 'StyledAltitudeTable' })(AltitudeTable);
