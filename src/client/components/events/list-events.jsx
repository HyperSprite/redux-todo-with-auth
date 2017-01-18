import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router';
import { Paper, FlatButton, FloatingActionButton } from 'material-ui';
import { Toolbar, ToolbarTitle, ToolbarGroup } from 'material-ui/Toolbar';
import { ActionBookmark, ActionBookmarkBorder, ActionFavoriteBorder, ContentAdd, SocialPersonOutline, ToggleRadioButtonChecked } from 'material-ui/svg-icons';
import { differenceInCalendarWeeks, differenceInCalendarDays, format, isValid } from 'date-fns';
// import ScrollIntoView from 'scroll-component';
import ScrollIntoView from '../../containers/scroll-into-view';

import * as actions from '../../actions';
import ViewEvent from './view-event';
import AddEvent from './add-event';
import EventFilter from './filter-toolbar';


import style from '../../styles/style';

const propTypes = {
  adminMember: PropTypes.bool,
  authenticated: PropTypes.bool,
  clearEvent: PropTypes.func,
  clubMember: PropTypes.bool,
  deleteEvent: PropTypes.func,
  editEvent: PropTypes.func,
  favEvent: PropTypes.func,
  events: PropTypes.array,
  fetchEvents: PropTypes.func,
  forEdit: PropTypes.object,
  stravaId: PropTypes.number,
};

const relURL = 'apiv1/events';


class ListEvent extends Component {
  componentDidMount() {
    this.props.fetchEvents(relURL, this.props.stravaId);
    this.props.clearEvent();
  }

  deleteThisEvent = this.deleteThisEvent.bind(this);

  deleteThisEvent(eventId) {
    window.location.hash = '';
    this.props.deleteEvent(eventId, `${relURL}/delete`);
  }

  editThisEvent(eventId) {
    window.location.hash = eventId;
    this.props.editEvent(eventId, relURL);
  }

  favThisEvent(eventId) {
    window.location.hash = '';
    this.props.favEvent(eventId, relURL);
  }

  goalThisEvent(eventId) {
    return (<Redirect to="/goals/addgoal" />);
  }

  renderActionButton() {
    switch (true) {
      case (this.props.clubMember):
        return (
          <Link to="/events/addevent">
            <FloatingActionButton
              style={style.floatingActionButton}
            >
              <ContentAdd />
            </FloatingActionButton>
          </Link>
        );
      case (this.props.authenticated):
        return (
          <FloatingActionButton
            style={style.floatingActionButton}
            disabled
          >
            <ContentAdd />
          </FloatingActionButton>
        );
      default:
        return null;
    }
  }

  render() {
    const { authenticated, events, forEdit, stravaId, adminMember } = this.props;
    return (

      <Paper
        style={style.paper1}
        zDepth={1}
      >
        <ScrollIntoView
          id={location.hash}
          headerHeight={70}
        />
        <Toolbar>
          <ToolbarGroup>
            <ToolbarTitle
              text="Events"
              style={style.toolbar.title}
            />
          </ToolbarGroup>
          {authenticated ? EventFilter() : null}
        </Toolbar>

        {events.map((event, i) => {

          let subTitleName = '';
          if (event.eventSeries) {
            subTitleName = `- ${event.eventSeries}`;
          } else if (event.eventOrg) {
            subTitleName = `- ${event.eventOrg}`;
          }

          if (isValid(new Date(event.eventDate))) {
            let timeToGo = differenceInCalendarWeeks(
              new Date(event.eventDate),
              new Date(),
              { weekStartsOn: 1 },
            );
            if (timeToGo < 2) {
              timeToGo = differenceInCalendarDays(
                new Date(event.eventDate),
                new Date(),
              );
              subTitleName = `${timeToGo} days to go ${subTitleName}`;
            } else {
              subTitleName = `${timeToGo} weeks to go ${subTitleName}`;
            }
          }

          const niceEventDate = format(
            event.eventDate, 'MMM Do YYYY',
          );
          // Expands Card on render if hash matchs eventid
          const expanded = (window.location.hash === `#${event.eventId}`);

          const fav = event.eventFavorites.indexOf(stravaId) !== -1;

          const favCount = event.eventFavorites.length;

          const goal = true;

          const canEdit = (eCreator, sId, aMember) => (eCreator === sId || aMember);

          if (forEdit.eventId === event.eventId) {
            return (
              <AddEvent key={`${event.eventId}-edit`} index={i} />
            );
          }

          const eventLink = (
            <Link to={`/events#${event.eventId}`} style={style.cardHeaderTitleLink}>{event.eventTitle}</Link>
          );

          return (
            <div key={event.eventId} id={`${event.eventId}`} >
              <ViewEvent
                adminMember={adminMember}
                authenticated={authenticated}
                canEdit={canEdit(event.eventOwner, stravaId, adminMember)}
                deleteClick={() => this.deleteThisEvent(event.eventId)}
                editClick={() => this.editThisEvent(event.eventId, i)}
                eventLink={eventLink}
                expanded={expanded}
                fav={fav}
                favClick={() => this.favThisEvent(event.eventId)}
                favCount={favCount}
                goal={goal}
                goalClick={() => this.goalThisEvent(event.eventId)}
                index={i}
                niceEventDate={niceEventDate}
                subTitleName={subTitleName}
                {...event}
              />
            </div>
          );
        })}
        { this.renderActionButton() }
      </Paper>

    );
  }
}

ListEvent.propTypes = propTypes;

const getVisibleEvents = (events, filter, stravaId) => {
  switch (filter) {
    case 'EVENTS_SHOW_ALL': {
      return events;
    }
    case 'EVENTS_SHOW_FAVORITE': {
      return events.filter(t => t.eventFavorites.indexOf(stravaId) !== -1);
    }
    case 'EVENTS_SHOW_OWNER': {
      return events.filter(t => t.eventOwner === stravaId);
    }
    default:
      return events;
  }
};

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
    stravaId: state.auth.user.stravaId,
    clubMember: state.auth.user.clubMember,
    adminMember: state.auth.user.adminMember,
    events: getVisibleEvents(state.events.events, state.visibilityFilter, state.auth.user.stravaId),
    forEdit: state.events.event,
  };
}

export default connect(mapStateToProps, actions)(ListEvent);
