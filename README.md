#Redux Todo Example with Auth (with Node/Express/Mongo backend)

This is taking a the React Todo example and putting Auth in front of it. It  uses all the latest stuff, as of time of committing, including React Router v4.

To run this you will need Mongodb running someplace. It can be local or mlabs, etc, it does not have to be the latest version, there is nothing special going on here.

Otherwise, Node.js 6 and you should be good to go.

To run this locally:
```bash
git clone git@github.com:HyperSprite/redux-todo-with-auth.git
npm i
# Copy the config file and edit the settings to your liking.
npm run dev
```

##Handy Links:

* [Strava v3 API](http://strava.github.io/api/)
* [Flow type](https://flowtype.org/) - [github](https://github.com/facebook/flow)
* [Node.js](https://nodejs.org) - [github](https://github.com/nodejs/node) - [docs](https://nodejs.org/en/docs/)
* [Experss](http://expressjs.com/) - [github](https://github.com/expressjs/express) - [docs](http://expressjs.com/en/4x/api.html)

###Modules:

* axios - [github](https://github.com/mzabriskie/axios) - xhr (see client/actions/index)
* [date-fns](https://date-fns.org) - like lodash for dates
* flow-bin - [github](https://github.com/flowtype/flow-bin)
* [material-ui](http://www.material-ui.com/#/components) - [github](https://github.com/callemall/material-ui)
* [momentjs](http://momentjs.com/) - time conversions
* [mongoose](http://mongoosejs.com/) - [github](https://github.com/Automattic/mongoose) - ORM for Mongodb
* [mongoose-findorcreate]() - [github]()
* [nodemon](https://nodemon.io/) - [github](https://github.com/remy/nodemon) - run node on a watcher
* [passport](http://passportjs.org/) - [github](https://github.com/jaredhanson/passport)
* passport-jwt - [github](https://github.com/themikenicholson/passport-jwt)
* passport-local - [github](https://github.com/jaredhanson/passport-local)
* passport-strava-oauth2 - [github](https://github.com/millsy/passport-strava)
* [react](https://facebook.github.io/react) - [github](https://github.com/facebook/react)
* react-redux - [github](https://github.com/reactjs/react-redux) - react/redux bindings
* [react-router v4](https://react-router.now.sh/) - [github](https://github.com/ReactTraining/react-router/tree/v4)
* [redux](http://redux.js.org/) - [github](https://github.com/reactjs/redux/)
* redux-form-material-ui - [github](https://github.com/erikras/redux-form-material-ui)
* [redux-form](http://redux-form.com) - [github](https://github.com/erikras/redux-form)
* [serialize-javascript](https://github.com/yahoo/serialize-javascript) - similar to JSON.stringify
* node-strava-v3 - [github](https://github.com/UnbounDev/node-strava-v3)
* uuid - [github](https://github.com/kelektiv/node-uuid) - generates UUIDs