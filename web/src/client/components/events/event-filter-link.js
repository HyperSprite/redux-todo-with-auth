import { connect } from 'react-redux';
import { setVisibilityFilter } from '../../actions';
import EventTBLink from './event-toolbar-filter-links';

const mapStateToProps = (state, ownProps) => {
  return {
    active: ownProps.filter === state.visibilityFilter,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClick: () => {
      dispatch(setVisibilityFilter(ownProps.filter));
    },
  };
};

const EventFilterLink = connect(
  mapStateToProps,
  mapDispatchToProps,
)(EventTBLink);

export default EventFilterLink;
