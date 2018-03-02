import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

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
