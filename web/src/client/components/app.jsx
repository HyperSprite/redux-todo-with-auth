import React, { Component } from 'react';

import Header from './header';

import style from '../styles/style';
import '../styles/main.css';

export default class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <div
          style={style.app.children}
        >
          {this.props.children}
        </div>
      </div>
    );
  }
}
