import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import { LinearProgress } from 'material-ui';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import ToggleCheckBox from 'material-ui/svg-icons/toggle/check-box';
import ToggleCheckBoxOutlineBlank from 'material-ui/svg-icons/toggle/check-box-outline-blank';
import Static from './static';
import GetUpdateAllUsers from '../admin/get-update-all-users';

const style = {
  margin: 5,
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
    };
  }

  componentWillReceiveProps() {
    this.getUserList();
  }

  getUserList = () => {
    axios.get('/apiv1/admin/user-list', axiosConfig)
      .then((response) => {
        if (response.status === 200) {
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


  render() {
    return (
      <div>
        <GetUpdateAllUsers />
          {this.state.userList.map(user => (
            <Card key={user.stravaId}>
              <CardHeader
                title={`${user.firstname} ${user.lastname}`}
                subtitle={user.stravaId}
              />
              <CardText>
                <span style={style}>
                  Strava Premium: {user.premium ? (<ToggleCheckBox />) : (<ToggleCheckBoxOutlineBlank />)}
                </span>
                <span style={style}>
                  Admin: {user.adminMember ? (<ToggleCheckBox />) : (<ToggleCheckBoxOutlineBlank />)}
                </span>
                <span style={style}>
                  Club: {user.clubMember ? (<ToggleCheckBox />) : (<ToggleCheckBoxOutlineBlank />)}
                </span>
                <span style={style}>
                  Activities: {user.activityCount}
                </span>
                <span style={style}>
                  Event: {user.eventCount}
                </span>
                <span style={style}>
                  Updated: {user.updated_at}
                </span>
              </CardText>
            </Card>
          ))}
      </div>

    );
  }
}

UserList.propTypes = propTypes;
