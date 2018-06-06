import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as actions from './../actions';
import Hero from './hero';
import Iframe from './form/iframe';

const propTypes = {
  setPageName: PropTypes.func.isRequired,
};

const lrgImage = '/images/background-large.jpg';
const smlImage = '/images/background-small.jpg';

class Home extends Component {
  componentDidMount() {
    this.props.setPageName('A Race athlete');
  }

  render() {
    return (
      <div>
        <Hero backgroundImageWide={lrgImage} backgroundImageNarrow={smlImage} />
        {process.env.NODE_ENV === 'production' ? (
          <Iframe src={'https://blog.araceathlete.com/features'} iFrameId="features" />
        ) : (
          <div>Running in development</div>
        )}
      </div>
    );
  }
}

Home.propTypes = propTypes;

export default connect(null, actions)(Home);
