import React, { PropTypes } from 'react';
import ToggleCheckBox from 'material-ui/svg-icons/toggle/check-box';
import ToggleCheckBoxOutlineBlank from 'material-ui/svg-icons/toggle/check-box-outline-blank';

const propTypes = {
  baseURL: PropTypes.string,
  content: PropTypes.any,
  contentLabel: PropTypes.string,
  contentLabelLink: PropTypes.string,
  contentType: PropTypes.string,
  contentAlt: PropTypes.string,
};

const renderContent = (content, contentType, contentAlt, baseURL) => {
  switch (contentType) {
    case 'bool': {
      return content ? (<ToggleCheckBox />) : (<ToggleCheckBoxOutlineBlank />);
    }
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

const renderStatic = ({
  baseURL,
  contentLabel,
  contentLabelLink,
  content,
  contentType,
  contentAlt,
}) => {
  if (content || contentType === 'bool') {
    return (
      <div
        className="static"
      >
        {contentLabelLink ? (
          <a
            href={contentLabelLink}
            target="new"
          >
            <label
              htmlFor={content}
              className="static-label"
            >
              {contentLabel}
            </label>
          </a>
        ) : (
          <label
            htmlFor={content}
            className="static-label"
          >
            {contentLabel}
          </label>
        )}

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
