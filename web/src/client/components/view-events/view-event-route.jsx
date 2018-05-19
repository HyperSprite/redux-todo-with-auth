import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import withStyles from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';

import justFns from 'just-fns';
import Static from './../form/static';
import GoogleMapWithPolyline from '../google-map';

const axiosConfig = {
  headers: {
    authorization: localStorage.getItem('token'),
  },
};

const propTypes = {
  eventRouteURL: PropTypes.number.isRequired,
  mPref: PropTypes.bool.isRequired,
};

const styles = theme => ({

});

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
    const { mPref, adminMember } = this.props;
    const { routeData } = this.state;
    return (
      <Card style={{ marginBottom: 5, marginTop: 5 }}>
        {routeData.map &&
          <GoogleMapWithPolyline {...routeData} />
        }
        <CardHeader
          title={routeData.name}
        />
        <div style={{ marginLeft: 20, marginRight: 20 }}>

          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', margin: 20 }} >
            <Static
              contentLabel="Strava Route Link"
              content={routeData.id}
              contentType="url"
              baseURL="https://www.strava.com/routes/"
            />
            <Static
              contentLabel="Distance"
              content={`${justFns.statsConversions('dst', null, routeData.distance, mPref)} ${justFns.mPrefLabel('dstL', mPref).display}`}
              contentType="text"
            />
            <Static
              contentLabel="Elevation"
              content={`${justFns.statsConversions('elev', null, routeData.elevation_gain, mPref)} ${justFns.mPrefLabel('dstS', mPref).display}`}
              contentType="text"
            />
          </div>
        </div>
      </Card>
    );
  }
}

ViewEventRoute.propTypes = propTypes;

export default withStyles(styles, { name: 'StyledViewEventRoute' })(ViewEventRoute);
