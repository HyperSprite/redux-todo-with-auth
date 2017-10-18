import React, { PropTypes } from 'react';
import Helmet from 'react-helmet';
import { Chip } from 'material-ui';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';

import lib from '../../containers/lib';
import MultiDayWeather from './../weather/multi-day-weather';
import ShareButtons from '../form/share-button';
import ToggleIconButton from './../form/toggle-icon-button';
import ViewEventRoute from './view-event-route';
import araceathleteEventsBanner from '../../assets/araceathlete-events-banner.png';

import style from '../../styles/style';
import Static from './../form/static';

const propTypes = {
  adminMember: PropTypes.bool,
  authenticated: PropTypes.bool,
  canEdit: PropTypes.bool,
  deleteClick: PropTypes.func,
  editClick: PropTypes.func,
  expanded: PropTypes.bool,
  eventFullURL: PropTypes.string,
  eventLink: PropTypes.string,
  fav: PropTypes.bool,
  favClick: PropTypes.func,
  favCount: PropTypes.number,
  getWeather: PropTypes.bool,
  goal: PropTypes.bool,
  goalClick: PropTypes.func,
  mPref: PropTypes.bool,
  niceEventDate: PropTypes.string,
  subTitleName: PropTypes.string,
};

// props are passed in from component/list-events
const renderViewEvent = ({
  ...event,
  adminMember,
  authenticated,
  canEdit,
  deleteClick,
  editClick,
  eventLink,
  expanded,
  fav,
  favClick,
  favCount,
  getWeather,
  goal,
  goalClick,
  mPref,
  niceEventDate,
  subTitleName,
}) => (
  <Card
    className="card"
    initiallyExpanded={expanded}
  >

    <CardHeader
      className="card-header"
      showExpandableButton
      avatar={ToggleIconButton('ActionBookmark', authenticated, fav, favClick, favCount)}
      title={eventLink}
      subtitle={subTitleName}
    />

    <CardText
      expandable
    >
      <Helmet>
        <title>{`${event.eventTitle} : Events : A Race athlete`}</title>
        <link rel="canonical" href={`${event.urlRoot}/${event.urlPath}#${event.urlHash}`} />
        <meta property="og:url" content={`${event.urlRoot}/${event.urlPath}#${event.urlHash}`} />
        <meta property="og:title" content={event.eventTitle} />
        <meta property="og:image" content={araceathleteEventsBanner} />
      </Helmet>
      <ShareButtons
        {...event}
        hashtags={event.eventHashtags.concat('ARaceathlete')}
        title={event.eventTitle}
        urlHash={event.eventId}
        urlPath="events"
        urlRoot="https://www.araceathlete.com"
      />
      {adminMember ? ( // hiding for adminMember only unitl this works
        <span>{ToggleIconButton('ActionAddGoal', authenticated, goal, goalClick, null)}</span>

      ) : (null)}
      {canEdit ? (
        <span>
          {ToggleIconButton('ActionEdit', authenticated, true, editClick, null)}
          {event.eventFavorites.length < 2 || adminMember ? (
            <span>{ToggleIconButton('ActionDelete', authenticated, true, deleteClick, null)}</span>
          ) : (null)}
        </span>
      ) : (null)}
      <div className="div-flexwrap" >
        {event.eventHashtags.map((hashtag) => {
          return (
            <span key={`${event.eventId}${hashtag}`} className="chip">
              <Chip className="chip" >
                {`#${hashtag}`}
              </Chip>
            </span>
          );
        })}
      </div>

      <Static
        contentLabel="Event Date"
        content={niceEventDate}
        contentType="text"
      />
      <Static
        contentLabel="Number of Days"
        content={event.eventDays}
        contentType="text"
      />
      <Static
        contentLabel="Time Zone"
        content={event.eventGeoTzName}
        contentType="text"
      />
      <Static
        contentLabel="Activity Type"
        content={event.eventAthleteType}
        contentType="text"
      />
      <Static
        contentLabel="Type"
        content={event.eventType}
        contentType="text"
      />
      <Static
        contentLabel="Series"
        content={event.eventSeries}
        contentType="text"
      />
      <Static
        contentLabel="Organizer"
        content={event.eventOrg}
        contentType="text"
      />
      <Static
        contentLabel="Description"
        content={event.eventDescHTML}
        contentType="html"
      />
      <Static
        contentLabel="Event Link"
        content={event.eventURL}
        contentType="url"
        baseURL=""
      />
      <Static
        contentLabel="Location"
        content={[event.eventLocStreet, event.eventLocCity, event.eventLocState, event.eventLocZip, event.eventLocCountry]}
        contentType="address"
        baseURL="http://www.google.com/maps/dir//"
        contentAlt={event.eventGeoFormattedAddress}
      />
      <Static
        contentLabel="Starting Elevation"
        content={`${lib.statsConversions('elev', null, event.eventGeoElevation, mPref)} ${lib.mPrefLabel('dstS', mPref).display}`}
        contentType="text"
      />
      <Static
        contentLabel="Routes"
        content={event.eventRoutes && event.eventRoutes.length}
        contentType="text"
      />
      {authenticated && event.eventRoutes.map(route => (
        <ViewEventRoute
          key={`${event.eventId}${route.eventRouteURL}`}
          {...route}
          mPref={mPref}
          adminMember={adminMember}
        />
      ))}
    </CardText>
    {getWeather && event.eventGeoTzRawOffset ? (
      <CardActions>
        <MultiDayWeather
          geoCoordinates={`${event.eventGeoLongitude},${event.eventGeoLatitude}`}
          dstOffset={event.eventGeoTzDSTOffset}
          tzOffset={event.eventGeoTzRawOffset}
          date={new Date(event.eventDate)}
          eventDays={event.eventDays || 1}
          mPref={mPref}
          expanded={expanded}
          noShowExtender
        />
      </CardActions>
    ) : null }
  </Card>
);

renderViewEvent.propTypes = propTypes;

export default renderViewEvent;

// eventId: String,
// eventOwner: String,
// eventDeleted: Boolean,
// eventRoutes: []
