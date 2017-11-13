import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { FloatingActionButton } from 'material-ui';
import { ContentAdd } from 'material-ui/svg-icons';
import Helmet from 'react-helmet';

import { differenceInCalendarWeeks, differenceInCalendarDays, format, isValid } from 'date-fns';
import ScrollIntoView from '../../containers/scroll-into-view';

import * as actions from '../../actions';
import ViewEvent from './view-event';
import EditEvent from './edit-event';

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
  setPageName: PropTypes.func,
  user: PropTypes.object,
};

const relURL = 'apiv1/events';

class ListEvent extends Component {

  componentDidMount() {
    this.props.fetchEvents(relURL, this.props.stravaId);
    this.props.clearEvent();
    this.props.setPageName('Events');
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
    const { authenticated, events, forEdit, stravaId, adminMember, user } = this.props;
    return (
      <div>
        <Helmet>
          <meta charSet="utf-8" />
          <title>{'Events : A Race athlete'}</title>
          <link rel="canonical" href="https://www.araceathlete.com/events" />
        </Helmet>
        <div className="main-flex-container" >
          <div className="side-lite left-pane" />
          <div className="main" >
            <ScrollIntoView
              id={location.hash}
              headerHeight={70}
            />
            {events.map((event, i) => {
              let getWeather = false;
              if (isValid(new Date(event.eventDate))) {
                const daysToGo = differenceInCalendarDays(
                  new Date(event.eventDate),
                  new Date(),
                );

                getWeather = (daysToGo < 5);
              }

              let subTitleName = '';

              const niceEventDate = format(
                event.eventDate, 'MMM Do YYYY',
              );

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
                  subTitleName = `${timeToGo} days, ${niceEventDate} ${subTitleName}`;
                } else {
                  subTitleName = `${timeToGo} weeks, ${niceEventDate} ${subTitleName}`;
                }
              }

              let elevation = '';
              if (event.eventGeoElevation) {
                if (user.measurement_preference === 'feet') {
                  elevation = `${Math.round(event.eventGeoElevation * 3.281)} feet`;
                } else {
                  elevation = `${Math.round(event.eventGeoElevation)} meters`;
                }
              }


              // Expands Card on render if hash matchs eventid
              const expanded = (window.location.hash === `#${event.eventId}`);

              const fav = event.eventFavorites.indexOf(stravaId) !== -1;

              const favCount = event.eventFavorites.length;

              const goal = true;

              const urlPath = 'events';

              const urlRoot = 'https://www.araceathlete.com';

              const canEdit = (eCreator = [], sId, aMember) => (eCreator.some(e=> e === sId) || aMember);

              if (forEdit.eventId === event.eventId) {
                return (
                  <EditEvent key={`${event.eventId}-edit`} index={i} />
                );
              }
              // ${window.location.href}
              // const eventFullURL = `${urlRoot}/${urlPath}#${event.eventId}`;

              // const eventLink = (
              //   <Link to={`/events#${event.eventId}`} className="card-header-title-link">{event.eventTitle}</Link>
              // );
              const mPref = user.measurement_preference === 'feet';
              return (
                <div key={event.eventId} id={`${event.eventId}`} >
                  <ViewEvent
                    adminMember={adminMember}
                    authenticated={authenticated}
                    canEdit={canEdit(event.eventOwners, stravaId, adminMember)}
                    deleteClick={() => this.deleteThisEvent(event.eventId)}
                    editClick={() => this.editThisEvent(event.eventId, i)}
                    elevation={elevation}
                    // eventFullURL={`${urlRoot}/${urlPath}#${event.eventId}`}
                    eventLink={event.eventTitle}
                    expanded={expanded}
                    fav={fav}
                    favClick={() => this.favThisEvent(event.eventId)}
                    favCount={favCount}
                    getWeather={getWeather}
                    goal={goal}
                    goalClick={() => this.goalThisEvent(event.eventId)}
                    index={i}
                    niceEventDate={niceEventDate}
                    mPref={mPref}
                    subTitleName={subTitleName}
                    urlPath={urlPath}
                    urlRoot={urlRoot}
                    {...event}
                  />
                </div>
              );
            })}
            { this.renderActionButton() }
          </div>
          <div className="side-lite right-pane" />
        </div>
      </div>
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
      return events.filter(t => t.eventOwners.some(e => e === stravaId));
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
    user: state.auth.user,
    events: getVisibleEvents(state.events.events, state.visibilityFilter, state.auth.user.stravaId),
    forEdit: state.events.event,
  };
}

export default connect(mapStateToProps, actions)(ListEvent);
