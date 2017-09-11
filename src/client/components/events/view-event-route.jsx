import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Card } from 'material-ui/Card'

import lib from '../../containers/lib';
import Static from './../form/static';

const axiosConfig = {
  headers: {
    authorization: localStorage.getItem('token'),
  },
};

const propTypes = {
  eventRouteURL: PropTypes.number.isRequired,
  mPref: PropTypes.bool.isRequired,
};

class ViewEventRoute extends React.Component {
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
    axios.get(`/apiv1/strava/routes/${this.props.eventRouteURL}`, axiosConfig)
      .then((response) => {
        if (response.status === 200) {
          return response.data;
        }
        throw new Error('Server fetch failed');
      })
      .then((responseData) => {
        this.setState({ routeData: responseData });
      }).catch((error) => {
        this.setState({ routeData: [error] });
      });
  }
// measurementPref
  render() {
    const { mPref } = this.props;
    const { routeData } = this.state;
    return (
      <Card
        title={routeData.name}
      >
        <Static
          contentLabel={routeData.name}
          content={routeData.id}
          contentType="url"
          baseURL="https://www.strava.com/routes/"
        />
        <Static
          contentLabel="Distance"
          content={`${lib.statsConversions('dst', null, routeData.distance, mPref)} ${lib.mPrefLabel('dstL', mPref).display}`}
          contentType="text"
        />
        <Static
          contentLabel="Elevation"
          content={`${lib.statsConversions('elev', null, routeData.elevation_gain, mPref)} ${lib.mPrefLabel('dstS', mPref).display}`}
          contentType="text"
        />
      </Card>
    );
  }
}

ViewEventRoute.propTypes = propTypes;

export default ViewEventRoute;
