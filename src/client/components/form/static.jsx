import React, { PropTypes } from 'react';

import './styles.css';

const propTypes = {
  content: PropTypes.any,
  contentLabel: PropTypes.string,
  contentType: PropTypes.string,
  contentAlt: PropTypes.string,
};

const renderStatic = ({ contentLabel, content, contentType, contentAlt }) => (
  <div className="control-group">
    <label htmlFor={content} className="control-label">{contentLabel}:</label>
    {(contentType === 'img') ? <img src={content} alt={contentAlt} /> : content }
  </div>
);

renderStatic.propTypes = propTypes;

export default renderStatic;
