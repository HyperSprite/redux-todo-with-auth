import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { connect } from 'react-redux';
// eslint-disable-next-line
import * as actions from '../../actions';

import RouteplanDisplay from './routeplan-display';
import LoadingPage from '../loading-page';

const relURL = 'apiv1/routeplan/';

const axiosConfig = {
  headers: {
    authorization: localStorage.getItem('token'),
  },
};

class RouteSearch extends Component {
  constructor(props) {
    super(props);
    this.getUserRouteplans = this.getUserRouteplans.bind(this);
  }

  state = {
    isFetching: true,
    isUser: false,
    routeplans: [],
    message: '',
    mPref: false,
    user: 'default',
  };

  componentDidMount() {
    this.props.setPageName('Route Search');
    this.getUserRouteplans(this.props.user);
  }

  getUserRouteplans(user) {
    const getUser = user || this.state.user;
    axios.get(`${relURL}user/${getUser}`, axiosConfig)
      .then((response) => {
        if (response.status === 200) {
          return response.data;
        }
        throw new Error('Server fetch failed');
      })
      .then((responseData) => {
        this.setState({
          routeplans: responseData,
          message: responseData.message,
          isFetching: false,
        });
      }).catch((error) => {
        this.setState({ message: error.message });
      });
  }

  componentWillReceiveProps() {
    this.setState({ user: this.props.user, mPref: this.props.mPref });
  }

  render() {

    return (
      <div style={{ marginTop: 80 }}>
        {this.state.isFetching ? (
          <LoadingPage />
        ) : (
          <RouteplanDisplay {...this.state} />
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
    user: state.auth.user.stravaId,
    mPref: !!state.auth.user.measurement_preference === 'feet',
  };
}

RouteSearch.propTypes = {
  user: PropTypes.number,
  mPref: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, actions)(RouteSearch);
