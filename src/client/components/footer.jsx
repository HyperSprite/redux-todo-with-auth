import React from 'react';
import { Paper } from 'material-ui';

import style from '../styles/style';
import PoweredByStrava from '../assets/api_logo_pwrdBy_strava_horiz_gray.svg';

const Footer = () => (
  <Paper
    style={style.footer.paper}
  >
    <div style={style.footer.div1} >
      <p>This app came about because I wanted to use it. It is a labor of love and suffering, much like cycling.</p>
    </div>
    <div style={style.footer.div2} >
      <img src={PoweredByStrava} alt="Powered By Strava" style={style.footer.stravaLogo} />
    </div>
  </Paper>
);

export default Footer;
