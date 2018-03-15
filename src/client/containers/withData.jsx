import React from 'react';
import axios from 'axios';
import lib from './lib';

const withData = url => Component => (
  class WithData extends React.Component {
    constructor(props) {
      super(props);
      this.state = {};
    }

    componentDidMount() {
      const endpoint = typeof url === 'function' ? url(this.props) : url;
      axios.get(endpoint, lib.axiosConfig)
      .then((response) => {
        if (response.status === 200) {
          return response.data;
        }
        throw new Error('Server fetch failed');
      })
      .then((responseData) => {
        this.setState({ data: responseData });
      }).catch((error) => {
        throw (error);
      });
    }

    render() {
      return <Component {...this.props} {...this.state} />;
    }
  }
);

export default withData;
