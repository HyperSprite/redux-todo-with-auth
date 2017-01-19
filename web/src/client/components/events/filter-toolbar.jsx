import React from 'react';
import { ToolbarGroup } from 'material-ui';
import FilterLink from './filter-toolbar-connect';

const EventFilter = () => (
  <ToolbarGroup>
    <FilterLink filter="EVENTS_SHOW_ALL" >
      A
    </FilterLink>
    <FilterLink filter="EVENTS_SHOW_FAVORITE" >
      M
    </FilterLink>
    <FilterLink filter="EVENTS_SHOW_OWNER" >
      Y
    </FilterLink>
  </ToolbarGroup>
);

export default EventFilter;
