import React from 'react';
import { Match } from 'react-router';

import MatchAuthorized from './matchauth';

import Home from './../components/home';
import Signin from './../components/auth/signin';
import Signout from './../components/auth/signout';
import About from './../components/about';
import Events from './../components/events/list-events';
import AddEvent from './../components/events/add-event';
import ViewEvent from './../components/events/view-event';
import Todos from './../components/todos';


const router = (
  <div>
    <Match exactly pattern="/" component={Home} />
    <Match pattern="/signin" component={Signin} />
    <Match pattern="/signout" component={Signout} />
    {/* <Match pattern="/events" component={Events} /> */}
    {/* <Match pattern="/event" component={ViewEvent} /> */}
    <MatchAuthorized pattern="/about" component={About} />
    <MatchAuthorized pattern="/addevent" component={AddEvent} />
    <MatchAuthorized pattern="/todos" component={Todos} />
  </div>
);

export default router;
