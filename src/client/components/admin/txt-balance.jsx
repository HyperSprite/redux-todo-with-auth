import React, { Component } from 'react';
import axios from 'axios';
import RaisedButton from 'material-ui/RaisedButton';
import lib from '../../containers/lib';

import style from '../../styles/style';
import Static from '../form/static';

class GetCheckBalance extends Component {
  constructor() {
    super();
    this.state = {
      balance: 0,
      date: '',
    };
    this.getCheckBalance = this.getCheckBalance.bind(this);
  }

  componentDidMount() {
    this.fetchCeckBalance()
  }

  fetchCeckBalance = () => {
    const axiosConfig = {
      headers: { authorization: localStorage.getItem('token') },
    };
    axios.get('/apiv1/admin/txt/check-balance', axiosConfig)
      .then((response) => {
        if (response.status === 200) {
          return response.data;
        }
        throw new Error('Server fetch failed');
      })
      .then((rData) => {
        if(rData.remainingBalance) {
          this.setState({
            balance: rData.remainingBalance,
            date: rData.dateTime,
          });
        } else {
          this.setState({
            date: 'No data',
          });
        }
      }).catch(error => `error: ${error}`);
  };

  getCheckBalance() {
    this.fetchCeckBalance();
  }

  render() {
    const { balance, date } = this.state;
    return (
      <div style={style.flexcontainer}>
        <div>
          <RaisedButton
            label="Refresh Txt Balance"
            primary
            onClick={this.getCheckBalance}
            style={style.button}
          />
        </div>
        <Static
          contentLabel="Txt Balance"
          content={`$ ${balance} `}
          contentType={balance ? 'text' : 'loading'}
          style={style.button}
        />
        <Static
          contentLabel="Date"
          content={`${lib.cleanDateTime(date)} `}
          contentType={date ? 'text' : 'loading'}
          style={style.button}
        />
      </div>
    );
  }
}

export default GetCheckBalance;
