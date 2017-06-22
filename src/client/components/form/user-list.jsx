import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import { LinearProgress, Divider } from 'material-ui';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import ToggleCheckBox from 'material-ui/svg-icons/toggle/check-box';
import ToggleCheckBoxOutlineBlank from 'material-ui/svg-icons/toggle/check-box-outline-blank';
import Static from './static';
import GetUpdateAllUsers from '../admin/get-update-all-users';
import style from '../../styles/style';

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
                subtitle={user.stravaId}
              />
              <CardText>
                <div>
                  <span style={style.span}>
                    Strava Premium: {user.premium ? (<ToggleCheckBox />) : (<ToggleCheckBoxOutlineBlank />)}
                  </span>
                  <span style={style.span}>
                    Club: {user.clubMember ? (<ToggleCheckBox />) : (<ToggleCheckBoxOutlineBlank />)}
                  </span>
                  <span style={style.span}>
                    Admin: {user.adminMember ? (<ToggleCheckBox />) : (<ToggleCheckBoxOutlineBlank />)}
                  </span>
                  <span style={style.span}>
                    Activities: {user.activityCount}
                  </span>
                  <span style={style.span}>
                    Event: {user.eventCount}
                  </span>
                </div>
                <div>
                  <span style={style.span}>
                    Updated: {user.updated_at}
                  </span>
                  {user.logCount && user.logLastAccess ? (
                    <span style={style.span}>
                      Last Access: <strong>{user.logLastAccess[0].updatedAt}</strong>, Access Count: <strong>{user.logCount}</strong>
                    </span>
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
