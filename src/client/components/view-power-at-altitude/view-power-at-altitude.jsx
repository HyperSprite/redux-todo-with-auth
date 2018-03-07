import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames'
import { withStyles } from 'material-ui-next/styles';
import Card, { CardContent } from 'material-ui-next/Card';
import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from 'material-ui-next/Table';
import ButtonPrint from '../button/print';

import justFns from 'just-fns';
import * as actions from './../../actions';
import Layout from '../layout';
import FeatureNotice from '../feature-notice';
import Dialog from './dialog';

const title = 'Power at Altitude';
const help = '/blog/power-at-altitude';

const propTypes = {
  classes: PropTypes.object,
  fetchData: PropTypes.func.isRequired,
  setPageName: PropTypes.func.isRequired,
  mPref: PropTypes.bool,
  user: PropTypes.shape({
    ftpHistory: PropTypes.arrayOf(PropTypes.shape({
      date: PropTypes.string,
      ftp: PropTypes.number,
    })),
    premium: PropTypes.bool,
    userGeoElevation: PropTypes.number,
  }).isRequired,
};

const defaultProps = {
  mPref: false,
  user: {},
  premium: false,
  userGeoElevation: 0,
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

const handlePrint = () => window.print();

const elevations = [];
for (let i = 0; i < 5; i += 0.250) {
  elevations.push(i);
}

class AltitudeTable extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.fetchData('auth/user');
    this.props.setPageName(title, help);
  }

  render() {
    const { classes, user } = this.props;
    const currentFTP = justFns.getLastInArray(user.ftpHistory, 'ftp');
    const ftpAtElv = elevations.map(e => {
      const adjustedElev = e - (user.userGeoElevation * 0.01);
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
      <Layout>
        <Card>
          {(user.premium && user.userGeoElevation && currentFTP && !isNaN(currentFTP)) ? (
            <CardContent className={classes.root}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell
                      className={classes.cell}
                    >
                      Altitude<br />
                      {this.props.mPref ? (
                        `${justFns.metersToFeetRound(user.userGeoElevation, 0)} Feet`
                      ) : (
                        `${justFns.round(user.userGeoElevation, 0)} Meters`
                      )}
                    </TableCell>
                    <TableCell

                      className={classes.cell}
                    >
                      FTP%<br />Acclimated<br />100%
                    </TableCell>
                    <TableCell

                      className={classes.cell}
                    >
                      Reletive FTP<br />Acclimated<br />{currentFTP}
                    </TableCell>
                    <TableCell

                      className={classes.cell}
                    >
                      FTP%<br />Not<br />Acclimated
                    </TableCell>
                    <TableCell

                      className={classes.cell}
                    >
                      Reletive FTP<br />Not<br />Acclimated
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {ftpAtElv.map(ftpAE => (
                    <TableRow key={ftpAE.eachElvM} className={classes.tableRow}>
                      <TableCell className={classes.cell}>
                        {this.props.mPref ? (
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
              <ButtonPrint />
            </CardContent>
          ) : (
            <FeatureNotice
              user={user}
              checks={['premium', 'ftpHistory', 'userGeoElevation']}
              title={title}
            />
          )}
        </Card>
      </Layout>
    );
  }
}

AltitudeTable.propTypes = propTypes;
AltitudeTable.defaultProps = defaultProps;

function mapStateToProps(state) {
  return {
    user: state.auth.user,
    mPref: state.page.mPref,
  };
}

const styledAltitudeTable = withStyles(styles, { name: 'StyledAltitudeTable' })(AltitudeTable);
export default connect(mapStateToProps, actions)(styledAltitudeTable);
