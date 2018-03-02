import React from 'react';
import PropTypes from 'prop-types';
import { IconButton } from 'material-ui';
import { Card } from 'material-ui/Card';
import { connect } from 'react-redux';
import FaRefresh from 'react-icons/lib/fa/refresh';

import justFns from 'just-fns';
import * as actions from './../../actions';

import Layout from '../layout';
import FtpWeight from './ftp-weight';
import ScrollIntoView from '../../containers/scroll-into-view';

import style from '../../styles/style';

const propTypes = {
  fetchData: PropTypes.func,
  setPageName: PropTypes.func,
  mPref: PropTypes.bool.isRequired,
  user: PropTypes.shape({
    email: PropTypes.string,
    stravaId: PropTypes.number,
    firstname: PropTypes.string,
    lastname: PropTypes.string,
    profile_medium: PropTypes.string,
    profile: PropTypes.string,
    loc_city: PropTypes.string,
    loc_state: PropTypes.string,
    loc_country: PropTypes.string,
    sex: PropTypes.string,
    premium: PropTypes.bool,
    created_at: PropTypes.string,
    updated_at: PropTypes.string,
    date_preference: PropTypes.string,
    measurement_preference: PropTypes.string,
  }),
};

class Athlete extends React.Component {
  constructor(props) {
    super(props);
    this.updateUser = this.updateUser.bind(this);
  }

  componentDidMount() {
    this.props.fetchData('auth/user');
    this.props.setPageName('Power and Weight', '/blog/power-and-weight');
  }

  updateUser() {
    // fetchStrava(path, id, index, stravatoken, context)
    this.props.fetchStrava('user', this.props.user.stravaId, null, this.props.user.stravatoken, 'getUser');
  }

  render() {
    const {
      stravaId,
      ftpHistory,
      measurement_preference,
      weightHistory,
      userGeoElevation,
    } = this.props.user;

    const mPref = this.props.mPref;
    return (
      <Layout>
        <ScrollIntoView
          id={location.hash}
          headerHeight={70}
        />
        <Card
          className="card"
        >
          {justFns.getLastInArray(ftpHistory, 'ftp') && justFns.getLastInArray(weightHistory, 'weight') ? (
            <FtpWeight
              ftpHistory={ftpHistory}
              weightHistory={weightHistory}
              mPref={mPref}
            />
          ) : (
            <div>
              {/* TODO - this is all ugly */}
              {justFns.getLastInArray(weightHistory, 'weight') ? (
                <FtpWeight
                  ftpHistory={[]}
                  weightHistory={weightHistory}
                  mPref={mPref}
                />
              ) : null }
            </div>
          )}
          <div className="flex-row">
            <IconButton onClick={this.updateUser} style={style.toggleIconButton} >
              <FaRefresh size={20} />
            </IconButton>
          </div>
        </Card>
      </Layout>
    );
  }
}

Athlete.propTypes = propTypes;

function mapStateToProps(state) {
  return {
    user: state.auth.user,
    mPref: state.page.mPref,
  };
}

export default connect(mapStateToProps, actions)(Athlete);
