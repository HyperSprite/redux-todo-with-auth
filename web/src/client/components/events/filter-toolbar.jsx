import React from 'react';
import { ToolbarGroup } from 'material-ui';
import FilterLink from './filter-toolbar-connect';

const EventFilter = () => (
  <ToolbarGroup>
    <FilterLink filter="EVENTS_SHOW_ALL" />
    <FilterLink filter="EVENTS_SHOW_FAVORITE" />
    <FilterLink filter="EVENTS_SHOW_OWNER" />
  </ToolbarGroup>
);

export default EventFilter;
