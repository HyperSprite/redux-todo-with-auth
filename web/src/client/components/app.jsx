import React, { Component } from 'react';

import Header from './header';
import Footer from './footer';
import MenuDrawer from './menu-drawer';
import PoweredByStrava from '../assets/api_logo_pwrdBy_strava_horiz_gray.svg';

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
          <Footer
            brand="rcrsv.com"
            brandLink="http://rcrsv.com"
            info="This app came about because I wanted to use it. It is a labor of love and suffering, much like cycling."
            imgAlt="Powered By Strava"
            imgLink="https://www.strava.com"
            imgSrc={PoweredByStrava}
          />
        </div>
      </div>
    );
  }
}
