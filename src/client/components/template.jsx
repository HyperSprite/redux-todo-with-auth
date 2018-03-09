import React from 'react';
import { withStyles } from 'material-ui-next/styles';

import Header from './header';
import Footer from './footer';
import MenuDrawer from './menu-drawer';
import PoweredByStrava from '../assets/api_logo_pwrdBy_strava_horiz_gray.svg';

const styles = theme => ({
  root: {
    color: theme.palette.primary.dark,
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.fontSize,
    fontWeight: theme.typography.fontWeightRegular,
  },
  site: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  siteMain: {
    flex: '1 0 auto',
  },
  footer: {
    flexShrink: 0,
    paddingTop: '1em',
  },
});

class App extends React.Component {
  render() {
    const { children, classes } = this.props;
    return (
      <div className={classes.root}>

        <div className={classes.site} >
          <div className={classes.siteMain} >
            <Header />
            <MenuDrawer />
            {children}
          </div>
          <div className={classes.footer}>
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
      </div>
    );
  }
}

export default withStyles(styles, { name: 'StyledApp' })(App);
