import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Paper, FloatingActionButton } from 'material-ui';
import { Toolbar, ToolbarTitle } from 'material-ui/Toolbar';
import { ContentAdd } from 'material-ui/svg-icons';
import { differenceInCalendarWeeks as diffInCalWeeks, format } from 'date-fns';

import * as actions from '../../actions';
import ViewEvent from './view-event';
import AddEvent from './add-event';

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
    this.props.deleteEvent(eventId, `${relURL}/delete`);
  }

  editThisEvent(eventId) {
    this.props.editEvent(eventId, relURL);
  }

  favThisEvent(eventId) {
    this.props.favEvent(eventId, relURL);
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
    const { events, forEdit, stravaId, adminMember } = this.props;
    return (

      <Paper
        style={style.paper1}
        zDepth={1}
      >
        <Toolbar>
          <ToolbarTitle
            text="Events"
          />
        </Toolbar>
        {events.map((event, i) => {
          const weeksToGo = diffInCalWeeks(
            new Date(event.eventDate),
            new Date(),
            { weekStartsOn: 1 },
          );

          const niceEventDate = format(
            event.eventDate, 'MMM Do YYYY',
          );

          const fav = event.eventFavorites.indexOf(stravaId) !== -1;

          const favCount = event.eventFavorites.length;

          const canEdit = (eCreator, sId, aMember) => (eCreator === sId || aMember);

          if (forEdit.eventId === event.eventId) {
            return (
              <AddEvent key={i} index={i} />
            );
          }
          return (
            <div key={i} >
              <ViewEvent
                weeksToGo={weeksToGo}
                niceEventDate={niceEventDate}
                editClick={() => this.editThisEvent(event.eventId, i)}
                deleteClick={() => this.deleteThisEvent(event.eventId)}
                favClick={() => this.favThisEvent(event.eventId)}
                canEdit={canEdit(event.eventOwner, stravaId, adminMember)}
                fav={fav}
                favCount={favCount}
                index={i}
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

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
    stravaId: state.auth.user.stravaId,
    clubMember: state.auth.user.clubMember,
    adminMember: state.auth.user.adminMember,
    events: state.events.events,
    forEdit: state.events.event,
  };
}

export default connect(mapStateToProps, actions)(ListEvent);
