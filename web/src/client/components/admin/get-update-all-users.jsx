import React, { Component } from 'react';
import axios from 'axios';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';

const styles = theme => ({
  button: {
    margin: 12,
  },
});

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
      <Button
        variant="raised"
        color="primary"
        onClick={this.forceUpdateAllUsers}
        className={this.props.classes.button}
      >
        Update All Users
      </Button>
    );
  }
}

export default withStyles(styles, { name: 'StyledGetUpdateAllUsers' })(GetUpdateAllUsers);
