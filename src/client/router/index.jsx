import React from 'react';
import { Route, Switch } from 'react-router-dom';

import RouteAuthorized from './matchauth';

import Home from './../components/home';
import Signin from './../components/auth/signin';
import Signout from './../components/auth/signout';
import Athlete from './../components/athlete';
import ActivitySearch from './../components/activity-search';
import RouteplanSearch from './../components/routeplan-search';
import Events from './../components/events/list-events';
import EditEvent from './../components/events/edit-event';
import Goals from './../components/goals/list-goals';
import AddGoal from './../components/goals/add-goal';
import Metrics from './../components/metrics';
import WeeklyStats from './../components/activity-stats';
import PowerAtAltitude from './../components/power-at-altitude';

const router = (
  <Switch>
    <RouteAuthorized exact path="/" component={WeeklyStats} />
    <RouteAuthorized path="/athlete" component={Athlete} />
    <RouteAuthorized path="/activity-search" component={ActivitySearch} />
    <RouteAuthorized path="/route-search" component={RouteplanSearch} />
    <RouteAuthorized path="/events/addevent" component={EditEvent} />
    <Route exact path="/events" component={Events} />
    <RouteAuthorized path="/goals/addgoal" component={AddGoal} />
    <RouteAuthorized exact path="/goals" component={Goals} />
    <RouteAuthorized exact path="/power-and-weight" component={Metrics} />
    <RouteAuthorized exact path="/power-at-altitude" component={PowerAtAltitude} />
    <RouteAuthorized exact path="/weekly-stats" component={WeeklyStats} />
    <Route path="/home" component={Home} />
    <Route path="/signin" component={Signin} />
    <Route path="/signout" component={Signout} />
  </Switch>
);

export default router;
