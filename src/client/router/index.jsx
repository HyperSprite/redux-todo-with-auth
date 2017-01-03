import React from 'react';
import { Match } from 'react-router';

import MatchAuthorized from './matchauth';

import Home from './../components/home';
import Signin from './../components/auth/signin';
import Signout from './../components/auth/signout';
import Athlete from './../components/athlete';
import Events from './../components/events/list-events';
import AddEvent from './../components/events/add-event';

const router = (
  <div>
    <Match exactly pattern="/" component={Events} />
    <MatchAuthorized pattern="/athlete" component={Athlete} />
    <MatchAuthorized pattern="/events/addevent" component={AddEvent} />
    <Match exactly pattern="/events" component={Events} />
    <Match pattern="/signin" component={Signin} />
    <Match pattern="/signout" component={Signout} />
  </div>
);

export default router;