import React, { PropTypes } from 'react';

import style from '../../styles/style';

const propTypes = {
  content: PropTypes.any,
  contentLabel: PropTypes.string,
  contentType: PropTypes.string,
  contentAlt: PropTypes.string,
};

const renderContent = (content, contentType, contentAlt, baseURL) => {
  switch (contentType) {
    case 'img':
      return <img src={content} alt={contentAlt} />;
    case 'url':
      return <a href={`${baseURL}${content}`} target="new" style={style.static.url}>{content}</a>;
    default:
      return content;
  }
};

const renderStatic = ({ baseURL, contentLabel, content, contentType, contentAlt }) => {
  if (content) {
    return (
      <div style={style.static.divMain}>
        <label
          htmlFor={content}
          style={style.static.label}
        >
          {contentLabel}
        </label>
        <div style={style.static.divSub}>
          {renderContent(content, contentType, contentAlt, baseURL)}
        </div>
      </div>
    );
  }
  return null;
};

renderStatic.propTypes = propTypes;

export default renderStatic;
