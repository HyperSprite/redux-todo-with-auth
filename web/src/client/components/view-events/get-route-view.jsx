import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import ViewRoute from '../route-view';

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
        this.setState({
          routeData: responseData.routeplanId ? responseData : { error: `${this.props.eventRouteURL} not found` },
          mPref: this.props.mPref,
        });
      }).catch((error) => {
        this.setState({
          routeData: { error: `${this.props.eventRouteURL} not found`, err: error },
        });
      });
  }
// measurementPref
  render() {
    const { mPref } = this.props;
    const { routeData } = this.state;
    return (
      <div>
        {(routeData && routeData.routeplanId) ? (
          <ViewRoute mPref={mPref} routeData={routeData} height={400} />
        ) : null}
      </div>
    );
  }
}

RouteView.propTypes = propTypes;

export default RouteView;
