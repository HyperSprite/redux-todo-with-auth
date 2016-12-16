import React from 'react';
import { Match } from 'react-router';

import MatchAuthorized from './matchauth';

import Signin from './../components/auth/signin';
import Signup from './../components/auth/signup';
import Signout from './../components/auth/signout';
// import Home from './../components/home';
import Todos from './../components/todos';
import About from './../components/about';

const router = (
  <div>
    <Match exactly pattern="/" component={Signin} />
    <Match pattern="/signin" component={Signin} />
    <Match pattern="/signup" component={Signup} />
    <Match pattern="/signout" component={Signout} />
    <MatchAuthorized pattern="/todos" component={Todos} />
    <MatchAuthorized pattern="/about" component={About} />
  </div>
);

export default router;
