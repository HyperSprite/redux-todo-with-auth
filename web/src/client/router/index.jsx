import React from 'react';
import { Match } from 'react-router';

import MatchAuthorized from './matchauth';

import Home from './../components/home';
import Signin from './../components/auth/signin';
import Signout from './../components/auth/signout';
import Athlete from './../components/athlete';
import Events from './../components/events/list-events';
import EditEvent from './../components/events/edit-event';
import Goals from './../components/goals/list-goals';
import AddGoal from './../components/goals/add-goal';

const router = (
  <div>
    <MatchAuthorized exactly pattern="/" component={Events} />
    <MatchAuthorized pattern="/athlete" component={Athlete} />
    <MatchAuthorized pattern="/events/addevent" component={EditEvent} />
    <Match exactly pattern="/events" component={Events} />
    <MatchAuthorized pattern="/goals/addgoal" component={AddGoal} />
    <MatchAuthorized exactly pattern="/goals" component={Goals} />
    <Match pattern="/home" component={Home} />
    <Match pattern="/signin" component={Signin} />
    <Match pattern="/signout" component={Signout} />
  </div>
);

export default router;
