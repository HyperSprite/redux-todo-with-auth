import React from 'react';
import PropTypes from 'prop-types';
import MdHelp from 'react-icons/lib/md/help';

const propTypes = {
  /** a color string */
  color: PropTypes.string,
  /** SVG icon */
  Icon: PropTypes.any,
  /** URL to help e.g. '/blog/help' */
  link: PropTypes.string.isRequired,
};


const defaultProps = {
  color: '',
  Icon: MdHelp,
};

const IconLink = ({ color, Icon, link }) => (
  <a
    style={{ textDecoration: 'none', cursor: 'pointer' }}
    href={link}
    target="new"
  >
    <Icon style={{ color }} />
  </a>
);


IconLink.propTypes = propTypes;
IconLink.defaultProps = defaultProps;

export default IconLink;
