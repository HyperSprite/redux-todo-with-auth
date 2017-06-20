import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

class Motovation extends Component {
  constructor(props) {
    super(props);
    this.pickOneQuote = this.pickOneQuote.bind(this);
    this.state = {
      thisQuote: {
        quote: 'Getting quote',
        author: '',
      },
      quotesArray: [],
    };
  }

  componentWillReceiveProps() {
    axios.get('/motovation.json')
      .then((response) => {
        if (response.status === 200) {
          return response.data;
        }
        throw new Error('Server fetch failed');
      })
      .then((quotesArray) => {
        this.setState({ quotesArray });
        this.pickOneQuote();
      }).catch((error) => {
        this.setState({ thisQuote: { quote: 'Sorry, something went wrong getting your quote', author: 'Web guy' } });
      });


  }

  pickOneQuote() {
    const thisQuote = this.state.quotesArray[Math.floor(Math.random() * this.state.quotesArray.length)];
    this.setState({ thisQuote });
  }

  render() {
    return (
      <div style={{ maxWidth: '400px', minHeight: '300px' }}>
        <strong>{this.state.thisQuote.quote}</strong><br />
        <em>{this.state.thisQuote.author}</em><br />
        <button onClick={this.pickOneQuote}>Get a new quote</button>
      </div>
    );
  }
}

export default Motovation;
