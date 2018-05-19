import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  button: {
    margin: 12,
  },
});

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
      <Button
        variant="raised"
        color="primary"
        onClick={this.handleRemoveUser}
        className={this.props.classes.button}
      >
        {`Remove ${this.props.stravaId}`}
      </Button>
    );
  }
}

RemoveUser.propTypes = {
  stravaId: PropTypes.number.isRequired,
};

export default withStyles(styles, { name: 'StyledRemoveUser' })(RemoveUser);
