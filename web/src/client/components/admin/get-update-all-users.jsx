import React, { Component } from 'react';
import axios from 'axios';

const updateAllUsers = () => {
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
    }).catch((error) => {
      return `error: ${error}`;
    });
};

class GetUpdateAllUsers extends Component {
  constructor() {
    super();
    this.state = {
      updateAllUsers: '',
    };
    this.forceUpdateAllUsers = this.forceUpdateAllUsers.bind(this);
  }

  forceUpdateAllUsers() {
    updateAllUsers();
  }


  render() {
    return (
      <div>
        <button onClick={this.forceUpdateAllUsers}>Update All Users</button>
        {` Result: ${this.state.updateAllUsers}`}
      </div>
    );
  }
}

export default GetUpdateAllUsers;
