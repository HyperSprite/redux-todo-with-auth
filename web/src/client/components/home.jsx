import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { RaisedButton } from 'material-ui';

import * as actions from './../actions';
import ScrollIntoView from './../containers/scroll-into-view';
import Iframe from './form/iframe';

// import ARaceAthleteSVG from '../assets/araceathlete-w-noname.svg';
const posts = [
  'welcome-to-araceathlete',
  'how-do-i-get-started',
  'weekly-stats',
  'power-at-altitude',
  'events',
  'power-and-weight',
];

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
          id={location.hash}
          headerHeight={70}
        />
        <div className="home-jumbotron">
          <div className="side-lite left-pane" />
          <div className="brand" />
          <div className="side-lite right-pane" />
        </div>

        <Iframe src={'https://blog.araceathlete.com/features'} iFrameId="features" />
      </div>
    );
  }
}

Home.propTypes = propTypes;

export default connect(null, actions)(Home);
