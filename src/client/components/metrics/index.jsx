import React, { Component, PropTypes } from 'react';
import { IconButton } from 'material-ui';
import { Card } from 'material-ui/Card';
import { connect } from 'react-redux';
import FaRefresh from 'react-icons/lib/fa/refresh';

import * as actions from './../../actions';

import FtpWeight from './ftp-weight';
import HelpCard from '../form/help-card';
import ScrollIntoView from '../../containers/scroll-into-view';

import style from '../../styles/style';

const propTypes = {
  fetchData: PropTypes.func,
  setPageName: PropTypes.func,
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

function getLastInArray(arr, arrType) {
  let item;
  if (arr && arr.length > 0 && arr[arr.length - 1][arrType] != null) {
    item = arr[arr.length - 1][arrType];
  }
  return item;
}

class Athlete extends Component {
  constructor(props) {
    super(props);
    this.updateUser = this.updateUser.bind(this);
  }

  componentDidMount() {
    this.props.fetchData('auth/user');
    this.props.setPageName('Power and Weight');
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
    } = this.props.user;

    const mPref = measurement_preference === 'feet';
    return (
      <div>
        <div className="main-flex-container" >
          <div className="side-lite left-pane" />
          <div className="main" >
            <ScrollIntoView
              id={location.hash}
              headerHeight={70}
            />
            <Card
              className="card"
            >
              {getLastInArray(ftpHistory, 'ftp') && getLastInArray(weightHistory, 'weight') ? (
                <FtpWeight
                  ftpHistory={ftpHistory}
                  weightHistory={weightHistory}
                  mPref={mPref}
                />
              ) : (
                <div>
                  {/* TODO - this is all ugly */}
                  {getLastInArray(weightHistory, 'weight') ? (
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
          </div>
          <div className="side-lite right-pane" />
        </div>
        <HelpCard src="/blog/power-and-weight" title="Learn more about Power and Weight" />
      </div>
    );
  }
}

Athlete.propTypes = propTypes;

function mapStateToProps(state) {
  return {
    user: state.auth.user,
  };
}

export default connect(mapStateToProps, actions)(Athlete);
