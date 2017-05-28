import React from 'react';
import { Route, Switch } from 'react-router-dom';

import RouteAuthorized from './matchauth';

import Home from './../components/home';
import Signin from './../components/auth/signin';
import Signout from './../components/auth/signout';
import Athlete from './../components/athlete';
import Events from './../components/events/list-events';
import EditEvent from './../components/events/edit-event';
import Goals from './../components/goals/list-goals';
import AddGoal from './../components/goals/add-goal';
import WeeklyStats from './../components/activity-stats';

const router = (
  <Switch>
    <RouteAuthorized exact path="/" component={Home} />
    <RouteAuthorized path="/athlete" component={Athlete} />
    <RouteAuthorized path="/events/addevent" component={EditEvent} />
    <Route exact path="/events" component={Events} />
    <RouteAuthorized path="/goals/addgoal" component={AddGoal} />
    <RouteAuthorized exact path="/goals" component={Goals} />
    <RouteAuthorized exact path="/weekly-stats" component={WeeklyStats} />
    <Route path="/home" component={Home} />
    <Route path="/signin" component={Signin} />
    <Route path="/signout" component={Signout} />
  </Switch>
);

export default router;
