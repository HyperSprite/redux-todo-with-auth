import React, { Component } from 'react';

import ScrollIntoView from '../containers/scroll-into-view';
import Header from './header';
import Footer from './footer';
import MenuDrawer from './menu-drawer';

import style from '../styles/style';
// import '../styles/main.css';

export default class App extends Component {
  render() {
    return (
      <div >
        <Header />
        <div className="site" >
          <div className="site-main" >
            <MenuDrawer />
            {this.props.children}
          </div>
          <Footer />
        </div>
      </div>
    );
  }
}
