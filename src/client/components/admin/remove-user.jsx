import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import RaisedButton from 'material-ui/RaisedButton';

import style from '../../styles/style';

class RemoveUser extends Component {
  constructor(props) {
    super(props);
    this.handleRemoveUser = this.handleRemoveUser.bind(this);
  }

  removeUser = (userToRemove) => {
    const axiosConfig = {
      headers: { authorization: localStorage.getItem('token') },
    };
    axios.post(`/apiv1/admin/user/${userToRemove}/remove`, {}, axiosConfig)
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

  handleRemoveUser() {
    this.removeUser(this.props.stravaId);
  }

  render() {
    return (
      <RaisedButton
        label={`Remove ${this.props.stravaId}`}
        primary
        onClick={this.handleRemoveUser}
        style={style.button}
      />
    );
  }
}

RemoveUser.propTypes = {
  stravaId: PropTypes.number.isRequired,
};

export default RemoveUser;
