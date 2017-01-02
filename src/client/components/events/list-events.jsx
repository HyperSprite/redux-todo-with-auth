import React, { Component, PropTypes } from 'react';
import { Paper, FloatingActionButton, FlatButton } from 'material-ui';
import { ActionDeleteForever, ContentAdd, ContentCreate } from 'material-ui/svg-icons';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { differenceInCalendarWeeks as diffInCalWeeks, format } from 'date-fns'

import * as actions from '../../actions';
import ViewEvent from './view-event';

import style from '../../styles/style';

const propTypes = {

};
const relURL = 'apiv1/events';
const query = '{eventDate:{$gt:stringDate}}';

const ListEvent = class ListEvent extends Component {
  componentDidMount() {
    this.props.fetchEvents(relURL, query);
  }

  deleteThisEvent = this.deleteThisEvent.bind(this);

  deleteThisEvent(eventId) {
    console.log('eventId', eventId);
    this.props.deleteEvent(eventId, `${relURL}/delete`);
  }

  renderActionButton() {
    if (this.props.clubMember) {
      return (
        <Link to="/events/addevent">
          <FloatingActionButton
            style={style.floatingActionButton}
          >
            <ContentAdd />
          </FloatingActionButton>
        </Link>
      );
    } else if (this.props.authenticated) {
      return (
        <FloatingActionButton
          style={style.floatingActionButton}
          disabled
        >
          <ContentAdd />
        </FloatingActionButton>
      );
    }
  }

  render() {
    const { events, authenticated, clubMember } = this.props;
    return (
      <Paper
        style={style.paper1}
        zDepth={1}
      >
        {events.map((event, i) => {
          console.log(event.eventTitle);
          const weeksToGo = diffInCalWeeks(
            new Date(event.eventDate),
            new Date(),
            { weekStartsOn: 1 },
          );
          const niceEventDate = format(
            event.eventDate, 'MMM Do YYYY'
          );
          return (
            <div key={i} >
              <ViewEvent
                weeksToGo={weeksToGo}
                niceEventDate={niceEventDate}
                {...event}
              />
              <FlatButton
                label="Edit"
                secondary
                style={style.button}
                icon={<ContentCreate />}
              />
              <FlatButton
                label="Delete"
                secondary
                style={style.button}
                icon={<ActionDeleteForever />}
                onClick={() => this.deleteThisEvent(event.eventId)}
              />
            </div>
          );
        })}
        { this.renderActionButton() }
      </Paper>

    );
  }
};

ListEvent.propTypes = propTypes;

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
    clubMember: state.auth.user.clubMember,
    adminMember: state.auth.user.adminMember,
    events: state.events.events,
  };
}

export default connect(mapStateToProps, actions)(ListEvent);
