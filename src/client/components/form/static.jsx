import React, { PropTypes } from 'react';

const propTypes = {
  baseURL: PropTypes.string,
  content: PropTypes.any,
  contentLabel: PropTypes.string,
  contentType: PropTypes.string,
  contentAlt: PropTypes.string,
};

const renderContent = (content, contentType, contentAlt, baseURL) => {
  switch (contentType) {
    case 'html': {
      return <div dangerouslySetInnerHTML={{ __html: content }} />;
    }
    case 'img': {
      return <img src={content} alt={contentAlt} />;
    }
    case 'address': {
      if (contentAlt) {
        return <a href={`${baseURL}${contentAlt}`} target="new" className="url">{contentAlt}</a>;
      }
      let place = content.filter(item => !!item);
      place = place.join(', ');
      return <a href={`${baseURL}${place}`} target="new" className="url">{place}</a>;
    }
    case 'url': {
      return (
        <div className="ellipsis">
          <a href={`${baseURL}${content}`} target="new" className="url" >{content}</a>
        </div>
      );
    }
    default:
      return content;
  }
};

const renderStatic = ({ baseURL, contentLabel, content, contentType, contentAlt }) => {
  if (content) {
    return (
      <div
        className="static"
      >
        <label
          htmlFor={content}
          className="static-label"
        >
          {contentLabel}
        </label>
        <div
          className="static-sub-div"
        >
          {renderContent(content, contentType, contentAlt, baseURL)}
        </div>
      </div>
    );
  }
  return null;
};

renderStatic.propTypes = propTypes;

export default renderStatic;
