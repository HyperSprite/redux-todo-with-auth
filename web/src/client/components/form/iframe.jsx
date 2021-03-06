// TODO material-ui - update styles
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LinearProgress from '@material-ui/core/LinearProgress';

const propTypes = {
  src: PropTypes.node.isRequired,
  iFrameId: PropTypes.string,
};

export default class FullheightIframe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      iFrameHeight: 0,
      iFramIsLoaded: false,
    };
  }

  componentDidMount() {
    if (document.domain.indexOf('www') !== -1) {
      document.domain = document.domain.substr(4);
    }
  }

  render() {
    return (
      <div>
        <iframe
          title={this.props.iFrameId}
          style={{ maxWidth: '100%', width: '100%', height: this.state.iFrameHeight, overflow: 'visible' }}
          onLoad={() => {
            this.setState({
              iFrameHeight: this.iframe.contentWindow.document.body.scrollHeight,
            });
          }}
          ref={(c) => { this.iframe = c; }}
          src={this.props.src}
          width="100%"
          height={this.state.iFrameHeight}
          scrolling="no"
          frameBorder="0"
          id={this.props.iFrameId}
        />
        {(this.state.iFrameHeight === 0) ? (
          <div style={{ height: 400 }}>
            <LinearProgress mode="indeterminate" />
          </div>) : null }
      </div>

    );
  }
}

FullheightIframe.propTypes = propTypes;
