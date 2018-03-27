import React from 'react';
import axios from 'axios';
import lib from './lib';

const withData = url => Component => (
  class WithData extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        withDataFetching: false,
        withDataNotice: '',
      };
      this.getData = this.getData.bind(this);
    }

    componentDidMount() {
      this.getData();
    }

    getData() {
      const endpoint = typeof url === 'function' ? url(this.props) : url;
      this.setState({ withDataFetching: true });
      axios.get(endpoint, lib.axiosConfig)
      .then((response) => {
        if (response.status === 200) {
          return response.data;
        }
        throw new Error('Server fetch failed');
      })
      .then((responseData) => {
        this.setState({ data: responseData, withDataFetching: false });
      }).catch((error) => {
        this.setState({ withDataFetching: false, withDataNotice: 'Could not fetch data' });
        throw (error);
      });
    }

    render() {
      return <Component {...this.props} {...this.state} onClick={this.getData} />;
    }
  }
);

export default withData;
