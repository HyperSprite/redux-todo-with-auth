import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import { LinearProgress, Divider } from 'material-ui';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import ToggleCheckBox from 'material-ui/svg-icons/toggle/check-box';
import ToggleCheckBoxOutlineBlank from 'material-ui/svg-icons/toggle/check-box-outline-blank';

import justFns from 'just-fns';
import Static from './static';
import GetUpdateAllUsers from '../admin/get-update-all-users';
import theme from '../../styles/theme';
import styleMain from '../../styles/style';
import CheckBox from './checkbox-icon';

const style = {
  button: styleMain.button,
  container: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    maxWidth: 600,
  },
  box: {
    width: 300,
    display: 'inline-flex',
    verticalAlign: 'middle',
    alignItems: 'center',
    // justifyContent: 'space-between',
    // flexWrap: 'wrap',
    // border: `thin solid ${theme.palette.accent3Color}`,
  },
  boxLabel: {
    color: theme.palette.accent1Color,
  },
  boxData: {
    marginLeft: 10,
  },
};

const propTypes = {

};

const axiosConfig = {
  headers: {
    authorization: localStorage.getItem('token'),
  },
};

export default class UserList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userList: [],
      updating: true,
    };
    this.callGetUserList = this.callGetUserList.bind(this);
  }

  componentDidMount() {
    this.getUserList();
  }

  getUserList = () => {
    axios.get('/apiv1/admin/user-list', axiosConfig)
      .then((response) => {
        if (response.status === 200) {
          this.setState({ updating: false });
          return response.data;
        }
        throw new Error('Server fetch failed');
      })
      .then((responseData) => {
        this.setState({ userList: responseData });
      }).catch((error) => {
        this.setState({ userList: [] });
      });
  }

  callGetUserList() {
    this.setState({ updating: true });
    this.getUserList();
  }


  render() {
    const AthleteLink = (user) => (
      <a href={`https://www.strava.com/athletes/${user.stravaId}`} target="new">
        {user.stravaId}
      </a>
    );
    return (
      <div>
        {this.state.udpating ? (
          <LinearProgress mode="indeterminate" />
        ) : (
          <Divider style={{ height: 4 }} />
        )}
        <GetUpdateAllUsers />

        <RaisedButton
          onClick={this.callGetUserList}
          disabled={this.state.udating}
          style={style.button}
          label="Refresh List"
          secondary
        />

        <Static
          content={this.state.userList.length}
          contentLabel="User Count"
        />
          {this.state.userList.map((user) => (
            <Card key={user.stravaId}>
              <CardHeader
                title={`${user.firstname} ${user.lastname}`}
                subtitle={AthleteLink(user)}
              />
              <CardText>
                <div style={style.container}>
                  <div style={style.box}>
                    <CheckBox option={!!user.premium} /> Strava Premium
                  </div>
                  <div style={style.box}>
                    <CheckBox option={!!user.clubMember} /> Club
                  </div>
                  <div style={style.box}>
                    <CheckBox option={!!user.userGeoElevation} /> Elevation
                  </div>
                  <div style={style.box}>
                    <CheckBox option={!!justFns.getLastInArray(user.ftpHistory, 'ftp')} /> FTP
                  </div>
                  <div style={style.box}>
                    <CheckBox option={!!user.adminMember} /> Admin
                  </div>
                  <div style={style.box}>
                    <div style={style.boxLabel}>
                      Activities
                    </div>
                    <div style={style.boxData}>
                      {` ${user.activityCount}`}
                    </div>
                  </div>
                  <div style={style.box}>
                    <div style={style.boxLabel}>
                      Events Created
                    </div>
                    <div style={style.boxData}>
                      {` ${user.eventCount}`}
                    </div>
                  </div>
                </div>
                <div>
                  <div style={style.box}>
                    <div style={style.boxLabel}>
                      Strava Created
                    </div>
                    <div style={style.boxData}>
                      {` ${user.created_at}`}
                    </div>
                  </div>
                  <div style={style.box}>
                    <div style={style.boxLabel}>
                      Strava Updated
                    </div>
                    <div style={style.boxData}>
                      {` ${user.updated_at}`}
                    </div>
                  </div>
                  <div style={style.box}>
                    <div style={style.boxLabel}>
                      Created
                    </div>
                    <div style={style.boxData}>
                      {` ${user.createdAt}`}
                    </div>
                  </div>
                  <div style={style.box}>
                    <div style={style.boxLabel}>
                      Updated
                    </div>
                    <div style={style.boxData}>
                      {` ${user.updatedAt}`}
                    </div>
                  </div>
                  {user.logCount && user.logLastAccess ? (
                    <div>
                      <div style={style.box}>
                        <div style={style.boxLabel}>
                          Last Access
                        </div>
                        <div style={style.boxData}>
                          {` ${user.logLastAccess[0].updatedAt}`}
                        </div>
                      </div>
                      <div style={style.box}>
                        <div style={style.boxLabel}>
                          Access Count
                        </div>
                        <div style={style.boxData}>
                          {` ${user.logCount}`}
                        </div>
                      </div>
                    </div>

                  ) : (null)}
                </div>
              </CardText>
            </Card>
          ))}
      </div>
    );
  }
}

UserList.propTypes = propTypes;
