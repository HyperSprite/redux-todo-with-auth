import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const propTypes = {
  linkTo: PropTypes.string,
  lable: PropTypes.string,
  style: PropTypes.object,
};

const cardHeaderLink = (linkTo, lable, style) => (
  <Link to={`/events#${event.eventId}`} style={style}>{lable}</Link>
);

cardHeaderLink.propTypes = propTypes;

export default cardHeaderLink;
