import React from 'react';
import Toolbar from 'material-ui-next/Toolbar';
import FilterLink from './filter-toolbar-connect';

const EventFilter = () => (
  <Toolbar>
    <FilterLink filter="EVENTS_SHOW_ALL" />
    <FilterLink filter="EVENTS_SHOW_FAVORITE" />
    <FilterLink filter="EVENTS_SHOW_OWNER" />
  </Toolbar>
);

export default EventFilter;
