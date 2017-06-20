import React, { Component } from 'react';
import axios from 'axios';
import RaisedButton from 'material-ui/RaisedButton';

import style from '../../styles/style';

class GetUpdateAllUsers extends Component {
  constructor() {
    super();
    this.state = {
      updateAllUsers: '',
    };
    this.forceUpdateAllUsers = this.forceUpdateAllUsers.bind(this);
  }

  updateAllUsers = () => {
    const axiosConfig = {
      headers: { authorization: localStorage.getItem('token') },
    };
    axios.get('/apiv1/admin/update-all-users', axiosConfig)
      .then((response) => {
        if (response.status === 200) {
          return response.data;
        }
        throw new Error('Server fetch failed');
      })
      .then((responseData) => {
        console.dir(responseData);
        return responseData;
      }).catch(error => `error: ${error}`);
  };

  forceUpdateAllUsers() {
    this.updateAllUsers();
  }

  render() {
    return (
      <RaisedButton
        label="Update All Users"
        primary
        onClick={this.forceUpdateAllUsers}
        style={style.button}
      />
    );
  }
}

export default GetUpdateAllUsers;
