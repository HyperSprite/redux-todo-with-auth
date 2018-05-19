import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import justFns from 'just-fns';
import Static from './static';
import GetUpdateAllUsers from '../admin/get-update-all-users';
import CheckBox from './checkbox-icon';
import RemoveUser from '../admin/remove-user';
import InputRemoveUser from '../admin/input-remove-user';

const styles = theme => ({
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
  },
  boxLabel: {

  },
  boxData: {
    marginLeft: 10,
  },
});

const propTypes = {

};

const axiosConfig = {
  headers: {
    authorization: localStorage.getItem('token'),
  },
};

class UserList extends React.Component {
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
    const { classes } = this.props;
    return (
      <div>
        {this.state.udpating ? (
          <LinearProgress mode="indeterminate" />
        ) : (
          <Divider style={{ height: 4 }} />
        )}
        <GetUpdateAllUsers />

        <Button
          onClick={this.callGetUserList}
          disabled={this.state.udating}
          color="secondary"
        >
          Refresh List
        </Button>

        <InputRemoveUser />

        <Static
          content={this.state.userList.length}
          contentLabel="User Count"
        />
        {this.state.userList.map(user => (
          <Card key={user.stravaId}>
            <CardHeader
              title={`${user.firstname} ${user.lastname}`}
              subheader={AthleteLink(user)}
            />

            <RemoveUser stravaId={user.stravaId} />
            {user.authorizationErrors && (
              <div className={classes.box}>
                <div className={classes.boxLabel}>
                  Authorization Errors
                </div>
                <div className={classes.boxData}>
                  {` ${user.authorizationErrors}`}
                </div>
              </div>
            )}
            <CardContent>
              <div className={classes.container}>
                <div className={classes.box}>
                  <CheckBox option={!!user.premium} /> Strava Premium
                </div>
                <div className={classes.box}>
                  <CheckBox option={!!user.clubMember} /> Club
                </div>
                <div className={classes.box}>
                  <CheckBox option={!!user.userGeoElevation} /> Elevation
                </div>
                <div className={classes.box}>
                  <CheckBox option={!!justFns.getLastInArray(user.ftpHistory, 'ftp')} /> FTP
                </div>
                <div className={classes.box}>
                  <CheckBox option={!!user.adminMember} /> Admin
                </div>
                <div className={classes.box}>
                  <div className={classes.boxLabel}>
                    Activities
                  </div>
                  <div className={classes.boxData}>
                    {` ${user.activityCount}`}
                  </div>
                </div>
                <div className={classes.box}>
                  <div className={classes.boxLabel}>
                    Events Created
                  </div>
                  <div className={classes.boxData}>
                    {` ${user.eventCount}`}
                  </div>
                </div>
              </div>
              <div>
                <div className={classes.box}>
                  <div className={classes.boxLabel}>
                    Strava Created
                  </div>
                  <div className={classes.boxData}>
                    {` ${user.created_at}`}
                  </div>
                </div>
                <div className={classes.box}>
                  <div className={classes.boxLabel}>
                    Strava Updated
                  </div>
                  <div className={classes.boxData}>
                    {` ${user.updated_at}`}
                  </div>
                </div>
                <div className={classes.box}>
                  <div className={classes.boxLabel}>
                    Created
                  </div>
                  <div className={classes.boxData}>
                    {` ${user.createdAt}`}
                  </div>
                </div>
                <div className={classes.box}>
                  <div className={classes.boxLabel}>
                    Updated
                  </div>
                  <div className={classes.boxData}>
                    {` ${user.updatedAt}`}
                  </div>
                </div>
                {user.logCount && user.logLastAccess ? (
                  <div>
                    <div className={classes.box}>
                      <div className={classes.boxLabel}>
                        Last Access
                      </div>
                      <div className={classes.boxData}>
                        {` ${user.logLastAccess[0].updatedAt}`}
                      </div>
                    </div>
                    <div className={classes.box}>
                      <div className={classes.boxLabel}>
                        Access Count
                      </div>
                      <div className={classes.boxData}>
                        {` ${user.logCount}`}
                      </div>
                    </div>
                  </div>

                ) : (null)}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }
}

UserList.propTypes = propTypes;

export default withStyles(styles, { name: 'StyledUserList' })(UserList);
