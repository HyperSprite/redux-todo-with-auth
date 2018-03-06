import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui-next/styles';
import ToggleCheckBox from 'material-ui/svg-icons/toggle/check-box';
import ToggleCheckBoxOutlineBlank from 'material-ui/svg-icons/toggle/check-box-outline-blank';
import LinearProgress from 'material-ui/LinearProgress';

const propTypes = {
  baseURL: PropTypes.string,
  content: PropTypes.any,
  contentLabel: PropTypes.string,
  contentLabelLink: PropTypes.string,
  contentType: PropTypes.string,
  contentAlt: PropTypes.string,
  style: PropTypes.object,
};

const styles = theme => ({
  root: {},
  ellipsis: {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },
  static: {
    marginLeft: 5,
    marginTop: 10,
    maxWidth: 360,
  },
  staticLabel: {
    color: '#9E9E9E',
  },
  staticSubDiv: {
    fontWeight: 500,
    marginLeft: 5,
  },
  link: {
    cursor: 'pointer',
    color: '#B71C1C',
    textDecoration: 'none',
    '&:hover': {
      cursor: 'pointer',
      color: '#B71C1C',
      textDecoration: 'underline',
    },
  },
});

const renderContent = (classes, content, contentType, contentAlt, baseURL) => {
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
        return <a href={`${baseURL}${contentAlt}`} target="new" className={classes.link}>{contentAlt}</a>;
      }
      let place = content.filter(item => !!item);
      place = place.join(', ');
      return <a href={`${baseURL}${place}`} target="new" className={classes.link}>{place}</a>;
    }
    case 'url': {
      return (
        <div className={classes.ellipsis}>
          <a href={`${baseURL}${content}`} target="new" className={classes.link} >{content}</a>
        </div>
      );
    }
    case 'loading': {
      return (
        <div className={classes.ellipsis}>
          <LinearProgress mode="indeterminate" />
        </div>
      );
    }
    default:
      return content;
  }
};

const renderStatic = ({
  classes,
  baseURL,
  contentLabel,
  contentLabelLink,
  content,
  contentType,
  contentAlt,
  style,
}) => {
  if (content || contentType === 'bool') {
    return (
      <div
        style={style}
        className={classes.static}
      >
        {contentLabelLink ? (
          <a href={contentLabelLink} className={classes.link} target="new" >
            {contentLabel}
          </a>
        ) : (
          <label htmlFor={content} className={classes.staticLabel} >
            {contentLabel}
          </label>
        )}
        <div className={classes.staticSubDiv} >
          {renderContent(classes, content, contentType, contentAlt, baseURL)}
        </div>
      </div>
    );
  }
  return null;
};

renderStatic.propTypes = propTypes;

export default withStyles(styles, { name: 'StyledRenderStatic' })(renderStatic);
