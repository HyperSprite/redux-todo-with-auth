import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import { LinearProgress } from 'material-ui';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import ToggleCheckBox from 'material-ui/svg-icons/toggle/check-box';
import ToggleCheckBoxOutlineBlank from 'material-ui/svg-icons/toggle/check-box-outline-blank';

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
        <Table
          fixedHeader
          selectable={false}
          multiSelectable={false}
        >
          <TableHeader
            displaySelectAll={false}
            adjustForCheckbox={false}
          >
            <TableRow>
              <TableHeaderColumn>Strava ID</TableHeaderColumn>
              <TableHeaderColumn>Name</TableHeaderColumn>
              <TableHeaderColumn>Premium</TableHeaderColumn>
              <TableHeaderColumn>Admin</TableHeaderColumn>
              <TableHeaderColumn>Club</TableHeaderColumn>
              <TableHeaderColumn>Activities</TableHeaderColumn>
              <TableHeaderColumn>Event</TableHeaderColumn>
              <TableHeaderColumn>Updated</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            displayRowCheckbox={false}
            stripedRows
          >
            {this.state.userList.map(user => (
              <TableRow key={user.stravaId}>
                <TableRowColumn>{user.stravaId}</TableRowColumn>
                <TableRowColumn>{`${user.firstname} ${user.lastname}`}</TableRowColumn>
                <TableRowColumn>{user.premium ? (<ToggleCheckBox />) : (<ToggleCheckBoxOutlineBlank />)}</TableRowColumn>
                <TableRowColumn>{user.adminMember ? (<ToggleCheckBox />) : (<ToggleCheckBoxOutlineBlank />)}</TableRowColumn>
                <TableRowColumn>{user.clubMember ? (<ToggleCheckBox />) : (<ToggleCheckBoxOutlineBlank />)}</TableRowColumn>
                <TableRowColumn>{user.activityCount}</TableRowColumn>
                <TableRowColumn>{user.eventCount}</TableRowColumn>
                <TableRowColumn>{user.updated_at}</TableRowColumn>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

    );
  }
}

UserList.propTypes = propTypes;
