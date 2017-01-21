import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const propTypes = {
  linkTo: PropTypes.string,
  label: PropTypes.string,
  style: PropTypes.object,
};

const cardHeaderLink = (linkTo, label, style) => (
  <Link to={`/events#${event.eventId}`} style={style}>{label}</Link>
);

cardHeaderLink.propTypes = propTypes;

export default cardHeaderLink;
