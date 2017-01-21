import React, { PropTypes } from 'react';
import { FlatButton } from 'material-ui';

import MdPerson from 'react-icons/lib/md/person';
import MdPersonO from 'react-icons/lib/md/person-outline';
import FaSquare from 'react-icons/lib/fa/square';
import FaSquareO from 'react-icons/lib/fa/square-o';
import FaStar from 'react-icons/lib/fa/star';
import FaStarO from 'react-icons/lib/fa/star-o';

import style from '../../styles/style';

const propTypes = {
  active: PropTypes.bool.isRequired,
  filter: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

const EventTBLink = ({ active, filter, onClick }) => {
  if (active) {
    switch (filter) {
      case 'EVENTS_SHOW_ALL': {
        return (<FlatButton icon={<FaSquare size={24} />} />);
      }
      case 'EVENTS_SHOW_FAVORITE': {
        return (<FlatButton icon={<FaStar size={24} />} />);
      }
      case 'EVENTS_SHOW_OWNER': {
        return (<FlatButton icon={<MdPerson size={24} />} />);
      }
    }
  }
  switch (filter) {
    case 'EVENTS_SHOW_ALL': {
      return (
        <FlatButton
          secondary
          icon={
            <FaSquareO
              size={24}

            />
          }
          onClick={(e) => {
            e.preventDefault();
            onClick();
          }}
        />
      );
    }
    case 'EVENTS_SHOW_FAVORITE': {
      return (
        <FlatButton
          secondary
          icon={
            <FaStarO
              size={24}
            />
          }
          onClick={(e) => {
            e.preventDefault();
            onClick();
          }}
        />
      );
    }
    case 'EVENTS_SHOW_OWNER': {
      return (
        <FlatButton
          secondary
          icon={
            <MdPersonO
              size={24}
            />
          }
          onClick={(e) => {
            e.preventDefault();
            onClick();
          }}
        />
      );
    }
  }
};

EventTBLink.propTypes = propTypes;

export default EventTBLink;
