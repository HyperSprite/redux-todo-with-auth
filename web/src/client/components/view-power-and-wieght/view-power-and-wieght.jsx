import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui-next/styles';
import IconButton from 'material-ui-next/IconButton';
import Card from 'material-ui-next/Card';
import RefreshIcon from 'mdi-react/RefreshIcon';

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

const styles = theme => ({
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  toggleIconButton: {
    color: theme.palette.primary[800],
    margin: 0,
    padding: 0,
    height: 32,
    width: 32,
  },
  icon: {
    fill: theme.palette.primary[800],
  },
});

class PowerAndWeight extends React.Component {
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
      weightHistory,
      userGeoElevation,
    } = this.props.user;

    const { classes, mPref } = this.props;
    return (
      <Layout>
        <ScrollIntoView
          id={location.hash}
          headerHeight={70}
        />
        <Card >
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
          <div className={classes.flexRow}>
            <IconButton onClick={this.updateUser} className={classes.toggleIconButton} >
              <RefreshIcon size={20} className={classes.icon} />
            </IconButton>
          </div>
        </Card>
      </Layout>
    );
  }
}

PowerAndWeight.propTypes = propTypes;

function mapStateToProps(state) {
  return {
    user: state.auth.user,
    mPref: state.page.mPref,
  };
}

const styledPowerAndWeight = withStyles(styles, { name: 'StyledPowerAndWieght' })(PowerAndWeight);
export default connect(mapStateToProps, actions)(styledPowerAndWeight);
