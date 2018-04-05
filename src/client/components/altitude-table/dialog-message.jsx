import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import {
  DialogActions,
  DialogContent,
  DialogTitle,
} from 'material-ui/Dialog';

import justFns from 'just-fns';

import ButtonClose from '../button/close';
import ButtonPrint from '../button/print';

const propTypes = {
  classes: PropTypes.object,
  closeToolTip: PropTypes.string,
  data: PropTypes.number.isRequired,
  handleClose: PropTypes.func.isRequired,
  powerZones: PropTypes.arrayOf(PropTypes.shape({
    zone: PropTypes.number,
    name: PropTypes.string,
    factorStart: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.bool,
    ]),
    factorEnd: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.bool,
    ]),
  })),
  print: PropTypes.bool,
};

const defaultProps = {
  closeToolTip: 'close',
  powerZones: [
    { zone: 6, name: 'Anaerobic', factorStart: 1.21, factorEnd: false },
    { zone: 5, name: 'VO2 Max', factorStart: 1.06, factorEnd: 1.20 },
    { zone: 4, name: 'Threshold', factorStart: 0.96, factorEnd: 1.05 },
    { zone: 3, name: 'Tempo', factorStart: 0.76, factorEnd: 0.95 },
    { zone: 2, name: 'Endurance', factorStart: 0.56, factorEnd: 0.75 },
    { zone: 1, name: 'Active Recovery', factorStart: false, factorEnd: 0.55 },
  ],
  print: false,
};

const handlePrint = () => window.print();

const styles = theme => ({
  root: {},
  title: {
    fontWeight: 700,
    fontSize: '1em',
    padding: '2em 2em 0 2em',
  },
  row: {
    padding: '0.2em 0 0.3em 0.9em',
    display: 'flex',
    justifyContent: 'start',
    flexFlow: 'row wrap',
    '&:first-child': {
      paddingTop: '0.5em',
    },
    '&:nth-child(even)': {
      backgroundColor: theme.palette.secondary[50],
    },
    '&:nth-child(odd)': {
      backgroundColor: theme.palette.background.paper,
    },
  },
  boxMain: {
    maxWidth: 300,
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  boxLabel: {
    color: theme.palette.secondary[600],
    display: 'flex',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    fontSize: '0.9em',
    width: 240,
  },
  box: {
    maxWidth: 300,
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  boxData: {
    fontSize: '0.9em',
    textAlign: 'center',
    width: 130,
  },
  button: {
    margin: '0.3em',
  },
  buttonLabel: {
    paddingLeft: '0.5em',
  },
  content: {
    ...theme.typography.body1,
    padding: '0.2em',
  },
  icon: {
    fill: theme.palette.primary.contrastText,
  },
  /**
  * Print style
  */
  '@media print': {
    '*::before': {
      display: 'none',
    },
    noPrint: {
      display: 'none',
    },
    root: {
      maxWidth: '20em',
      color: '#000000',
      fontWeight: 600,
      margin: 0,
    },
    title: {
      ...theme.typography.body2,
      // h2: {
      //   fontSize: '0.8em',
      //   padding: 0,
      // },
      margin: 0,
      padding: 1,
    },
    boxLabel: {
      display: 'flex',
      flexDirection: 'column',
      fontSize: '0.7em',
    },
    box: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-around',
      flexWrap: 'wrap',
      fontSize: '0.8em',
    },
    boxMain: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      flexWrap: 'wrap',
      backgroundColor: 'black',
    },
    boxData: {
      width: '3em',
    },
    row: {
      padding: 0,
    },
    zone: {
      display: 'none',
    },
    button: {
      display: 'none',
    },
  },
});

const DialogMessage = ({ classes, closeToolTip, data, handleClose, powerZones, print }) => {
  const getZones = (low, high, factor, percent) => {
    const tmpPercent = percent ? '%' : '';
    const tmpLow = low ? `${justFns.round(low * factor, 0)}${tmpPercent}` : '<';
    const tmpHigh = high ? `${justFns.round(high * factor, 0)}${tmpPercent}` : '+';
    return (
      <div className={classes.box}>
        <div>{tmpLow}</div>
        <div className={classes.noPrint}>{'\u00A0'}-{'\u00A0'}</div>
        <div>{tmpHigh}</div>
      </div>
    );
  };

  return (
    <div
      className={classes.root}
    >
      <DialogTitle className={classes.title} >
        <span className={classes.noPrint}>
          {'Zones for\u00A0'}
        </span>
        {`${data} FTP`}
      </DialogTitle>
      <DialogContent className={classes.content} >
        {powerZones.map(row => (
          <div
            key={row.zone}
            className={classes.row}
          >
            <div className={classes.boxLabel}>
              <div className={classes.zone} >
                {`Zone ${row.zone}`}
              </div>
              <div className={classes.row.zoneName} >
                <span className={classes.noPrint}>{'\u00A0:\u00A0'}</span>
                {row.name}
              </div>
            </div>
            <div className={classes.boxMain} >
              <div className={classes.boxData}>
                {getZones(row.factorStart, row.factorEnd, 100, true)}
              </div>
              <div className={classes.boxData}>
                {getZones(row.factorStart, row.factorEnd, data, false)}
              </div>
            </div>
          </div>
        ))}
      </DialogContent>
      <DialogActions>
        {print && (
          <ButtonPrint
            // aria-label="Print"
            // className={classes.button}
            // color="primary"
            onClick={handlePrint}
            // variant="raised"
          />
        )}
        <ButtonClose
          onClick={handleClose}
          // label="Cancel"
          // size="small"
          // toolTip="Cancel Dialog"
          // toolTipId="tooltip-close"
          // toolTipPlacement="bottom"
          // variant="flat"
        />
      </DialogActions>
    </div>
  );
};

DialogMessage.propTypes = propTypes;
DialogMessage.defaultProps = defaultProps;

export default withStyles(styles, { name: 'StyledDialogMassage' })(DialogMessage);
