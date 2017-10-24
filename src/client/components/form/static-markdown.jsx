import React, { Component } from 'react';
import PropTypes from 'prop-types';
import marked from 'marked';

const renderer = new marked.Renderer();

renderer.link = (href, title, text) => `<a target="new" href="${href}">${text}</a>`;

const propTypes = {
  content: PropTypes.string,
};

const defaultProps = {
  content: '',
};


export default class RenderMDStatic extends Component {
  constructor(props) {
    super(props);

    marked.setOptions({
      gfm: true,
      tables: true,
      breaks: false,
      pedantic: false,
      sanitize: true,
      smartLists: true,
      smartypants: false,
    });
  }

  render() {
    const { content } = this.props;
    const html = marked(content || '', { renderer });
    return (
      <div
        className="static"
      >
        <label
          htmlFor={content}
          className="static-label"
        >
          Preview
        </label>
        <div id={content} dangerouslySetInnerHTML={{ __html: html }} />
      </div>

    );
  }
}

RenderMDStatic.propTypes = propTypes;
RenderMDStatic.defaultProps = defaultProps;
