// @flow
import React from 'react';
import { hot } from 'react-hot-loader';
import withRoot from './with-root';
import routes from './router';
import Template from './components/template';


const App = () => (<Template >{routes}</Template>);

export default hot(module)(withRoot(App));
