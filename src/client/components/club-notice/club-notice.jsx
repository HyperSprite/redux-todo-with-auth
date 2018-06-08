import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ClubNoticeStyles from './club-notice-styles';
import ClubNoticeView from './club-notice-view';

import * as actions from '../../actions';

const propTypes = {
  toggleClubNotice: PropTypes.func.isRequired,
  firstname: PropTypes.string,
  clubMember: PropTypes.bool,
  clubNotice: PropTypes.bool,
};

const defaultProps = {
  firstname: '',
  clubMember: true,
  clubNotice: true,
};

class ClubNotice extends React.Component {
  constructor(props) {
    super(props);
    this.toggleNotice = this.toggleNotice.bind(this);
    this.handleUserStatus = this.handleUserStatus.bind(this);
  }

  toggleNotice() {
    this.props.toggleClubNotice(!this.props.clubNotice);
  }

  handleUserStatus() {
    this.props.setIsFetching();
    this.props.fetchStrava('user', this.props.stravaId, null, this.props.stravatoken, 'getUser');
  }

  render() {
    const { clubMember, clubNotice } = this.props;
    return (clubMember || clubNotice) ? null : (
      <ClubNoticeStyles
        render={wStyles => (
          <ClubNoticeView
            {...wStyles}
            {...this.props}
            handleUserStatus={this.handleUserStatus}
            toggleNotice={this.toggleNotice}
          />
        )}
      />
    );
  }
}

ClubNotice.propTypes = propTypes;
ClubNotice.defaultProps = defaultProps;

function mapStateToProps(state) {
  return {
    stravaId: state.auth.user.stravaId,
    stravatoken: state.auth.user.stravatoken,
    clubMember: state.auth.user.clubMember,
    clubNotice: state.auth.user.clubNotice,
    firstname: state.auth.user.firstname,
  };
}

export default connect(mapStateToProps, actions)(ClubNotice);
