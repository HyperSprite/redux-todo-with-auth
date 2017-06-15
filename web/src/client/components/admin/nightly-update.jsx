import React, { Component } from 'react';
import axios from 'axios';

const nightlyUpdate = () => {
  const axiosConfig = {
    headers: { authorization: localStorage.getItem('token') },
  };
  axios.get('/apiv1/strava/nightly-update', axiosConfig)
    .then((response) => {
      if (response.status === 200) {
        return response.data;
      }
      throw new Error('Server fetch failed');
    })
    .then((responseData) => {
      console.dir(responseData);
      return { nightlyUpdate: responseData };
    }).catch((error) => {
      return { nightlyUpdate: { error: 'true', fullError: error } };
    });
};

class GetNightlyUpdate extends Component {
  constructor() {
    super();
    this.state = {
      nightlyUpdate: {},
    };
    this.forceNightlyUpdate = this.forceNightlyUpdate.bind(this);
  }

  forceNightlyUpdate() {
    this.setState(nightlyUpdate());
  }


  render() {
    return (
      <div>
        <button onClick={this.nightlyUpdate}>Nightly Update</button>
        {`Result: ${this.state.nightlyUpdate}`}
      </div>
    );
  }
}

export default GetNightlyUpdate;
