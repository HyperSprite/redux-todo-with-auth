import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import { FlatButton, LinearProgress } from 'material-ui';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

import * as actions from './../../actions';
import lib from '../../containers/lib';
import CheckBox from '../form/checkbox-icon';
import ToggleIcon from '../form/toggle-icon';
import HelpCard from '../form/help-card';
import ScrollIntoView from '../../containers/scroll-into-view';

import style from '../../styles/style';

const propTypes = {
  fetchData: PropTypes.func.isRequired,
  setPageName: PropTypes.func.isRequired,
  measurementPref: PropTypes.bool.isRequired,
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
    this.state = {
      measurementPref: false,
    };
    this.switchMeasurementPref = this.switchMeasurementPref.bind(this);
  }

  componentDidMount() {
    this.props.fetchData('auth/user');
    this.props.setPageName('Power at Altitude');
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.measurementPref !== this.props.measurementPref) {
      this.setState({ measurementPref: nextProps.measurementPref });
    }
  }

  switchMeasurementPref() {
    this.setState({ measurementPref: !this.state.measurementPref });
  }

  render() {
    const { user } = this.props;
    const currentFTP = lib.getLastInArray(user.ftpHistory, 'ftp');
    const ftpAtElv = elevations.map(e => {
      const adjustedElev = e - (user.userGeoElevation * 0.01);
      const percentFTPAcc = -1.12 * (Math.pow(adjustedElev, 2)) - 1.90 * adjustedElev + 99.9;
      const percentFTPNAcc = 0.178 * (Math.pow(adjustedElev, 3)) - 1.43 * (Math.pow(adjustedElev, 2)) - (4.07 * adjustedElev) + 100;
      const tmpObj = {
        eachElvM: e * 1000,
        // returns xx.xx (%) to use, * by 100
        ftpAcc: lib.round(percentFTPAcc, 2),
        ftpAccCalc: lib.round((currentFTP * 0.01) * percentFTPAcc, 0),
        ftpNAcc: lib.round(percentFTPNAcc, 2),
        ftpNAccCalc: lib.round((currentFTP * 0.01) * percentFTPNAcc, 0),
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
                <CardActions>
                  <FlatButton onClick={this.switchMeasurementPref} style={style.toggleIconButton} >
                    F <ToggleIcon option={this.state.measurementPref} /> M
                  </FlatButton>

                </CardActions>
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
                          {this.state.measurementPref ? (
                            `${lib.round(user.userGeoElevation, 0)} Meters`
                          ) : (
                            `${lib.metersToFeetRound(user.userGeoElevation, 0)} Feet`
                          )}
                        </TableHeaderColumn>
                        <TableHeaderColumn
                          style={style.cells}
                        >
                          FTP%<br />Acclimatized<br />100%
                        </TableHeaderColumn>
                        <TableHeaderColumn
                          style={style.cells}
                        >
                          Reletive FTP<br />Acclimatized<br />{currentFTP}
                        </TableHeaderColumn>
                        <TableHeaderColumn
                          style={style.cells}
                        >
                          FTP%<br />Not<br />Acclimatized
                        </TableHeaderColumn>
                        <TableHeaderColumn
                          style={style.cells}
                        >
                          Reletive FTP<br />Not<br />Acclimatized
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
                            {this.state.measurementPref ? (
                              lib.round(ftpAE.eachElvM, 0)
                            ) : (
                                lib.metersToFeetRound(ftpAE.eachElvM, 0)
                            )}
                          </TableRowColumn>
                          <TableRowColumn style={style.cells}>{ftpAE.ftpAcc}%</TableRowColumn>
                          <TableRowColumn style={style.cells}>{ftpAE.ftpAccCalc}</TableRowColumn>
                          <TableRowColumn style={style.cells}>{ftpAE.ftpNAcc}%</TableRowColumn>
                          <TableRowColumn style={style.cells}>{ftpAE.ftpNAccCalc}</TableRowColumn>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardText>
                </div>
              ) : (
                  <div style={{ margin: 20 }}>
                    <h4>
                      {'We\'re sorry, this is an A Race athlete Premium feature'}
                    </h4>
                    <p>
                      To access this page you need the following:
                    </p>
                    <ul style={{ listStyle: 'none' }}>
                      <li><CheckBox option={!!user.clubMember} /> Be a member of the A Race athlete Strava Club</li>
                      <li><CheckBox option={!!user.premium} /> Be a Strava Premium user</li>
                      <li><CheckBox option={!!currentFTP} />An entry in the Strava FTP field</li>
                      <li><CheckBox option={!!user.userGeoElevation} />An entry in the Strava City and Country fields</li>
                    </ul>
                    <p>
                      {'See "Learn more about Power at Altitude" below for more information.'}
                    </p>
                  </div>
                )}
            </Card>
          </div>
          <div className="side-lite right-pane" />
        </div>
        <HelpCard src="/blog/power-at-altitude" title="Learn more about Power at Altitude" />
      </div>
    );
  }
}

AltitudeTable.propTypes = propTypes;

function mapStateToProps(state) {
  return {
    user: state.auth.user,
    measurementPref: state.auth.user.measurement_preference === 'metric',
  };
}

export default connect(mapStateToProps, actions)(AltitudeTable);
