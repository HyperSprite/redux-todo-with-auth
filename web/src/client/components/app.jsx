import React, { Component } from 'react';

import ScrollIntoView from '../containers/scroll-into-view';
import Header from './header';

import style from '../styles/style';
import '../styles/main.css';

export default class App extends Component {
  render() {
    return (
      <div>
        <ScrollIntoView
          id={location.hash}
          headerHeight={70}
        />
        <Header />

        <div
          style={style.app.children}
        >
          <ScrollIntoView
            id={location.hash}
            headerHeight={70}
          />
          {this.props.children}
        </div>
      </div>
    );
  }
}
