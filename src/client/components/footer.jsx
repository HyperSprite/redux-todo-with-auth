import React from 'react';
import { Paper } from 'material-ui';

import style from '../styles/style';
import PoweredByStrava from '../assets/api_logo_pwrdBy_strava_horiz_gray.svg';

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
            <img src={PoweredByStrava} alt="Powered By Strava" style={style.footer.stravaLogo} />
          </a>
        </div>
        <div>
          <blockquote className="footer-text quote-box" >
            <p>Note: The  original organizer should be considered the source of truth regarding all information listed (just like you should never trust a newspaper for movie times).</p>
          </blockquote>
        </div>
      </div>
      <div className="side-lite right-pane"></div>
    </div>
  </div>
);

export default Footer;
