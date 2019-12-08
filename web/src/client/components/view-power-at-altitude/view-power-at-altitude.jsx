import React, { Component } from 'react';
import { connect } from 'react-redux';
import Card from '@material-ui/core/Card';

import justFns from 'just-fns';
import types from '../../types';
import * as actions from './../../actions';
import ActivityProcessingWithData from '../activity-processing/with-redux';
import Layout from '../layout';
import FeatureNotice from '../feature-notice';
import AltitudeTable from '../altitude-table';

const title = 'Power at Altitude';
const help = 'https://blog.araceathlete.com/power-at-altitude';

class PowerAtAltitude extends Component {
  componentDidMount() {
    this.props.fetchData('auth/user');
    this.props.setPageName(title, help);
  }

  render() {
    const { user, mPref } = this.props;
    const altitudeTableProps = {
      mPref,
      currentFTP: justFns.getLastInArray(user.ftpHistory, 'ftp'),
      baseElevation: user.userGeoElevation,
    };

    return (
      <Layout>
        <Card>
        <ActivityProcessingWithData />
          {(user.premium &&
              user.userGeoElevation &&
              altitudeTableProps.currentFTP &&
              !isNaN(altitudeTableProps.currentFTP)) ?
          (
            <AltitudeTable {...altitudeTableProps} />
          ) : (
            <FeatureNotice
              user={user}
              checks={['premium', 'ftpHistory', 'userGeoElevation']}
              title={title}
            />
          )}
        </Card>
      </Layout>
    );
  }
}

PowerAtAltitude.propTypes = { ...types };

PowerAtAltitude.defaultProps = {
  mPref: false,
  user: {
    premium: false,
    userGeoElevation: 0,
    ftpHistory: [200],
  },
};

function mapStateToProps(state) {
  return {
    user: state.auth.user,
    mPref: state.page.mPref,
  };
}

export default connect(mapStateToProps, actions)(PowerAtAltitude);
