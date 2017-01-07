import React, { PropTypes } from 'react';
import { FlatButton } from 'material-ui';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import { ActionDeleteForever, ActionFavoriteBorder, ActionFavorite, ContentCreate } from 'material-ui/svg-icons';

import Static from './../form/static';

import style from '../../styles/style';

const propTypes = {
  canEdit: PropTypes.bool,
  deleteClick: PropTypes.func,
  editClick: PropTypes.func,
  favClick: PropTypes.func,
  weeksToGo: PropTypes.number,
  niceEventDate: PropTypes.string,
  fav: PropTypes.bool,
  favCount: PropTypes.number,
};

// props are passed in from component/list-events
const renderViewEvent = ({
  ...event,
  canEdit,
  deleteClick,
  editClick,
  favClick,
  niceEventDate,
  weeksToGo,
  fav,
  favCount,
}) => (
  <Card
    style={style.card}
  >
    <CardHeader
      style={style.cardHeader}
      title={event.eventTitle}
      subtitle={`${weeksToGo} weeks to go`}
      actAsExpander
      showExpandableButton
    />
    {fav ? (
      <FlatButton
        label="Fav"
        secondary
        style={style.button}
        icon={<ActionFavorite />}
        onClick={favClick}
      />
    ) : (
      <FlatButton
        label="Fav"
        secondary
        style={style.button}
        icon={<ActionFavoriteBorder />}
        onClick={favClick}
      />
    )}

    <CardText expandable>
      <Static
        contentLabel="Event Date"
        content={niceEventDate}
        contentType="text"
      />
      <Static
        contentLabel="Type"
        content={event.eventType}
        contentType="text"
      />
      <Static
        contentLabel="Location"
        content={`${event.eventLocCity}, ${event.eventLocState}, ${event.eventLocCountry}`}
        contentType="text"
      />
      <Static
        contentLabel="Event Link"
        content={event.eventURL}
        contentType="url"
        baseURL=""
      />
      <Static
        contentLabel="Description"
        content={event.eventDesc}
        contentType="text"
      />
      {event.eventRoutes.map((route) => {
        return (
          <Static
            key={route.eventRouteURL}
            contentLabel="Route Link"
            content={route.eventRouteURL}
            contentType="url"
            baseURL="https://www.strava.com/routes/"
          />
        );
      })}
      {canEdit ? (
        <div>
          <FlatButton
            label="Edit"
            secondary
            style={style.button}
            icon={<ContentCreate />}
            onClick={editClick}
          />
          <FlatButton
            label="Delete"
            secondary
            style={style.button}
            icon={<ActionDeleteForever />}
            onClick={deleteClick}
          />
        </div>
      ) : (
        <span />
      )}
    </CardText>
  </Card>
);

renderViewEvent.propTypes = propTypes;

export default renderViewEvent;

// eventId: String,
// eventOwner: String,
// eventDeleted: Boolean,
// eventRoutes: []
