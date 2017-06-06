import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import * as actions from './../actions';
import ScrollIntoView from './../containers/scroll-into-view';
import Iframe from './form/iframe';

// import ARaceAthleteSVG from '../assets/araceathlete-w-noname.svg';

const propTypes = {
  setPageName: PropTypes.func.isRequired,
};

class Home extends Component {
  componentDidMount() {
    this.props.setPageName('');
  }

  render() {
    return (
      <div>
        <ScrollIntoView
          id=""
          headerHeight={70}
        />
        <div className="home-jumbotron">
          <div className="side-lite left-pane" />
          <div className="brand">
            <div>
              {/* <img src={ARaceAthleteSVG} alt="A Race Athlete logo" /> */}
            </div>
          </div>
          <div className="side-lite right-pane" />
        </div>

        <Iframe src="blog/welcome-to-araceathlete" />
        <Iframe src="blog/how-do-i-get-started" />
        <Iframe src="blog/weekly-stats" />
        <Iframe src="blog/events" />
        <Iframe src="blog/power-and-weight" />

      </div>
    );
  }
}

Home.propTypes = propTypes;

export default connect(null, actions)(Home);
