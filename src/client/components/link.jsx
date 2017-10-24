import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  active: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
};

const Link = ({ active, children, onClick }) => {
  if (active) {
    return <span>&#9679;&#032;{children}</span>;
  }

  return (
    <span
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
    >
      &#9675;&#032;{children}
    </span>
  );
};

Link.propTypes = propTypes;

export default Link;
