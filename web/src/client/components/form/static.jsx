import React, { PropTypes } from 'react';

import style from '../../styles/style';

const propTypes = {
  content: PropTypes.any,
  contentLabel: PropTypes.string,
  contentType: PropTypes.string,
  contentAlt: PropTypes.string,
};

const renderStatic = ({ contentLabel, content, contentType, contentAlt }) => (
  <div style={style.static.divMain}>
    <label
      htmlFor={content}
      style={style.static.label}
    >
      {contentLabel}
    </label>
    <div style={style.static.divSub}>
      {(contentType === 'img') ? <img src={content} alt={contentAlt} /> : content }
    </div>
  </div>
);

renderStatic.propTypes = propTypes;

export default renderStatic;
