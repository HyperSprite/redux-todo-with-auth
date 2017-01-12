import React from 'react';
import { ToolbarGroup } from 'material-ui';
import FilterLink from './event-filter-link';

const EventFilter = () => (
  <ToolbarGroup>
    <FilterLink filter="EVENTS_SHOW_ALL" >
      All
    </FilterLink>
    <FilterLink filter="EVENTS_SHOW_FAVORITE" >
      Bookmarked
    </FilterLink>
    <FilterLink filter="EVENTS_SHOW_OWNER" >
      Yours
    </FilterLink>
  </ToolbarGroup>
);

export default EventFilter;
