import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Card, CardHeader, CardMedia, CardTitle } from 'material-ui/Card';

// import lib from '../../containers/lib';
import Static from './../form/static';
import ViewRoute from '../route-view';
import ViewRouteMap from '../google-map';

const axiosConfig = {
  headers: {
    authorization: localStorage.getItem('token'),
  },
};

const propTypes = {
  eventRouteURL: PropTypes.number.isRequired,
  mPref: PropTypes.bool.isRequired,
};

class RouteView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      routeData: {},
      mPref: false,
    };
  }

  componentDidMount() {
    this.getRoute();
  }

  getRoute() {
    axios.get(`/apiv1/routeplan/${this.props.eventRouteURL}`, axiosConfig)
      .then((response) => {
        if (response.status === 200) {
          return response.data;
        }
        throw new Error('Server fetch failed');
      })
      .then((responseData) => {
        this.setState({ routeData: responseData, mPref: this.props.mPref });
      }).catch((error) => {
        this.setState({ routeData: [error] });
      });
  }
// measurementPref
  render() {
    const { mPref } = this.props;
    const { routeData } = this.state;
    return (
      <ViewRoute mPref={mPref} routeData={routeData} height={400} />
    );
  }
}

RouteView.propTypes = propTypes;

export default RouteView;
