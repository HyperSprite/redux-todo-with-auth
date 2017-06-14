import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { LinearProgress } from 'material-ui';

const propTypes = {
  src: PropTypes.string.isRequired,
};

export default class FullheightIframe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      iFrameHeight: '0px',
    };
  }

  render() {
    return (
      <div>
        <iframe
          style={{ maxWidth: '100%', width: '100%', height: this.state.iFrameHeight, overflow: 'visible' }}
          onLoad={() => {
            this.setState({
              iFrameHeight: `${this.iframe.contentWindow.document.body.scrollHeight}px`,
            });
          }}
          ref={(c) => { this.iframe = c; }}
          src={this.props.src}
          width="100%"
          height={this.state.iFrameHeight}
          scrolling="no"
          frameBorder="0"
        />
        {(this.state.iFrameHeight === '0px') ? (<LinearProgress mode="indeterminate" />) : null }
      </div>

    );
  }
}

FullheightIframe.propTypes = propTypes;
