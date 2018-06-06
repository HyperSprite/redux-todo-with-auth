import React from 'react';
import { Route, Switch } from 'react-router-dom';

import RouteAuthorized from './matchauth';

import Home from './../components/home';
import Signin from './../components/auth/signin';
import Signout from './../components/auth/signout';
import Athlete from './../components/athlete';
import ActivitySearch from './../components/view-activity-search';
import RouteplanSearch from './../components/view-routeplan-search';
import Dashboard from './../components/dashboard';
import Events from './../components/view-events';
import EditEvent from './../components/view-events/edit-event';
import Goals from './../components/goals/list-goals';
import AddGoal from './../components/goals/add-goal';
import Metrics from './../components/view-power-and-wieght';
import WeeklyStats from './../components/view-weekly-stats';
import PowerAtAltitude from './../components/view-power-at-altitude';

const router = (
  <Switch>
    <RouteAuthorized exact path="/" component={Home} />
    <RouteAuthorized path="/athlete" component={Athlete} />
    <RouteAuthorized path="/activity-search" component={ActivitySearch} />
    <RouteAuthorized path="/dashboard" component={Dashboard} />
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
