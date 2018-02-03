import React from 'react';
import { Paper } from 'material-ui';
import pckg from '../../../package.json';


import PoweredByStrava from '../assets/api_logo_pwrdBy_strava_horiz_gray.svg';

const today = new Date().getFullYear();

const Footer = () => (
  <div className="site-footer" >
    <div className="footer-flex-container" >
      <div className="side-lite left-pane"></div>
      <div className="main" >
        <div className="footer-text quote-box" >
          <p>This app came about because I wanted to use it. It is a labor of love and suffering, much like cycling.</p>
        </div>
        <div>
          <a href="https://www.strava.com" target="new">
            <img src={PoweredByStrava} alt="Powered By Strava" style={{ width: 200 }} />
          </a>
        </div>
        <div>
          <p className="footer-text" >
            v{pckg.version} - &copy; {today} araceathlete.com
          </p>
        </div>
      </div>
      <div className="side-lite right-pane"></div>
    </div>
  </div>
);

export default Footer;
