import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Card, CardText } from 'material-ui/Card';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

import justFns from 'just-fns';
import * as actions from './../../actions';
import FeatureNotice from '../feature-notice';
import Dialog from './dialog';
import ScrollIntoView from '../../containers/scroll-into-view';

import style from '../../styles/style';

const title = 'Power at Altitude';
const help = '/blog/power-at-altitude';

const propTypes = {
  fetchData: PropTypes.func.isRequired,
  setPageName: PropTypes.func.isRequired,
  mPref: PropTypes.bool.isRequired,
  user: PropTypes.shape({
    clubMember: PropTypes.bool.isRequired,
    ftpHistory: PropTypes.arrayOf(PropTypes.shape({
      date: PropTypes.string.isRequired,
      ftp: PropTypes.number.isRequired,
    })).isRequired,
    premium: PropTypes.bool.isRequired,
    userGeoElevation: PropTypes.number.isRequired,
  }).isRequired,
};

style.cells = {
  paddingLeft: 'inherit',
  paddingRight: 'inherit',
  textAlign: 'center',
};

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
    const { user } = this.props;
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
      <div>
        <div className="main-flex-container" >
          <div className="side-lite left-pane" />
          <div className="main" >
            <ScrollIntoView
              id={location.hash}
              headerHeight={70}
            />
            <Card>
              {(user.clubMember && user.premium && user.userGeoElevation && currentFTP && !isNaN(currentFTP)) ? (
                <div>
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
                          <TableHeaderColumn
                            style={style.cells}
                          >
                            Altitude<br />
                            {this.props.mPref ? (
                              `${justFns.metersToFeetRound(user.userGeoElevation, 0)} Feet`
                            ) : (
                              `${justFns.round(user.userGeoElevation, 0)} Meters`
                            )}
                          </TableHeaderColumn>
                          <TableHeaderColumn
                            style={style.cells}
                          >
                            FTP%<br />Acclimated<br />100%
                          </TableHeaderColumn>
                          <TableHeaderColumn
                            style={style.cells}
                          >
                            Reletive FTP<br />Acclimated<br />{currentFTP}
                          </TableHeaderColumn>
                          <TableHeaderColumn
                            style={style.cells}
                          >
                            FTP%<br />Not<br />Acclimated
                          </TableHeaderColumn>
                          <TableHeaderColumn
                            style={style.cells}
                          >
                            Reletive FTP<br />Not<br />Acclimated
                          </TableHeaderColumn>
                        </TableRow>
                      </TableHeader>
                      <TableBody
                        displayRowCheckbox={false}
                        stripedRows
                      >
                        {ftpAtElv.map(ftpAE => (
                          <TableRow key={ftpAE.eachElvM}>
                            <TableRowColumn style={style.cells}>
                              {this.props.mPref ? (
                                justFns.metersToFeetRound(ftpAE.eachElvM, 0)
                              ) : (
                                justFns.round(ftpAE.eachElvM, 0)
                              )}
                            </TableRowColumn>
                            <TableRowColumn style={style.cells}>{ftpAE.ftpAcc}%</TableRowColumn>
                            <TableRowColumn style={style.cells}>
                              <Dialog dialogData={ftpAE.ftpAccCalc} />
                            </TableRowColumn>
                            <TableRowColumn style={style.cells}>{ftpAE.ftpNAcc}%</TableRowColumn>
                            <TableRowColumn style={style.cells}>
                              <Dialog dialogData={ftpAE.ftpNAccCalc} />
                            </TableRowColumn>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardText>
                  </div>
                ) : (
                  <FeatureNotice
                    user={user}
                    checks={['premium', 'ftpHistory', 'userGeoElevation']}
                    title={title}
                  />
                )}
              </Card>
            </div>
          <div className="side-lite right-pane" />
        </div>
      </div>
    );
  }
}

AltitudeTable.propTypes = propTypes;

function mapStateToProps(state) {
  return {
    user: state.auth.user,
    mPref: state.page.mPref,
  };
}

export default connect(mapStateToProps, actions)(AltitudeTable);
