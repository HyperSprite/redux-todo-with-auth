import React, { Component, PropTypes } from 'react';

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
    );
  }
}

FullheightIframe.propTypes = propTypes;
